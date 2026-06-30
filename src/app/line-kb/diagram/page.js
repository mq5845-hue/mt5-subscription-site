import Link from 'next/link';
import { lineCustomerServiceDiagrams } from '@/data/lineCustomerServiceDiagrams';

export const metadata = lineCustomerServiceDiagrams.metadata;

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

function FlowCard({ step, isLast }) {
  return (
    <div className="flex min-w-[220px] flex-1 flex-col items-center">
      <article className="w-full rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-5 shadow-[0_18px_80px_rgba(0,0,0,0.25)]">
        <div className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
          {step.id}
        </div>
        <h3 className="mt-3 text-xl font-bold text-white">{step.title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">{step.detail}</p>
        <div className="mt-4 rounded-2xl border border-emerald-400/15 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
          輸出：{step.output}
        </div>
      </article>
      {!isLast ? <div className="my-5 h-10 w-px bg-gradient-to-b from-cyan-300/70 to-transparent md:h-px md:w-12" /> : null}
    </div>
  );
}

function LayerCard({ layer, isLast }) {
  return (
    <div className="flex flex-col items-stretch">
      <article className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              {layer.layer}
            </div>
            <h3 className="mt-2 text-2xl font-black text-white">{layer.name}</h3>
          </div>
          <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-200">
            {layer.nodes.length} nodes
          </div>
        </div>

        <p className="mt-4 text-sm leading-7 text-slate-300">{layer.detail}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {layer.nodes.map((node) => (
            <span
              key={node}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
            >
              {node}
            </span>
          ))}
        </div>
      </article>
      {!isLast ? (
        <div className="mx-auto my-5 h-10 w-px bg-gradient-to-b from-emerald-300/70 to-transparent" />
      ) : null}
    </div>
  );
}

function DataStage({ item }) {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-slate-900/65 p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">{item.id}</div>
      <h3 className="mt-3 text-xl font-bold text-white">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{item.detail}</p>
    </article>
  );
}

export default function LineCustomerServiceDiagramPage() {
  const { processFlow, systemLayers, dataFlow, summary, engineeringNotes, mermaid } =
    lineCustomerServiceDiagrams;

  return (
    <main className="relative overflow-hidden bg-slate-950 text-slate-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_24%),radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.12),transparent_22%),radial-gradient(circle_at_50%_78%,rgba(59,130,246,0.08),transparent_32%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Formal Diagram Set
            </div>
            <h1 className="max-w-4xl text-3xl font-black tracking-tight text-white sm:text-5xl">
              LINE 客服正式流程圖與系統圖
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-300">{summary.premise}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/line-kb/spec"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400/30 hover:text-white"
            >
              規格書
            </Link>
            <Link
              href="/line-kb/flex"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400/30 hover:text-white"
            >
              Flex 模板
            </Link>
            <Link
              href="/line-kb"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400/30 hover:text-white"
            >
              知識庫首頁
            </Link>
          </div>
        </header>

        <section className="grid gap-5 py-8 md:grid-cols-4">
          {summary.designPrinciples.map((item) => (
            <article key={item} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                Principle
              </div>
              <div className="mt-3 text-lg font-bold text-white">{item}</div>
            </article>
          ))}
        </section>

        <section className="py-10">
          <SectionTitle
            eyebrow="1. 客服流程圖"
            title="從提問到回覆的正式服務路徑"
            description="這一段對應客服真正的使用順序，讓產品、內容與工程團隊都用同一張圖說話。"
          />

          <div className="mt-10 rounded-[2rem] border border-white/10 bg-slate-900/60 p-6">
            <div className="flex flex-col md:flex-row md:items-stretch md:gap-4">
              {processFlow.map((step, index) => (
                <FlowCard key={step.id} step={step} isLast={index === processFlow.length - 1} />
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <article className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
              <h3 className="text-xl font-bold text-white">關鍵判定點</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <li>1. 問題是否屬於產品介紹、模組內容或交易風險？</li>
                <li>2. 回答是否能直接從知識庫命中？</li>
                <li>3. 是否需要轉人工或暫停自動回覆？</li>
              </ul>
            </article>
            <article className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
              <h3 className="text-xl font-bold text-white">自動化回覆原則</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <li>1. 先給能解題的答案，再補充延伸連結。</li>
                <li>2. 低信心答案必須保留保守措辭。</li>
                <li>3. 高風險問題直接切換到人工服務。</li>
              </ul>
            </article>
            <article className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5 md:col-span-2 xl:col-span-1">
              <h3 className="text-xl font-bold text-white">可直接延伸的節點</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                這張流程圖可以直接拆成 LINE Bot 的 intent、FAQ、handoff、log 四類節點，
                也可以同步輸出給工程師做 webhook 與資料表設計。
              </p>
            </article>
          </div>
        </section>

        <section className="py-10">
          <SectionTitle
            eyebrow="2. 系統圖"
            title="客服系統的分層結構與責任邊界"
            description="這一張圖強調模組責任分層，讓未來替換 AI、FAQ 引擎或資料層時不會互相牽動。"
          />

          <div className="mt-10 space-y-0">
            {systemLayers.map((layer, index) => (
              <LayerCard key={layer.layer} layer={layer} isLast={index === systemLayers.length - 1} />
            ))}
          </div>
        </section>

        <section className="grid gap-6 py-10 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-7">
            <SectionTitle
              eyebrow="3. 資料流"
              title="從事件到紀錄的回饋迴路"
              description="資料流圖的重點是把每一次互動都變成可分析、可回溯、可優化的資產。"
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {dataFlow.map((item) => (
                <DataStage key={item.id} item={item} />
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-7">
            <h3 className="text-2xl font-black text-white">工程師交付稿</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              若工程團隊要直接落地，可以把這兩段 Mermaid 當成初稿，快速轉成 wiki、Notion、
              或技術文件中的正式圖解。
            </p>

            <div className="mt-6 space-y-5">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
                  Flowchart
                </div>
                <pre className="mt-3 overflow-auto text-xs leading-6 text-slate-300">
                  {mermaid.flowchart}
                </pre>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">
                  System Diagram
                </div>
                <pre className="mt-3 overflow-auto text-xs leading-6 text-slate-300">
                  {mermaid.system}
                </pre>
              </div>
            </div>
          </article>
        </section>

        <section className="py-10">
          <div className="rounded-[2rem] border border-emerald-400/15 bg-emerald-400/8 p-7">
            <h3 className="text-2xl font-black text-white">設計原則</h3>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {engineeringNotes.map((note) => (
                <article key={note} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm leading-7 text-slate-300">{note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
