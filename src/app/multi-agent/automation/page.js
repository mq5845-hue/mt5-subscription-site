import Link from 'next/link';
import { headers } from 'next/headers';
import { defaultLocale, localizePath } from '@/lib/locale';
import EmojiAvatar from '@/components/EmojiAvatar';

const automationEmojis = { products: ['🤖', '📊', '📜', '🧰', '🛠️'], team: ['🤖', '🔍', '🧭', '💻', '🛠️', '📈'], stages: ['📥', '🧠', '🧩', '⚙️', '🧪', '📦'], heal: ['🩺', '🧬', '🧠', '🛑', '🛡️'], gates: ['✅', '🎯', '📈', '🧾'] };

export const metadata = {
  title: 'MQL 全自動進化引擎｜Master Agent × 5',
  description: '從 MQL4／MQL5 輸入到剖析、重構、編譯、回測、版本化交付的六智能體自動化產品藍圖。',
};

const products = [
  ['EA', 'Expert Advisor', '交易訊號、下單、持倉與風控'],
  ['IND', '技術指標', 'Buffers、繪圖、訊號與資料窗口'],
  ['SCRIPT', '腳本', '一次性批次處理與資料操作'],
  ['LIB', '函式庫', '可重用 API、類別與相依管理'],
  ['TOOL', '工具程式', '面板、檔案、報表與平台整合'],
];

const team = [
  ['M', 'MASTER', '專案總控', '建立任務圖、派工、審查證據、控制重試與核准發布'],
  ['01', 'PARSE', '代碼剖析', '辨識產品類型、入口、策略語意、依賴與風險'],
  ['02', 'MAP', '架構設計', '建立 MQL4→MQL5 對映表、介面契約與測試基準'],
  ['03', 'CODE', 'MQL5 編程', '重構、模組化、效能改善與版本差異說明'],
  ['04', 'DEBUG', '編譯除錯', 'Python 調用 MetaEditor，解析 errors、warnings 與行號'],
  ['05', 'TUNE', '回測調優', 'Python 調用 MT5，執行回測、walk-forward 與風險分析'],
];

const stages = [
  ['01', 'INGEST', '安全接收輸入', 'MQL4／MQL5、include、設定檔、測試資料與使用目的'],
  ['02', 'BASELINE', '建立不可變基準', '原始碼雜湊、參數、交易語意、編譯結果與既有績效'],
  ['03', 'REFACTOR', '設計與產碼', '藍圖 → MQL5 → 靜態規則 → 差異清單'],
  ['04', 'COMPILE', '真實編譯', 'MetaEditor CLI → log parser → 精確修正單 → 有限次重試'],
  ['05', 'VALIDATE', '真實回測', 'MT5 Strategy Tester → 樣本內／外 → 穩健性與風險門檻'],
  ['06', 'RELEASE', '版本化交付', '原始碼、EX5、set、報告、SBOM、日誌、簽章與回滾點'],
];

const pythonTools = [
  ['compile_mql5', '啟動 MetaEditor 編譯並回傳結構化錯誤、警告、檔案與行號'],
  ['run_backtest', '生成 Tester 設定、啟動 MT5、等待完成並收集報告'],
  ['compare_behavior', '比對交易方向、時間、價格、倉位、停損停利與事件序列'],
  ['evaluate_robustness', '執行 walk-forward、參數敏感度、蒙地卡羅與成本壓力測試'],
  ['package_release', '建立可重現產品包、版本資訊、證據索引與回滾清單'],
];

const gates = [
  ['BUILD', '0 errors', '0 個未裁決 warnings'],
  ['SEMANTICS', '策略語意一致', '不得擅改進出場、倉位與風險規則'],
  ['ROBUSTNESS', '樣本外具正期望', '不只最佳化區間內看起來獲利'],
  ['RISK', '風險在核准門檻內', 'MDD、曝險、連敗與尾端損失受控'],
  ['REPRODUCE', '結果可重現', '資料、參數、平台版本與成本假設完整封存'],
];

export default async function AutomationBlueprintPage() {
  const requestHeaders = await headers();
  const locale = requestHeaders.get('x-site-locale') || defaultLocale;
  return (
    <main className="relative overflow-hidden pb-24 text-slate-100">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[44rem] bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.2),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(124,58,237,0.15),transparent_24%)]" />
      <div aria-hidden="true" className="tech-grid pointer-events-none absolute inset-x-0 top-0 h-[55rem] opacity-20" />

      <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 font-mono text-xs font-bold tracking-[0.18em] text-cyan-100">AUTONOMOUS MQL PRODUCT PIPELINE</span>
            <h1 className="mt-7 text-4xl font-black leading-[1.06] tracking-[-0.04em] text-white sm:text-6xl">輸入任何 MQL，<span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">輸出可驗證的 MQL5 產品。</span></h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">一位 Master Agent 協調五位專家，以 Python 實際調用 MetaEditor 與 MT5，完成剖析、架構、編程、編譯除錯、回測調優與版本化交付。</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#pipeline" className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-200">查看自動化流程</a>
              <Link href={localizePath('/multi-agent', locale)} className="rounded-full border border-slate-700 bg-slate-950/60 px-6 py-3 text-sm font-bold text-white transition hover:border-cyan-300/40">返回多智能體架構</Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/20 bg-slate-950/75 p-6 shadow-[0_0_90px_rgba(34,211,238,0.12)] sm:p-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5"><span className="font-mono text-xs text-slate-500">ACCEPTED_INPUTS</span><span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.8)]" /></div>
            <div className="mt-5 grid gap-3">
              {products.map(([code, name, scope], index) => (
                <div key={code} className="grid grid-cols-[3.6rem_1fr] gap-3 rounded-2xl border border-slate-800 bg-slate-900/65 p-4">
                  <span className="flex items-center gap-2 font-mono text-xs font-black text-cyan-300"><EmojiAvatar emoji={automationEmojis.products[index]} />{code}</span>
                  <div><strong className="text-sm text-white">{name}</strong><p className="mt-1 text-xs leading-5 text-slate-500">{scope}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-slate-800/80 bg-slate-950/55 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl"><p className="text-xs font-black tracking-[0.2em] text-violet-300">ONE COMMANDER + FIVE SPECIALISTS</p><h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">六個角色，各自負責一個可驗收結果</h2></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {team.map(([number, code, title, scope], index) => (
              <article key={code} className={`rounded-3xl border p-6 ${index === 0 ? 'border-cyan-300/35 bg-cyan-300/10' : 'border-slate-800 bg-slate-950/75'}`}>
                <div className="flex items-center justify-between"><span className="font-mono text-3xl font-black text-slate-600">{number}</span><span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold tracking-[0.18em] text-cyan-300"><EmojiAvatar emoji={automationEmojis.team[index]} tone={index === 0 ? 'cyan' : 'violet'} />{code}</span></div>
                <h3 className="mt-6 text-xl font-black text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{scope}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pipeline" className="relative mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl"><p className="text-xs font-black tracking-[0.2em] text-emerald-300">END-TO-END AUTOMATION</p><h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">從輸入到數位產品的六階段流水線</h2><p className="mt-5 leading-8 text-slate-400">每一階段都產生 artifact 與 evidence；沒有證據，Master 就不能把任務標記為完成。</p></div>
        <div className="mt-12 space-y-3">
          {stages.map(([number, code, title, detail], index) => (
            <article key={code} className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-5 sm:grid-cols-[4rem_8rem_1fr_1.5fr] sm:items-center sm:p-6">
              <span className="font-mono text-xl font-black text-cyan-300">{number}</span><span className="flex items-center gap-2 font-mono text-xs font-bold tracking-[0.14em] text-slate-500"><EmojiAvatar emoji={automationEmojis.stages[index]} tone="emerald" />{code}</span><h3 className="font-black text-white">{title}</h3><p className="text-sm leading-6 text-slate-400">{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative border-y border-slate-800/80 bg-slate-950/60 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div><p className="text-xs font-black tracking-[0.2em] text-cyan-300">PYTHON TOOL LAYER</p><h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">Agent 負責判斷，Python 負責真的執行</h2><p className="mt-5 leading-8 text-slate-400">所有外部應用調用都經過 allowlist、逾時、工作目錄隔離與結構化回傳。Agent 不直接自由操作整台電腦。</p></div>
          <div className="overflow-hidden rounded-3xl border border-slate-700 bg-[#060a17]">
            <div className="border-b border-slate-800 px-6 py-4 font-mono text-xs text-slate-500">tools.registry.json</div>
            <div className="divide-y divide-slate-800">
              {pythonTools.map(([name, detail]) => <div key={name} className="grid gap-2 p-5 sm:grid-cols-[10rem_1fr]"><code className="text-sm font-bold text-emerald-300">{name}()</code><p className="text-sm leading-6 text-slate-400">{detail}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-black tracking-[0.2em] text-violet-300">BOUNDED SELF-HEALING</p><h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">自動迭代，但必須有限、有記憶、可回滾</h2>
            <div className="mt-8 space-y-3">
              {['錯誤先分類，再指派唯一責任 Agent', '每次修正建立新版本與 diff，不覆蓋基準', '相同錯誤指紋寫入 regression corpus', '重試達上限、策略意圖不明或風險越界即轉人工', '新版本必須重跑既有測試，避免修 A 壞 B'].map((item, index) => <div key={item} className="flex gap-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-4"><span className="flex items-center gap-2 font-mono text-xs text-violet-300"><EmojiAvatar emoji={automationEmojis.heal[index]} tone="violet" />0{index + 1}</span><p className="text-sm leading-6 text-slate-300">{item}</p></div>)}
            </div>
          </div>
          <div>
            <p className="text-xs font-black tracking-[0.2em] text-emerald-300">RELEASE GATES</p><h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">達到門檻才允許輸出產品</h2>
            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-800">
              {gates.map(([code, title, detail], index) => <div key={code} className="grid gap-2 border-b border-slate-800 bg-slate-950/70 p-5 last:border-b-0 sm:grid-cols-[7rem_1fr]"><span className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-300"><EmojiAvatar emoji={automationEmojis.gates[index % automationEmojis.gates.length]} tone="emerald" />{code}</span><div><strong className="text-sm text-white">{title}</strong><p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p></div></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-[2rem] border border-amber-300/25 bg-amber-300/8 p-7 sm:p-10">
          <p className="text-xs font-black tracking-[0.2em] text-amber-300">TRUTHFUL PRODUCT PROMISE</p>
          <h2 className="mt-4 text-2xl font-black text-white sm:text-4xl">可以保證工程流程被執行；不能保證市場永遠正報酬。</h2>
          <p className="mt-5 max-w-4xl text-base leading-8 text-amber-50/80">系統可以把「0 errors、0 個未裁決 warnings、測試通過、樣本外正期望、風險在門檻內」設為發布條件；但市場會改變，歷史回測也可能過度擬合。因此輸出應標示為「通過指定資料與假設下的驗證」，不能宣稱保證未來獲利、永不犯錯或永久自我治癒。</p>
        </div>
      </section>
    </main>
  );
}
