import Link from 'next/link';

export const metadata = {
  title: 'LINE 知識庫規格',
  description: 'AI-Quant Lab LINE 知識庫規格頁，說明 FAQ 架構、主題樹與擴充方向。',
};

const specRows = [
  ['輸入格式', '建議使用 Q / A 兩層，並保留新手版、技術版、願景版。'],
  ['知識主幹', '品牌介紹、模組架構、原始碼授權、風險邊界、訂閱流程、品牌願景。'],
  ['擴充策略', '從 12 則核心 FAQ 擴到 100，再擴到 1000+。'],
  ['維護方式', '同主題內容先歸類，再拆子題，避免答案重複與發散。'],
  ['導流原則', '每個答案最後都保留下一步，引導到官網、預約、功能說明或回報。'],
];

export default function LineKbSpecPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-8 space-y-3">
          <p className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
            LINE Knowledge Spec
          </p>
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            LINE 知識庫規格
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
            這一頁用來說明後續如何把知識庫維護成一個可擴充、可複用、可持續生長的內容系統。
          </p>
        </div>

        <section className="rounded-[1.5rem] border border-cyan-400/15 bg-[linear-gradient(180deg,rgba(2,6,23,0.95),rgba(3,7,18,0.84))] p-6 shadow-[0_18px_60px_rgba(8,145,178,0.12)] ring-1 ring-white/5 sm:p-8">
          <div className="overflow-hidden rounded-2xl border border-slate-800/80">
            {specRows.map(([label, value]) => (
              <div key={label} className="grid gap-3 border-b border-slate-800/80 bg-slate-900/55 p-4 last:border-b-0 md:grid-cols-[180px_1fr] md:items-start">
                <div className="text-sm font-semibold tracking-wide text-cyan-200">{label}</div>
                <div className="text-sm leading-7 text-slate-300">{value}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-cyan-400/12 bg-slate-950/65 p-5 text-sm leading-7 text-slate-300">
            <p>
              建議策略：先維護 12 則核心 FAQ，再把高頻問題拆成子題，最後按照主題樹逐步擴充。
              這樣可以維持回答品質，也比較容易讓 AI 依照情境選擇合適層級。
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/line-kb"
              className="rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              返回知識庫
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2 font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:text-cyan-200"
            >
              返回首頁
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
