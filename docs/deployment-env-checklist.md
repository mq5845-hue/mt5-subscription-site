# Deployment Environment Checklist

This project uses three pieces together:

1. Supabase stores reservation leads and LINE webhook events.
2. Google Form receives the same reservation data as a backup.
3. LINE webhook replies to users and sends them to the reservation page.

## Required variables

Set these in Vercel for `Production` and usually `Preview` too:

| Variable | Used by | Required |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Reservation page URL generation | Recommended |
| `SITE_URL` | Fallback site URL | Optional |
| `SUPABASE_URL` | Supabase REST API | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase REST API | Yes |
| `SUPABASE_RESERVATION_TABLE` | Reservation table name | Optional |
| `SUPABASE_LINE_EVENT_TABLE` | LINE event table name | Optional |
| `GOOGLE_FORM_ACTION_URL` | Google Form submit endpoint | Yes if Google Form is enabled |
| `GOOGLE_FORM_FIELD_MAP` | Google Form entry mapping | Yes if Google Form is enabled |
| `GOOGLE_FORM_ENTRY_NAME` | Single-field fallback | Optional |
| `GOOGLE_FORM_ENTRY_EMAIL` | Single-field fallback | Optional |
| `GOOGLE_FORM_ENTRY_ADDRESS` | Single-field fallback | Optional |
| `GOOGLE_FORM_ENTRY_PHONE_NUMBER` | Single-field fallback | Optional |
| `GOOGLE_FORM_ENTRY_COMMENTS` | Single-field fallback | Optional |
| `LINE_CHANNEL_SECRET` | LINE webhook signature check | Yes for webhook |
| `LINE_CHANNEL_ACCESS_TOKEN` | LINE reply API | Yes for webhook replies |

## Google Form values

Use the exact values below for your current form:

```bash
GOOGLE_FORM_ACTION_URL="https://docs.google.com/forms/d/e/1FAIpQLScYrRh0ocOwqeujLk01hot8W4EJrM-JGXrzsT5UTTuUxNzpVg/formResponse"
GOOGLE_FORM_FIELD_MAP='{"name":"entry.2005620554","email":"entry.1045781291","address":"entry.1065046570","phoneNumber":"entry.1166974658","comments":"entry.839337160"}'
```

## Suggested Vercel environments

- `Production`: all required variables
- `Preview`: the same variables if you want preview deployments to work end to end
- `Development`: match locally in `.env.local`

## Quick deploy check

- `GET /api/reservation` returns `ok: true`.
- `GET /api/line` returns `ok: true`.
- The reservation page opens at `/line-kb/reservation`.
- The LINE webhook URL is `https://your-domain.example/api/line`.
- A LINE text message containing reservation intent should show the reservation link in the reply.
