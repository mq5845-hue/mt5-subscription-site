# Final Version Summary

This is the shortest working guide for the current reservation + Supabase + Google Form + LINE setup.

## 1. What is already wired

- Reservation page: `/line-kb/reservation`
- Reservation API: `/api/reservation`
- LINE webhook: `/api/line`
- Supabase tables: `reservation_leads`, `line_inbound_events`
- Google Form mapping: 5 fields only

## 2. Google Form mapping

Use these exact values:

```bash
GOOGLE_FORM_ACTION_URL="https://docs.google.com/forms/d/e/1FAIpQLScYrRh0ocOwqeujLk01hot8W4EJrM-JGXrzsT5UTTuUxNzpVg/formResponse"
GOOGLE_FORM_FIELD_MAP='{"name":"entry.2005620554","email":"entry.1045781291","address":"entry.1065046570","phoneNumber":"entry.1166974658","comments":"entry.839337160"}'
```

Field order:

- `name` -> `entry.2005620554`
- `email` -> `entry.1045781291`
- `address` -> `entry.1065046570`
- `phoneNumber` -> `entry.1166974658`
- `comments` -> `entry.839337160`

## 3. Supabase SQL

Run this file in Supabase:

- [`docs/supabase-reservation-schema.sql`](/D:/Users/july%20ane/Desktop/web/mt5-subscription-site/docs/supabase-reservation-schema.sql)

## 4. Vercel environment variables

Paste the values from:

- [`docs/vercel-env-paste-list.md`](/D:/Users/july%20ane/Desktop/web/mt5-subscription-site/docs/vercel-env-paste-list.md)

Minimum required:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GOOGLE_FORM_ACTION_URL`
- `GOOGLE_FORM_FIELD_MAP`
- `LINE_CHANNEL_SECRET`
- `LINE_CHANNEL_ACCESS_TOKEN`
- `NEXT_PUBLIC_SITE_URL`

## 5. LINE webhook

- Webhook URL should be `https://your-domain.example/api/line`
- Reservation intent keywords trigger the reservation link
- Inbound LINE events are stored in Supabase

## 6. Go-live checklist

Use this before launch:

- [`docs/go-live-checklist.md`](/D:/Users/july%20ane/Desktop/web/mt5-subscription-site/docs/go-live-checklist.md)

## 7. Smoke test

1. Open `/line-kb/reservation`
2. Submit one test lead
3. Confirm Supabase gets a row
4. Confirm Google Form gets the same lead
5. Send LINE message `我要預約`
6. Confirm LINE reply contains the reservation page link

## 8. Current status

- Build passed successfully
- Reservation form now matches the real Google Form
- Docs are ready for deployment
