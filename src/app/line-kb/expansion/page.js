import { headers } from 'next/headers';
import Link from 'next/link';
import { lineKnowledgeExpansion } from '@/data/lineKnowledgeExpansion';
import { topicTreeNodes } from '@/data/lineTopicTree';
import { localizePath } from '@/lib/locale';

export const metadata = { title: 'FAQ Expansion | AI-Quant Lab', description: 'A scalable FAQ expansion system for the AI-Quant Lab LINE knowledge base.' };

const copy = {
  en: {
    eyebrow: 'FAQ EXPANSION',
    title: 'Grow the FAQ system without losing clarity',
    lead: 'A practical expansion framework for adding synonyms, related questions, and guided actions while keeping the LINE experience consistent.',
    back: 'Knowledge Base',
    export: 'Backend Export',
    notice: 'The website and LINE response flow are still being tested and refined. Join the reservation list to receive the next release update.',
    rulesTitle: 'Expansion rules',
    rules: ['Start from real visitor questions.', 'Group synonyms under one intent.', 'Keep the first answer short.', 'End with a clear action.', 'Review unanswered questions regularly.'],
    familiesTitle: 'Topic families',
    familyLabel: 'FAMILY',
    templatesTitle: 'Question templates',
    templateLabel: 'QUESTION TEMPLATE',
    previewTitle: 'LINE backend preview',
    preview: 'Q: What is AI-Quant Lab?\\nA: AI-Quant Lab combines AI-assisted modular research with quantitative trading education.\\n\\nNext: Choose the feature guide, knowledge base, or reservation list.',
    flowTitle: 'A simple response funnel',
    flow: ['Understand the visitor intent.', 'Answer with the closest FAQ.', 'Offer a resource or reservation action.'],
    footer: 'Return to the core pages whenever you need a clear next step.',
  },
  'zh-Hant': {
    eyebrow: 'FAQ 擴充藍圖',
    title: '持續擴充 FAQ，同時維持清楚',
    lead: '用可重複的方式加入同義問法、延伸問題與導流動作，維持 LINE 體驗一致。',
    back: '知識庫入口',
    export: '後台匯出',
    notice: '網站與 LINE 回應流程仍在測試與優化中，歡迎先加入預約名單，等候下一版通知。',
    rulesTitle: '擴充規則',
    rules: ['從真實訪客問題開始。', '把同義問法歸到同一意圖。', '第一層回答保持精簡。', '最後一定提供明確動作。', '定期檢查尚未回答的問題。'],
    familiesTitle: '主題家族',
    familyLabel: '家族',
    templatesTitle: '問題模板',
    templateLabel: '問題模板',
    previewTitle: 'LINE 後台格式預覽',
    preview: 'Q：AI-Quant Lab 是什麼？\\nA：AI-Quant Lab 結合 AI 輔助模組化研究與量化交易教育。\\n\\n下一步：選擇功能說明、知識庫或預約名單。',
    flowTitle: '簡單的回應漏斗',
    flow: ['判斷訪客意圖。', '回答最接近的 FAQ。', '提供資源或預約動作。'],
    footer: '需要下一步時，回到三個核心頁面即可。',
  },
};


const englishFamilies = [
  { id: 'family-about', title: 'About AI-Quant Lab', summary: 'Who we are, what we build, and how our approach differs from a typical software service.' },
  { id: 'family-start', title: 'Getting Started', summary: 'Where to begin, which page to read next, and how much technical knowledge you need.' },
  { id: 'family-safety', title: 'Safety and Boundaries', summary: 'Clear boundaries around software, education, trading decisions, and fund custody.' },
  { id: 'family-code', title: 'Source Code and Modules', summary: 'The source code, modular architecture, and the ways the system can be extended.' },
  { id: 'family-subscription', title: 'Subscription and Reservation', summary: 'How to join, when access opens, and how the reservation flow works.' },
  { id: 'family-line', title: 'LINE Guidance and Replies', summary: 'What LINE can answer, how visitors choose the next step, and why replies stay concise.' },
  { id: 'family-growth', title: 'Vision and Updates', summary: 'Where the brand is going, how the knowledge base grows, and what gets updated next.' },
];

const englishTemplates = [
  'Q: What is AI-Quant Lab? A: A structured learning and source-code environment for MQL5, AI workflows, and quantitative trading.',
  'Q: How do I get started? A: Begin with the home page, then follow the knowledge base and module guide.',
  'Q: What should I read next? A: Choose the feature guide, brand story, knowledge base, or reservation list.',
  'Q: Can I view one module at a time? A: Yes. Each module has its own page and implementation reference.',
  'Q: Is this an investment service? A: No. It provides software, education, source code, and structured research resources.',
  'Q: How does the LINE assistant help? A: It turns common questions into short answers and clear selectable next steps.',
  'Q: What is included in membership? A: Access depends on the selected plan and the resources published for that membership.',
  'Q: Will the knowledge base be updated? A: Yes. New questions and module releases are used to improve the system.',
  'Q: How can I reserve access? A: Select the reservation action and follow the latest release instructions.',
  'Q: Where can I see the full structure? A: Use the knowledge base, topic tree, and modular blocks pages.',
];

const englishQuestions = {
  'family-about': ['What is AI-Quant Lab?', 'Are you an engineering team or a learning brand?', 'How is this different from a typical investment group?'],
  'family-start': ['Where should a first-time visitor begin?', 'Do I need technical experience to start?', 'Which page explains the next step?'],
  'family-safety': ['Is this an investment management service?', 'How are trading decisions handled?', 'Does the platform hold customer funds?'],
  'family-code': ['What are the 25 modular building blocks?', 'Can I read each module separately?', 'Can the source-code system be extended?'],
  'family-subscription': ['How do I join?', 'When will the membership open?', 'How do I reserve a place?'],
  'family-line': ['What can the LINE knowledge base answer?', 'Can I choose a reply instead of typing?', 'Why are the replies structured in layers?'],
  'family-growth': ['Will the knowledge base keep growing?', 'What is the long-term direction?', 'How are new questions added?'],
};

function englishQuestion(familyId, index, title) {
  return englishQuestions[familyId]?.[index] || `Explore ${title} question ${index + 1}`;
}
export default async function LineKbExpansionPage({ searchParams }) {
  const requestHeaders = await headers();
  const params = await searchParams;
  const queryLocale = Array.isArray(params?.__locale) ? params.__locale[0] : params?.__locale;
  const locale = queryLocale || requestHeaders.get('x-site-locale') || 'en';
  const text = copy[locale] || copy['zh-Hant'];
  const expansion = lineKnowledgeExpansion.topicTreeExpansion;
  const blueprint = lineKnowledgeExpansion.topicTreeBlueprint;
  const grouped = topicTreeNodes.reduce((acc, node) => {
    acc[node.familyId] = [...(acc[node.familyId] || []), node];
    return acc;
  }, {});
  const isEnglish = locale === 'en';
  const templates = isEnglish ? englishTemplates : (expansion?.templates || []);
  const families = isEnglish ? englishFamilies : (blueprint?.families || []);

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
                <div className="mt-4 rounded-2xl border border-amber-300/25 bg-amber-300/10 px-4 py-3 text-sm leading-7 text-amber-50 shadow-[0_0_28px_rgba(251,191,36,0.14)]">{text.notice}</div>
              </div>
              <div className="flex flex-wrap gap-2 lg:pt-2">
                <Link href={localizePath('/line-kb/backend-export', locale)} className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-cyan-100 transition hover:bg-cyan-300/18">{text.export}</Link>
                <Link href={localizePath('/line-kb', locale)} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-slate-100 transition hover:border-cyan-300/30 hover:bg-cyan-300/10">{text.back}</Link>
              </div>
            </div>
          </header>

          <section className="mt-8 rounded-[1.75rem] border border-amber-300/15 bg-amber-300/8 p-5 shadow-[0_16px_50px_rgba(251,191,36,0.08)] ring-1 ring-white/5 sm:p-7">
            <p className="text-xs font-semibold tracking-[0.22em] text-amber-200">{text.rulesTitle}</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {text.rules.map((rule, index) => <div key={rule} className="rounded-[1.1rem] border border-amber-200/15 bg-slate-950/35 p-4 text-sm leading-7 text-slate-200"><span className="mr-2 font-black text-amber-200">0{index + 1}</span>{rule}</div>)}
            </div>
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(8,15,31,0.82),rgba(3,7,18,0.94))] p-5 shadow-[0_16px_50px_rgba(34,211,238,0.08)] ring-1 ring-white/5 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="text-xs font-semibold tracking-[0.22em] text-cyan-300">{text.familiesTitle}</p><h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">{families.length} {locale === 'en' ? 'topic families' : '個主題家族'}</h2></div>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-cyan-100">{topicTreeNodes.length} {locale === 'en' ? 'nodes' : '個節點'}</span>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {families.map((family) => <article key={family.id} className="rounded-[1.2rem] border border-cyan-300/12 bg-slate-950/55 p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-xs font-semibold tracking-[0.18em] text-cyan-300">{text.familyLabel}</p><h3 className="mt-1 text-lg font-bold text-white">{family.title}</h3></div><span className="rounded-full border border-cyan-300/15 bg-cyan-300/8 px-3 py-1 text-[11px] font-semibold text-cyan-100">{family.id}</span></div><p className="mt-3 text-sm leading-7 text-slate-300">{family.summary}</p><div className="mt-4 flex flex-wrap gap-2">{(grouped[family.id] || []).slice(0, 8).map((node, index) => <span key={node.id} className="rounded-full border border-cyan-300/12 bg-cyan-300/8 px-3 py-1 text-xs font-medium text-cyan-50">{isEnglish ? englishQuestion(family.id, index, family.title) : node.question}</span>)}</div></article>)}
            </div>
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-cyan-400/15 bg-[linear-gradient(180deg,rgba(15,23,42,0.84),rgba(3,7,18,0.94))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5 sm:p-7">
            <p className="text-xs font-semibold tracking-[0.22em] text-cyan-300">{text.templatesTitle}</p>
            <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">{templates.length} {locale === 'en' ? 'reusable patterns' : '組可重複模板'}</h2>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">{templates.slice(0, 10).map((template) => <div key={template} className="rounded-[1.1rem] border border-cyan-300/12 bg-slate-950/60 p-4"><p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">{text.templateLabel}</p><p className="mt-2 text-sm leading-7 text-slate-300">{template}</p></div>)}</div>
            <div className="mt-6 rounded-[1.2rem] border border-cyan-300/12 bg-slate-950/60 p-4"><p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">{text.previewTitle}</p><pre className="mt-3 whitespace-pre-wrap rounded-[1rem] border border-cyan-300/10 bg-[#020617] p-4 text-sm leading-7 text-slate-200">{text.preview}</pre></div>
          </section>

          <section className="mt-8 grid gap-4 lg:grid-cols-3">{text.flow.map((item, index) => <article key={item} className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5"><p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">STEP 0{index + 1}</p><h2 className="mt-3 text-xl font-bold text-white">{text.flowTitle}</h2><p className="mt-3 text-sm leading-7 text-slate-300">{item}</p></article>)}</section>

          <section className="mt-8 rounded-[1.75rem] border border-cyan-400/12 bg-[linear-gradient(180deg,rgba(8,15,31,0.76),rgba(3,7,18,0.92))] p-5 sm:p-7"><h2 className="text-2xl font-black text-white">{text.footer}</h2></section>
        </div>
      </div>
    </main>
  );
}
