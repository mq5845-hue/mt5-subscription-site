import 'server-only';

function hasValue(value) {
  return Boolean(String(value ?? '').trim());
}

export function getMembershipSetupStatus() {
  const clerkPublishableKeyReady = hasValue(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  const clerkSecretKeyReady = hasValue(process.env.CLERK_SECRET_KEY);
  const lemonCheckoutUrlReady = hasValue(process.env.LEMON_SQUEEZY_CHECKOUT_URL);
  const lemonWebhookSecretReady = hasValue(process.env.LEMON_SQUEEZY_WEBHOOK_SECRET);
  const supabaseUrlReady = hasValue(process.env.SUPABASE_URL);
  const supabaseServiceRoleKeyReady = hasValue(process.env.SUPABASE_SERVICE_ROLE_KEY);

  return {
    clerkPublishableKeyReady,
    clerkSecretKeyReady,
    clerkReady: clerkPublishableKeyReady && clerkSecretKeyReady,
    lemonCheckoutUrlReady,
    lemonWebhookSecretReady,
    lemonReady: lemonCheckoutUrlReady && lemonWebhookSecretReady,
    supabaseUrlReady,
    supabaseServiceRoleKeyReady,
    supabaseReady: supabaseUrlReady && supabaseServiceRoleKeyReady,
  };
}
