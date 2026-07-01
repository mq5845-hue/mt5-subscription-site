import Link from 'next/link';
import { getKnowledgeTitles } from '@/lib/line-bot-brain';

export const metadata = {
  title: 'LINE 知識庫',
  description: 'AI-Quant Lab LINE 知識庫入口，整合 12 則正式 FAQ、匯入分段版與主題樹架構。',
};

const topicHighlights = [
  '新手導覽',
  '模組架構',
  '源代碼與授權',
  '風險與合規',
  '訂閱與預約',
  '品牌願景與故事',
];

function SectionCard({ title, description, children }) {
  return (
    <section className="rounded-[1.5rem] border border-cyan-400/15 bg-[linear-gradient(180deg,rgba(2,6,23,0.94),rgba(3,7,18,0.82))] p-6 shadow-[0_18px_60px_rgba(8,145,178,0.12)] ring-1 ring-white/5 sm:p-8">
      <div className="mb-4 space-y-2">
        <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">{title}</h2>
        <p className="text-sm leading-7 text-slate-400 sm:text-[0.96rem]">{description}</p>
      </div>
      {children}
    </section>
  );
}

export default function LineKnowledgeBasePage() {
  const entries = getKnowledgeTitles();

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_70%_20%,rgba(59,130,246,0.1),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_50%)]" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-2">
            <p className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
              LINE Knowledge Base
            </p>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              AI-Quant Lab 知識庫入口
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
              這裡整理了 12 則正式 FAQ、匯入分段版與主題樹架構，方便你把 LINE 後台知識庫與網站內容同步管理。
            </p>
          </div>

          <Link
            href="/"
            className="hidden rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-500/15 md:inline-flex"
          >
            回首頁
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <SectionCard
            title="正式 FAQ"
            description="這 12 則 FAQ 已經按新手版、技術版、願景版三段式整理，適合直接作為 LINE 知識庫核心主文。"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {entries.map((entry) => (
                <article
                  key={entry.id}
                  className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 transition hover:border-cyan-400/30 hover:bg-slate-900/80"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
                    {entry.id}
                  </p>
                  <h3 className="mt-2 text-base font-bold leading-7 text-white">{entry.question}</h3>
                </article>
              ))}
            </div>
          </SectionCard>

          <div className="space-y-6">
            <SectionCard
              title="匯入方式"
              description="如果你要把內容貼進 LINE 後台，建議先從分段版開始，再依主題慢慢擴充。"
            >
              <ol className="space-y-3 text-sm leading-7 text-slate-300">
                <li>1. 先貼上 [line-knowledge-base-import-segments.txt] 的內容。</li>
                <li>2. 再補主題樹，方便後續擴充到 1000+ 問答。</li>
                <li>3. 保留三段式格式，讓 AI 更容易辨識新手、技術與願景層次。</li>
              </ol>
            </SectionCard>

            <SectionCard
              title="主題聚焦"
              description="這些主題會是後續擴展知識庫的主幹。"
            >
              <div className="flex flex-wrap gap-2">
                {topicHighlights.map((topic) => (
                  <span
                    key={topic}
                    className="inline-flex items-center rounded-full border border-cyan-400/15 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-100"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <SectionCard
            title="分段版與擴充規劃"
            description="這兩份文件是知識庫中台的起點，後續可以直接用來擴張。"
          >
            <div className="space-y-3 text-sm leading-7 text-slate-300">
              <p>• 分段版：適合直接貼進 LINE 後台。</p>
              <p>• 主題樹：適合未來擴充成 1000+ 問答。</p>
              <p>• 三段式：讓回答同時兼顧新手、技術與願景。</p>
            </div>
          </SectionCard>

          <SectionCard
            title="系統狀態"
            description="這個頁面是目前公開知識庫的入口，未來可再接更多子頁。"
          >
            <div className="space-y-3 text-sm leading-7 text-slate-300">
              <p>• 主頁：品牌與導流入口。</p>
              <p>• 知識庫頁：FAQ 與導覽。</p>
              <p>• 規格頁：交付流程與開發說明。</p>
            </div>
          </SectionCard>
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-[1.5rem] border border-cyan-400/15 bg-slate-900/55 p-5 text-sm leading-7 text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            若你要繼續擴充，下一步最適合接上「主題樹分頁」與「知識庫搜尋」。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/line-kb/spec"
              className="rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              查看規格頁
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2 font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-200"
            >
              返回首頁
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
