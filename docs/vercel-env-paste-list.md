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

## Preview

If you want preview deployments to work end to end, copy the same variables into `Preview`.
If you want preview to be safe only, you can leave `LINE_CHANNEL_ACCESS_TOKEN` blank and just test the reservation page.

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
