const DEFAULT_SITE_URL = 'https://ai-quant-lab.vercel.app';
const DEFAULT_RESERVATION_TABLE = 'reservation_leads';
const DEFAULT_LINE_EVENT_TABLE = 'line_inbound_events';

function trimValue(value) {
  return String(value ?? '').trim();
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
    reservationTable: trimValue(process.env.SUPABASE_RESERVATION_TABLE) || DEFAULT_RESERVATION_TABLE,
    lineEventTable: trimValue(process.env.SUPABASE_LINE_EVENT_TABLE) || DEFAULT_LINE_EVENT_TABLE,
  };
}

function getGoogleFormConfig() {
  const actionUrl = trimValue(process.env.GOOGLE_FORM_ACTION_URL);

  if (!actionUrl) {
    return null;
  }

  let fieldMap = {};

  if (process.env.GOOGLE_FORM_FIELD_MAP) {
    try {
      fieldMap = JSON.parse(process.env.GOOGLE_FORM_FIELD_MAP);
    } catch {
      throw new Error('GOOGLE_FORM_FIELD_MAP must be valid JSON');
    }
  }

  const fallbackMap = {
    name: trimValue(process.env.GOOGLE_FORM_ENTRY_NAME),
    email: trimValue(process.env.GOOGLE_FORM_ENTRY_EMAIL),
    address: trimValue(process.env.GOOGLE_FORM_ENTRY_ADDRESS),
    phoneNumber: trimValue(process.env.GOOGLE_FORM_ENTRY_PHONE_NUMBER),
    comments: trimValue(process.env.GOOGLE_FORM_ENTRY_COMMENTS),
  };

  return {
    actionUrl,
    fieldMap: {
      ...fallbackMap,
      ...fieldMap,
    },
  };
}

async function postJson(url, payload, headers = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  const parsed = text ? safeJsonParse(text) : null;

  if (!response.ok) {
    const error = parsed?.message || parsed?.error || text || `Request failed with status ${response.status}`;
    throw new Error(error);
  }

  return parsed ?? text;
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function buildReservationPayload(formData) {
  const payload = {
    name: trimValue(formData.name),
    email: trimValue(formData.email),
    address: trimValue(formData.address),
    phoneNumber: trimValue(formData.phoneNumber),
    comments: trimValue(formData.comments),
    source: trimValue(formData.source) || 'website',
    status: trimValue(formData.status) || 'new',
    createdAt: new Date().toISOString(),
  };

  return payload;
}

function validateReservationPayload(payload) {
  const missing = [];

  if (!payload.name) missing.push('name');
  if (!payload.email) missing.push('email');
  if (!payload.address) missing.push('address');

  return missing;
}

function buildReservationRecord(payload) {
  return {
    name: payload.name,
    email: payload.email,
    address: payload.address,
    phone_number: payload.phoneNumber,
    comments: payload.comments,
    source: payload.source,
    status: payload.status,
    created_at: payload.createdAt,
  };
}

async function insertIntoSupabase(table, payload) {
  const config = getSupabaseConfig();
  if (!config) {
    return { skipped: true, reason: 'Supabase env vars are missing' };
  }

  const response = await fetch(`${config.url}/rest/v1/${table}?select=id`, {
    method: 'POST',
    headers: {
      apikey: config.serviceRoleKey,
      Authorization: `Bearer ${config.serviceRoleKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();
  const parsed = text ? safeJsonParse(text) : null;

  if (!response.ok) {
    const error = parsed?.message || parsed?.hint || parsed?.details || text || `Supabase insert failed with status ${response.status}`;
    throw new Error(error);
  }

  return {
    skipped: false,
    data: parsed,
  };
}

async function submitToGoogleForm(payload) {
  const config = getGoogleFormConfig();
  if (!config) {
    return { skipped: true, reason: 'Google Form env vars are missing' };
  }

  const params = new URLSearchParams();
  const { fieldMap } = config;

  const fieldEntries = [
    ['name', payload.name],
    ['email', payload.email],
    ['address', payload.address],
    ['phoneNumber', payload.phoneNumber],
    ['comments', payload.comments],
  ];

  for (const [key, value] of fieldEntries) {
    const fieldName = trimValue(fieldMap[key]);
    if (!fieldName || !trimValue(value)) {
      continue;
    }

    params.append(fieldName, value);
  }

  const response = await fetch(config.actionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Google Form submit failed: ${response.status} ${text}`.trim());
  }

  return {
    skipped: false,
  };
}

async function storeReservationLead(payload) {
  const results = {
    supabase: { skipped: true },
    googleForm: { skipped: true },
    warnings: [],
  };

  try {
    results.supabase = await insertIntoSupabase(
      trimValue(process.env.SUPABASE_RESERVATION_TABLE) || DEFAULT_RESERVATION_TABLE,
      buildReservationRecord(payload),
    );
  } catch (error) {
    results.supabase = {
      skipped: false,
      error: error instanceof Error ? error.message : 'Supabase insert failed',
    };
    results.warnings.push(results.supabase.error);
  }

  try {
    results.googleForm = await submitToGoogleForm(payload);
  } catch (error) {
    results.googleForm = {
      skipped: false,
      error: error instanceof Error ? error.message : 'Google Form submit failed',
    };
    results.warnings.push(results.googleForm.error);
  }

  return results;
}

async function storeLineInboundEvent(eventPayload) {
  const config = getSupabaseConfig();
  if (!config) {
    return { skipped: true, reason: 'Supabase env vars are missing' };
  }

  const payload = {
    line_user_id: trimValue(eventPayload.lineUserId),
    line_display_name: trimValue(eventPayload.lineDisplayName),
    message_text: trimValue(eventPayload.messageText),
    event_type: trimValue(eventPayload.eventType) || 'message',
    intent: trimValue(eventPayload.intent) || 'normal',
    source: trimValue(eventPayload.source) || 'line_webhook',
    matched_id: trimValue(eventPayload.matchedId),
    reply_mode: trimValue(eventPayload.replyMode),
    raw_event: eventPayload.rawEvent ?? {},
    created_at: new Date().toISOString(),
  };

  return insertIntoSupabase(config.lineEventTable, payload);
}

function getReservationPageUrl() {
  return `${getSiteUrl()}/line-kb/reservation`;
}

export {
  buildReservationPayload,
  buildReservationRecord,
  getGoogleFormConfig,
  getReservationPageUrl,
  getSiteUrl,
  getSupabaseConfig,
  storeLineInboundEvent,
  storeReservationLead,
  validateReservationPayload,
};
