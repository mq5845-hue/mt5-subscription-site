import Link from 'next/link';

export const metadata = {
  title: '正式圖解樹 | AI-Quant Lab',
  description: 'AI-Quant Lab LINE 知識庫正式圖解樹頁面。',
};

const quickLinks = [
  { href: '/line-kb', label: '知識庫入口' },
  { href: '/line-kb/formal-tree', label: '正式圖解樹' },
  { href: '/line-kb/flex-template', label: 'Flex 模板' },
  { href: '/line-kb/spec', label: '工程師規格書' },
  { href: '/line-kb/expansion', label: 'FAQ 擴充藍圖' },
];

const treeNodes = [
  {
    id: '01',
    title: '入口問題',
    text: '先判斷使用者是在問功能、價格、風險、內容，還是品牌故事。',
  },
  {
    id: '02',
    title: '主題分流',
    text: '把問題導向對應模組，讓回答不會亂跳，也不會只停在單一 FAQ。',
  },
  {
    id: '03',
    title: '層級延伸',
    text: '每個答案至少保留白話版、技術版與願景版，讓不同程度的使用者都接得到。',
  },
  {
    id: '04',
    title: '行動收斂',
    text: '最後把用戶帶回預約、下載、看展示或回官網，形成清楚的下一步。',
  },
];

function NavLinks() {
  return (
    <div className="flex flex-wrap justify-end gap-2">
      {quickLinks.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/15 hover:text-white"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default function FormalTreePage() {
  return (
    <main className="min-h-screen bg-[#050816] text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.16),transparent_26%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.12),transparent_24%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.55),rgba(2,6,23,0.92))]" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <header className="rounded-[1.75rem] border border-cyan-400/15 bg-white/[0.03] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-semibold tracking-[0.24em] text-cyan-200">
                  正式圖解樹
                </div>
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                    讓知識庫像地圖，而不是雜訊堆
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                    這一頁把 12 則 FAQ、延伸主題與導流節點，整理成一條清楚的閱讀路線。
                    使用者先看懂位置，再看懂內容，最後才會自然地走到下一步。
                  </p>
                </div>
              </div>
              <div className="lg:pt-2">
                <NavLinks />
              </div>
            </div>
          </header>

          <section className="mt-8 grid gap-4 lg:grid-cols-2">
            {treeNodes.map((node) => (
              <article
                key={node.id}
                className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-sm font-black text-cyan-200">
                    {node.id}
                  </span>
                  <h2 className="text-2xl font-bold text-white">{node.title}</h2>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-300">{node.text}</p>
              </article>
            ))}
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 sm:p-7">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.25rem] border border-cyan-400/14 bg-slate-950/60 p-5">
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">起點</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">先回答「這是什麼」，讓新手有安全感。</p>
              </div>
              <div className="rounded-[1.25rem] border border-cyan-400/14 bg-slate-950/60 p-5">
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">分支</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">再回答「怎麼運作」，讓進階者看見架構。</p>
              </div>
              <div className="rounded-[1.25rem] border border-cyan-400/14 bg-slate-950/60 p-5">
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">出口</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">最後回答「下一步是什麼」，讓對話可以往前走。</p>
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-cyan-400/12 bg-[linear-gradient(180deg,rgba(8,15,31,0.76),rgba(3,7,18,0.92))] p-5 sm:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">頁尾跳轉</p>
                <h2 className="mt-2 text-2xl font-black text-white">頁尾也保留相同的三個快捷入口</h2>
              </div>
              <NavLinks />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
