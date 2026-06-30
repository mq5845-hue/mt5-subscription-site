import Link from 'next/link';
import lineKnowledgeBase from '@/data/lineKnowledgeBase';

export const metadata = lineKnowledgeBase.metadata;

export default function LineKnowledgeBasePage() {
  const {
    heroStats,
    pillars,
    narrative,
    modulePhases,
    workflowSteps,
    knowledgeTaxonomy,
    faqBlueprints,
    faqFamilies,
    answerFramework,
    customerServiceArchitecture,
    serviceModes,
    handoffRules,
    knowledgeOps,
  } = lineKnowledgeBase;

  return (
    <main className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.16),transparent_24%),radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.12),transparent_22%),radial-gradient(circle_at_50%_75%,rgba(59,130,246,0.08),transparent_30%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">
              LINE AI 客服知識庫
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
              讓源代碼工廠，成為每個人都能理解的事業藍圖
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-emerald-400/40 hover:text-white"
            >
              回首頁
            </Link>
            <Link
              href="/line-kb/diagram"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-emerald-400/40 hover:text-white"
            >
              正式圖解
            </Link>
            <a
              href="https://lin.ee/stqhWhj"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              前往 LINE 官方帳號
            </a>
          </div>
        </header>

        <section className="grid gap-8 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.36em] text-emerald-300/90">
                A larger story for a larger audience
              </p>
              <h2 className="max-w-4xl text-balance text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl">
                我們不是在賣一段程式，
                <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  我們是在建造一座可複製的源代碼工廠。
                </span>
              </h2>
              <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                AI-Quant Lab 的使命，不是把市場敘事做得很熱鬧，而是把 MT5 EA 的工程體系拆解成
                可以教、可以查、可以組合、可以升級的知識座標。當知識被整理成系統，LINE 就不只是客服入口，
                而是品牌與使用者共同工作的第一前台。
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.22)]"
                >
                  <div className="text-3xl font-black text-white">{stat.value}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{stat.label}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-emerald-400/15 bg-slate-900/70 p-6 shadow-[0_24px_120px_rgba(0,0,0,0.35)] ring-1 ring-white/5">
            <div className="space-y-4">
              <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                知識庫定位
              </div>
              <p className="text-lg font-semibold leading-8 text-white">
                這不是單純的 FAQ，而是一套把商業願景、產品路線與教學結構串在一起的知識操作系統。
              </p>
              <p className="text-sm leading-7 text-slate-400">
                使用者可以從一則 LINE 訊息開始，逐步看懂模組、看懂風險、看懂授權，最後看懂如何把源碼變成自己的品牌。
              </p>
            </div>
          </aside>
        </section>

        <section className="grid gap-5 py-4 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar) => (
            <article
              key={pillar.key}
              className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 transition hover:border-emerald-400/30 hover:bg-slate-900/80"
            >
              <h3 className="text-xl font-bold text-white">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{pillar.text}</p>
            </article>
          ))}
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
              三段式敘事
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              先看懂世界，再看懂系統，最後看懂自己可以走多遠
            </h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {narrative.map((item) => (
              <article
                key={item.key}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-7"
              >
                <h3 className="text-xl font-bold text-emerald-300">{item.title}</h3>
                <p className="mt-4 text-sm leading-8 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
              25 組模組藍圖
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              每一個模組，都是知識庫裡可被查詢與引用的答案
            </h2>
          </div>

          <div className="mt-10 space-y-5">
            {modulePhases.map((phase) => (
              <article
                key={phase.range}
                className="rounded-[2rem] border border-white/10 bg-slate-900/65 p-6 shadow-[0_16px_90px_rgba(0,0,0,0.24)]"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
                      {phase.range}
                    </div>
                    <h3 className="mt-2 text-2xl font-black text-white">{phase.phase}</h3>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-slate-400">{phase.summary}</p>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-5">
                  {phase.items.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm leading-6 text-slate-200"
                    >
                      <div className="text-xs uppercase tracking-[0.22em] text-slate-500">
                        {item.id}
                      </div>
                      <div className="mt-2 font-medium text-white">{item.name}</div>
                      <div className="mt-1 text-slate-400">{item.role}</div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 py-16 lg:grid-cols-[0.92fr_1.08fr]">
          <article className="rounded-[2rem] border border-emerald-400/15 bg-emerald-400/8 p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
              LINE 知識庫工作流
            </p>
            <h2 className="mt-4 text-3xl font-black text-white">
              讓每一次對話，都變成更準確的一次導覽
            </h2>
            <p className="mt-4 text-sm leading-8 text-slate-300">
              真正高品質的客服，不是回得快，而是回得有方向。這個知識庫會先辨識問題類型，再把答案對回模組、
              對回產品、對回商業意義，最後把下一步交給使用者。
            </p>
          </article>

          <div className="grid gap-4 sm:grid-cols-2">
            {workflowSteps.map((step) => (
              <article
                key={step.step}
                className="rounded-[1.75rem] border border-white/10 bg-slate-900/60 p-6"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">
                  {step.step}
                </div>
                <h3 className="mt-3 text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-5 py-4 md:grid-cols-2">
          {knowledgeTaxonomy.map((item) => (
            <article
              key={item.category}
              className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-7"
            >
              <h3 className="text-xl font-bold text-white">{item.category}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300/80">
              FAQ 答案骨架
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              這些內容可直接延伸成 LINE 自動回覆或客服知識節點
            </h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {faqBlueprints.map((faq) => (
              <article
                key={faq.id}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-7"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  {faq.id}
                </div>
                <h3 className="mt-3 text-xl font-bold text-white">{faq.question}</h3>
                <p className="mt-4 text-sm leading-8 text-slate-300">{faq.answer}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {faq.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-300/80">
              FAQ 家族譜系
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              每個節點都往下延伸十題，形成可以傳播、可以擴充的知識樹
            </h2>
          </div>

          <div className="mt-10 space-y-6">
            {faqFamilies.map((family) => (
              <article
                key={family.familyId}
                className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-7"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                      {family.familyId}
                    </div>
                    <h3 className="text-2xl font-black text-white">{family.familyName}</h3>
                    <p className="text-sm text-fuchsia-300">{family.node}</p>
                  </div>
                  <p className="max-w-2xl text-sm leading-7 text-slate-400">{family.intro}</p>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  {family.questions.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-2xl border border-white/10 bg-black/20 p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
                          {item.id}
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                          node
                        </span>
                      </div>
                      <h4 className="mt-3 text-base font-bold leading-7 text-white">
                        {item.question}
                      </h4>
                      <p className="mt-3 text-sm leading-7 text-slate-400">{item.answer}</p>
                    </article>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
              答疑解惑方法論
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              讓每一個回答都不是結束，而是下一個理解層的入口
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {answerFramework.map((item, index) => (
              <article
                key={item.title}
                className="rounded-[1.75rem] border border-white/10 bg-slate-900/60 p-6"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  PRINCIPLE {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-3 text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300/80">
              客服 AI 架構圖
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              讓 FAQ、AI 與人工客服彼此接力，而不是互相取代
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              這套架構的核心不是把人拿掉，而是把簡單問題先處理掉，讓真人專注處理高價值與高風險對話。
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/60 p-6">
            <div className="flex flex-col gap-4 lg:flex-row">
              {customerServiceArchitecture.layers.map((layer, index) => (
                <div key={layer.id} className="flex-1">
                  <article className="h-full rounded-3xl border border-white/10 bg-black/20 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
                        {layer.id}
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                        layer {index + 1}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-bold text-white">{layer.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">{layer.description}</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 py-4 md:grid-cols-2">
          {serviceModes.map((mode) => (
            <article
              key={mode.mode}
              className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-7"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
                {mode.mode}
              </div>
              <h3 className="mt-3 text-2xl font-black text-white">{mode.name}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{mode.summary}</p>
              <div className="mt-5">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  適用情境
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {mode.bestFor.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-emerald-200">{mode.advantage}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 py-12 lg:grid-cols-[1fr_0.9fr]">
          <article className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300/80">
              轉人工規則
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white">
              當系統不該自己回答時，就要有清楚的交棒規則
            </h2>
            <div className="mt-6 grid gap-4">
              {handoffRules.map((rule) => (
                <div key={rule.id} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                    {rule.id}
                  </div>
                  <div className="mt-2 text-sm leading-7 text-slate-300">{rule.trigger}</div>
                  <div className="mt-2 font-semibold text-white">{rule.action}</div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
              知識營運流程
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white">
              讓客服系統每一次回答，都能回流成下一次更好的回答
            </h2>
            <div className="mt-6 space-y-4">
              {knowledgeOps.map((item, index) => (
                <div key={item.title} className="flex gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-2xl bg-emerald-400/10 text-sm font-black text-emerald-300">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{item.title}</div>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="py-6">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/60 p-8 shadow-[0_30px_140px_rgba(0,0,0,0.3)]">
            <div className="max-w-4xl space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
                給廣大朋友的一句話
              </p>
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                你不必先成為工程師，才有資格擁有源代碼事業。
              </h2>
              <p className="text-base leading-8 text-slate-300">
                我們要建立的，不只是教學內容，而是一套能讓更多人看懂、用懂、改懂、再把它變成自己品牌的知識工廠。
                當人們可以在 LINE 上拿到清楚、可靠、可執行的答案，學習就不再是壓力，而是創業的起點。
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-center text-sm font-medium text-slate-200 transition hover:border-emerald-400/30 hover:bg-white/10"
              >
                回到首頁
              </Link>
              <a
                href="https://lin.ee/stqhWhj"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-emerald-400 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
              >
                開始對話，建立你的源代碼視野
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
