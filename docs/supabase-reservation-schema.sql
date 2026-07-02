create extension if not exists pgcrypto;

create table if not exists reservation_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  email text not null,
  address text not null,
  phone_number text,
  comments text,
  source text not null default 'website',
  status text not null default 'new'
);

create table if not exists line_inbound_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  line_user_id text,
  line_display_name text,
  message_text text,
  event_type text not null default 'message',
  intent text not null default 'normal',
  source text not null default 'line_webhook',
  matched_id text,
  reply_mode text,
  raw_event jsonb not null default '{}'::jsonb
);

create index if not exists reservation_leads_created_at_idx on reservation_leads (created_at desc);
create index if not exists reservation_leads_email_idx on reservation_leads (email);
create index if not exists reservation_leads_source_idx on reservation_leads (source);
create index if not exists line_inbound_events_created_at_idx on line_inbound_events (created_at desc);
create index if not exists line_inbound_events_line_user_id_idx on line_inbound_events (line_user_id);

alter table reservation_leads enable row level security;
alter table line_inbound_events enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'reservation_leads'
      and policyname = 'service role manages reservation leads'
  ) then
    create policy "service role manages reservation leads"
      on reservation_leads
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
      and tablename = 'line_inbound_events'
      and policyname = 'service role manages line inbound events'
  ) then
    create policy "service role manages line inbound events"
      on line_inbound_events
      for all
      to service_role
      using (true)
      with check (true);
  end if;
end
$$;
