import 'server-only';

const DEFAULT_SITE_URL = 'https://ai-quant-lab.vercel.app';
const DEFAULT_MEMBERSHIP_TABLE = 'membership_subscriptions';
const DEFAULT_MEMBERSHIP_EVENT_TABLE = 'membership_webhook_events';

function trimValue(value) {
  return String(value ?? '').trim();
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function getSiteUrl() {
  return trimValue(process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL) || DEFAULT_SITE_URL;
}

function getSupabaseConfig() {
  const url = trimValue(process.env.SUPABASE_URL);
  const serviceRoleKey = trimValue(process.env.SUPABASE_SERVICE_ROLE_KEY);

  if (!url || !serviceRoleKey) {
    return null;
  }

  return {
    url: url.replace(/\/+$/, ''),
    serviceRoleKey,
    membershipTable: trimValue(process.env.SUPABASE_MEMBERSHIP_TABLE) || DEFAULT_MEMBERSHIP_TABLE,
    membershipEventTable:
      trimValue(process.env.SUPABASE_MEMBERSHIP_EVENT_TABLE) || DEFAULT_MEMBERSHIP_EVENT_TABLE,
  };
}

function getLemonConfig() {
  return {
    checkoutUrl: trimValue(process.env.LEMON_SQUEEZY_CHECKOUT_URL),
    webhookSecret: trimValue(process.env.LEMON_SQUEEZY_WEBHOOK_SECRET),
  };
}

function getPrimaryEmailAddress(user) {
  const primary = user?.emailAddresses?.find((item) => item?.id === user?.primaryEmailAddressId);
  if (primary?.emailAddress) {
    return trimValue(primary.emailAddress);
  }

  return trimValue(user?.emailAddresses?.[0]?.emailAddress);
}

function getDisplayName(user) {
  const name = trimValue(user?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`);
  return name || getPrimaryEmailAddress(user);
}

function normalizeMembershipStatus(status) {
  const value = trimValue(status).toLowerCase();

  if (!value) {
    return 'pending';
  }

  if (value === 'trialing') {
    return 'on_trial';
  }

  return value;
}

function isMembershipActive(status) {
  return ['active', 'on_trial', 'trial', 'trialing'].includes(trimValue(status).toLowerCase());
}

async function supabaseRequest(table, { method = 'GET', query = {}, body = null, prefer } = {}) {
  const config = getSupabaseConfig();
  if (!config) {
    return { skipped: true, reason: 'Supabase env vars are missing' };
  }

  const url = new URL(`${config.url}/rest/v1/${table}`);

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url, {
    method,
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      'Content-Type': 'application/json',
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  const parsed = text ? safeJsonParse(text) : null;

  if (!response.ok) {
    const error =
      parsed?.message || parsed?.hint || parsed?.details || text || `Supabase request failed (${response.status})`;
    throw new Error(error);
  }

  return {
    skipped: false,
    data: parsed,
  };
}

async function findMembershipRowByFilter(filterKey, filterValue) {
  if (!trimValue(filterValue)) {
    return null;
  }

  const config = getSupabaseConfig();
  if (!config) {
    return null;
  }

  const result = await supabaseRequest(config.membershipTable, {
    query: {
      select: '*',
      [filterKey]: `eq.${filterValue}`,
      limit: 1,
    },
  });

  return Array.isArray(result.data) ? result.data[0] ?? null : null;
}

async function getMembershipByEmail(email) {
  return findMembershipRowByFilter('email', trimValue(email));
}

async function getMembershipByClerkUserId(clerkUserId) {
  return findMembershipRowByFilter('clerk_user_id', trimValue(clerkUserId));
}

async function saveMembershipRow(record) {
  const config = getSupabaseConfig();
  if (!config) {
    return { skipped: true, reason: 'Supabase env vars are missing' };
  }

  const now = new Date().toISOString();
  const payload = {
    ...record,
    updated_at: now,
  };

  const existing = payload.clerk_user_id
    ? await getMembershipByClerkUserId(payload.clerk_user_id)
    : null;
  const fallbackExisting = existing || (payload.email ? await getMembershipByEmail(payload.email) : null);
  payload.created_at = fallbackExisting?.created_at || record.created_at || now;

  if (fallbackExisting?.id) {
    return supabaseRequest(config.membershipTable, {
      method: 'PATCH',
      query: { id: `eq.${fallbackExisting.id}` },
      body: payload,
      prefer: 'return=representation',
    });
  }

  return supabaseRequest(config.membershipTable, {
    method: 'POST',
    body: payload,
    prefer: 'return=representation',
  });
}

async function logMembershipWebhookEvent(record) {
  const config = getSupabaseConfig();
  if (!config) {
    return { skipped: true, reason: 'Supabase env vars are missing' };
  }

  return supabaseRequest(config.membershipEventTable, {
    method: 'POST',
    body: record,
    prefer: 'resolution=merge-duplicates,return=representation',
  });
}

function buildCheckoutUrl(user) {
  const { checkoutUrl } = getLemonConfig();

  if (!checkoutUrl) {
    return null;
  }

  const url = new URL(checkoutUrl);
  const email = getPrimaryEmailAddress(user);
  const name = getDisplayName(user);

  if (email) {
    url.searchParams.set('checkout[email]', email);
  }

  if (name) {
    url.searchParams.set('checkout[name]', name);
  }

  return url.toString();
}

function getEventName(payload) {
  return trimValue(payload?.meta?.event_name);
}

function getEventEmail(attributes) {
  return trimValue(attributes?.user_email || attributes?.customer_email || attributes?.email);
}

function deriveMembershipStatus(eventName, attributes) {
  const rawStatus = normalizeMembershipStatus(attributes?.status);

  switch (trimValue(eventName)) {
    case 'subscription_created':
    case 'subscription_payment_success':
    case 'subscription_resumed':
    case 'subscription_unpaused':
      return isMembershipActive(rawStatus) ? rawStatus : 'active';
    case 'subscription_cancelled':
      return 'cancelled';
    case 'subscription_expired':
      return 'expired';
    case 'subscription_paused':
      return 'paused';
    case 'subscription_payment_failed':
      return rawStatus || 'past_due';
    case 'order_created':
      return rawStatus || 'pending';
    case 'customer_updated':
      return rawStatus || 'active';
    default:
      return rawStatus || 'pending';
  }
}

function buildMembershipRowFromWebhook(payload) {
  const attributes = payload?.data?.attributes || {};
  const eventName = getEventName(payload);
  const email = getEventEmail(attributes);
  const status = deriveMembershipStatus(eventName, attributes);
  const now = new Date().toISOString();

  return {
    email,
    full_name: trimValue(attributes.user_name),
    plan_slug: 'standard-membership',
    plan_name: trimValue(attributes.product_name) || '標準會員',
    membership_status: status,
    access_status: isMembershipActive(status) ? 'active' : 'inactive',
    lemon_customer_id: trimValue(attributes.customer_id),
    lemon_subscription_id: trimValue(payload?.data?.id),
    lemon_order_id: trimValue(attributes.order_id),
    lemon_product_id: trimValue(attributes.product_id),
    lemon_variant_id: trimValue(attributes.variant_id),
    lemon_status: trimValue(attributes.status),
    current_period_end:
      trimValue(attributes.renews_at) ||
      trimValue(attributes.ends_at) ||
      trimValue(attributes.trial_ends_at),
    trial_ends_at: trimValue(attributes.trial_ends_at),
    cancel_at: trimValue(attributes.ends_at),
    cancelled_at: trimValue(attributes.cancelled_at),
    last_event_name: eventName,
    last_event_at: now,
    metadata: {
      event_name: eventName,
      test_mode: attributes.test_mode ?? null,
      raw_payload: payload,
    },
  };
}

export {
  buildCheckoutUrl,
  buildMembershipRowFromWebhook,
  deriveMembershipStatus,
  getDisplayName,
  getEventEmail,
  getEventName,
  getLemonConfig,
  getMembershipByClerkUserId,
  getMembershipByEmail,
  getPrimaryEmailAddress,
  getSiteUrl,
  getSupabaseConfig,
  isMembershipActive,
  logMembershipWebhookEvent,
  normalizeMembershipStatus,
  saveMembershipRow,
  safeJsonParse,
  supabaseRequest,
  trimValue,
};
