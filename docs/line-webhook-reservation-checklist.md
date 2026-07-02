# LINE Webhook to Reservation Page Checklist

Use this checklist to confirm the webhook, reply flow, and reservation link are connected.

## Endpoint

- LINE webhook path in this app: `/api/line`
- Reservation page path in this app: `/line-kb/reservation`
- Reservation page URL helper uses `NEXT_PUBLIC_SITE_URL` or `SITE_URL`

## Required backend variables

- `LINE_CHANNEL_SECRET`
- `LINE_CHANNEL_ACCESS_TOKEN`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## What the webhook does

- Verifies the LINE signature.
- Reads text messages only.
- Builds a reply from the LINE knowledge base.
- Detects reservation intent from keywords such as `預約`, `報名`, `諮詢`, `名單`, `reservation`, `booking`, `contact`, `line`.
- Adds a reservation button that points to the reservation page.
- Tries to store the inbound event in Supabase.

## What to verify in LINE

- The webhook URL points to `https://your-domain.example/api/line`.
- The bot can reply to text messages.
- A message with reservation intent returns a reply containing the reservation URL.
- The reservation URL opens the page at `/line-kb/reservation`.
- The reservation form submits successfully to `/api/reservation`.

## What to verify in Supabase

- `reservation_leads` exists.
- `line_inbound_events` exists.
- Inserts are allowed via the service role key.
- Rows appear after you submit the reservation form.
- Rows appear after LINE webhook messages are received.

## What to verify in Google Form

- The form action URL uses `formResponse`, not the share link.
- `entry.2005620554` matches Name.
- `entry.1045781291` matches Email.
- `entry.1065046570` matches Address.
- `entry.1166974658` matches Phone number.
- `entry.839337160` matches Comments.

## Fast smoke test

1. Open the reservation page.
2. Submit one test lead.
3. Confirm Supabase has a new row.
4. Confirm Google Form gets the same lead.
5. Send the LINE bot a message like `我要預約`.
6. Confirm the reply contains the reservation page link.
