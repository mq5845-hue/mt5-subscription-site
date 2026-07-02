# Go Live Checklist

Use this checklist before you switch the site to production.

## 1. Supabase

- [ ] Run [`docs/supabase-reservation-schema.sql`](/D:/Users/july%20ane/Desktop/web/mt5-subscription-site/docs/supabase-reservation-schema.sql)
- [ ] Confirm `reservation_leads` exists
- [ ] Confirm `line_inbound_events` exists
- [ ] Confirm the service role key can insert rows
- [ ] Confirm row level security policies exist for both tables

## 2. Vercel / Deployment Variables

- [ ] Copy the values from [`docs/vercel-env-paste-list.md`](/D:/Users/july%20ane/Desktop/web/mt5-subscription-site/docs/vercel-env-paste-list.md)
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the live domain
- [ ] Set `SUPABASE_URL`
- [ ] Set `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Set `GOOGLE_FORM_ACTION_URL`
- [ ] Set `GOOGLE_FORM_FIELD_MAP`
- [ ] Set `LINE_CHANNEL_SECRET`
- [ ] Set `LINE_CHANNEL_ACCESS_TOKEN`

## 3. Google Form

- [ ] Confirm the action URL ends with `/formResponse`
- [ ] Confirm the mapping matches the current form
- [ ] `name` -> `entry.2005620554`
- [ ] `email` -> `entry.1045781291`
- [ ] `address` -> `entry.1065046570`
- [ ] `phoneNumber` -> `entry.1166974658`
- [ ] `comments` -> `entry.839337160`
- [ ] Submit one test entry and verify it appears in the Google Form response sheet

## 4. LINE Webhook

- [ ] Set the webhook URL to `https://your-domain.example/api/line`
- [ ] Confirm the LINE channel secret is correct
- [ ] Confirm the LINE access token is correct
- [ ] Send a message like `我要預約`
- [ ] Verify the reply contains the reservation page link
- [ ] Verify the inbound event was stored in Supabase

## 5. Reservation Page

- [ ] Open `/line-kb/reservation`
- [ ] Fill in Name, Email, Address, Phone number, and Comments
- [ ] Submit the form
- [ ] Verify the API returns success
- [ ] Verify a new row appears in `reservation_leads`
- [ ] Verify the same lead arrives in Google Form

## 6. Final Smoke Test

- [ ] Reservation page loads on desktop
- [ ] Reservation page loads on mobile
- [ ] `/api/reservation` returns `ok: true`
- [ ] `/api/line` returns `ok: true`
- [ ] LINE reply works
- [ ] Google Form receives data
- [ ] Supabase receives data

## 7. After Launch

- [ ] Keep the production variables in Vercel
- [ ] Monitor errors for the first live submissions
- [ ] Check both Supabase tables after the first few users
- [ ] Keep [`docs/line-webhook-reservation-checklist.md`](/D:/Users/july%20ane/Desktop/web/mt5-subscription-site/docs/line-webhook-reservation-checklist.md) handy for troubleshooting
