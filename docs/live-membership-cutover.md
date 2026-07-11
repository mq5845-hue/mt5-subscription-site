# Live Membership Cutover

## Vercel production env

Add these production values:

```env
NEXT_PUBLIC_SITE_URL="https://ai-quant-lab.vercel.app"
SITE_URL="https://ai-quant-lab.vercel.app"
LEMON_SQUEEZY_MODE="test"
```

When Lemon Squeezy is fully switched to live billing, change:

```env
LEMON_SQUEEZY_MODE="live"
```

## Clerk

1. Create or open the production Clerk application.
2. Copy the production publishable key and secret key.
3. Replace the two Vercel production vars:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
4. Redeploy.

Expected result: the sign-in page should no longer show `Development mode`.

## Lemon Squeezy

1. Turn off `Test mode` in the Lemon Squeezy store.
2. Open the live product and copy the live checkout link.
3. Open the live webhook config and copy the live signing secret.
4. Replace these Vercel production vars:
   - `LEMON_SQUEEZY_CHECKOUT_URL`
   - `LEMON_SQUEEZY_WEBHOOK_SECRET`
   - `LEMON_SQUEEZY_MODE=live`
5. Redeploy.

Expected result: checkout should no longer show `Test mode is currently enabled`.

## Final verification

1. Open `/membership` and confirm Clerk shows `正式模式`.
2. Complete one real payment.
3. Open `/member` and confirm:
   - membership status is `active`
   - Lemon membership data source is `正式資料`
4. Confirm Supabase has both:
   - `membership_subscriptions`
   - `membership_webhook_events`

## Current project status

- Supabase membership writeback is working.
- Lemon webhook route is working.
- Current Lemon test webhook writes correctly.
- Current production site is still waiting for live Clerk keys and live Lemon billing data.
