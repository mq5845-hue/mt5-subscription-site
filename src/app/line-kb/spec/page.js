import Link from 'next/link';

export const metadata = {
  title: '工程師規格書 | AI-Quant Lab',
  description: 'AI-Quant Lab LINE 知識庫工程師規格書頁面。',
};

const quickLinks = [
  { href: '/line-kb', label: '知識庫入口' },
  { href: '/line-kb/formal-tree', label: '正式圖解樹' },
  { href: '/line-kb/flex-template', label: 'Flex 模板' },
  { href: '/line-kb/spec', label: '工程師規格書' },
  { href: '/line-kb/expansion', label: 'FAQ 擴充藍圖' },
];

const specRows = [
  ['建立目的', '把 LINE 回覆規格、導流節點與維護標準寫成可交付的操作文件。'],
  ['輸入格式', '以 Q / A 為主，必要時加入關鍵字、延伸說明與 CTA。'],
  ['回答層級', '至少保留白話版、技術版、願景版三層，方便按需延伸。'],
  ['導流方式', '把使用者帶到官網、預約名單、展示頁或下一個關鍵頁面。'],
  ['維護標準', '內容更新時先改規格，再改模板，最後才改 FAQ 文案。'],
  ['失敗處理', '若無法辨識問題，先回安全版提示，再引導使用者輸入更明確的關鍵字。'],
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

export default function LineKbSpecPage() {
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
                  工程師規格書
                </div>
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                    把回覆系統寫成可長期維護的規格
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                    這不是單純的說明頁，而是 LINE 知識庫的維護準則。規格先清楚，模板才不會亂，
                    FAQ 才能擴展得更穩。
                  </p>
                </div>
              </div>
              <div className="lg:pt-2">
                <NavLinks />
              </div>
            </div>
          </header>

          <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 sm:p-7">
            <div className="overflow-hidden rounded-[1.35rem] border border-cyan-400/12">
              {specRows.map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-3 border-b border-cyan-400/10 bg-slate-950/55 p-5 last:border-b-0 md:grid-cols-[180px_1fr] md:items-start"
                >
                  <div className="text-sm font-semibold tracking-wide text-cyan-200">{label}</div>
                  <div className="text-sm leading-7 text-slate-300">{value}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5">
              <h2 className="text-2xl font-bold text-white">維護順序</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                先改規格書，再改模板，最後才改對外文案。這樣可以避免 LINE 後台、網站頁面和知識庫內容彼此打架。
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5">
              <h2 className="text-2xl font-bold text-white">使用原則</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                所有回覆都要先有安全感，再有技術感，最後才導向行動。這個順序穩定，知識庫就會越長越完整。
              </p>
            </article>
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-cyan-400/12 bg-[linear-gradient(180deg,rgba(8,15,31,0.76),rgba(3,7,18,0.92))] p-5 sm:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">頁尾跳轉</p>
                <h2 className="mt-2 text-2xl font-black text-white">頁尾同樣保留三個快捷入口</h2>
              </div>
              <NavLinks />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
