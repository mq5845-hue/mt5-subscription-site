import { headers } from 'next/headers';
import Link from 'next/link';
import {
  getModuleEntries,
  getReleaseCandidateEntries,
} from '../../lib/module-library';
import { localizePath } from '../../lib/locale';
import EmojiAvatar from '../../components/EmojiAvatar';

const moduleEmojis = ['🧩', '⚙️', '📊', '🛡️', '🤖', '🔌', '🧪', '🚀'];

export const metadata = {
  title: 'Modular Blocks | AI-Quant Lab',
  description: 'Explore the AI-Quant Lab modular trading research library.',
};

const localeCopy = {
  en: {
    eyebrow: 'Modular Blocks',
    title: 'Modular Blocks Library',
    description: 'Explore the core AI-Quant Lab modules. Each card opens an independent page for focused reading and implementation.',
    sourceBadge: '.md source content',
    home: 'Back to home',
    lineKb: 'Lab Knowledge Base',
    open: 'Open module',
    releaseEyebrow: 'Release Candidate',
    releaseTitle: 'RC1 Validation Plan',
    releaseDescription: 'A release-candidate validation plan for test readiness, evidence review, and Go / No-Go decisions.',
    releaseCount: 'release candidate',
    module: 'Module',
    moduleSummary: 'A reusable {name} component for building, testing, and governing quantitative trading workflows.',
    moduleSubtitle: 'Core {name} module',
  },
  'zh-Hant': {
    eyebrow: '模組化積木',
    title: '模組化積木資料庫',
    description: '整理 AI-Quant Lab 的核心模組。每張卡片都對應獨立頁面，方便閱讀與實作。',
    sourceBadge: '.md 原始內容',
    home: '回首頁',
    lineKb: 'Lab \u77e5\u8b58\u5eab',
    open: '開啟模組',
    releaseEyebrow: '發佈候選版',
    releaseTitle: 'RC1 驗證計畫',
    releaseDescription: '用於測試準備、證據檢查與 Go / No-Go 決策的發佈候選驗證計畫。',
    releaseCount: '個發佈候選項目',
    module: '模組',
    moduleSummary: '{name} 可重複使用的元件，用於建立、測試與治理量化交易流程。',
    moduleSubtitle: '{name} 核心模組',
  },
  'zh-Hans': {
    eyebrow: '模块化积木',
    title: '模块化积木资料库',
    description: '整理 AI-Quant Lab 的核心模块。每张卡片都对应独立页面，方便阅读与实作。',
    sourceBadge: '.md 原始内容',
    home: '回首页',
    lineKb: 'Lab \u77e5\u8bc6\u5e93',
    open: '打开模块',
    releaseEyebrow: '发布候选版',
    releaseTitle: 'RC1 验证计划',
    releaseDescription: '用于测试准备、证据检查与 Go / No-Go 决策的发布候选验证计划。',
    releaseCount: '个发布候选项目',
    module: '模块',
    moduleSummary: '{name} 可重复使用的组件，用于建立、测试与治理量化交易流程。',
    moduleSubtitle: '{name} 核心模块',
  },
};

function humanizeTitle(title) {
  return title.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
}

function localizeEntry(entry, text) {
  const name = humanizeTitle(entry.title);
  return {
    ...entry,
    subtitle: text.moduleSubtitle.replace('{name}', name),
    summary: text.moduleSummary.replace('{name}', name),
  };
}

function Card({ entry, locale, text, index = 0 }) {
  const numberLabel = typeof entry.number === 'number'
    ? String(entry.number).padStart(2, '0')
    : entry.number;

  return (
    <Link
      href={localizePath('/modular/' + entry.slug, locale)}
      className="group relative overflow-hidden rounded-[1.5rem] border border-cyan-400/15 bg-[linear-gradient(180deg,rgba(2,6,23,0.96),rgba(3,7,18,0.82))] p-6 shadow-[0_18px_60px_rgba(8,145,178,0.12)] ring-1 ring-white/5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:shadow-[0_24px_90px_rgba(34,211,238,0.16)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-0 ring-cyan-300/0 transition-all duration-300 group-hover:ring-1 group-hover:ring-cyan-300/25" />
      <div className="relative z-10 flex h-full flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
            <EmojiAvatar emoji={moduleEmojis[index % moduleEmojis.length]} />
            {typeof entry.number === 'number' ? text.module + ' ' + numberLabel : entry.number}
          </div>
          <span className="text-xs font-medium text-slate-500 transition group-hover:text-cyan-200">
            {text.open}
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-black tracking-tight text-white transition group-hover:text-cyan-300">
            {entry.title}
          </h2>
          <p className="text-sm font-medium text-cyan-100/90">{entry.subtitle}</p>
        </div>

        <p className="flex-1 text-sm leading-7 text-slate-400">{entry.summary}</p>
      </div>
    </Link>
  );
}

export default async function ModularIndexPage({ searchParams }) {
  const requestHeaders = await headers();
  const params = await searchParams;
  const queryLocale = Array.isArray(params?.__locale) ? params.__locale[0] : params?.__locale;
  const locale = queryLocale || requestHeaders.get('x-site-locale') || 'en';
  const text = localeCopy[locale] || localeCopy['zh-Hant'];
  const modules = getModuleEntries().map((entry) => localizeEntry(entry, text));
  const releaseCandidates = getReleaseCandidateEntries().map((entry) => localizeEntry(entry, text));

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_70%_20%,rgba(59,130,246,0.12),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_50%)]" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.14)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-10 flex flex-col gap-5 border-b border-slate-800/80 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
              {text.eyebrow}
            </p>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              {text.title}
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
              {text.description}
              <span className="ml-2 inline-flex items-center gap-2 rounded-full border border-cyan-200/40 bg-[linear-gradient(135deg,rgba(34,211,238,0.22),rgba(14,165,233,0.12))] px-4 py-1.5 text-[0.78rem] font-bold tracking-wide text-cyan-50 shadow-[0_0_28px_rgba(34,211,238,0.38)] backdrop-blur-md">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(165,243,252,0.95)]" />
                {text.sourceBadge}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={localizePath('/', locale)}
              className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-1.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-200"
            >
              {text.home}
            </Link>
            <Link
              href={localizePath('/line-kb', locale)}
              className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              {text.lineKb}
            </Link>
          </div>
        </div>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {modules.map((entry, index) => (
            <Card key={entry.id} entry={entry} locale={locale} text={text} index={index} />
          ))}
        </section>

        <section className="mt-10 rounded-[1.75rem] border border-fuchsia-400/20 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.88))] p-6 shadow-[0_20px_80px_rgba(168,85,247,0.12)] ring-1 ring-white/5 sm:p-8">
          <div className="flex flex-col gap-4 border-b border-white/8 pb-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="inline-flex items-center rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-fuchsia-200">
                {text.releaseEyebrow}
              </p>
              <h2 className="text-2xl font-black tracking-tight text-white">{text.releaseTitle}</h2>
              <p className="max-w-3xl text-sm leading-7 text-slate-400">{text.releaseDescription}</p>
            </div>

            <div className="text-sm text-slate-400">
              {releaseCandidates.length} {text.releaseCount}
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {releaseCandidates.map((entry, index) => (
              <Card key={entry.id} entry={entry} locale={locale} text={text} index={modules.length + index} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}