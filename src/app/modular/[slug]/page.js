import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getLibraryEntryBySlug,
  getModularEntries,
  getModuleSourceCandidates,
  readModuleSource,
  splitModuleContent,
} from '@/lib/module-library';

export function generateStaticParams() {
  return getModularEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = getLibraryEntryBySlug(slug);

  if (!entry) {
    return {
      title: '模組內容不存在 | AI-Quant Lab',
    };
  }

  return {
    title: `${entry.number} ${entry.title} | AI-Quant Lab`,
    description: entry.summary,
  };
}

function EmptyState({ entry }) {
  const candidates = getModuleSourceCandidates(entry).map((name) => `${name}.md`);

  return (
    <div className="rounded-[1.4rem] border border-dashed border-cyan-400/20 bg-slate-950/65 p-6 text-sm leading-7 text-slate-400">
      <p className="font-semibold text-cyan-200">找不到對應的 Markdown 檔案</p>
      <p className="mt-2">
        請把檔案放到 <code className="rounded bg-slate-900 px-1.5 py-0.5 text-slate-200">src/content/modules</code>，
        並使用以下其中一種檔名：
      </p>
      <ul className="mt-3 list-disc space-y-1 pl-5">
        {candidates.map((candidate) => (
          <li key={candidate}>
            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-slate-200">{candidate}</code>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GlassPanel({ title, content, glass = false }) {
  return (
    <section
      className={`relative overflow-hidden rounded-[1.5rem] border border-cyan-400/15 ${
        glass
          ? 'bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(15,23,42,0.78))] backdrop-blur-xl'
          : 'bg-[linear-gradient(180deg,rgba(2,6,23,0.96),rgba(3,7,18,0.84))]'
      } p-6 shadow-[0_18px_60px_rgba(8,145,178,0.12)] ring-1 ring-white/5 sm:p-8`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_40%)]"
      />
      <div className="relative z-10 space-y-4">
        <h2 className="text-lg font-black tracking-tight text-white sm:text-xl">{title}</h2>
        <pre
          className={`whitespace-pre-wrap break-words text-sm leading-7 text-slate-200 ${
            glass ? 'opacity-70' : ''
          }`}
        >
          {content}
        </pre>
      </div>
    </section>
  );
}

export default async function ModularDetailPage({ params }) {
  const { slug } = await params;
  const entry = getLibraryEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  const { content, sourcePath } = await readModuleSource(entry);
  const { topHalf, bottomHalf, lineCount } = splitModuleContent(content);
  const hasContent = Boolean(content);
  const numberLabel = typeof entry.number === 'number' ? String(entry.number).padStart(2, '0') : entry.number;

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_70%_20%,rgba(59,130,246,0.1),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_50%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-8 flex flex-col gap-5 border-b border-slate-800/80 pb-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              {typeof entry.number === 'number' ? `Module ${numberLabel}` : entry.number}
            </span>
            <span className="text-xs text-slate-500">
              {sourcePath || '尚未找到對應的 Markdown 檔'}
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              {entry.title}
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
              {entry.subtitle}｜{entry.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/modular"
              className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-200"
            >
              回模組列表
            </Link>
            <Link
              href="/"
              className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              回首頁
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {hasContent ? (
            <>
              <GlassPanel title="上半部內容" content={topHalf} />
              <GlassPanel title="下半部內容" content={bottomHalf} glass />
            </>
          ) : (
            <>
              <GlassPanel title="上半部內容" content="尚未找到 Markdown 原文，請先上傳對應檔案。" />
              <GlassPanel
                title="下半部內容"
                content="系統已保留雙欄結構。把檔案放入 src/content/modules 後，這裡就會自動顯示原文。"
                glass
              />
            </>
          )}
        </div>

        {!hasContent ? (
          <div className="mt-6">
            <EmptyState entry={entry} />
          </div>
        ) : null}

        <div className="mt-8 rounded-[1.5rem] border border-cyan-400/15 bg-slate-900/55 p-5 text-sm leading-7 text-slate-300">
          <p>
            目前內容採用「原文上半部 + 玻璃態下半部」的半開放式展示，能先讓訪客看見重點，再保留一點好奇心。
          </p>
          <p className="mt-2 text-slate-400">
            如果你把 step 16~21 的六份文檔放進 <code className="rounded bg-slate-900 px-1.5 py-0.5 text-slate-200">src/content/modules</code>，
            系統會優先抓取對應的 Markdown 原文。
          </p>
          <p className="mt-2 text-slate-500">共 {lineCount} 行</p>
        </div>
      </div>
    </main>
  );
}
