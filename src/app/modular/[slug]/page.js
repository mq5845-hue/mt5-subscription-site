import { headers } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getLibraryEntryBySlug,
  getModularEntries,
  getModuleSourceCandidates,
  readModuleSource,
  splitModuleContent,
} from '../../../lib/module-library';
import { localizePath } from '../../../lib/locale';
import { getEnglishModuleContent } from '../../../lib/module-english-content';
import EmojiAvatar from '../../../components/EmojiAvatar';
export function generateStaticParams() {
  return getModularEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = getLibraryEntryBySlug(slug);
  const requestHeaders = await headers();
  const locale = requestHeaders.get('x-site-locale') || 'en';
  return {
    title: entry ? `${entry.number} ${entry.title} | AI-Quant Lab` : 'Module not found | AI-Quant Lab',
    description: entry
      ? (locale === 'en' ? `${humanizeTitle(entry.title)} implementation reference for the AI-Quant Lab trading workflow.` : entry.summary)
      : 'AI-Quant Lab module details.',
  };
}

const copy = {
  en: {
    sourceReady: 'Source file', sourceMissing: 'Source file not found', backModules: 'Back to modules', home: 'Back to home',
    englishReference: 'English implementation reference',
    top: 'Core content', bottom: 'Implementation notes', missingTitle: 'Module content is not available yet',
    missingBody: 'Add the matching Markdown file under', emptyTop: 'The Markdown source for this module has not been added yet.',
    emptyBottom: 'Add the source file under src/content/modules to publish the full module content.',
    footer: 'This page presents the complete module reading and implementation reference.', sourceHint: 'Source directory:', lines: 'lines',
  },
  'zh-Hant': {
    sourceReady: '\u4f86\u6e90\u6a94\u6848', sourceMissing: '\u627e\u4e0d\u5230\u4f86\u6e90\u6a94\u6848', backModules: '\u56de\u6a21\u7d44\u5217\u8868', home: '\u56de\u9996\u9801',
    top: '\u6838\u5fc3\u5167\u5bb9', bottom: '\u5be6\u4f5c\u5099\u8a3b', missingTitle: '\u5c1a\u672a\u63d0\u4f9b\u6a21\u7d44\u5167\u5bb9',
    missingBody: '\u8acb\u5c07\u5c0d\u61c9\u7684 Markdown \u6a94\u6848\u653e\u5165', emptyTop: '\u9019\u500b\u6a21\u7d44\u5c1a\u672a\u52a0\u5165 Markdown \u539f\u59cb\u5167\u5bb9\u3002',
    emptyBottom: '\u8acb\u5c07\u4f86\u6e90\u6a94\u6848\u653e\u5165 src/content/modules \u5f8c\uff0c\u5373\u53ef\u986f\u793a\u5b8c\u6574\u5167\u5bb9\u3002',
    footer: '\u672c\u9801\u63d0\u4f9b\u6a21\u7d44\u7684\u5b8c\u6574\u95b1\u8b80\u8207\u5be6\u4f5c\u53c3\u8003\u3002', sourceHint: '\u4f86\u6e90\u8cc7\u6599\u593e\uff1a', lines: '\u884c',
  },
  'zh-Hans': {
    sourceReady: '\u6765\u6e90\u6587\u4ef6', sourceMissing: '\u627e\u4e0d\u5230\u6765\u6e90\u6587\u4ef6', backModules: '\u56de\u6a21\u5757\u5217\u8868', home: '\u56de\u9996\u9875',
    top: '\u6838\u5fc3\u5185\u5bb9', bottom: '\u5b9e\u4f5c\u5907\u6ce8', missingTitle: '\u5c1a\u672a\u63d0\u4f9b\u6a21\u5757\u5185\u5bb9',
    missingBody: '\u8bf7\u5c06\u5bf9\u5e94\u7684 Markdown \u6587\u4ef6\u653e\u5165', emptyTop: '\u8fd9\u4e2a\u6a21\u5757\u5c1a\u672a\u52a0\u5165 Markdown \u539f\u59cb\u5185\u5bb9\u3002',
    emptyBottom: '\u8bf7\u5c06\u6765\u6e90\u6587\u4ef6\u653e\u5165 src/content/modules \u540e\uff0c\u5373\u53ef\u663e\u793a\u5b8c\u6574\u5185\u5bb9\u3002',
    footer: '\u672c\u9875\u63d0\u4f9b\u6a21\u5757\u7684\u5b8c\u6574\u9605\u8bfb\u4e0e\u5b9e\u4f5c\u53c2\u8003\u3002', sourceHint: '\u6765\u6e90\u8d44\u6599\u5939\uff1a', lines: '\u884c',
  },
};

function humanizeTitle(title) {
  return title.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
}

function GlassPanel({ title, content, glass = false, emoji = '\u{1f4d6}' }) {
  return (
    <section className={'relative overflow-hidden rounded-[1.5rem] border border-cyan-400/15 p-6 shadow-[0_18px_60px_rgba(8,145,178,0.12)] ring-1 ring-white/5 sm:p-8 ' + (glass ? 'bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(15,23,42,0.42))] backdrop-blur-xl' : 'bg-[linear-gradient(180deg,rgba(2,6,23,0.96),rgba(3,7,18,0.84))]')}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_40%)]" />
      <div className="relative z-10 space-y-4">
        <h2 className="flex items-center gap-3 text-lg font-black tracking-tight text-white sm:text-xl"><EmojiAvatar emoji={emoji} tone={glass ? 'violet' : 'cyan'} />{title}</h2>
        {glass ? (
          <div className="relative overflow-hidden rounded-2xl border border-cyan-300/10 bg-slate-950/36">
            <pre className="relative whitespace-pre-wrap break-words p-4 text-sm leading-7 text-slate-200 blur-[2.2px] saturate-65 select-none">{content}</pre>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-90" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(15,23,42,0.50) 0 10px, rgba(15,23,42,0.18) 10px 20px), repeating-linear-gradient(90deg, rgba(15,23,42,0.46) 0 10px, rgba(15,23,42,0.14) 10px 20px), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.14), transparent 20%), radial-gradient(circle at 70% 35%, rgba(34,211,238,0.12), transparent 20%), radial-gradient(circle at 40% 75%, rgba(59,130,246,0.10), transparent 20%)', backgroundSize: '16px 16px', mixBlendMode: 'screen', backdropFilter: 'blur(1.2px)' }} />
          </div>
        ) : <pre className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-200">{content}</pre>}
      </div>
    </section>
  );
}

function EmptyState({ entry, text }) {
  const candidates = getModuleSourceCandidates(entry).map((name) => `${name}.md`);
  return (
    <div className="rounded-[1.4rem] border border-dashed border-cyan-400/20 bg-slate-950/65 p-6 text-sm leading-7 text-slate-400">
      <p className="flex items-center gap-2 font-semibold text-cyan-200"><EmojiAvatar emoji={'\u{1f6a7}'} tone="amber" />{text.missingTitle}</p>
      <p className="mt-2">{text.missingBody} <code className="rounded bg-slate-900 px-1.5 py-0.5 text-slate-200">src/content/modules</code></p>
      <ul className="mt-3 list-disc space-y-1 pl-5">{candidates.map((candidate) => <li key={candidate}><code className="rounded bg-slate-900 px-1.5 py-0.5 text-slate-200">{candidate}</code></li>)}</ul>
    </div>
  );
}

export default async function ModularDetailPage({ params, searchParams }) {
  const { slug } = await params;
  const entry = getLibraryEntryBySlug(slug);
  if (!entry) notFound();

  const requestHeaders = await headers();
  const query = await searchParams;
  const queryLocale = Array.isArray(query?.__locale) ? query.__locale[0] : query?.__locale;
  const locale = queryLocale || requestHeaders.get('x-site-locale') || 'en';
  const text = copy[locale] || copy['zh-Hant'];
  const name = humanizeTitle(entry.title);
  const { content: sourceContent, sourcePath } = await readModuleSource(entry, locale);
  const content = locale === 'en' ? (sourceContent || getEnglishModuleContent(entry)) : sourceContent;
  const { topHalf, bottomHalf, lineCount } = splitModuleContent(content);
  const hasContent = Boolean(content);
  const numberLabel = typeof entry.number === 'number' ? String(entry.number).padStart(2, '0') : entry.number;
  const subtitle = locale === 'en' ? `Core ${name} module` : entry.subtitle;
  const summary = locale === 'en' ? `${name} is a complete module reference for the AI-Quant Lab trading workflow.` : entry.summary;
  const sourceLabel = locale === 'en' ? text.englishReference : (sourcePath ? text.sourceReady : text.sourceMissing);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"><div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_70%_20%,rgba(59,130,246,0.1),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_50%)]" /><div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:48px_48px]" /></div>
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-8 flex flex-col gap-5 border-b border-slate-800/80 pb-6">
          <div className="flex flex-wrap items-center gap-3"><span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300"><EmojiAvatar emoji={'\u{1f9e9}'} tone="cyan" />{typeof entry.number === 'number' ? `Module ${numberLabel}` : entry.number}</span><span className="text-xs text-slate-500">{sourceLabel}</span></div>
          <div className="space-y-3"><h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">{entry.title}</h1><p className="max-w-3xl text-sm leading-7 text-slate-400">{subtitle}. {summary}</p></div>
          <div className="flex flex-wrap gap-3"><Link href={localizePath('/modular', locale)} className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-200">{text.backModules}</Link><Link href={localizePath('/', locale)} className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">{text.home}</Link></div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">{hasContent ? <><GlassPanel title={text.top} content={topHalf} emoji={'\u{1f4d6}'} /><GlassPanel title={text.bottom} content={bottomHalf} glass emoji={'\u{1f6e0}\u{fe0f}'} /></> : <><GlassPanel title={text.top} content={text.emptyTop} emoji={'\u{1f4d6}'} /><GlassPanel title={text.bottom} content={text.emptyBottom} glass emoji={'\u{1f6e0}\u{fe0f}'} /></>}</div>
        {!hasContent && <div className="mt-6"><EmptyState entry={entry} text={text} /></div>}
        <div className="mt-8 rounded-[1.5rem] border border-cyan-400/15 bg-slate-900/55 p-5 text-sm leading-7 text-slate-300"><p>{text.footer}</p><p className="mt-2 text-slate-400">{text.sourceHint} <code className="rounded bg-slate-900 px-1.5 py-0.5 text-slate-200">src/content/modules</code></p><p className="mt-2 text-slate-500">{lineCount} {text.lines}</p></div>
      </div>
    </main>
  );
}