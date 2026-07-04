# Vercel Environment Paste List

Use this file when you are ready to deploy.

## Production

Paste these into Vercel `Production` environment variables:

```bash
NEXT_PUBLIC_SITE_URL="https://your-domain.example"
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
SUPABASE_RESERVATION_TABLE="reservation_leads"
SUPABASE_LINE_EVENT_TABLE="line_inbound_events"
GOOGLE_FORM_ACTION_URL="https://docs.google.com/forms/d/e/1FAIpQLScYrRh0ocOwqeujLk01hot8W4EJrM-JGXrzsT5UTTuUxNzpVg/formResponse"
GOOGLE_FORM_FIELD_MAP='{"name":"entry.2005620554","email":"entry.1045781291","address":"entry.1065046570","phoneNumber":"entry.1166974658","comments":"entry.839337160"}'
LINE_CHANNEL_SECRET="your-line-channel-secret"
LINE_CHANNEL_ACCESS_TOKEN="your-line-channel-access-token"
```

## Standard Membership MVP

If you want the standard membership flow to work, also add:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_or_live_xxx"
CLERK_SECRET_KEY="sk_test_or_live_xxx"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
LEMON_SQUEEZY_CHECKOUT_URL="https://your-store.lemonsqueezy.com/checkout/buy/VARIANT_ID"
LEMON_SQUEEZY_WEBHOOK_SECRET="your-lemon-webhook-signing-secret"
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
SUPABASE_MEMBERSHIP_TABLE="membership_subscriptions"
SUPABASE_MEMBERSHIP_EVENT_TABLE="membership_webhook_events"
```

## Preview

If you want preview deployments to work end to end, copy the same variables into `Preview`.
If you want preview to stay safe-only, you can leave payment and database values out and just review the page flow.

## Local

Create a `.env.local` file with the same values for development:

```bash
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
SUPABASE_RESERVATION_TABLE="reservation_leads"
SUPABASE_LINE_EVENT_TABLE="line_inbound_events"
GOOGLE_FORM_ACTION_URL="https://docs.google.com/forms/d/e/1FAIpQLScYrRh0ocOwqeujLk01hot8W4EJrM-JGXrzsT5UTTuUxNzpVg/formResponse"
GOOGLE_FORM_FIELD_MAP='{"name":"entry.2005620554","email":"entry.1045781291","address":"entry.1065046570","phoneNumber":"entry.1166974658","comments":"entry.839337160"}'
LINE_CHANNEL_SECRET="your-line-channel-secret"
LINE_CHANNEL_ACCESS_TOKEN="your-line-channel-access-token"
```

## Minimum required for the reservation form

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GOOGLE_FORM_ACTION_URL`
- `GOOGLE_FORM_FIELD_MAP`

## Minimum required for the LINE webhook

- `LINE_CHANNEL_SECRET`
- `LINE_CHANNEL_ACCESS_TOKEN`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
