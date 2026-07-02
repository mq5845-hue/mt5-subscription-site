import Link from 'next/link';

export const metadata = {
  title: 'Flex 模板 | AI-Quant Lab',
  description: 'AI-Quant Lab LINE 知識庫 Flex 模板頁面。',
};

const quickLinks = [
  { href: '/line-kb', label: '知識庫入口' },
  { href: '/line-kb/formal-tree', label: '正式圖解樹' },
  { href: '/line-kb/flex-template', label: 'Flex 模板' },
  { href: '/line-kb/spec', label: '工程師規格書' },
  { href: '/line-kb/expansion', label: 'FAQ 擴充藍圖' },
];

const templateBlocks = [
  {
    title: '短答版',
    copy: 'Q：<使用者問題>\nA：<一句白話結論>\n\n適合第一層回覆，先穩住閱讀節奏。',
  },
  {
    title: '標準版',
    copy: 'Q：<使用者問題>\nA：<白話回答>\n補充：<技術說明>\n\n適合大多數 FAQ 問答。',
  },
  {
    title: '延伸版',
    copy: 'Q：<使用者問題>\nA：<白話回答>\n技術：<架構與細節>\n願景：<品牌故事>\n下一步：<CTA>',
  },
  {
    title: '收斂版',
    copy: 'Q：<使用者問題>\nA：<清楚結論>\n\n如果你想更快進入下一步，請點擊指定連結或輸入關鍵字。',
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

export default function FlexTemplatePage() {
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
                  Flex 模板
                </div>
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                    把 LINE 回覆做成可複用的內容骨架
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                    這一頁提供可直接套用的回覆格式。你可以先輸出短答，再往下補技術層、願景層與行動層，
                    讓每一則訊息都保有方向，不會只停在單一句子。
                  </p>
                </div>
              </div>
              <div className="lg:pt-2">
                <NavLinks />
              </div>
            </div>
          </header>

          <section className="mt-8 grid gap-4 lg:grid-cols-2">
            {templateBlocks.map((block) => (
              <article
                key={block.title}
                className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5"
              >
                <h2 className="text-2xl font-bold text-white">{block.title}</h2>
                <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-[1.25rem] border border-cyan-400/12 bg-slate-950/70 p-4 text-sm leading-7 text-cyan-100">
                  {block.copy}
                </pre>
              </article>
            ))}
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 sm:p-7">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.25rem] border border-cyan-400/14 bg-slate-950/60 p-5">
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">Q 標籤</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">用來固定辨識問題，讓 LINE 更容易抓到意圖。</p>
              </div>
              <div className="rounded-[1.25rem] border border-cyan-400/14 bg-slate-950/60 p-5">
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">A 標籤</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">用來固定辨識答案，讓回覆層次能穩定延伸。</p>
              </div>
              <div className="rounded-[1.25rem] border border-cyan-400/14 bg-slate-950/60 p-5">
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">CTA</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">最後加上下一步，讓讀者知道看完之後要做什麼。</p>
              </div>
            </div>
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-cyan-400/12 bg-[linear-gradient(180deg,rgba(8,15,31,0.76),rgba(3,7,18,0.92))] p-5 sm:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">頁尾跳轉</p>
                <h2 className="mt-2 text-2xl font-black text-white">頁尾再給一次相同的三個快捷入口</h2>
              </div>
              <NavLinks />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
