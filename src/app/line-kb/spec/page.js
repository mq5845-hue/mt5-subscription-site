import Link from 'next/link';
import lineCustomerServiceSpec from '@/data/lineCustomerServiceSpec';

export const metadata = lineCustomerServiceSpec.metadata;

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-300/80">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-sm leading-7 text-slate-400">{description}</p> : null}
    </div>
  );
}

export default function LineCustomerServiceSpecPage() {
  const {
    documentInfo,
    summary,
    stakeholders,
    functionalRequirements,
    nonFunctionalRequirements,
    architecture,
    dataModel,
    serviceModes,
    handoffRules,
    conversationFlow,
    acceptanceCriteria,
    milestones,
    risks,
  } = lineCustomerServiceSpec;

  return (
    <main className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_22%),radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.1),transparent_22%),radial-gradient(circle_at_50%_75%,rgba(59,130,246,0.08),transparent_30%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Engineering Handoff Spec
            </div>
            <h1 className="max-w-4xl text-3xl font-black tracking-tight text-white sm:text-5xl">
              LINE 客服 AI 工程規格書
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-300">
              這份規格書是給工程師、產品經理與客服營運共同使用的交付版本，用來定義客服 AI
              的資料結構、對話流程、轉人工規則與知識營運方式。
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/line-kb"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400/30 hover:text-white"
            >
              回知識頁
            </Link>
            <Link
              href="/line-kb/diagram"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400/30 hover:text-white"
            >
              正式圖解
            </Link>
            <Link
              href="/line-kb/flex"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400/30 hover:text-white"
            >
              Flex 模板
            </Link>
            <a
              href="https://lin.ee/stqhWhj"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              開啟 LINE
            </a>
          </div>
        </header>

        <section className="grid gap-5 py-8 sm:grid-cols-3">
          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Version
            </div>
            <div className="mt-2 text-2xl font-black text-white">{documentInfo.version}</div>
            <p className="mt-2 text-sm text-slate-400">{documentInfo.status}</p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Owner
            </div>
            <div className="mt-2 text-2xl font-black text-white">{documentInfo.owner}</div>
            <p className="mt-2 text-sm text-slate-400">
              Audience: {documentInfo.audience.join(' / ')}
            </p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Scope
            </div>
            <div className="mt-2 text-2xl font-black text-white">LINE 官方帳號</div>
            <p className="mt-2 text-sm text-slate-400">FAQ / AI / 人工客服 / 知識回流</p>
          </article>
        </section>

        <section className="py-10">
          <SectionTitle
            eyebrow="1. Executive Summary"
            title="專案目標與邊界"
            description="先定義要做什麼、不要做什麼，避免客服系統偏離品牌定位或產生高風險誤答。"
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-7">
              <h3 className="text-xl font-bold text-white">目標</h3>
              <p className="mt-4 text-sm leading-8 text-slate-300">{summary.objective}</p>
            </article>
            <article className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-7">
              <h3 className="text-xl font-bold text-white">商業目標</h3>
              <p className="mt-4 text-sm leading-8 text-slate-300">{summary.businessGoal}</p>
            </article>
          </div>

          <div className="mt-5 rounded-[2rem] border border-amber-400/20 bg-amber-400/8 p-7">
            <h3 className="text-xl font-bold text-white">Non-Goals</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {summary.nonGoals.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs text-amber-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10">
          <SectionTitle
            eyebrow="2. Stakeholders"
            title="角色與責任分工"
            description="每一個角色都要有明確責任，避免客服 AI 與人工客服彼此重疊或責任模糊。"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {stakeholders.map((item) => (
              <article
                key={item.role}
                className="rounded-[1.75rem] border border-white/10 bg-slate-900/60 p-6"
              >
                <h3 className="text-xl font-bold text-white">{item.role}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.responsibility}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-10">
          <SectionTitle
            eyebrow="3. Functional Requirements"
            title="功能需求"
            description="這些是系統必須支援的核心能力，工程師可直接轉為任務拆解與驗收項目。"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {functionalRequirements.map((item) => (
              <article
                key={item.id}
                className="rounded-[1.75rem] border border-white/10 bg-slate-900/60 p-6"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
                  {item.id}
                </div>
                <h3 className="mt-3 text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-10">
          <SectionTitle
            eyebrow="4. Non-Functional Requirements"
            title="非功能需求"
            description="非功能需求決定客服系統是否能長期穩定營運。"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {nonFunctionalRequirements.map((item) => (
              <article
                key={item.id}
                className="rounded-[1.75rem] border border-white/10 bg-slate-900/60 p-6"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  {item.id}
                </div>
                <h3 className="mt-3 text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-10">
          <SectionTitle
            eyebrow="5. Architecture"
            title="系統架構"
            description="從入口到回流的六層設計，將客服問題轉成可檢索、可回覆、可治理的知識流程。"
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {architecture.map((layer) => (
              <article
                key={layer.layer}
                className="rounded-[1.75rem] border border-white/10 bg-slate-900/60 p-6"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
                  {layer.layer}
                </div>
                <h3 className="mt-3 text-xl font-bold text-white">{layer.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{layer.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-10">
          <SectionTitle
            eyebrow="6. Data Model"
            title="資料模型"
            description="工程師可依此建立資料表、JSON 結構或後端 API。"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {dataModel.entities.map((entity) => (
              <article
                key={entity.name}
                className="rounded-[1.75rem] border border-white/10 bg-slate-900/60 p-6"
              >
                <h3 className="text-xl font-bold text-white">{entity.name}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {entity.fields.map((field) => (
                    <span
                      key={field}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-10">
          <SectionTitle
            eyebrow="7. Service Modes"
            title="兩種客服服務模式"
            description="先用規則式回覆處理穩定高頻問題，再以 AI 處理較複雜的知識型問答。"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {serviceModes.map((mode) => (
              <article
                key={mode.name}
                className="rounded-[1.75rem] border border-white/10 bg-slate-900/60 p-7"
              >
                <h3 className="text-2xl font-black text-white">{mode.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{mode.useCase}</p>
                <div className="mt-5 space-y-2">
                  {mode.flow.map((step) => (
                    <div key={step} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
                      {step}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-10">
          <SectionTitle
            eyebrow="8. Handoff Rules"
            title="轉人工規則"
            description="凡涉及風險、帳務、合作、法務或 AI 信心不足，都應明確交棒給人工。"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {handoffRules.map((rule, index) => (
              <article
                key={`${rule.trigger}-${index}`}
                className="rounded-[1.75rem] border border-white/10 bg-slate-900/60 p-6"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  RULE {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-3 text-xl font-bold text-white">{rule.trigger}</h3>
                <p className="mt-3 text-sm leading-7 text-emerald-200">{rule.action}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-10">
          <SectionTitle
            eyebrow="9. Conversation Flow"
            title="對話流程"
            description="這是使用者提問到系統回覆、再回流知識庫的標準流程。"
          />
          <div className="mt-10 rounded-[2rem] border border-white/10 bg-slate-900/60 p-7">
            <div className="grid gap-3 md:grid-cols-7">
              {conversationFlow.map((item, index) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-5 text-center text-sm font-medium text-slate-200"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="mt-2 leading-6">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10">
          <SectionTitle
            eyebrow="10. Acceptance Criteria"
            title="驗收標準與里程碑"
            description="交付給工程師前，應明確知道怎樣算完成，以及下一階段的工作是什麼。"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
            <article className="rounded-[1.75rem] border border-white/10 bg-slate-900/60 p-7">
              <h3 className="text-xl font-bold text-white">驗收標準</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                {acceptanceCriteria.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-emerald-300">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-[1.75rem] border border-white/10 bg-slate-900/60 p-7">
              <h3 className="text-xl font-bold text-white">風險清單</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                {risks.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-amber-300">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {milestones.map((item) => (
              <article
                key={item.phase}
                className="rounded-[1.75rem] border border-white/10 bg-slate-900/60 p-6"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  {item.phase}
                </div>
                <h3 className="mt-3 text-xl font-bold text-white">{item.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.output}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-6">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/60 p-8 shadow-[0_30px_140px_rgba(0,0,0,0.3)]">
            <div className="max-w-4xl space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Handoff
              </p>
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                這份規格書可以直接交給工程師開始拆工。
              </h2>
              <p className="text-base leading-8 text-slate-300">
                如果下一步要進入實作，建議先完成資料模型、回覆引擎與轉人工規則，再接 LINE
                webhook 與客服工作台。
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/line-kb"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-center text-sm font-medium text-slate-200 transition hover:border-cyan-400/30 hover:bg-white/10"
              >
                返回知識頁
              </Link>
              <a
                href="https://lin.ee/stqhWhj"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-cyan-400 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                前往 LINE 官方帳號
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
