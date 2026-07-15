'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { getLocaleFromPath, localizePath } from '@/lib/locale';
import EmojiAvatar from '@/components/EmojiAvatar';

const guideAgentEmojis = ['🔍', '🧭', '💻', '🛠️', '📈'];

const agents = [
  {
    number: '01', short: 'PARSE', title: 'MQL4 代碼剖析專家', english: 'Parser & Feature Agent', accent: 'cyan',
    mission: '讀懂舊策略，而不是急著改碼。盤點 EA／Indicator、交易函式、指標相依、時間序列與風控規則。',
    output: '策略邏輯與相依性報告', gate: '所有功能、輸入參數與交易行為都可追溯',
  },
  {
    number: '02', short: 'MAP', title: 'MQL5 架構對映專家', english: 'Architecture Mapping Agent', accent: 'blue',
    mission: '把事件模型、訂單／持倉模型、指標 handle、資料複製與交易類別轉成可執行的重構藍圖。',
    output: 'MQL4 → MQL5 對映表與架構藍圖', gate: '每個舊 API 都有目標實作與驗證方式',
  },
  {
    number: '03', short: 'BUILD', title: 'MQL5 重構編碼專家', english: 'Refactoring & Target Code Agent', accent: 'violet',
    mission: '依藍圖產出模組化 .mq5，處理 CopyBuffer、CopyRates、ArraySetAsSeries、交易物件與資源釋放。',
    output: '可編譯的 MQL5 原始碼與變更清單', gate: '禁止自行改變策略語意或風險參數',
  },
  {
    number: '04', short: 'VERIFY', title: 'MT5 編譯與除錯專家', english: 'Compiler & Debug Agent', accent: 'amber',
    mission: '真正呼叫 MetaEditor 編譯器，解析 error／warning、檔案與行號，把可執行的修正單退回編碼專家。',
    output: '編譯日誌、錯誤分類與修正建議', gate: '0 error；warning 必須逐條裁決',
  },
  {
    number: '05', short: 'PROVE', title: '回測與效能調優專家', english: 'Backtest & Optimization Agent', accent: 'emerald',
    mission: '用固定資料、模型、點差與參數做 MT4／MT5 對照，檢查交易一致性、MDD、Sharpe、速度與資料洩漏。',
    output: '回測差異、效能報告與 Go／No-Go 結論', gate: '結果落在核准容差內，且無偷看未來資料',
  },
];

const mechanisms = [
  ['01', '角色邊界', '每個 Agent 只拿到完成任務所需的上下文、工具與輸出契約，降低長脈絡漂移。'],
  ['02', '任務依賴圖', 'Master 把大目標拆成可驗收的節點；能平行的同時做，有前置條件的按順序做。'],
  ['03', '結構化交接', 'Agent 不只回覆一段文字，而是回傳 task_id、artifact、evidence、status 與 next_action。'],
  ['04', '共享專案狀態', '規格、程式碼、日誌、測試結果與決策紀錄寫入同一個工作區，所有角色看到同一版本。'],
  ['05', '品質閘門', '編譯與回測不通過就退回責任 Agent；Master 只接受附帶證據、符合驗收標準的產出。'],
  ['06', '停止條件', '達成 Done、超過重試上限或遇到需人工裁決的策略差異時停止，避免無限自我修正。'],
];

const handoffExample = `{
  "task_id": "MQL-042",
  "from": "Compiler_Agent",
  "to": "Refactor_Agent",
  "status": "REWORK_REQUIRED",
  "artifact": "build/strategy.mq5",
  "evidence": {
    "errors": 2,
    "warnings": 1,
    "log": "artifacts/compile.log"
  },
  "acceptance": "0 errors; warnings reviewed",
  "next_action": "修正第 118、204 行後重新提交"
}`;

const masterPrompt = `角色：MQL 重構專案 Master Agent

目標：協調五位專家，把輸入的 MQL4 策略重構為經編譯、回測驗證的 MQL5 版本。

硬性規則：
1. 先建立需求、風險與驗收標準，再派發工作。
2. 每個任務都要有 task_id、輸入、輸出、依賴與 Done 條件。
3. 不把 Agent 的宣稱視為證據；編譯結果必須來自 MetaEditor，回測結果必須來自 Strategy Tester。
4. 編譯失敗：退回 Refactor_Agent，最多 3 輪。
5. 回測超出容差：先由 Parser 與 Mapping Agent 判定語意差異，再退回重構。
6. 不可擅自改變進出場、倉位、停損、停利或風險參數。
7. 遇到策略意圖不明、資料不足或高風險差異時，標記 HUMAN_REVIEW。

最終交付：.mq5 原始碼、對映表、編譯日誌、回測報告、差異清單與 Go/No-Go 結論。`;

const accentStyles = {
  cyan: 'border-cyan-400/25 bg-cyan-400/8 text-cyan-200',
  blue: 'border-blue-400/25 bg-blue-400/8 text-blue-200',
  violet: 'border-violet-400/25 bg-violet-400/8 text-violet-200',
  amber: 'border-amber-400/25 bg-amber-400/8 text-amber-200',
  emerald: 'border-emerald-400/25 bg-emerald-400/8 text-emerald-200',
};

function CopyButton({ text, label = '複製' }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button type="button" onClick={copy} className="rounded-full border border-cyan-300/20 bg-cyan-300/8 px-4 py-2 text-xs font-bold tracking-[0.14em] text-cyan-100 transition hover:border-cyan-200/50 hover:bg-cyan-300/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">
      {copied ? '已複製 ✓' : label}
    </button>
  );
}

function AgentCard({ agent }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-950/65 p-5 shadow-[0_24px_70px_rgba(2,6,23,0.38)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 sm:p-6">
      <div aria-hidden="true" className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/55 to-transparent" />
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-4xl font-black text-slate-700 transition group-hover:text-cyan-300/45">{agent.number}</span>
        <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.2em] ${accentStyles[agent.accent]}`}><EmojiAvatar emoji={guideAgentEmojis[Number(agent.number) - 1]} />{agent.short}</span>
      </div>
      <h3 className="mt-5 text-xl font-black text-white">{agent.title}</h3>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-slate-500">{agent.english}</p>
      <p className="mt-4 text-sm leading-7 text-slate-300">{agent.mission}</p>
      <dl className="mt-5 space-y-3 border-t border-slate-800 pt-4 text-sm">
        <div><dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Output</dt><dd className="mt-1 text-slate-200">{agent.output}</dd></div>
        <div><dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Quality gate</dt><dd className="mt-1 text-cyan-100">{agent.gate}</dd></div>
      </dl>
    </article>
  );
}

export default function MultiAgentGuide() {
  const pathname = usePathname() || '/en/multi-agent';
  const locale = getLocaleFromPath(pathname);
  const [activeLoop, setActiveLoop] = useState('compile');

  return (
    <main className="relative overflow-hidden pb-20 text-slate-100">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[46rem] bg-[radial-gradient(circle_at_50%_10%,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_80%_24%,rgba(99,102,241,0.12),transparent_25%)]" />
      <div aria-hidden="true" className="tech-grid pointer-events-none absolute inset-x-0 top-0 h-[54rem] opacity-25" />

      <section className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[1.03fr_0.97fr] lg:items-center lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-4 py-2 text-xs font-bold tracking-[0.18em] text-cyan-100">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]" /> MULTI-AGENT ORCHESTRATION
          </div>
          <h1 className="mt-7 text-balance text-4xl font-black leading-[1.08] tracking-[-0.04em] text-white sm:text-6xl">一位 Master Agent，<span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">帶領五位 MQL 專家。</span></h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Codex 並不是把同一個問題問五次。主智能體會先拆任務、定義依賴與驗收標準，再把可獨立完成的工作交給專責 Agent；所有結果都要帶著證據回到同一個品質閘門。</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#architecture" className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-black text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.24)] transition hover:-translate-y-0.5">看協作架構</a>
            <a href="#prompt" className="rounded-full border border-slate-700 bg-slate-900/70 px-6 py-3 text-sm font-bold text-slate-100 transition hover:border-cyan-300/40 hover:text-cyan-100">取得 Master 提示詞</a>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-slate-800/80 pt-6">
            {[['1', '指揮核心'], ['5', '專責角色'], ['2×', '驗證迴圈']].map(([value, label]) => <div key={label}><div className="text-2xl font-black text-white">{value}</div><div className="mt-1 text-xs tracking-[0.12em] text-slate-500">{label}</div></div>)}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl rounded-[2rem] border border-cyan-300/20 bg-slate-950/70 p-5 shadow-[0_0_100px_rgba(34,211,238,0.12)] sm:p-8">
          <div className="absolute inset-x-12 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
          <div className="relative flex justify-center">
            <div className="flex h-40 w-40 flex-col items-center justify-center rounded-[2.2rem] border border-cyan-200/50 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.26),rgba(15,23,42,0.9)_65%)] text-center shadow-[0_0_55px_rgba(34,211,238,0.25)]">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-cyan-200"><EmojiAvatar emoji="🤖" />COMMAND CORE</span><strong className="mt-2 text-5xl text-white">M</strong><span className="mt-1 text-xs font-bold text-slate-300">MASTER AGENT</span>
            </div>
          </div>
          <div className="relative mt-7 grid grid-cols-5 gap-2">
            {agents.map((agent) => <div key={agent.number} className="flex flex-col items-center text-center"><span className="mb-2 h-5 w-px bg-gradient-to-b from-cyan-300/80 to-slate-700" /><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 font-mono text-xs font-black text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.12)]">{agent.number}</span><span className="mt-2 hidden text-[9px] font-bold tracking-[0.08em] text-slate-500 sm:block">{agent.short}</span></div>)}
          </div>
          <div className="mt-7 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-xs text-slate-400"><span>PLAN → DISPATCH → VERIFY</span><span className="font-mono text-emerald-300">EVIDENCE_REQUIRED</span></div>
        </div>
      </section>

      <section id="architecture" className="relative mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl"><p className="text-xs font-black tracking-[0.22em] text-cyan-300">HOW CODEX ORCHESTRATES</p><h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">真正讓多智能體協作的六個機制</h2><p className="mt-5 text-base leading-8 text-slate-400">重點不在 Agent 數量，而在邊界、交接、共享狀態與可停止的驗證流程。</p></div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-slate-800 bg-slate-800 md:grid-cols-2 lg:grid-cols-3">
          {mechanisms.map(([number, title, copy]) => <article key={number} className="bg-slate-950/95 p-6 sm:p-8"><div className="font-mono text-xs text-cyan-300">{number}</div><h3 className="mt-5 text-xl font-black text-white">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{copy}</p></article>)}
        </div>
      </section>

      <section className="relative border-y border-slate-800/80 bg-slate-950/55 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div className="max-w-3xl"><p className="text-xs font-black tracking-[0.22em] text-violet-300">THE SPECIALIST CREW</p><h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">五個角色，覆蓋完整重構生命週期</h2></div><p className="max-w-md text-sm leading-7 text-slate-400">Master 不取代專家；它負責決定誰在什麼條件下做什麼，以及成果何時才算完成。</p></div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent) => <AgentCard key={agent.number} agent={agent} />)}
            <article className="flex min-h-80 flex-col justify-between rounded-3xl border border-cyan-300/30 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_48%),rgba(8,15,35,0.9)] p-6 sm:p-8"><div><span className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-[0.18em] text-cyan-200"><EmojiAvatar emoji="🤖" />MASTER / GOVERN</span><h3 className="mt-5 text-2xl font-black text-white">只做全局判斷，不搶專家的工作</h3><p className="mt-4 text-sm leading-7 text-slate-300">拆解、派發、追蹤依賴、處理衝突、控制重試、核准變更，最後把每份證據組成可交付版本。</p></div><div className="mt-8 rounded-2xl border border-cyan-300/20 bg-slate-950/60 p-4 font-mono text-xs leading-6 text-cyan-100">STATE: READY<br />NEXT: DISPATCH<br />OWNER: MASTER_AGENT</div></article>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div><p className="text-xs font-black tracking-[0.22em] text-emerald-300">CONTROLLED FEEDBACK</p><h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">兩個必須真的跑過的驗證迴圈</h2><p className="mt-5 text-base leading-8 text-slate-400">LLM 可以解讀工具結果，但不能用「看起來正確」代替編譯器與回測器。</p><div className="mt-8 flex rounded-full border border-slate-800 bg-slate-950 p-1">{[['compile', '編譯迴圈'], ['backtest', '回測迴圈']].map(([id, label]) => <button key={id} type="button" onClick={() => setActiveLoop(id)} className={`flex-1 rounded-full px-4 py-3 text-sm font-bold transition ${activeLoop === id ? 'bg-cyan-300 text-slate-950' : 'text-slate-400 hover:text-white'}`}>{label}</button>)}</div></div>
          <div className="rounded-[2rem] border border-slate-700/70 bg-slate-950/75 p-6 sm:p-8">
            {activeLoop === 'compile' ? <LoopPanel kind="compile" /> : <LoopPanel kind="backtest" />}
          </div>
        </div>
      </section>

      <section className="relative border-y border-slate-800/80 bg-slate-950/60 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div><p className="text-xs font-black tracking-[0.22em] text-cyan-300">STRUCTURED HANDOFF</p><h2 className="mt-4 text-3xl font-black tracking-tight text-white">Agent 之間，不靠模糊口頭交代</h2><p className="mt-5 text-base leading-8 text-slate-400">標準交接物件同時記錄責任人、版本、證據、驗收條件與下一步，Master 才能自動判斷要前進、退回或停下來。</p></div>
          <CodePanel filename="handoff.json" text={handoffExample} />
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-violet-300/20 bg-[radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.18),transparent_34%),rgba(5,8,22,0.78)] p-6 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]"><div><p className="text-xs font-black tracking-[0.22em] text-violet-300">DOCKER + MCP</p><h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">企業私有部署，是工具層；不是 Agent 本身</h2><p className="mt-5 text-base leading-8 text-slate-300">MCP 把 refactor、compile、backtest、read_report 等能力描述成 AI 可呼叫的工具；Docker 則封裝執行環境、相依套件與版本。兩者讓工作流可攜、可稽核，但真正的隱私仍取決於模型部署位置與網路政策。</p></div>
            <div className="grid gap-3 sm:grid-cols-4">{[['01', 'AI Client', '提出目標'], ['02', 'MCP Server', '驗證與路由'], ['03', 'Docker Tools', '重構／編譯／回測'], ['04', 'Artifacts', '代碼／日誌／報告']].map(([n, title, copy]) => <div key={n} className="rounded-2xl border border-slate-700/70 bg-slate-950/65 p-4"><span className="font-mono text-xs text-violet-300">{n}</span><strong className="mt-8 block text-sm text-white">{title}</strong><span className="mt-2 block text-xs leading-5 text-slate-500">{copy}</span></div>)}</div>
          </div>
          <div className="mt-8 rounded-2xl border border-amber-300/20 bg-amber-300/8 p-4 text-sm leading-7 text-amber-100"><strong>重要校正：</strong> 若使用雲端 LLM，策略內容仍可能離開企業內網。要宣稱「100% 離線」，模型、MCP、工具、儲存與日誌都必須在內網，並以防火牆／egress policy 驗證；Docker 本身不等於離線或不可逆向。</div>
        </div>
      </section>

      <section id="prompt" className="relative mx-auto max-w-7xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div><p className="text-xs font-black tracking-[0.22em] text-cyan-300">STARTER SYSTEM PROMPT</p><h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">先把治理規則寫進 Master Prompt</h2><p className="mt-5 text-base leading-8 text-slate-400">提示詞只是控制面。真正能完成編譯與回測，仍需把 MetaEditor、Strategy Tester、檔案系統與報告解析器接成受控工具。</p><div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/70 p-5"><h3 className="font-bold text-white">最小落地順序</h3><ol className="mt-4 space-y-3 text-sm text-slate-400"><li>1. 先做單一策略的人工確認流程</li><li>2. 接上真實 compiler tool 與結構化日誌</li><li>3. 鎖定基準資料後自動回測</li><li>4. 最後才加平行 Agent 與企業部署</li></ol></div></div>
          <CodePanel filename="master-agent.system.txt" text={masterPrompt} tall label="複製提示詞" />
        </div>
      </section>

      <section className="relative mx-auto max-w-5xl px-4 pb-10 text-center sm:px-6">
        <div className="rounded-[2rem] border border-cyan-300/20 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_45%),rgba(5,8,22,0.86)] px-6 py-12 sm:px-12 sm:py-16"><p className="text-xs font-black tracking-[0.22em] text-cyan-300">THE PRACTICAL ANSWER</p><h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">做得到，但要把「會說」升級成「會用工具驗證」。</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400">最小可行版本不是先開五個聊天視窗，而是先完成一條有證據、可重試、可停止的重構流水線。</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href={localizePath('/converter', locale)} className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-200">查看 AI 重構引擎</Link><Link href={localizePath('/modular', locale)} className="rounded-full border border-slate-700 px-6 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-300/40 hover:text-white">查看模組化流程</Link></div></div>
      </section>
    </main>
  );
}

function LoopPanel({ kind }) {
  const compile = kind === 'compile';
  const items = compile ? ['產出 .mq5', 'MetaEditor 編譯', '解析 error / warning', '退回精確修正單'] : ['鎖定資料與參數', '執行 Strategy Tester', '比對交易與績效', '定位語意差異'];
  return (
    <div>
      <div className="flex items-center justify-between gap-4"><span className={`rounded-full border px-3 py-1 text-xs font-bold ${compile ? 'border-amber-300/25 bg-amber-300/10 text-amber-200' : 'border-emerald-300/25 bg-emerald-300/10 text-emerald-200'}`}>{compile ? 'LOOP A / COMPILE' : 'LOOP B / BACKTEST'}</span><span className="font-mono text-xs text-slate-500">{compile ? 'MAX_RETRY = 3' : 'BASELINE_LOCKED'}</span></div>
      <ol className="mt-8 grid gap-4 sm:grid-cols-4">{items.map((item, index) => <li key={item} className="relative rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-200"><span className={`mb-4 block font-mono text-xs ${compile ? 'text-amber-300' : 'text-emerald-300'}`}>0{index + 1}</span>{item}</li>)}</ol>
      <p className="mt-6 text-sm leading-7 text-slate-400">{compile ? '通過條件：0 error；每一條 warning 都有「已修正」或「接受理由」。超過重試上限就交由人工審查，不讓系統無限循環。' : '通過條件：交易次數、方向、時序與績效指標落在事先核准的容差；任何改善都不能建立在改變原策略語意之上。'}</p>
    </div>
  );
}

function CodePanel({ filename, text, tall = false, label }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-700 bg-[#060a17] shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3"><span className="font-mono text-xs text-slate-500">{filename}</span><CopyButton text={text} label={label} /></div>
      <pre className={`${tall ? 'max-h-[34rem] whitespace-pre-wrap text-slate-200' : 'overflow-x-auto text-cyan-100'} overflow-auto p-5 text-[12px] leading-6 sm:p-6`}><code>{text}</code></pre>
    </div>
  );
}
