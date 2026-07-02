import Link from 'next/link';

export const metadata = {
  title: '預約名單入口｜AI-Quant Lab',
  description: 'AI-Quant Lab 預約名單入口，先卡位、先留名，等正式開放時優先通知。',
};

const quickLinks = [
  { href: '/', label: '回首頁' },
  { href: '/line-kb', label: '先看知識庫' },
  { href: '/line-kb/expansion', label: '看導流藍圖' },
  { href: '/line-kb/backend-export', label: '看後台匯出' },
];

const fields = [
  {
    label: '姓名',
    type: '必填',
    hint: '方便我們在正式開放時知道要怎麼稱呼你。',
  },
  {
    label: 'LINE 顯示名稱',
    type: '必填',
    hint: '對應 LINE 帳號，未來通知名單時比較好辨識。',
  },
  {
    label: 'Email',
    type: '必填',
    hint: '用來接收正式開放、表單更新或重要通知。',
  },
  {
    label: '想先了解什麼',
    type: '單選',
    hint: '建議選項：認識我們、先看知識庫、預約正式版、我想先聊聊。',
  },
  {
    label: '補充說明',
    type: '選填',
    hint: '讓訪客用一句話說明目前最想知道的內容。',
  },
];

const steps = [
  {
    step: '01',
    title: '先把名單入口做出來',
    text: 'Rich Menu 先連到這一頁，訪客點進來會看到清楚的預約說明，不會直接掉到 404。',
  },
  {
    step: '02',
    title: '再把 Google 表單補上',
    text: '等你建立好 Google Form，只要把連結貼到這一頁或 Rich Menu，就能接上正式流程。',
  },
  {
    step: '03',
    title: '最後串到通知與會員',
    text: '未來可以把表單資料接到試算表、Supabase 或會員系統，形成完整名單閉環。',
  },
];

const supabaseFields = [
  { name: 'id', type: 'uuid', note: '主鍵，預設用 gen_random_uuid()' },
  { name: 'created_at', type: 'timestamptz', note: '建立時間' },
  { name: 'updated_at', type: 'timestamptz', note: '更新時間' },
  { name: 'name', type: 'text', note: '姓名' },
  { name: 'line_display_name', type: 'text', note: 'LINE 顯示名稱' },
  { name: 'email', type: 'text', note: 'Email' },
  { name: 'interest', type: 'text', note: '想先了解什麼' },
  { name: 'question', type: 'text', note: '目前最想知道的問題' },
  { name: 'note', type: 'text', note: '補充說明' },
  { name: 'source', type: 'text', note: '來源，例如 line_rich_menu / website / google_form' },
  { name: 'status', type: 'text', note: 'new / contacted / booked / converted' },
  { name: 'consent', type: 'boolean', note: '是否同意後續聯繫' },
];

const supabaseSql = `create table if not exists reservation_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  line_display_name text not null,
  email text not null,
  interest text,
  question text,
  note text,
  source text not null default 'website',
  status text not null default 'new',
  consent boolean not null default true
);

create index if not exists reservation_leads_status_idx
  on reservation_leads (status);

create index if not exists reservation_leads_created_at_idx
  on reservation_leads (created_at desc);

create or replace function touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists reservation_leads_touch_updated_at on reservation_leads;
create trigger reservation_leads_touch_updated_at
before update on reservation_leads
for each row
execute function touch_updated_at();`;

export default function ReservationPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_28%),radial-gradient(circle_at_75%_10%,rgba(59,130,246,0.12),transparent_24%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.12),transparent_24%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <header className="rounded-[1.75rem] border border-cyan-400/15 bg-white/[0.03] p-5 shadow-[0_20px_80px_rgba(8,145,178,0.14)] backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-semibold tracking-[0.24em] text-cyan-200">
                預約入口 / Google Form
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                  先卡位，再決定
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                  目前 AI-Quant Lab 還在測試與優化中，這一頁先作為預約名單與 Google 表單的前置入口。
                  你可以先把欄位規格定好，之後只要補上正式表單連結，就能直接接單與通知。
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 lg:pt-2">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-cyan-100 transition hover:border-cyan-200/35 hover:bg-cyan-300/15 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </header>

        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          <article className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5">
            <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">為什麼先做表單</p>
            <h2 className="mt-3 text-2xl font-bold text-white">先接住想加入的人</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              訪客如果現在就有興趣，我們先讓他留下名單，而不是叫他一直打字、一直猜下一步。
            </p>
          </article>

          <article className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5">
            <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">這頁要放什麼</p>
            <h2 className="mt-3 text-2xl font-bold text-white">說明、欄位、下一步</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              這一頁會先說清楚：我們在測試中、表單要填什麼、正式開放後會怎麼通知你。
            </p>
          </article>

          <article className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5">
            <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">正式上線後</p>
            <h2 className="mt-3 text-2xl font-bold text-white">一鍵接到 Google 表單</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              等 Google Form 建好後，你只要把連結貼上，就可以把這頁換成正式報名入口。
            </p>
          </article>
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(8,15,31,0.82),rgba(3,7,18,0.94))] p-5 shadow-[0_16px_50px_rgba(34,211,238,0.08)] ring-1 ring-white/5 sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.22em] text-cyan-300">預約表單欄位</p>
              <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">Google 表單可以直接照這份欄位開</h2>
              <p className="mt-3 text-sm leading-7 text-slate-200/90 sm:text-base">
                這裡先把最常見、最實用的欄位整理好。你照著建立，之後不管是 Google 表單、試算表或會員系統都能接得上。
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <article key={field.label} className="rounded-[1.25rem] border border-cyan-400/14 bg-white/[0.04] p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-white">{field.label}</h3>
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-cyan-100">
                    {field.type}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">{field.hint}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-cyan-400/15 bg-[linear-gradient(180deg,rgba(15,23,42,0.84),rgba(3,7,18,0.94))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5 sm:p-7">
          <p className="text-xs font-semibold tracking-[0.22em] text-cyan-300">建立步驟</p>
          <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">先把骨架做好，再補正式連結</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {steps.map((item) => (
              <article key={item.step} className="rounded-[1.25rem] border border-cyan-400/14 bg-slate-950/60 p-5">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-sm font-black text-cyan-200">
                  {item.step}
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <article className="rounded-[1.75rem] border border-cyan-400/15 bg-[linear-gradient(180deg,rgba(15,23,42,0.84),rgba(3,7,18,0.94))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5 sm:p-7">
            <p className="text-xs font-semibold tracking-[0.22em] text-cyan-300">可直接貼到 Google 表單的說明文</p>
            <pre className="mt-4 whitespace-pre-wrap rounded-[1.2rem] border border-cyan-300/10 bg-[#020617] p-4 text-sm leading-7 text-slate-200">
目前 AI-Quant Lab 仍在測試與優化階段。

請先留下聯絡資料，等正式開放時，我們會優先通知你。

你填寫的資料將用於：
1. 預約名單管理
2. 正式開放通知
3. 需求分類與後續聯繫

填寫完成後，你就可以先回到網站繼續看知識庫或品牌介紹。
            </pre>
          </article>

          <article className="rounded-[1.75rem] border border-cyan-400/15 bg-[linear-gradient(180deg,rgba(15,23,42,0.84),rgba(3,7,18,0.94))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5 sm:p-7">
            <p className="text-xs font-semibold tracking-[0.22em] text-cyan-300">Rich Menu 對應</p>
            <h2 className="mt-2 text-2xl font-black text-white">三個入口先一致</h2>
            <div className="mt-5 space-y-3">
              <div className="rounded-[1rem] border border-cyan-400/14 bg-slate-950/60 p-4">
                <p className="text-sm font-semibold text-white">認識我們</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">導到首頁，先建立品牌印象。</p>
              </div>
              <div className="rounded-[1rem] border border-cyan-400/14 bg-slate-950/60 p-4">
                <p className="text-sm font-semibold text-white">先看知識庫</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">導到知識庫入口，先看內容再決定。</p>
              </div>
              <div className="rounded-[1rem] border border-cyan-400/14 bg-slate-950/60 p-4">
                <p className="text-sm font-semibold text-white">我要預約</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">先導到這一頁，之後再接正式 Google 表單。</p>
              </div>
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(8,15,31,0.82),rgba(3,7,18,0.94))] p-5 shadow-[0_16px_50px_rgba(34,211,238,0.08)] ring-1 ring-white/5 sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.22em] text-cyan-300">Supabase 建表規格</p>
              <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">這張表先把預約名單接住</h2>
              <p className="mt-3 text-sm leading-7 text-slate-200/90 sm:text-base">
                這份 SQL 先做一張主表就夠了。等你之後要加會員、通知、標籤、歷程，再慢慢拆成其他表。
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[1.25rem] border border-cyan-400/14 bg-slate-950/60 p-4">
              <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">欄位對照</p>
              <div className="mt-4 grid gap-3">
                {supabaseFields.map((field) => (
                  <div key={field.name} className="rounded-[1rem] border border-cyan-300/10 bg-white/[0.03] p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-bold text-white">{field.name}</p>
                      <span className="text-[11px] font-semibold tracking-[0.18em] text-cyan-200">{field.type}</span>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{field.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.25rem] border border-cyan-400/14 bg-[#020617] p-4">
              <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">Supabase SQL</p>
              <pre className="mt-4 max-h-[42rem] overflow-auto whitespace-pre-wrap rounded-[1rem] border border-cyan-300/10 bg-slate-950/80 p-4 text-sm leading-7 text-slate-100">
{supabaseSql}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
