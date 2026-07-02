import Link from 'next/link';
import { lineKnowledgeExpansion } from '@/data/lineKnowledgeExpansion';
import { topicTreeNodes } from '@/data/lineTopicTree';

export const metadata = {
  title: 'FAQ 擴充藍圖 | AI-Quant Lab',
  description: 'AI-Quant Lab 的 FAQ 1000+ 擴充架構、LINE 回覆分層模板與官網導流閉環文案。',
};

const quickLinks = [
  { href: '/line-kb', label: '知識庫入口' },
  { href: '/line-kb/formal-tree', label: '正式圖解樹' },
  { href: '/line-kb/flex-template', label: 'Flex 模板' },
  { href: '/line-kb/spec', label: '工程師規格書' },
  { href: '/line-kb/expansion', label: 'FAQ 擴充藍圖' },
  { href: '/line-kb/backend-export', label: '後台匯出' },
];

function NavLinks() {
  return (
    <div className="flex flex-wrap justify-end gap-2">
      {quickLinks.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`rounded-full px-4 py-2 text-xs font-semibold tracking-[0.18em] transition ${
            item.href === '/line-kb/expansion'
              ? 'border border-cyan-300/35 bg-cyan-300/15 text-white'
              : 'border border-cyan-400/20 bg-cyan-400/10 text-cyan-100 hover:border-cyan-300/40 hover:bg-cyan-300/15 hover:text-white'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default function LineKbExpansionPage() {
  const {
    metadata,
    sections,
    funnelCopy,
    replyTemplate,
    announcement,
    tapGuide,
    preorderCopy,
    topicTreeBlueprint,
    topicTreeExpansion,
  } = lineKnowledgeExpansion;
  const groupedNodes = topicTreeNodes.reduce((acc, node) => {
    if (!acc[node.familyId]) {
      acc[node.familyId] = [];
    }

    acc[node.familyId].push(node);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-[#050816] text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.16),transparent_26%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.12),transparent_24%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.55),rgba(2,6,23,0.92))]" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <header className="rounded-[1.75rem] border border-cyan-400/15 bg-white/[0.03] p-5 shadow-[0_20px_80px_rgba(8,145,178,0.14)] backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-semibold tracking-[0.24em] text-cyan-200">
                  FAQ 擴充藍圖
                </div>
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">{metadata.title}</h1>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                    {metadata.description}
                  </p>
                  <div className="mt-4 inline-flex max-w-3xl rounded-2xl border border-amber-300/25 bg-amber-300/10 px-4 py-3 text-sm leading-7 text-amber-50 shadow-[0_0_28px_rgba(251,191,36,0.14)]">
                    {announcement}
                  </div>
                </div>
              </div>

              <div className="lg:pt-2">
                <NavLinks />
              </div>
            </div>
          </header>

          <section className="mt-8 grid gap-4 lg:grid-cols-3">
            {sections.map((section) => (
              <article
                key={section.title}
                className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5"
              >
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">{section.kicker}</p>
                <h2 className="mt-3 text-2xl font-bold text-white">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{section.intro}</p>

                <div className="mt-5 grid gap-3">
                  {section.blocks.map((block) => (
                    <div key={block.title} className="rounded-[1.1rem] border border-cyan-400/12 bg-slate-950/60 p-4">
                      <p className="text-sm font-bold text-white">{block.title}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-300">{block.text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[1.1rem] border border-cyan-300/15 bg-cyan-300/5 p-4">
                  <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">重點清單</p>
                  <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                    {section.checklist.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </section>

          <section className="mt-8 rounded-[1.5rem] border border-amber-300/15 bg-amber-300/8 p-5 shadow-[0_16px_50px_rgba(251,191,36,0.08)] ring-1 ring-white/5 sm:p-7">
            <p className="text-xs font-semibold tracking-[0.22em] text-amber-200">網站公告</p>
            <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">目前仍在測試階段，歡迎先加入預約名單，等候正式開放</h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-200/90 sm:text-base">
              我們現在還在持續建構、測試與優化網站與 LINE 客服流程。若你對 AI-Quant Lab 有興趣，
              可以先加入預約名單，等正式版與會員功能上線後，我們會優先通知你。
            </p>
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(8,15,31,0.82),rgba(3,7,18,0.94))] p-5 shadow-[0_16px_50px_rgba(34,211,238,0.08)] ring-1 ring-white/5 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold tracking-[0.22em] text-cyan-300">第一波主題樹</p>
                <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">{topicTreeBlueprint.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-200/90 sm:text-base">
                  {topicTreeBlueprint.description}
                </p>
              </div>
              <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-cyan-100">
                目前已整理 {topicTreeBlueprint.families.length} 大家族 / 24+ 第一波節點
              </div>
            </div>

            <div className="mt-6 grid gap-3 lg:grid-cols-2">
              {topicTreeBlueprint.expansionRules.map((rule) => (
                <div key={rule} className="rounded-[1.1rem] border border-cyan-300/12 bg-slate-950/60 p-4">
                  <p className="text-sm leading-7 text-slate-300">{rule}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {topicTreeBlueprint.families.map((family) => (
                <article key={family.id} className="rounded-[1.2rem] border border-cyan-300/12 bg-slate-950/55 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.18em] text-cyan-300">家族</p>
                      <h3 className="mt-1 text-lg font-bold text-white">{family.title}</h3>
                    </div>
                    <span className="rounded-full border border-cyan-300/15 bg-cyan-300/8 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-cyan-100">
                      {family.id}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{family.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(groupedNodes[family.id] || []).map((node) => (
                      <span
                        key={node.id}
                        className="rounded-full border border-cyan-300/12 bg-cyan-300/8 px-3 py-1 text-xs font-medium text-cyan-50"
                      >
                        {node.question}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-cyan-400/15 bg-[linear-gradient(180deg,rgba(15,23,42,0.84),rgba(3,7,18,0.94))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5 sm:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold tracking-[0.22em] text-cyan-300">1000+ 擴充規則</p>
                <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">讓題庫自己長出更多同義問法</h2>
                <p className="mt-3 text-sm leading-7 text-slate-200/90 sm:text-base">{topicTreeExpansion.note}</p>
              </div>
              <div className="grid gap-2 text-xs font-semibold tracking-[0.18em] text-cyan-100 sm:grid-cols-3">
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-center">
                  模板 {topicTreeExpansion.templates.length} 組
                </span>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-center">
                  同義模板 {topicTreeExpansion.aliasTemplates.length} 組
                </span>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-center">
                  已生成 {topicTreeExpansion.expandedCount} 則
                </span>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {topicTreeExpansion.templates.slice(0, 8).map((template) => (
                <div key={template} className="rounded-[1.1rem] border border-cyan-300/12 bg-slate-950/60 p-4">
                  <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">QUESTION TEMPLATE</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{template}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.2rem] border border-cyan-300/12 bg-slate-950/60 p-4">
              <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">LINE 後台可貼格式預覽</p>
              <pre className="mt-3 max-h-[32rem] overflow-auto whitespace-pre-wrap rounded-[1rem] border border-cyan-300/10 bg-[#020617] p-4 text-sm leading-7 text-slate-200">
{topicTreeExpansion.previewText}
              </pre>
            </div>
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(8,15,31,0.82),rgba(3,7,18,0.94))] p-5 shadow-[0_16px_50px_rgba(34,211,238,0.08)] ring-1 ring-white/5 sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold tracking-[0.22em] text-cyan-300">點選式導流</p>
                <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">{tapGuide.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-200/90 sm:text-base">{tapGuide.intro}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {tapGuide.options.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="group rounded-[1.2rem] border border-cyan-300/20 bg-cyan-300/7 px-4 py-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-cyan-200/35 hover:bg-cyan-200/10"
                >
                  <span className="block text-base font-bold text-white">{item.label}</span>
                  <span className="mt-1 block text-sm leading-6 text-slate-300">{item.hint}</span>
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-[1.1rem] border border-cyan-300/12 bg-slate-950/60 p-4">
              <p className="text-sm font-semibold text-cyan-200">提醒</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">{tapGuide.note}</p>
            </div>
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-cyan-400/12 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5 sm:p-7">
            <p className="text-xs font-semibold tracking-[0.22em] text-cyan-300">預約名單話術</p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">{preorderCopy.title}</h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300 sm:text-base">{preorderCopy.intro}</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {preorderCopy.items.map((item) => (
                <div key={item.label} className="rounded-[1.15rem] border border-cyan-300/12 bg-slate-950/60 p-4">
                  <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">{item.label}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5">
              <h2 className="text-2xl font-bold text-white">LINE 回覆分層模板</h2>
              <div className="mt-4 grid gap-3">
                {Object.entries(replyTemplate).map(([key, value]) => (
                  <div key={key} className="rounded-[1.1rem] border border-cyan-400/12 bg-slate-950/60 p-4">
                    <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">{key.toUpperCase()}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{value}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5">
              <h2 className="text-2xl font-bold text-white">官網導流閉環文案</h2>
              <div className="mt-4 grid gap-3">
                {funnelCopy.map((item, index) => (
                  <div key={item} className="rounded-[1.1rem] border border-cyan-400/12 bg-slate-950/60 p-4">
                    <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">STEP {index + 1}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-cyan-400/12 bg-[linear-gradient(180deg,rgba(8,15,31,0.76),rgba(3,7,18,0.92))] p-5 sm:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">頁尾跳轉</p>
                <h2 className="mt-2 text-2xl font-black text-white">回到三個核心頁面，也可以繼續往下長</h2>
              </div>
              <NavLinks />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
