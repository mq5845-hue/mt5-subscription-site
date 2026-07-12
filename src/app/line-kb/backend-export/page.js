import { headers } from 'next/headers';
import Link from 'next/link';
import ExportCopyButtons from '@/components/ExportCopyButtons';
import { topicTreeBlueprint, topicTreeExpandedEntries } from '@/data/lineTopicTree';
import { localizePath } from '@/lib/locale';

export const metadata = {
  title: 'LINE Knowledge Base Export | AI-Quant Lab',
  description: 'Export the AI-Quant Lab LINE knowledge base as Markdown or JSON.',
};

const copy = {
  en: {
    eyebrow: 'LINE KNOWLEDGE BASE EXPORT',
    title: 'Copy or download the knowledge base',
    lead: 'Review the structured FAQ content, copy it into the LINE backend, or download Markdown and JSON for backup and deployment.',
    expansion: 'FAQ Expansion',
    home: 'Knowledge Base',
    stats: [['DATASET', 'A portable FAQ structure'], ['WORKFLOW', 'Copy, review, deploy'], ['OUTPUT', 'Markdown and JSON']],
    actionEyebrow: 'ONE-CLICK ACTIONS',
    actionTitle: 'Keep the backend workflow simple',
    actionText: 'Use the preview first, then copy or download the format that fits your LINE workflow.',
    pointTitle: 'Button-led customer flow',
    pointText: 'Most visitors prefer a button over typing. Use the knowledge base as the backup layer and make the main route a set of clear actions.',
    previewTitle: 'Preview',
    markdown: 'Markdown preview',
    json: 'JSON preview',
    flow: 'Welcome to AI-Quant Lab.\\n\\nChoose a next step:\\n- View the feature guide\\n- Read the knowledge base\\n- Join the reservation list\\n\\nIf you prefer text, reply with: feature guide / knowledge base / reservation.',
  },
  'zh-Hant': {
    eyebrow: 'LINE 知識庫匯出',
    title: '複製或下載知識庫',
    lead: '檢查整理好的 FAQ 題庫，直接貼到 LINE 後台，或下載 Markdown 與 JSON 作為備份與部署檔案。',
    expansion: 'FAQ 擴充藍圖',
    home: '知識庫入口',
    stats: [['資料規模', '可攜式 FAQ 結構'], ['使用流程', '複製、檢查、部署'], ['輸出格式', 'Markdown 與 JSON']],
    actionEyebrow: '一鍵操作',
    actionTitle: '讓後台流程保持簡單',
    actionText: '先看預覽，再複製或下載適合 LINE 流程的格式。',
    pointTitle: '按鈕導流流程',
    pointText: '多數訪客不想先打字。讓知識庫作為備援，主流程改成清楚的按鈕入口。',
    previewTitle: '預覽',
    markdown: 'Markdown 預覽',
    json: 'JSON 預覽',
    flow: '歡迎來到 AI-Quant Lab。\\n\\n請選擇下一步：\\n- 查看功能說明\\n- 先看知識庫\\n- 加入預約名單',
  },
};

export default async function LineBackendExportPage({ searchParams }) {
  const requestHeaders = await headers();
  const params = await searchParams;
  const queryLocale = Array.isArray(params?.__locale) ? params.__locale[0] : params?.__locale;
  const locale = queryLocale || requestHeaders.get('x-site-locale') || 'zh-Hant';
  const text = copy[locale] || copy['zh-Hant'];
  const markdownText = locale === 'en'
    ? '# AI-Quant Lab LINE Knowledge Base Export\\n\\nEntries: ' + topicTreeExpandedEntries.length + '\\n\\n' + text.flow
    : '# AI-Quant Lab LINE 知識庫匯出\\n\\n題目數：' + topicTreeExpandedEntries.length + '\\n\\n' + text.flow;
  const jsonText = JSON.stringify({
    metadata: {
      title: locale === 'en' ? 'AI-Quant Lab LINE Knowledge Base Export' : 'AI-Quant Lab LINE 知識庫匯出',
      generatedAt: new Date().toISOString(),
      totalEntries: topicTreeExpandedEntries.length,
      families: topicTreeBlueprint.families,
    },
    blueprint: topicTreeBlueprint,
    entries: topicTreeExpandedEntries,
  }, null, 2);

  return (
    <main className="min-h-screen bg-[#050816] text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.16),transparent_26%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.12),transparent_24%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.55),rgba(2,6,23,0.92))]" />
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <header className="rounded-[1.75rem] border border-cyan-400/15 bg-white/[0.03] p-5 shadow-[0_20px_80px_rgba(8,145,178,0.14)] backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-semibold tracking-[0.2em] text-cyan-200">{text.eyebrow}</span>
                <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">{text.title}</h1>
                <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">{text.lead}</p>
              </div>
              <div className="flex flex-wrap gap-2 lg:pt-2">
                <Link href={localizePath('/line-kb/expansion', locale)} className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-cyan-100 transition hover:bg-cyan-300/18">{text.expansion}</Link>
                <Link href={localizePath('/line-kb', locale)} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-slate-100 transition hover:border-cyan-300/30 hover:bg-cyan-300/10">{text.home}</Link>
              </div>
            </div>
          </header>

          <section className="mt-8 grid gap-4 lg:grid-cols-3">
            {text.stats.map(([label, value]) => (
              <article key={label} className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5">
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">{label}</p>
                <h2 className="mt-3 text-2xl font-bold text-white">{value}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{topicTreeExpandedEntries.length} {locale === 'en' ? 'expanded entries are ready.' : '則擴充題目已準備完成。'}</p>
              </article>
            ))}
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(8,15,31,0.82),rgba(3,7,18,0.94))] p-5 shadow-[0_16px_50px_rgba(34,211,238,0.08)] ring-1 ring-white/5 sm:p-7">
            <p className="text-xs font-semibold tracking-[0.22em] text-cyan-300">{text.actionEyebrow}</p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">{text.actionTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-200/90 sm:text-base">{text.actionText}</p>
            <div className="mt-6"><ExportCopyButtons markdownText={markdownText} jsonText={jsonText} mdHref="/api/line-backend-export?format=md&download=1" jsonHref="/api/line-backend-export?format=json&download=1" /></div>
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(8,15,31,0.82),rgba(3,7,18,0.94))] p-5 shadow-[0_16px_50px_rgba(34,211,238,0.08)] ring-1 ring-white/5 sm:p-7">
            <p className="text-xs font-semibold tracking-[0.22em] text-cyan-300">{text.previewTitle}</p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">{text.pointTitle}</h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-200/90 sm:text-base">{text.pointText}</p>
            <pre className="mt-5 whitespace-pre-wrap rounded-[1rem] border border-cyan-300/10 bg-[#020617] p-4 text-sm leading-7 text-slate-100">{text.flow}</pre>
          </section>

          <section className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5">
              <h2 className="text-2xl font-bold text-white">{text.markdown}</h2>
              <pre className="mt-4 max-h-[36rem] overflow-auto whitespace-pre-wrap rounded-[1rem] border border-cyan-300/10 bg-[#020617] p-4 text-sm leading-7 text-slate-200">{markdownText}</pre>
            </article>
            <article className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5">
              <h2 className="text-2xl font-bold text-white">{text.json}</h2>
              <pre className="mt-4 max-h-[36rem] overflow-auto whitespace-pre-wrap rounded-[1rem] border border-cyan-300/10 bg-[#020617] p-4 text-sm leading-7 text-slate-200">{jsonText}</pre>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
}
