# 標準會員訂閱 MVP - Vercel 變數清單

把以下內容填進 Vercel 的 `Production`、`Preview` 或本機 `.env.local`。

```bash
NEXT_PUBLIC_SITE_URL="https://your-domain.example"

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

## 最少需要先補的值

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `LEMON_SQUEEZY_CHECKOUT_URL`
- `LEMON_SQUEEZY_WEBHOOK_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## 補充說明

- `Clerk` 的登入與註冊路由已經接好，路徑是 `/sign-in` 和 `/sign-up`。
- `Lemon Squeezy` 需要填真正可付款的 checkout URL。
- Webhook 路徑是 `/api/webhooks/lemon-squeezy`。
- `Supabase` 的會員表預設是 `membership_subscriptions` 與 `membership_webhook_events`。
