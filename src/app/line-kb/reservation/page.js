import Link from 'next/link';
import ReservationForm from '@/components/ReservationForm';
import { getReservationPageUrl } from '@/lib/reservation-integrations';

export const metadata = {
  title: 'Reservation | AI-Quant Lab',
  description: 'A working reservation page that saves leads to Supabase and Google Form.',
};

const setupSteps = [
  {
    title: 'Supabase',
    text: 'Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to save rows into `reservation_leads`.',
  },
  {
    title: 'Google Form',
    text: 'Set `GOOGLE_FORM_ACTION_URL` and the 5 field mappings so the same lead is forwarded to Google Form.',
  },
  {
    title: 'LINE',
    text: 'When LINE webhook is configured at /api/line, inbound messages can be logged to Supabase and routed to this page.',
  },
];

const reservationSql = `create table if not exists reservation_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  email text not null,
  address text not null,
  phone_number text not null,
  comments text not null,
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
);`;

export default function ReservationPage() {
  const reservationUrl = getReservationPageUrl();

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.12),transparent_24%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.12),transparent_24%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <header className="rounded-[1.75rem] border border-cyan-400/15 bg-white/[0.03] p-5 shadow-[0_20px_80px_rgba(8,145,178,0.14)] backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-semibold tracking-[0.24em] text-cyan-200">
                Reservation / Supabase / Google Form / LINE
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                  A reservation page that really submits
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                  Fill this form and the data will be stored in Supabase first. If Google Form is configured,
                  the same lead will also be forwarded there as a backup.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 lg:pt-2">
              <Link
                href="/line-kb"
                className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-cyan-100 transition hover:border-cyan-200/35 hover:bg-cyan-300/15 hover:text-white"
              >
                Back to LINE KB
              </Link>
              <a
                href={reservationUrl}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-slate-100 transition hover:border-cyan-300/30 hover:bg-cyan-300/10"
              >
                Page URL
              </a>
            </div>
          </div>
        </header>

        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          {setupSteps.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5"
            >
              <h2 className="text-xl font-bold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[1.75rem] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(8,15,31,0.82),rgba(3,7,18,0.94))] p-5 shadow-[0_16px_50px_rgba(34,211,238,0.08)] ring-1 ring-white/5 sm:p-7">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.22em] text-cyan-300">Reservation form</p>
              <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">Submit and save the lead</h2>
              <p className="mt-3 text-sm leading-7 text-slate-200/90 sm:text-base">
                This is a real submission flow, not a mockup. Once the environment variables are ready,
                the request will be sent through the server route, written to your database, and forwarded
                to Google Form with the same 5 fields.
              </p>
            </div>

            <div className="mt-6">
              <ReservationForm />
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-cyan-400/15 bg-[linear-gradient(180deg,rgba(15,23,42,0.84),rgba(3,7,18,0.94))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5 sm:p-7">
            <p className="text-xs font-semibold tracking-[0.22em] text-cyan-300">Deployment setup</p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">Environment variables to set</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              <li>`SUPABASE_URL`</li>
              <li>`SUPABASE_SERVICE_ROLE_KEY`</li>
              <li>`GOOGLE_FORM_ACTION_URL`</li>
              <li>`GOOGLE_FORM_FIELD_MAP` or the per-field entry variables</li>
              <li>`LINE_CHANNEL_SECRET` and `LINE_CHANNEL_ACCESS_TOKEN`</li>
              <li>`NEXT_PUBLIC_SITE_URL` or `SITE_URL`</li>
            </ul>

            <div className="mt-6 rounded-[1.25rem] border border-cyan-400/14 bg-slate-950/60 p-4">
              <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">Supabase SQL</p>
              <pre className="mt-4 max-h-[34rem] overflow-auto whitespace-pre-wrap rounded-[1rem] border border-cyan-300/10 bg-[#020617] p-4 text-sm leading-7 text-slate-100">
{reservationSql}
              </pre>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
