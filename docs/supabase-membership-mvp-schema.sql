create extension if not exists pgcrypto;

create table if not exists membership_subscriptions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  clerk_user_id text unique,
  email text not null unique,
  full_name text,
  plan_slug text not null default 'standard-membership',
  plan_name text not null default '標準會員',
  membership_status text not null default 'pending',
  access_status text not null default 'inactive',
  lemon_customer_id text,
  lemon_subscription_id text,
  lemon_order_id text,
  lemon_product_id text,
  lemon_variant_id text,
  lemon_status text,
  current_period_end timestamptz,
  trial_ends_at timestamptz,
  cancel_at timestamptz,
  cancelled_at timestamptz,
  last_event_name text,
  last_event_at timestamptz,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists membership_webhook_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_key text not null unique,
  event_name text not null,
  email text,
  subject_id text,
  status text,
  raw_payload jsonb not null default '{}'::jsonb
);

create index if not exists membership_subscriptions_email_idx on membership_subscriptions (email);
create index if not exists membership_subscriptions_status_idx on membership_subscriptions (membership_status);
create index if not exists membership_subscriptions_plan_slug_idx on membership_subscriptions (plan_slug);
create index if not exists membership_webhook_events_created_at_idx on membership_webhook_events (created_at desc);
create index if not exists membership_webhook_events_email_idx on membership_webhook_events (email);

alter table membership_subscriptions enable row level security;
alter table membership_webhook_events enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'membership_subscriptions'
      and policyname = 'service role manages membership subscriptions'
  ) then
    create policy "service role manages membership subscriptions"
      on membership_subscriptions
      for all
      to service_role
      using (true)
      with check (true);
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'membership_webhook_events'
      and policyname = 'service role manages membership webhook events'
  ) then
    create policy "service role manages membership webhook events"
      on membership_webhook_events
      for all
      to service_role
      using (true)
      with check (true);
  end if;
end
$$;
