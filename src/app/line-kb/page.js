import Link from 'next/link';

export const metadata = {
  title: 'AI-Quant Lab LINE 知識庫',
  description: 'AI-Quant Lab LINE 知識庫入口，提供正式圖解樹、Flex 模板與工程師規格書。',
};

const quickLinks = [
  {
    href: '/',
    label: '回首頁',
    note: '返回 AI-Quant Lab 主站首頁。',
  },
  {
    href: '/line-kb/formal-tree',
    label: '正式圖解樹',
    note: '把 12 則 FAQ 與延伸主題整理成可閱讀的知識路線圖。',
  },
  {
    href: '/line-kb/flex-template',
    label: 'Flex 模板',
    note: '查看 LINE 回覆用的分層模板、短答版與延伸版格式。',
  },
  {
    href: '/line-kb/spec',
    label: '工程師規格書',
    note: '理解回覆邏輯、導流規則與後台維護標準。',
  },
];

const highlightCards = [
  {
    kicker: '入口 / Entry',
    title: '先找到路，再開始看內容',
    description:
      '這一頁不是把資訊一次倒完，而是先把你帶到正確的入口。想看結構，就進圖解樹；想看話術，就進 Flex 模板；想看系統規格，就進工程師規格書。',
  },
  {
    kicker: '導覽 / Navigation',
    title: '頁首右上角與頁尾右下角，都保留快捷跳轉',
    description:
      '無論你從上方進場，還是讀到頁尾，都能用同一組按鈕回到三個核心頁面。這樣的設計讓知識庫更像一個完整系統，而不是散落的文章集合。',
  },
  {
    kicker: '節奏 / Flow',
    title: '看懂框架、拿到模板、最後理解規格',
    description:
      '閱讀順序建議從正式圖解樹開始，再看 Flex 模板，最後補工程師規格書。這樣最容易把內容轉成 LINE 後台可維護的實際操作。',
  },
];

const storyBlocks = [
  {
    title: '新手版',
    text: '先看懂這是什麼，再看懂自己可以怎麼開始。適合第一次接觸量化、MQL5 或 LINE 自動回覆的人。',
  },
  {
    title: '技術版',
    text: '把問題拆成模組、模板與規格。適合想看架構、流程、關鍵字與維護方法的使用者。',
  },
  {
    title: '願景版',
    text: '從回覆內容走到品牌故事，讓知識庫不只是回答問題，而是逐步建立信任與未來合作的入口。',
  },
];

const signalRows = [
  '先給安全感，再給方向感',
  '先回答白話，再補技術',
  '先讓人看懂，再讓人想行動',
  '先建立信任，再推下一步',
];

const expansionCards = [
  {
    title: '常見情境',
    text: '把使用者常問的問題拆成入門、進階、疑慮與品牌四種情境，讓回覆不再只有一種味道。',
  },
  {
    title: '維護節奏',
    text: '先更新 FAQ 的回答語氣，再同步修正 Flex 模板，最後才動到規格書，避免後台內容彼此打架。',
  },
  {
    title: '品牌敘事',
    text: '每一則回答除了答題，也要順手傳達我們在做什麼、為誰而做、以及這個系統最後會長成什麼樣子。',
  },
];

const processSteps = [
  {
    step: '01',
    title: '看懂入口',
    text: '先用知識庫入口頁建立方向感，知道現在要去的是圖解樹、模板，還是規格。',
  },
  {
    step: '02',
    title: '看懂層次',
    text: '從新手、技術、願景三個角度讀同一份內容，讓不同使用者都能找到自己的答案。',
  },
  {
    step: '03',
    title: '看懂導流',
    text: '把閱讀最後一段自然接到官網、預約、下載或下一個主題頁，形成完整路徑。',
  },
];

function NavLinks() {
  return (
    <div className="flex flex-wrap justify-end gap-2">
      {quickLinks.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`rounded-full px-4 py-2 text-xs font-semibold tracking-[0.18em] transition ${
            item.href === '/'
              ? 'border border-white/15 bg-white/5 text-slate-100 hover:border-cyan-300/35 hover:bg-cyan-300/15 hover:text-white'
              : 'border border-cyan-400/20 bg-cyan-400/10 text-cyan-100 hover:border-cyan-300/40 hover:bg-cyan-300/15 hover:text-white'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default function LineKbPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.16),transparent_26%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.12),transparent_24%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.55),rgba(2,6,23,0.9))]" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <header className="rounded-[1.75rem] border border-cyan-400/15 bg-white/[0.03] p-5 shadow-[0_20px_80px_rgba(8,145,178,0.14)] backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-semibold tracking-[0.24em] text-cyan-200">
                  LINE 知識庫入口
                </div>
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                    AI-Quant Lab 知識庫
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                    這裡是 LINE 知識庫的總入口。先看懂結構，再打開模板，最後進規格書。
                    三個獨立頁面會把同一套內容拆成不同閱讀角度，方便你快速找到要補強的那一段。
                  </p>
                </div>
              </div>

              <div className="lg:pt-2">
                <NavLinks />
              </div>
            </div>
          </header>

          <section className="mt-8 grid gap-4 md:grid-cols-3">
            {highlightCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5"
              >
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">{card.kicker}</p>
                <h2 className="mt-3 text-xl font-bold text-white">{card.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{card.description}</p>
              </article>
            ))}
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 shadow-[0_18px_60px_rgba(15,23,42,0.22)] backdrop-blur-xl sm:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold tracking-[0.2em] text-cyan-300">內容導流</p>
                <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                  先看結構，再看模板，最後看規格
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  你可以把這一頁當成操作手冊入口。它不是要一次回答全部，而是要讓你快速找到你現在最需要看的那一層。
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-[1.25rem] border border-cyan-400/15 bg-slate-950/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-slate-950/80"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">點擊打開</p>
                      <h3 className="mt-3 text-xl font-bold text-white">{item.label}</h3>
                    </div>
                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-cyan-200">
                      OPEN
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{item.note}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-8 grid gap-4 lg:grid-cols-3">
            {storyBlocks.map((block) => (
              <article
                key={block.title}
                className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5"
              >
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">三段式回覆</p>
                <h2 className="mt-3 text-2xl font-bold text-white">{block.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{block.text}</p>
              </article>
            ))}
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 sm:p-7">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {signalRows.map((row) => (
                <div
                  key={row}
                  className="rounded-[1.25rem] border border-cyan-400/14 bg-slate-950/60 px-4 py-4 text-sm font-medium leading-6 text-slate-200"
                >
                  {row}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 grid gap-4 lg:grid-cols-3">
            {expansionCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5"
              >
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">延伸內容</p>
                <h2 className="mt-3 text-2xl font-bold text-white">{card.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{card.text}</p>
              </article>
            ))}
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 sm:p-7">
            <div className="grid gap-4 md:grid-cols-3">
              {processSteps.map((item) => (
                <article
                  key={item.step}
                  className="rounded-[1.25rem] border border-cyan-400/14 bg-slate-950/60 p-5"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-sm font-black text-cyan-200">
                    {item.step}
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-cyan-400/12 bg-[linear-gradient(180deg,rgba(8,15,31,0.76),rgba(3,7,18,0.92))] p-5 sm:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">頁尾導流</p>
                <h2 className="mt-2 text-2xl font-black text-white">看完之後，也能從頁尾再回到三個入口</h2>
              </div>
              <div className="flex justify-start md:justify-end">
                <NavLinks />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
