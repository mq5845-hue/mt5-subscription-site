import Link from 'next/link';
import flexMessageTemplates from '@/data/lineFlexMessages';

export const metadata = {
  title: 'LINE Flex Message 訊息模板',
  description: 'AI-Quant Lab 的 LINE 官方帳號 Flex Message 範本，用於客服入口、FAQ 家族與轉人工提示。',
};

function TemplateCard({ template }) {
  return (
    <article className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-7">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            {template.name}
          </p>
          <h3 className="text-2xl font-black text-white">{template.altText}</h3>
          <p className="text-sm leading-7 text-slate-400">{template.purpose}</p>
        </div>
        <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-200">
          type: {template.payload.type}
        </div>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/30 p-4">
        <pre className="overflow-auto text-xs leading-6 text-slate-300">
          {JSON.stringify(template.payload, null, 2)}
        </pre>
      </div>
    </article>
  );
}

export default function LineFlexMessagePage() {
  const templates = Object.values(flexMessageTemplates);

  return (
    <main className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_22%),radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.1),transparent_22%),radial-gradient(circle_at_50%_75%,rgba(59,130,246,0.08),transparent_30%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
              LINE Flex Message Template
            </div>
            <h1 className="max-w-4xl text-3xl font-black tracking-tight text-white sm:text-5xl">
              可直接交給工程師的 Flex Message 訊息模板
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-300">
              這一頁把客服入口、FAQ 家族與轉人工規則轉成 LINE Flex Message JSON，方便前後端直接接線。
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/line-kb/spec"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400/30 hover:text-white"
            >
              回規格書
            </Link>
            <Link
              href="/line-kb/diagram"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400/30 hover:text-white"
            >
              正式圖解
            </Link>
            <Link
              href="/line-kb"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400/30 hover:text-white"
            >
              回知識頁
            </Link>
          </div>
        </header>

        <section className="grid gap-5 py-8 md:grid-cols-3">
          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Template Count
            </div>
            <div className="mt-2 text-3xl font-black text-white">{templates.length}</div>
            <p className="mt-2 text-sm text-slate-400">入口 / 家族 / 轉人工</p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Message Type
            </div>
            <div className="mt-2 text-3xl font-black text-white">flex</div>
            <p className="mt-2 text-sm text-slate-400">可直接送到 LINE 官方帳號</p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Usage
            </div>
            <div className="mt-2 text-3xl font-black text-white">JSON</div>
            <p className="mt-2 text-sm text-slate-400">工程師可直接複製、調整與發送</p>
          </article>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300/80">
              1. Hero / Entry Template
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              對話入口模板
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              適用於新使用者進站、品牌介紹與導向規格書或知識庫主頁。
            </p>
          </div>

          <div className="mt-10">
            <TemplateCard template={flexMessageTemplates.hero} />
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-300/80">
              2. FAQ Family Carousel
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              FAQ 家族譜系輪播模板
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              把問題分流成不同家族，讓使用者快速知道自己該往哪個知識節點走。
            </p>
          </div>

          <div className="mt-10">
            <TemplateCard template={flexMessageTemplates.familyCarousel} />
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-amber-300/80">
              3. Handoff Template
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              轉人工提示模板
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              用於高風險、低信心或需人工判斷的情境，讓系統知道何時該交棒。
            </p>
          </div>

          <div className="mt-10">
            <TemplateCard template={flexMessageTemplates.handoff} />
          </div>
        </section>

        <section className="py-10">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-7">
            <h2 className="text-2xl font-black text-white">工程接線建議</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <h3 className="font-bold text-white">1. 入口訊息</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  使用 hero template 做初始導覽，讓使用者快速理解品牌與服務範圍。
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <h3 className="font-bold text-white">2. 家族譜系</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  使用 carousel 讓 FAQ 分群，對應產品、模組、授權與風控。
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <h3 className="font-bold text-white">3. 轉人工</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  用 handoff template 在必要時明確提示使用者切換到真人客服。
                </p>
              </article>
              <article className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <h3 className="font-bold text-white">4. 後端串接</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  由 webhook 或後端服務將 template payload 送往 LINE Reply API / Push API。
                </p>
              </article>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
