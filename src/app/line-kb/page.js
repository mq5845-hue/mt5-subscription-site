import { headers } from 'next/headers';
import Link from 'next/link';
import { localizePath } from '../../lib/locale';
import EmojiAvatar from '../../components/EmojiAvatar';

const resourceEmojis = { '/': '🏠', '/line-kb/formal-tree': '🌳', '/line-kb/flex-template': '💬', '/line-kb/spec': '📐', '/line-kb/expansion': '🌱', '/line-kb/backend-export': '📦', '/line-kb/reservation': '📅' };
const knowledgeEmojis = { highlights: ['👋', '🧭', '💡', '🌱', '📤'], story: ['✨', '🤝', '🎯'], expansion: ['🧱', '🎨', '🔄'], process: ['📥', '💬', '📈'] };

const localeCopy = {
  en: {
    metadataTitle: 'Knowledge Base | AI-Quant Lab',
    metadataDescription: 'A practical LINE knowledge base for AI-Quant Lab product guidance, reservations, and response workflows.',
    eyebrow: 'KNOWLEDGE BASE',
    title: 'AI-Quant Lab Knowledge Base',
    lead: 'A structured response system for brand guidance, reservations, product education, and fast customer navigation.',
    badges: ['Public entry', 'FAQ ready', 'Exportable'],
    quickLinks: [
      { href: '/', label: 'Back to home', note: 'Return to the AI-Quant Lab brand homepage and choose the next path.' },
      { href: '/line-kb/formal-tree', label: 'Formal FAQ Tree', note: 'A structured question map for consistent customer support responses.' },
      { href: '/line-kb/flex-template', label: 'Flex Templates', note: 'Reusable LINE message layouts for clear, compact, and actionable replies.' },
      { href: '/line-kb/spec', label: 'Engineering Specification', note: 'The implementation rules behind the knowledge-base response flow.' },
      { href: '/line-kb/expansion', label: 'FAQ Expansion', note: 'A growth framework for expanding the FAQ library without losing consistency.' },
      { href: '/line-kb/backend-export', label: 'Backend Export', note: 'Export the knowledge base as Markdown or JSON for backup and deployment.' },
      { href: '/line-kb/reservation', label: 'Reservation Form', note: 'Connect the customer journey to the Google reservation form.' },
    ],
    highlights: [
      { kicker: '01 / Entry', title: 'Start with the clearest customer path', description: 'Use the homepage, feature guide, brand story, and reservation entry points as a simple first layer for every visitor.' },
      { kicker: '02 / Navigation', title: 'Guide customers with fewer messages', description: 'A clear menu reduces repeated questions and moves each visitor to the right resource without long manual replies.' },
      { kicker: '03 / Flow', title: 'Turn questions into useful next steps', description: 'Pair FAQ answers with compact LINE cards, knowledge links, and reservation actions so every reply has a purpose.' },
      { kicker: '04 / Expansion', title: 'Scale beyond the first FAQ set', description: 'Add new questions through a repeatable structure that keeps tone, routing, and answer quality consistent.' },
      { kicker: '05 / Export', title: 'Keep the knowledge base portable', description: 'Maintain a clean Markdown or JSON export so the content can be backed up, reviewed, and reused across channels.' },
    ],
    journeyEyebrow: 'CUSTOMER JOURNEY',
    journeyTitle: 'One clear route from question to action',
    journeyText: 'The knowledge base is designed as a guided path: understand the brand, explore the right resource, then take the next action with confidence.',
    journeyCardLabel: 'OPEN RESOURCE',
    storyEyebrow: 'WHY THIS STRUCTURE',
    story: [
      { title: 'Clear first contact', text: 'Every visitor should quickly understand what AI-Quant Lab offers and where to begin.' },
      { title: 'Consistent answers', text: 'The same question should receive the same helpful direction across Android, iPhone, and web experiences.' },
      { title: 'Actionable follow-up', text: 'Each answer should end with a useful link, a button, or a reservation path instead of a dead end.' },
    ],
    signals: ['Brand entry is easy to find', 'FAQ routes are organized by intent', 'Buttons lead to the next useful action', 'Content can be exported and maintained'],
    expansionEyebrow: 'GROWTH SYSTEM',
    expansion: [
      { title: 'Reusable answer blocks', text: 'Keep frequently used explanations short, readable, and easy to update.' },
      { title: 'Consistent visual language', text: 'Use the same labels, card hierarchy, and link behavior throughout the LINE experience.' },
      { title: 'Continuous improvement', text: 'Review real questions, add missing routes, and improve the next response without rebuilding the whole system.' },
    ],
    process: [
      { step: '01', title: 'Receive the question', text: 'Identify the visitor intent and route it to the closest FAQ or guided option.' },
      { step: '02', title: 'Give the right context', text: 'Answer in plain language, then provide a focused link or button for the next step.' },
      { step: '03', title: 'Measure and improve', text: 'Review unanswered questions and update the knowledge base so the flow gets stronger over time.' },
    ],
    closingEyebrow: 'READY TO EXPLORE',
    closingTitle: 'Choose a resource and continue the journey',
    open: 'OPEN',
    resource: 'Resource',
  },
  'zh-Hant': {
    metadataTitle: '知識庫 | AI-Quant Lab',
    metadataDescription: 'AI-Quant Lab 的 LINE 知識庫，整理品牌導覽、預約、產品教育與回應流程。',
    eyebrow: '知識庫',
    title: 'AI-Quant Lab 知識庫',
    lead: '把品牌導覽、預約、產品教育與客戶回應，整理成清楚、可持續維護的入口。',
    badges: ['公開入口', 'FAQ 就緒', '可匯出'],
    quickLinks: [
      { href: '/', label: '回首頁', note: '回到 AI-Quant Lab 品牌首頁，選擇下一步路徑。' },
      { href: '/line-kb/formal-tree', label: '正式 FAQ 樹', note: '以結構化問題地圖，維持一致的客戶回應。' },
      { href: '/line-kb/flex-template', label: 'Flex 模板', note: '可重複使用的 LINE 訊息版型，讓回覆清楚又精簡。' },
      { href: '/line-kb/spec', label: '工程師規格書', note: '知識庫回應流程背後的實作規則。' },
      { href: '/line-kb/expansion', label: 'FAQ 擴充藍圖', note: '持續擴充 FAQ，同時維持內容一致性。' },
      { href: '/line-kb/backend-export', label: '後台匯出', note: '將知識庫匯出成 Markdown 或 JSON，方便備份與部署。' },
      { href: '/line-kb/reservation', label: '預約表單', note: '將客戶旅程連接到 Google 預約報名表單。' },
    ],
    highlights: [
      { kicker: '01 / 先看懂系統', title: '從最清楚的客戶路徑開始', description: '以首頁、功能說明、品牌故事與預約入口，建立每位訪客都能理解的第一層導覽。' },
      { kicker: '02 / 導覽', title: '用更少訊息帶客戶前進', description: '清楚的選單能減少重複提問，讓訪客不用等待長篇人工回覆。' },
      { kicker: '03 / 流程', title: '把問題轉成有用的下一步', description: '讓 FAQ 答案搭配 LINE 卡片、知識連結與預約動作，每則回覆都有明確目的。' },
      { kicker: '04 / 擴充', title: '從第一批 FAQ 持續成長', description: '透過可重複的結構加入新問題，維持語氣、導流與答案品質。' },
      { kicker: '05 / 匯出', title: '讓知識庫保持可攜', description: '維護乾淨的 Markdown 或 JSON 匯出檔，方便備份、檢查與跨通路使用。' },
    ],
    journeyEyebrow: '客戶旅程',
    journeyTitle: '從提問到行動的一條清楚路徑',
    journeyText: '知識庫是一條有引導的路徑：先理解品牌，再找到適合的資源，最後放心採取下一步。',
    journeyCardLabel: '開啟資源',
    storyEyebrow: '為什麼這樣設計',
    story: [
      { title: '第一次接觸就看懂', text: '每位訪客都應該快速知道 AI-Quant Lab 提供什麼，以及應該從哪裡開始。' },
      { title: '回應保持一致', text: '同一個問題，在 Android、iPhone 與網站體驗中，都應該得到一致且有用的方向。' },
      { title: '回覆一定能行動', text: '每個答案最後都應該有連結、按鈕或預約路徑，而不是讓客戶停在原地。' },
    ],
    signals: ['品牌入口容易找到', 'FAQ 依照意圖整理', '按鈕都導向下一個有用動作', '內容可以匯出與維護'],
    expansionEyebrow: '成長系統',
    expansion: [
      { title: '可重複使用的回答區塊', text: '把常用說明維持短、清楚，而且容易更新。' },
      { title: '一致的視覺語言', text: '在 LINE 體驗中維持相同的標籤、卡片層級與連結行為。' },
      { title: '持續改善', text: '檢查真實提問、補上缺少的路徑，逐步改善下一次回覆。' },
    ],
    process: [
      { step: '01', title: '接收問題', text: '判斷訪客意圖，導向最接近的 FAQ 或引導選項。' },
      { step: '02', title: '提供適當脈絡', text: '用白話回答，再提供聚焦的連結或按鈕作為下一步。' },
      { step: '03', title: '檢查並改善', text: '整理尚未回答的問題，讓知識庫流程持續變得更完整。' },
    ],
    closingEyebrow: '準備開始探索',
    closingTitle: '選擇一項資源，繼續你的旅程',
    open: '開啟',
    resource: '資源',
  },
  'zh-Hans': {
    metadataTitle: '知识库 | AI-Quant Lab',
    metadataDescription: 'AI-Quant Lab 的 LINE 知识库，整理品牌导览、预约、产品教育与回应流程。',
    eyebrow: '知识库',
    title: 'AI-Quant Lab 知识库',
    lead: '把品牌导览、预约、产品教育与客户回应，整理成清楚、可持续维护的入口。',
    badges: ['公开入口', 'FAQ 就绪', '可汇出'],
    quickLinks: [
      { href: '/', label: '回首页', note: '回到 AI-Quant Lab 品牌首页，选择下一步路径。' },
      { href: '/line-kb/formal-tree', label: '正式 FAQ 树', note: '以结构化问题地图，维持一致的客户回应。' },
      { href: '/line-kb/flex-template', label: 'Flex 模板', note: '可重复使用的 LINE 消息版型，让回复清楚又精简。' },
      { href: '/line-kb/spec', label: '工程师规格书', note: '知识库回应流程背后的实作规则。' },
      { href: '/line-kb/expansion', label: 'FAQ 扩充蓝图', note: '持续扩充 FAQ，同时维持内容一致性。' },
      { href: '/line-kb/backend-export', label: '后台汇出', note: '将知识库汇出成 Markdown 或 JSON，方便备份与部署。' },
      { href: '/line-kb/reservation', label: '预约表单', note: '将客户旅程连接到 Google 预约报名表单。' },
    ],
    highlights: [
      { kicker: '01 / 先看懂系统', title: '从最清楚的客户路径开始', description: '以首页、功能说明、品牌故事与预约入口，建立每位访客都能理解的第一层导览。' },
      { kicker: '02 / 导览', title: '用更少讯息带客户前进', description: '清楚的选单能减少重复提问，让访客不用等待长篇人工回复。' },
      { kicker: '03 / 流程', title: '把问题转成有用的下一步', description: '让 FAQ 答案搭配 LINE 卡片、知识连结与预约动作，每则回复都有明确目的。' },
      { kicker: '04 / 扩充', title: '从第一批 FAQ 持续成长', description: '透过可重复的结构加入新问题，维持语气、导流与答案品质。' },
      { kicker: '05 / 汇出', title: '让知识库保持可携', description: '维护干净的 Markdown 或 JSON 汇出档，方便备份、检查与跨通路使用。' },
    ],
    journeyEyebrow: '客户旅程',
    journeyTitle: '从提问到行动的一条清楚路径',
    journeyText: '知识库是一条有引导的路径：先理解品牌，再找到适合的资源，最后放心采取下一步。',
    journeyCardLabel: '开启资源',
    storyEyebrow: '为什么这样设计',
    story: [
      { title: '第一次接触就看懂', text: '每位访客都应该快速知道 AI-Quant Lab 提供什么，以及应该从哪里开始。' },
      { title: '回应保持一致', text: '同一个问题，在 Android、iPhone 与网站体验中，都应该得到一致且有用的方向。' },
      { title: '回复一定能行动', text: '每个答案最后都应该有连结、按钮或预约路径，而不是让客户停在原地。' },
    ],
    signals: ['品牌入口容易找到', 'FAQ 依照意图整理', '按钮都导向下一个有用动作', '内容可以汇出与维护'],
    expansionEyebrow: '成长系统',
    expansion: [
      { title: '可重复使用的回答区块', text: '把常用说明维持短、清楚，而且容易更新。' },
      { title: '一致的视觉语言', text: '在 LINE 体验中维持相同的标签、卡片层级与连结行为。' },
      { title: '持续改善', text: '检查真实提问、补上缺少的路径，逐步改善下一次回复。' },
    ],
    process: [
      { step: '01', title: '接收问题', text: '判断访客意图，导向最接近的 FAQ 或引导选项。' },
      { step: '02', title: '提供适当脉络', text: '用白话回答，再提供聚焦的连结或按钮作为下一步。' },
      { step: '03', title: '检查并改善', text: '整理尚未回答的问题，让知识库流程持续变得更完整。' },
    ],
    closingEyebrow: '准备开始探索',
    closingTitle: '选择一项资源，继续你的旅程',
    open: '开启',
    resource: '资源',
  },
};

export async function generateMetadata({ searchParams }) {
  const requestHeaders = await headers();
  const params = await searchParams;
  const queryLocale = Array.isArray(params?.__locale) ? params.__locale[0] : params?.__locale;
  const locale = queryLocale || requestHeaders.get('x-site-locale') || 'en';
  const text = localeCopy[locale] || localeCopy['zh-Hant'];
  return { title: text.metadataTitle, description: text.metadataDescription };
}

function NavLinks({ locale, text }) {
  return (
    <div className="flex flex-wrap justify-end gap-2">
      {text.quickLinks.map((item) => (
        <Link
          key={item.href}
          href={localizePath(item.href, locale)}
          className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold tracking-[0.08em] text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/15 hover:text-white"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function ResourceCard({ item, locale, text }) {
  return (
    <Link
      href={localizePath(item.href, locale)}
      className="group rounded-[1.25rem] border border-cyan-400/15 bg-slate-950/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-slate-950/80"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-cyan-300"><EmojiAvatar emoji={resourceEmojis[item.href] || '📚'} />{text.resource}</p>
          <h3 className="mt-3 text-xl font-bold text-white transition group-hover:text-cyan-200">{item.label}</h3>
        </div>
        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-cyan-200">
          {text.open}
        </span>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-300">{item.note}</p>
    </Link>
  );
}

export default async function LineKbPage({ searchParams }) {
  const requestHeaders = await headers();
  const params = await searchParams;
  const queryLocale = Array.isArray(params?.__locale) ? params.__locale[0] : params?.__locale;
  const locale = queryLocale || requestHeaders.get('x-site-locale') || 'en';
  const text = localeCopy[locale] || localeCopy['zh-Hant'];

  return (
    <main className="min-h-screen bg-[#050816] text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.16),transparent_26%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.12),transparent_24%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.55),rgba(2,6,23,0.9))]" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <header className="rounded-[1.75rem] border border-cyan-400/15 bg-white/[0.03] p-5 shadow-[0_20px_80px_rgba(8,145,178,0.14)] backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex flex-wrap gap-2">
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-semibold tracking-[0.2em] text-cyan-200">
                    {text.eyebrow}
                  </span>
                  {text.badges.map((badge) => (
                    <span key={badge} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-slate-300">
                      {badge}
                    </span>
                  ))}
                </div>
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">{text.title}</h1>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">{text.lead}</p>
                </div>
              </div>
              <div className="lg:pt-2">
                <NavLinks locale={locale} text={text} />
              </div>
            </div>
          </header>

          <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {text.highlights.map((card, index) => (
              <article key={card.title} className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-cyan-300"><EmojiAvatar emoji={knowledgeEmojis.highlights[index % knowledgeEmojis.highlights.length]} />{card.kicker}</p>
                <h2 className="mt-3 text-lg font-bold text-white">{card.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{card.description}</p>
              </article>
            ))}
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 shadow-[0_18px_60px_rgba(15,23,42,0.22)] backdrop-blur-xl sm:p-7">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold tracking-[0.2em] text-cyan-300">{text.journeyEyebrow}</p>
              <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">{text.journeyTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{text.journeyText}</p>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {text.quickLinks.map((item) => (
                <ResourceCard key={item.href} item={item} locale={locale} text={text} />
              ))}
            </div>
          </section>

          <section className="mt-8 grid gap-4 lg:grid-cols-3">
            {text.story.map((block, index) => (
              <article key={block.title} className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-cyan-300"><EmojiAvatar emoji={knowledgeEmojis.story[index % knowledgeEmojis.story.length]} tone="violet" />{text.storyEyebrow}</p>
                <h2 className="mt-3 text-2xl font-bold text-white">{block.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{block.text}</p>
              </article>
            ))}
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 sm:p-7">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {text.signals.map((row) => (
                <div key={row} className="rounded-[1.25rem] border border-cyan-400/14 bg-slate-950/60 px-4 py-4 text-sm font-medium leading-6 text-slate-200">
                  {row}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 grid gap-4 lg:grid-cols-3">
            {text.expansion.map((card, index) => (
              <article key={card.title} className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-cyan-300"><EmojiAvatar emoji={knowledgeEmojis.expansion[index % knowledgeEmojis.expansion.length]} tone="emerald" />{text.expansionEyebrow}</p>
                <h2 className="mt-3 text-2xl font-bold text-white">{card.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{card.text}</p>
              </article>
            ))}
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 sm:p-7">
            <div className="grid gap-4 md:grid-cols-3">
              {text.process.map((item, index) => (
                <article key={item.step} className="rounded-[1.25rem] border border-cyan-400/14 bg-slate-950/60 p-5">
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-2 font-mono text-sm font-black text-cyan-200"><EmojiAvatar emoji={knowledgeEmojis.process[index % knowledgeEmojis.process.length]} tone="emerald" /><span>{item.step}</span></div>
                  <h3 className="mt-4 text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-cyan-400/12 bg-[linear-gradient(180deg,rgba(8,15,31,0.76),rgba(3,7,18,0.92))] p-5 sm:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">{text.closingEyebrow}</p>
                <h2 className="mt-2 text-2xl font-black text-white">{text.closingTitle}</h2>
              </div>
              <div className="flex justify-start md:justify-end">
                <NavLinks locale={locale} text={text} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}