import Link from 'next/link';
import { localizePath } from '@/lib/locale';

const copies = {
  en: {
    nav: [
      ['Knowledge Base', '/line-kb'],
      ['FAQ Tree', '/line-kb/formal-tree'],
      ['Flex Templates', '/line-kb/flex-template'],
      ['Engineering Spec', '/line-kb/spec'],
      ['FAQ Expansion', '/line-kb/expansion'],
      ['Backend Export', '/line-kb/backend-export'],
    ],
    back: 'Back to knowledge base',
    open: 'OPEN',
    formal: {
      eyebrow: 'FORMAL FAQ TREE',
      title: 'A clear route from question to action',
      lead: 'A practical 12-question structure that helps new visitors feel safe, gives advanced visitors useful context, and keeps every conversation moving.',
      cards: [
        ['01', 'Start with the basics', 'Explain what AI-Quant Lab is, who it is for, and where a first-time visitor should begin.'],
        ['02', 'Find the right branch', 'Separate brand, product, technical, and reservation questions so each visitor sees the closest answer.'],
        ['03', 'Keep the next step visible', 'Every answer should end with a useful link, button, or resource instead of a dead end.'],
        ['04', 'Review and improve', 'Use real questions to refine the tree and make future replies faster and more consistent.'],
      ],
      principlesTitle: 'Three rules for a stable FAQ tree',
      principles: [
        ['Start', 'Answer what this is first, so new visitors gain confidence.'],
        ['Branch', 'Answer how it works next, so advanced visitors can see the structure.'],
        ['Exit', 'Answer what to do next, so the conversation can move forward.'],
      ],
      footer: 'Keep the same quick resources at the bottom of every page.',
    },
    flex: {
      eyebrow: 'FLEX TEMPLATES',
      title: 'Reusable LINE reply layouts',
      lead: 'Use short, standard, extended, and button-led templates to keep replies readable, consistent, and easy to act on.',
      cards: [
        ['Short answer', 'Q: <visitor question>\\nA: <one clear conclusion>\\n\\nUse this for the first reply and keep the reading rhythm light.'],
        ['Standard answer', 'Q: <visitor question>\\nA: <plain-language answer>\\nContext: <technical explanation>\\n\\nUse this for most FAQ conversations.'],
        ['Extended answer', 'Q: <visitor question>\\nA: <plain-language answer>\\nTechnical: <architecture and detail>\\nStory: <brand context>\\nNext: <CTA>'],
        ['Button-led answer', 'Q: <visitor question>\\nA: <plain-language answer>\\n\\nOffer buttons for the feature guide, brand story, knowledge base, or reservation list.'],
      ],
      principlesTitle: 'A reliable reply has three layers',
      principles: [
        ['Question', 'Keep the visitor question visible so the response feels relevant.'],
        ['Answer', 'Lead with a plain-language conclusion before adding detail.'],
        ['CTA', 'Always provide a focused next action when the visitor is ready.'],
      ],
      footer: 'Use the same template rhythm across every LINE reply.',
    },
    spec: {
      eyebrow: 'ENGINEERING SPECIFICATION',
      title: 'Rules for a maintainable response system',
      lead: 'This page turns the LINE knowledge base into an operational standard. Clear specifications keep templates, website pages, and FAQ content aligned.',
      rows: [
        ['Purpose', 'Write the response rules, routing points, and maintenance standard as a deliverable system.'],
        ['Input format', 'Use Q / A as the base, then add keywords, supporting context, and a clear CTA when needed.'],
        ['Response layers', 'Keep plain-language, technical, and vision layers so the answer can expand on demand.'],
        ['Routing', 'Guide visitors to the homepage, reservation list, resource page, or next key screen.'],
        ['Maintenance', 'Update the specification first, then the template, and finally the public FAQ copy.'],
        ['Fallback', 'When intent is unclear, use a safe prompt and ask for a more specific keyword.'],
      ],
      sections: [
        ['Maintenance order', 'Update the specification, then the templates, and only then the public-facing copy.'],
        ['Usage principle', 'Every reply should provide reassurance first, technical clarity second, and action last.'],
      ],
      footer: 'Keep the same three quick resources in the footer.',
    },
  },
  'zh-Hant': {
    nav: [
      ['知識庫入口', '/line-kb'],
      ['正式圖解樹', '/line-kb/formal-tree'],
      ['Flex 模板', '/line-kb/flex-template'],
      ['工程師規格書', '/line-kb/spec'],
      ['FAQ 擴充藍圖', '/line-kb/expansion'],
      ['後台匯出', '/line-kb/backend-export'],
    ],
    back: '回知識庫入口',
    open: '開啟',
    formal: {
      eyebrow: '正式 FAQ 樹',
      title: '從提問到行動的清楚路徑',
      lead: '以 12 個問題整理新手入口、進階脈絡與下一步導流，讓每段對話都能繼續往前。',
      cards: [['01', '先回答基礎', '先說明 AI-Quant Lab 是什麼、適合誰，以及第一次應該從哪裡開始。'], ['02', '找到正確分支', '依品牌、產品、技術與預約問題分流，讓訪客看到最接近的答案。'], ['03', '保留下一步', '每個答案最後都放上連結、按鈕或資源，不讓對話停住。'], ['04', '持續檢查改善', '根據真實提問更新題樹，讓往後回覆更快、更一致。']],
      principlesTitle: '穩定 FAQ 樹的三個原則',
      principles: [['起點', '先回答這是什麼，讓新手有安全感。'], ['分支', '再回答怎麼運作，讓進階者看見架構。'], ['出口', '最後回答下一步是什麼，讓對話繼續前進。']],
      footer: '每個頁面頁尾都保留相同的快捷資源。',
    },
    flex: {
      eyebrow: 'FLEX 模板',
      title: '可重複使用的 LINE 回覆版型',
      lead: '用短答、標準、延伸與按鈕導流模板，讓回覆清楚一致，也更容易採取行動。',
      cards: [['短答版', 'Q：<訪客問題>\\nA：<一句清楚結論>\\n\\n適合第一層回覆，先維持閱讀節奏。'], ['標準版', 'Q：<訪客問題>\\nA：<白話回答>\\n補充：<技術說明>\\n\\n適合大多數 FAQ 問答。'], ['延伸版', 'Q：<訪客問題>\\nA：<白話回答>\\n技術：<架構與細節>\\n故事：<品牌脈絡>\\n下一步：<CTA>'], ['按鈕導流版', 'Q：<訪客問題>\\nA：<白話回答>\\n\\n提供功能說明、品牌故事、知識庫或預約名單按鈕。']],
      principlesTitle: '穩定回覆的三個層次',
      principles: [['問題', '保留訪客問題，讓回覆明確對應。'], ['答案', '先給白話結論，再補充必要細節。'], ['CTA', '訪客準備好時，提供聚焦的下一個動作。']],
      footer: '所有 LINE 回覆都使用相同的模板節奏。',
    },
    spec: {
      eyebrow: '工程師規格書',
      title: '可長期維護的回應系統規則',
      lead: '把 LINE 知識庫整理成操作標準，讓模板、網站頁面與 FAQ 內容保持一致。',
      rows: [['建立目的', '把回覆規格、導流節點與維護標準整理成可交付系統。'], ['輸入格式', '以 Q / A 為主，必要時加入關鍵字、補充說明與 CTA。'], ['回答層級', '保留白話、技術與願景三層，方便按需求延伸。'], ['導流方式', '把使用者帶到首頁、預約名單、資源頁或下一個關鍵畫面。'], ['維護標準', '先改規格，再改模板，最後才改對外 FAQ 文案。'], ['失敗處理', '無法辨識問題時，先給安全提示，再請訪客輸入更明確關鍵字。']],
      sections: [['維護順序', '先改規格書，再改模板，最後才改對外文案。'], ['使用原則', '所有回覆先有安全感，再有技術感，最後導向行動。']],
      footer: '頁尾保留相同的三個快捷資源。',
    },
  },
};

const copy = (locale, type) => copies[locale]?.[type] || copies['zh-Hant'][type];
const navCopy = (locale) => copies[locale]?.nav || copies['zh-Hant'].nav;

function NavLinks({ locale }) {
  return (
    <div className="flex flex-wrap justify-end gap-2">
      {navCopy(locale).map(([label, href]) => (
        <Link key={href} href={localizePath(href, locale)} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold tracking-[0.08em] text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/15 hover:text-white">
          {label}
        </Link>
      ))}
    </div>
  );
}

export default function LineKbSimplePage({ locale, type }) {
  const text = copy(locale, type);
  return (
    <main className="min-h-screen bg-[#050816] text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.16),transparent_26%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.12),transparent_24%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.55),rgba(2,6,23,0.92))]" />
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <header className="rounded-[1.75rem] border border-cyan-400/15 bg-white/[0.03] p-5 shadow-[0_20px_80px_rgba(8,145,178,0.14)] backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-semibold tracking-[0.2em] text-cyan-200">{text.eyebrow}</div>
                <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">{text.title}</h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">{text.lead}</p>
              </div>
              <div className="lg:pt-2"><NavLinks locale={locale} /></div>
            </div>
          </header>

          {type === 'spec' ? (
            <>
              <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 sm:p-7">
                <div className="overflow-hidden rounded-[1.35rem] border border-cyan-400/12">
                  {text.rows.map(([label, value]) => (
                    <div key={label} className="grid gap-3 border-b border-cyan-400/10 bg-slate-950/55 p-5 last:border-b-0 md:grid-cols-[180px_1fr]">
                      <div className="text-sm font-semibold tracking-wide text-cyan-200">{label}</div>
                      <div className="text-sm leading-7 text-slate-300">{value}</div>
                    </div>
                  ))}
                </div>
              </section>
              <section className="mt-8 grid gap-4 lg:grid-cols-2">
                {text.sections.map(([title, body]) => (
                  <article key={title} className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5">
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                    <p className="mt-4 text-sm leading-7 text-slate-300">{body}</p>
                  </article>
                ))}
              </section>
            </>
          ) : (
            <>
              <section className="mt-8 grid gap-4 lg:grid-cols-2">
                {text.cards.map(([id, title, body]) => (
                  <article key={id} className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5">
                    {type === 'formal' ? (
                      <div className="flex items-center gap-3"><span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-sm font-black text-cyan-200">{id}</span><h2 className="text-2xl font-bold text-white">{title}</h2></div>
                    ) : (
                      <h2 className="text-2xl font-bold text-white">{title}</h2>
                    )}
                    <pre className="mt-4 whitespace-pre-wrap rounded-[1.25rem] border border-cyan-400/12 bg-slate-950/70 p-4 text-sm leading-7 text-cyan-100">{body}</pre>
                  </article>
                ))}
              </section>
              <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 sm:p-7">
                <h2 className="text-2xl font-bold text-white">{text.principlesTitle}</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {text.principles.map(([title, body]) => (
                    <article key={title} className="rounded-[1.25rem] border border-cyan-400/14 bg-slate-950/60 p-5">
                      <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">{title}</p>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{body}</p>
                    </article>
                  ))}
                </div>
              </section>
            </>
          )}

          <section className="mt-8 rounded-[1.75rem] border border-cyan-400/12 bg-[linear-gradient(180deg,rgba(8,15,31,0.76),rgba(3,7,18,0.92))] p-5 sm:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div><p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">{text.back}</p><h2 className="mt-2 text-2xl font-black text-white">{text.footer}</h2></div>
              <NavLinks locale={locale} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}