'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getLocaleFromPath, localizePath } from '../lib/locale';
import { getMqlEngineCopy } from '../lib/mqlEngineI18n';
import PrivateLlmVault from './PrivateLlmVault';
import DailyTrialLimitModal from './DailyTrialLimitModal';
import { consumeDailyTrial } from '../lib/dailyTrialLimit';

const agentColors = ['cyan', 'blue', 'violet', 'amber', 'emerald'];
const agentCodes = ['SubAgent1', 'SubAagent2', 'SubAagent3', 'SubAgent4', 'SubAgent5'];
const agentAvatars = ['🔍', '🧭', '💻', '🛠️', '📈'];
const deliverableCodes = ['SOURCE', 'BUILD', 'MAP', 'PROOF', 'VERSION'];

const toolSignals = [
  ['PY', 'Python Orchestrator', 'READY'],
  ['ME', 'MetaEditor Bridge', 'AWAITING'],
  ['MT5', 'Strategy Tester', 'AWAITING'],
  ['EV', 'Evidence Vault', 'READY'],
];

const accent = {
  cyan: 'border-cyan-300/35 text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.12)]',
  blue: 'border-blue-300/35 text-blue-200 shadow-[0_0_30px_rgba(59,130,246,0.12)]',
  violet: 'border-violet-300/35 text-violet-200 shadow-[0_0_30px_rgba(139,92,246,0.12)]',
  amber: 'border-amber-300/35 text-amber-200 shadow-[0_0_30px_rgba(251,191,36,0.1)]',
  emerald: 'border-emerald-300/35 text-emerald-200 shadow-[0_0_30px_rgba(52,211,153,0.1)]',
};

function SignalDot({ live = false }) {
  return <span className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.95)]' : 'bg-slate-600'}`} />;
}

function AgentNode({ agent, active, onSelect, processing = false, pulseDelay = 0 }) {
  return (
    <button type="button" onClick={onSelect} style={processing ? { animationDelay: `${pulseDelay * 140}ms` } : undefined} className={`group relative flex h-32 w-full min-w-0 flex-col overflow-hidden rounded-2xl border bg-[radial-gradient(circle_at_15%_0%,rgba(34,211,238,0.13),transparent_42%),rgba(2,6,23,0.88)] p-3 text-left shadow-[inset_0_1px_0_rgba(165,243,252,0.1),0_12px_32px_rgba(2,6,23,0.34)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/55 hover:shadow-[0_0_34px_rgba(34,211,238,0.2),inset_0_1px_0_rgba(165,243,252,0.2)] sm:p-4 ${processing ? 'agent-engine-active' : ''} ${active ? accent[agent.color] : 'border-slate-700/70 text-slate-400'}`}>
      <div aria-hidden="true" className="absolute inset-1 rounded-[0.85rem] border border-cyan-300/10" />
      <div aria-hidden="true" className={`absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent ${active ? 'via-cyan-300/80' : 'via-slate-600/40'} to-transparent`} />
      <div aria-hidden="true" className="absolute right-3 top-3 h-3 w-3 border-r border-t border-cyan-300/35" />
      <div className="relative z-10 flex items-center justify-between gap-2"><span className="font-mono text-[10px] font-black tracking-[0.14em] text-cyan-100 drop-shadow-[0_0_7px_rgba(103,232,249,0.7)]">{agent.code}</span><span className="flex items-center gap-1.5"><span className="font-mono text-[7px] tracking-[0.18em] text-cyan-300/55">SYNC</span><SignalDot live={active} /></span></div>
      <strong className="relative z-10 mt-5 block min-h-10 text-sm leading-5 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.18)]">{agent.role}</strong>
      <span className="relative z-10 mt-auto flex min-w-0 items-center gap-2 border-t border-cyan-300/10 pt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-600"><span aria-hidden="true" className="flex h-5 w-5 flex-none items-center justify-center rounded-md border border-cyan-300/15 bg-cyan-300/[0.07] text-[12px] shadow-[0_0_12px_rgba(34,211,238,0.1)]">{agent.avatar}</span><span className="truncate">{agent.name}</span></span>
    </button>
  );
}

function analyzeMqlSource(code) {
  const text = code.trim();
  if (!text) return { version: 'MQL4', product: 'ea', confidence: 0, signals: [] };

  const mql5Rules = [
    [/\bMqlTrade(Request|Result)\b/, 'MqlTradeRequest'], [/\b(CTrade|CPositionInfo|CDealInfo)\b/, 'MQL5 trade classes'],
    [/\b(PositionSelect|PositionGet|HistoryDealGet|CopyBuffer|CopyRates)\w*\b/, 'MQL5 API'],
    [/#include\s*<Trade[\\/]Trade\.mqh>/i, 'Trade.mqh'], [/\bENUM_(TRADE|POSITION|DEAL|ORDER)_/i, 'MQL5 enums'],
  ];
  const mql4Rules = [
    [/\b(init|deinit|start)\s*\(/, 'legacy event'], [/\b(OP_BUY|OP_SELL|MarketInfo)\b/, 'MQL4 constants'],
    [/\b(OrderSelect|OrderTicket|OrderMagicNumber|OrdersTotal)\s*\(/, 'MQL4 order pool'],
    [/\bextern\s+(bool|int|double|string)/, 'extern input'], [/\bMODE_(BID|ASK|POINT|DIGITS|STOPLEVEL)\b/, 'MQL4 market modes'],
  ];
  const matched5 = mql5Rules.filter(([rule]) => rule.test(text));
  const matched4 = mql4Rules.filter(([rule]) => rule.test(text));
  const version = matched5.length > matched4.length ? 'MQL5' : 'MQL4';

  let product = 'tools';
  let productSignal = '通用工具結構';
  if (/#property\s+indicator_|\bOnCalculate\s*\(|\bSetIndexBuffer\s*\(/i.test(text)) {
    product = 'indicator'; productSignal = 'indicator buffer / OnCalculate';
  } else if (/#property\s+library|\bexport\b/i.test(text)) {
    product = 'library'; productSignal = 'library / export';
  } else if (/#property\s+script_|\bOnStart\s*\(/i.test(text)) {
    product = 'script'; productSignal = 'script / OnStart';
  } else if (/\bOnTick\s*\(|\bOrderSend\s*\(|\bCTrade\b|\bOP_(BUY|SELL)\b|\bPositionSelect\s*\(/i.test(text)) {
    product = 'ea'; productSignal = 'trade event / order API';
  } else if (/\bOnChartEvent\s*\(|\b(ObjectCreate|ChartSet|CAppDialog)\s*\(/i.test(text)) {
    product = 'tools'; productSignal = 'chart event / UI tool';
  }

  const versionSignals = (version === 'MQL5' ? matched5 : matched4).map(([, label]) => label);
  const confidence = Math.min(98, 62 + versionSignals.length * 7 + (product === 'tools' ? 3 : 10));
  return { version, product, confidence, signals: [...versionSignals.slice(0, 3), productSignal] };
}

export default function MqlEvolutionEngineExperience({ showNotice = true, showEdition = true, editionAboveNotice = false, showZeroTrustNote = false, edition, frameCap, securitySummary }) {
  const pathname = usePathname() || '/en/multi-agent/engine';
  const locale = getLocaleFromPath(pathname);
  const copy = getMqlEngineCopy(locale);
  const productTypes = Object.entries(copy.products);
  const quasiEdition = locale === 'zh-Hant' ? { label: '\u6e96\u6cd5\u4eba\u7248', detail: '\u9069\u7d93\u7d00\u5546/\u81ea\u71df\u5546\u3001EA\u4ea4\u6613\u5718\u968a\u3001\u5bb6\u65cf\u8fa6\u516c\u5ba4\u3001\u79c1\u52df\u57fa\u91d1' } : locale === 'zh-Hans' ? { label: '\u51c6\u6cd5\u4eba\u7248', detail: '\u9002\u7ecf\u7eaa\u5546/\u81ea\u8425\u5546\u3001EA\u4ea4\u6613\u56e2\u961f\u3001\u5bb6\u65cf\u529e\u516c\u5ba4\u3001\u79c1\u52df\u57fa\u91d1' } : { label: 'Quasi-Institutional Edition', detail: 'For brokers, prop firms, EA trading teams, family offices, and private funds' };
  const zeroTrustNotes = {
    en: 'AI-Quant Lab\'s personal, organizational, and enterprise private-cloud platform embodies Zero Trust at its core. It uses a fully encapsulated capsule architecture, deployed through Docker Compose as fully offline, immutable infrastructure. Before release, it undergoes rigorous static (SAST) and dynamic (DAST) vulnerability scanning; deployment rejects all external images and dynamic package downloads. This prevents remote code execution (RCE) and DDoS attacks while eliminating software supply-chain risk at its source, delivering uncompromising foundational protection.',
    'zh-Hant': 'AI-Quant Lab開發的個人/組織/企業私有雲完美落實「零信任（Zero Trust）」的核心精神。系統採用完全封裝的膠囊艙架構，透過 Docker Compose 實現全離線、不可變基礎設施（Immutable Infrastructure）的布署。出廠前完成嚴格的靜態（SAST）與動態（DAST）漏洞掃描，布署時拒絕任何外部鏡像檔（Images）或動態套件下載。這不僅徹底免疫了遠端程式碼執行（RCE）與 DDoS 攻擊，更從源頭根除軟體供應鏈（Supply Chain）的漏洞風險，提供無懈可擊的底層防禦。',
    'zh-Hans': 'AI-Quant Lab开发的个人/组织/企业私有云完美落实「零信任（Zero Trust）」的核心精神。系统采用完全封装的胶囊舱架构，通过 Docker Compose 实现全离线、不可变基础设施（Immutable Infrastructure）的部署。出厂前完成严格的静态（SAST）与动态（DAST）漏洞扫描，部署时拒绝任何外部镜像文件（Images）或动态套件下载。这不仅彻底免疫了远程代码执行（RCE）与 DDoS 攻击，更从源头根除软件供应链（Supply Chain）的漏洞风险，提供无懈可击的底层防御。',
  };
  const zeroTrustNote = zeroTrustNotes[locale] || zeroTrustNotes.en;
  const engineNotices = {
    en: 'Quasi-Institutional Edition notice: this page is an interactive front-end demonstration. It can display sample MQL5 output and logs, but it is not connected to a live AI model API, MetaEditor compilation, or MT5 backtesting and optimization service. Visitors may try up to five sample source-code conversions per day with their own valid AI LLM and API credentials.',
    'zh-Hant': '準法人版說明：本頁為可互動的前端展示，會呈現範例 MQL5 輸出與日誌；目前未連接實際 AI 模型 API、MetaEditor 編譯或 MT5 回測與最佳化服務。訪客可使用自己的有效 AI LLM 與 API 憑證，每日試用最多五次範例原始碼轉換。',
    'zh-Hans': '准法人版说明：本页为可交互的前端展示，会呈现示例 MQL5 输出与日志；目前未连接实际 AI 模型 API、MetaEditor 编译或 MT5 回测与优化服务。访客可使用自己的有效 AI LLM 与 API 凭证，每日试用最多五次示例源代码转换。',
    ja: '準法人向けエディションのお知らせ：このページは対話型フロントエンドのデモです。サンプルの MQL5 出力とログを表示しますが、実際の AI モデル API、MetaEditor のコンパイル、MT5 のバックテストや最適化サービスには接続していません。有効な AI LLM と API 認証情報を利用して、サンプルソースコード変換を 1 日最大 5 回試せます。',
    de: 'Hinweis zur quasi-institutionellen Edition: Diese Seite ist eine interaktive Frontend-Demonstration. Sie zeigt beispielhafte MQL5-Ausgaben und Protokolle, ist jedoch nicht mit einer echten KI-Modell-API, der MetaEditor-Kompilierung oder MT5-Backtests und -Optimierungen verbunden. Mit eigenen gültigen AI-LLM- und API-Zugangsdaten sind bis zu fünf Beispiel-Quellcodekonvertierungen pro Tag möglich.',
    es: 'Aviso de la edición cuasiinstitucional: esta página es una demostración interactiva de interfaz. Puede mostrar resultados y registros de ejemplo de MQL5, pero no está conectada a una API real de IA, a la compilación de MetaEditor ni a servicios de pruebas retrospectivas u optimización de MT5. Con credenciales válidas propias de AI LLM y API, se pueden probar hasta cinco conversiones de código fuente de ejemplo al día.',
  };
  const agentNodes = copy.agents.map(([name, role, detail], index) => ({ code: agentCodes[index], name, role, detail, color: agentColors[index], avatar: agentAvatars[index] }));
  const deliverables = copy.deliverables.map((label, index) => [deliverableCodes[index], label]);
  const [sourceType, setSourceType] = useState('MQL4');
  const [productType, setProductType] = useState('ea');
  const [sourceCode, setSourceCode] = useState('');
  const [prepared, setPrepared] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const processingTimer = useRef(null);
  const [activeAgent, setActiveAgent] = useState(0);
  const [riskMode, setRiskMode] = useState('conservative');
  const [showTrialLimit, setShowTrialLimit] = useState(false);

  const lineCount = useMemo(() => sourceCode ? sourceCode.split(/\r?\n/).length : 0, [sourceCode]);
  const sourceAnalysis = useMemo(() => analyzeMqlSource(sourceCode), [sourceCode]);
  const hasSource = Boolean(sourceCode.trim());

  useEffect(() => {
    document.title = copy.metaTitle;
    return () => {
    if (processingTimer.current) window.clearTimeout(processingTimer.current);
    };
  }, [copy.metaTitle]);

  function prepareJob() {
    if (!sourceCode.trim()) {
      window.alert(copy.pasteAlert);
      return;
    }
    if (!consumeDailyTrial().allowed) {
      setShowTrialLimit(true);
      return;
    }
    if (processingTimer.current) window.clearTimeout(processingTimer.current);
    setPrepared(false);
    setIsProcessing(true);
    processingTimer.current = window.setTimeout(() => {
      setIsProcessing(false);
      setPrepared(true);
    }, 900);
  }

  function handleSourceChange(event) {
    if (processingTimer.current) window.clearTimeout(processingTimer.current);
    const nextCode = event.target.value;
    const nextAnalysis = analyzeMqlSource(nextCode);
    setSourceCode(nextCode);
    if (nextCode.trim()) {
      setSourceType(nextAnalysis.version);
      setProductType(nextAnalysis.product);
    }
    setIsProcessing(false);
    setPrepared(false);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030611] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(34,211,238,0.2),transparent_29%),radial-gradient(circle_at_92%_20%,rgba(99,102,241,0.16),transparent_24%),radial-gradient(circle_at_8%_55%,rgba(139,92,246,0.12),transparent_26%)]" />
      <div aria-hidden="true" className="tech-grid pointer-events-none absolute inset-0 opacity-[0.16]" />
      <div aria-hidden="true" className="animate-scanline pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent shadow-[0_0_22px_rgba(34,211,238,0.7)]" />

      <div className="relative z-10 mx-auto max-w-[92rem] px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
        {showNotice ? <aside className="mb-4 text-left text-[10px] leading-5 text-white/80 sm:text-[11px]" role="note">
          {'\uD83D\uDEE1\uFE0F '}{engineNotices[locale]}
        </aside> : null}
        {showNotice ? <div aria-hidden="true" className="mb-4 h-px w-full bg-gradient-to-r from-transparent via-white/90 to-transparent shadow-[0_0_8px_rgba(255,255,255,0.72)]" /> : null}
        {showEdition && editionAboveNotice ? <div className="mb-6">
          <span className="inline-flex rounded-xl bg-cyan-500 px-4 py-1.5 text-sm font-semibold text-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.5),0_0_36px_rgba(34,211,238,0.25)]">{edition ? edition.label : quasiEdition.label}</span>
          <p className="mt-2 text-xs font-medium tracking-wide text-cyan-100/90">{edition ? edition.detail : quasiEdition.detail}</p>
        </div> : null}
        <header className="relative overflow-hidden rounded-[1.75rem] border border-cyan-300/15 bg-slate-950/55 shadow-[0_24px_90px_rgba(2,6,23,0.58)] backdrop-blur-2xl">{frameCap ? <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 rounded-b-xl border border-emerald-100/75 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-600 w-[70%] max-w-[22.4rem] px-3 py-1.5 text-center font-mono text-[10px] font-black tracking-[0.16em] text-slate-950 shadow-[0_0_16px_rgba(110,231,183,0.9),0_0_36px_rgba(16,185,129,0.58)]">{frameCap}</div> : null}{frameCap ? <div aria-hidden="true" className="absolute left-1/2 top-12 z-10 h-px w-[70%] max-w-[22.4rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-300/90 to-transparent shadow-[0_0_9px_rgba(196,181,253,0.82)]" /> : null}
          <div style={frameCap ? { paddingTop: '5.75rem' } : undefined} className="grid gap-8 px-5 py-7 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-10 lg:py-9">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/8 px-3 py-1.5 font-mono text-[10px] font-black tracking-[0.18em] text-cyan-200"><SignalDot live /> NEURAL ORCHESTRATION ONLINE</span>
                <span className="rounded-full border border-violet-300/20 bg-violet-300/8 px-3 py-1.5 font-mono text-[10px] font-black tracking-[0.18em] text-violet-200">MASTER × 5 AGENTS</span>
              </div>
              {showZeroTrustNote ? <p className="mt-4 max-w-3xl text-xs leading-6 text-cyan-50/90 [text-shadow:0_0_12px_rgba(34,211,238,0.16)] sm:text-sm sm:leading-7">{zeroTrustNote}</p> : null}
              {showZeroTrustNote ? <div aria-hidden="true" className="mt-4 h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-violet-300/90 to-transparent shadow-[0_0_9px_rgba(196,181,253,0.82)]" /> : null}
              {securitySummary ? <p className="mt-4 max-w-3xl text-xs leading-6 text-cyan-50/90 [text-shadow:0_0_12px_rgba(34,211,238,0.16)] sm:text-sm sm:leading-7">{securitySummary}</p> : null}
              {securitySummary ? <div aria-hidden="true" className="mt-4 h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-violet-300/90 to-transparent shadow-[0_0_9px_rgba(196,181,253,0.82)]" /> : null}
{showEdition && !editionAboveNotice ? <div className="mt-4">
                <span className="inline-flex rounded-xl bg-cyan-500 px-4 py-1.5 text-sm font-semibold text-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.5),0_0_36px_rgba(34,211,238,0.25)]">{edition ? edition.label : quasiEdition.label}</span>
                <p className="mt-2 text-xs font-medium tracking-wide text-cyan-100/90">{edition ? edition.detail : quasiEdition.detail}</p>
              </div> : null}
              <h1 className="mt-5 text-balance text-3xl font-black leading-[1.04] tracking-[-0.04em] sm:text-5xl lg:text-6xl">{copy.hero1}<br /><span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">{copy.hero2}</span></h1>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">{copy.hero}</p>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div aria-hidden="true" className="absolute inset-4 opacity-[0.14] [background-image:linear-gradient(rgba(34,211,238,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.5)_1px,transparent_1px)] [background-size:18px_18px]" />
              <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
              <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20 border-dashed" />
              <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10" />
              <div className="relative grid grid-cols-[minmax(0,1fr)_8rem_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[minmax(0,1fr)_10rem_minmax(0,1fr)] sm:gap-4">
                <div className="space-y-4">{agentNodes.slice(0, 2).map((agent, index) => <AgentNode key={agent.code} agent={agent} active={activeAgent === index} onSelect={() => setActiveAgent(index)} processing={isProcessing} pulseDelay={index} />)}</div>
                <button type="button" onClick={() => setActiveAgent(-1)} className={`group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-cyan-200/60 bg-[radial-gradient(circle_at_50%_22%,rgba(103,232,249,0.38),rgba(8,15,35,0.98)_64%)] text-center shadow-[0_0_28px_rgba(103,232,249,0.35),0_0_90px_rgba(34,211,238,0.22),inset_0_0_36px_rgba(34,211,238,0.12)] transition hover:scale-[1.03] ${isProcessing ? 'agent-core-active' : ''}`}>
                  <div aria-hidden="true" className="absolute inset-3 rounded-[1.4rem] border border-cyan-300/20" />
                  <div aria-hidden="true" className="absolute inset-x-4 top-7 h-px bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
                  <div aria-hidden="true" className="absolute left-4 top-4 h-3 w-3 border-l border-t border-cyan-200/70" /><div aria-hidden="true" className="absolute bottom-4 right-4 h-3 w-3 border-b border-r border-cyan-200/70" />
                  <span className="font-mono text-[11px] font-black tracking-[0.16em] text-cyan-200 drop-shadow-[0_0_8px_rgba(103,232,249,1)]">Master Agent</span><strong className="mt-2 text-4xl font-black text-white">M</strong><span className="mt-2 flex items-center gap-1.5 text-[9px] font-bold tracking-[0.12em] text-slate-500"><span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-lg border border-cyan-200/25 bg-cyan-300/10 text-sm shadow-[0_0_16px_rgba(34,211,238,0.18)]">🤖</span><span>COMMAND CORE</span></span>
                </button>
                <div className="space-y-4">{agentNodes.slice(2, 4).map((agent, index) => <AgentNode key={agent.code} agent={agent} active={activeAgent === index + 2} onSelect={() => setActiveAgent(index + 2)} processing={isProcessing} pulseDelay={index + 2} />)}</div>
              </div>
              <div className="mx-auto mt-4 w-full max-w-48"><AgentNode agent={agentNodes[4]} active={activeAgent === 4} onSelect={() => setActiveAgent(4)} processing={isProcessing} pulseDelay={4} /></div>
            </div>
          </div>

          <div className="grid border-t border-slate-800/80 bg-slate-950/50 sm:grid-cols-2 lg:grid-cols-4">
            {toolSignals.map(([code, label, status]) => <div key={code} className="flex items-center justify-between border-b border-slate-800/70 px-5 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"><div className="flex items-center gap-3"><span className="font-mono text-[10px] font-black text-cyan-300">{code}</span><span className="text-xs text-slate-400">{label}</span></div><span className={`font-mono text-[9px] ${status === 'READY' ? 'text-emerald-300' : 'text-slate-600'}`}>{status}</span></div>)}
          </div>
        </header>

        <section className="mt-5 rounded-[1.5rem] border border-slate-700/60 bg-slate-950/60 p-3 shadow-[0_18px_70px_rgba(2,6,23,0.42)] backdrop-blur-2xl sm:p-4">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
            <div className="flex flex-wrap items-center gap-2"><span className="px-2 font-mono text-[9px] font-black tracking-[0.18em] text-slate-600">SOURCE</span>{['MQL4', 'MQL5'].map((type) => <button key={type} type="button" aria-pressed={hasSource && sourceType === type} onClick={() => { setSourceType(type); setPrepared(false); }} className={`rounded-xl border px-4 py-2.5 text-xs font-black transition duration-300 ${hasSource && sourceType === type ? 'border-cyan-200/80 bg-cyan-300 text-slate-950 shadow-[0_0_12px_rgba(103,232,249,0.75),0_0_30px_rgba(34,211,238,0.42)]' : 'border-slate-700 bg-slate-900/70 text-slate-400 hover:border-cyan-300/30'}`}>{type}</button>)}</div>
            <div className="hidden h-8 w-px bg-slate-800 xl:block" />
            <div className="flex flex-wrap items-center gap-2"><span className="px-2 font-mono text-[9px] font-black tracking-[0.18em] text-slate-600">PRODUCT</span>{productTypes.map(([key, label]) => <button key={key} type="button" aria-pressed={hasSource && productType === key} onClick={() => { setProductType(key); setPrepared(false); }} className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition duration-300 ${hasSource && productType === key ? 'border-violet-200/70 bg-violet-400/25 text-violet-50 shadow-[0_0_12px_rgba(196,181,253,0.62),0_0_28px_rgba(139,92,246,0.38)]' : 'border-slate-700 bg-slate-900/70 text-slate-500 hover:border-violet-300/30 hover:text-violet-200'}`}>{label}</button>)}</div>
            <div className="hidden h-8 w-px bg-slate-800 xl:block" />
            <div className="flex flex-wrap items-center gap-2"><span className="px-2 font-mono text-[9px] font-black tracking-[0.18em] text-slate-600">{copy.riskMode}</span>{Object.entries(copy.risks).map(([mode, label]) => <button key={mode} type="button" onClick={() => setRiskMode(mode)} className={`rounded-xl border px-3 py-2.5 text-xs font-bold transition ${riskMode === mode ? 'border-emerald-300/40 bg-emerald-300/10 text-emerald-200' : 'border-slate-700 bg-slate-900/70 text-slate-500'}`}>{label}</button>)}</div>
            <button type="button" onClick={prepareJob} disabled={isProcessing} className="relative ml-auto overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 px-7 py-3 text-sm font-black text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.24)] transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-wait disabled:opacity-70"><span className="relative z-10">{isProcessing ? copy.processing : copy.preflight}</span></button>
          </div>
        </section>

        <PrivateLlmVault locale={locale} onLimitReached={() => setShowTrialLimit(true)} />

        <section className="mt-5 grid gap-5 xl:grid-cols-2">
          <div className={`group overflow-hidden rounded-[1.5rem] border bg-[#050914]/92 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-300/65 hover:bg-cyan-950/[0.12] hover:shadow-[0_0_0_1px_rgba(34,211,238,0.14),0_0_70px_rgba(34,211,238,0.24),0_28px_90px_rgba(2,6,23,0.5)] ${sourceCode.trim() || inputFocused ? 'border-cyan-300/60 shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_0_55px_rgba(34,211,238,0.2),0_24px_80px_rgba(2,6,23,0.45)]' : 'border-slate-700/60 shadow-[0_24px_80px_rgba(2,6,23,0.45)]'}`}>
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/70 px-5 py-3"><div className="flex items-center gap-3"><span className="font-mono text-[10px] font-black text-cyan-300">01 / SOURCE MATRIX</span><span className={`rounded-full border px-2.5 py-1 font-mono text-[9px] ${sourceCode.trim() ? 'border-cyan-300/30 bg-cyan-300/8 text-cyan-200' : 'border-slate-800 text-slate-600'}`}>{sourceCode.trim() ? `AUTO · ${sourceType} · ${copy.products[productType]} · ${sourceAnalysis.confidence}%` : 'AUTO DETECT'}</span></div><div className="flex items-center gap-3 font-mono text-[9px] text-slate-600"><span>{lineCount} LINES</span><SignalDot live={sourceCode.length > 0} /></div></div>
            <div className="grid grid-cols-[2.5rem_1fr]">
              <div aria-hidden="true" className="border-r border-slate-800 bg-slate-950/60 px-2 py-5 text-right font-mono text-[10px] leading-6 text-slate-800">01<br />02<br />03<br />04<br />05<br />06<br />07<br />08<br />09<br />10</div>
              <textarea value={sourceCode} onChange={handleSourceChange} onFocus={() => setInputFocused(true)} onBlur={() => setInputFocused(false)} spellCheck={false} placeholder={copy.placeholder} className={`h-[34rem] w-full resize-none bg-transparent p-5 font-mono text-[13px] leading-6 outline-none transition duration-300 placeholder:text-slate-700 ${sourceCode.trim() || inputFocused ? 'text-cyan-50 caret-cyan-300 [text-shadow:0_0_12px_rgba(34,211,238,0.18)] bg-cyan-400/[0.025]' : 'text-slate-300'}`} />
            </div>
            <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950/70 px-5 py-3 font-mono text-[9px] text-slate-600"><span>UTF-8 · AUTO DEPENDENCY SCAN</span><span className="text-cyan-400/70">ENCRYPTED WORKSPACE</span></div>
          </div>

          <div className={`overflow-hidden rounded-[1.5rem] border transition-all duration-500 ${isProcessing ? 'border-cyan-300/65 bg-cyan-950/20 shadow-[0_0_0_1px_rgba(34,211,238,0.16),0_0_70px_rgba(34,211,238,0.24),0_24px_80px_rgba(2,6,23,0.45)]' : prepared ? 'border-emerald-300/45 bg-emerald-950/10 shadow-[0_0_50px_rgba(52,211,153,0.14),0_24px_80px_rgba(2,6,23,0.45)]' : 'border-slate-800 bg-[#060812] shadow-[0_24px_80px_rgba(2,6,23,0.35)] grayscale'}`}>
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/70 px-5 py-3"><div className="flex items-center gap-3"><span className={`font-mono text-[10px] font-black transition ${isProcessing ? 'text-cyan-200 [text-shadow:0_0_12px_rgba(34,211,238,0.7)]' : prepared ? 'text-emerald-300' : 'text-slate-600'}`}>02 / RELEASE VAULT</span><span className="text-xs text-slate-600">MQL5 DIGITAL PRODUCT</span></div><span className={`rounded-full border px-3 py-1 font-mono text-[9px] font-black ${isProcessing ? 'animate-pulse border-cyan-300/45 bg-cyan-300/10 text-cyan-200' : prepared ? 'border-emerald-300/35 bg-emerald-300/8 text-emerald-300' : 'border-slate-800 text-slate-700'}`}>{isProcessing ? 'ANALYZING' : prepared ? 'PRE-FLIGHT READY' : 'WAITING INPUT'}</span></div>
            {isProcessing ? (
              <div className="flex h-[34rem] flex-col items-center justify-center px-8 text-center">
                <div className="relative flex h-32 w-32 items-center justify-center rounded-[2.25rem] border border-cyan-200/55 bg-cyan-300/10 shadow-[0_0_70px_rgba(34,211,238,0.34)] animate-pulse"><div aria-hidden="true" className="absolute inset-3 rounded-[1.6rem] border border-cyan-200/20" /><span className="font-mono text-xl font-black text-cyan-100 [text-shadow:0_0_18px_rgba(34,211,238,0.9)]">ANALYZE</span></div>
                <h2 className="mt-7 text-xl font-black text-cyan-50 [text-shadow:0_0_16px_rgba(34,211,238,0.45)]">{copy.analyzing}</h2>
                <div className="mt-5 grid w-full max-w-md grid-cols-3 gap-2">{copy.checks.map((item) => <span key={item} className="rounded-lg border border-cyan-300/20 bg-cyan-300/5 px-2 py-2 font-mono text-[9px] text-cyan-200">{item}</span>)}</div>
              </div>
            ) : prepared ? (
              <div className="h-[34rem] overflow-auto p-5 sm:p-7">
                <div className="rounded-2xl border border-cyan-300/20 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_36%),rgba(15,23,42,0.6)] p-5"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><span className="font-mono text-[9px] tracking-[0.18em] text-cyan-300">MISSION SPECIFICATION</span><h2 className="mt-2 text-2xl font-black text-white">{sourceType} {copy.products[productType]} → MQL5</h2><p className="mt-2 text-xs text-slate-500">{copy.riskMode}: {copy.risks[riskMode]} · Master Agent · Evidence required</p></div><div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-300/25 bg-emerald-300/8 font-mono text-sm font-black text-emerald-300">OK</div></div></div>
                <div className="mt-5 grid gap-3">{deliverables.map(([code, label], index) => <div key={code} className="group flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/65 p-4 transition hover:border-emerald-300/25"><span className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 font-mono text-[9px] text-emerald-300">0{index + 1}</span><div><span className="font-mono text-[9px] font-black tracking-[0.14em] text-slate-600">{code}</span><p className="mt-1 text-sm text-slate-300">{label}</p></div></div>)}</div>
                <div className="mt-5 rounded-xl border border-amber-300/20 bg-amber-300/5 p-4 text-xs leading-6 text-amber-100/75">{copy.specNote}</div>
              </div>
            ) : (
              <div className="flex h-[34rem] flex-col items-center justify-center px-8 text-center opacity-55"><div className="relative flex h-28 w-28 items-center justify-center rounded-[2rem] border border-slate-700 bg-slate-900/30"><div aria-hidden="true" className="absolute inset-3 rounded-[1.4rem] border border-slate-800" /><span className="font-mono text-2xl font-black text-slate-600">M×5</span></div><h2 className="mt-7 text-xl font-black text-white">{copy.waiting}</h2><p className="mt-3 max-w-md text-sm leading-7 text-slate-500">{copy.waitingBody}</p></div>
            )}
            <div className="flex items-center justify-between border-t border-slate-800 bg-slate-950/70 px-5 py-3 font-mono text-[9px] text-slate-600"><span>VERIFIABLE ARTIFACTS ONLY</span><span className="text-emerald-400/70">VERSION CONTROLLED</span></div>
          </div>
        </section>

        <section className="mt-5 overflow-hidden rounded-[1.5rem] border border-slate-700/60 bg-slate-950/58 shadow-[0_18px_70px_rgba(2,6,23,0.42)] backdrop-blur-2xl">
          <div className="flex flex-col gap-4 border-b border-slate-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"><div><span className="font-mono text-[9px] font-black tracking-[0.18em] text-violet-300">AUTONOMOUS PIPELINE</span><h2 className="mt-1 text-lg font-black text-white">{copy.pipeline}</h2></div><Link href={localizePath('/multi-agent/automation', locale)} className="rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2 text-xs font-bold text-slate-300 transition hover:border-cyan-300/35 hover:text-cyan-200">{copy.blueprint}</Link></div>
          <div className="grid lg:grid-cols-6">{copy.stages.map((stage, index) => <div key={stage} className="relative border-b border-slate-800 p-5 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"><div className="flex items-center justify-between"><span className="font-mono text-[10px] font-black text-cyan-300">0{index + 1}</span><span className="h-1.5 w-1.5 rounded-full bg-slate-700" /></div><p className="mt-7 text-sm font-bold text-slate-300">{stage}</p><div className="mt-4 h-px bg-gradient-to-r from-cyan-400/40 to-transparent" /></div>)}</div>
        </section>

        <section className="mt-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[1.5rem] border border-slate-700/60 bg-slate-950/58 p-5 backdrop-blur-xl sm:p-6"><div className="grid gap-3 sm:grid-cols-3">{[['BUILD', copy.robust[0], copy.robust[1]], ['ROBUST', copy.robust[2], copy.robust[3]], ['RECOVER', copy.robust[4], copy.robust[5]]].map(([code, title, text]) => <div key={code} className="rounded-xl border border-slate-800 bg-slate-950/70 p-4"><span className="font-mono text-[9px] font-black tracking-[0.15em] text-emerald-300">{code}</span><strong className="mt-4 block text-sm text-white">{title}</strong><span className="mt-1 block text-xs text-slate-600">{text}</span></div>)}</div></div>
          <div className="rounded-[1.5rem] border border-amber-300/20 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.08),transparent_42%),rgba(15,23,42,0.65)] p-5 backdrop-blur-xl sm:p-6"><span className="font-mono text-[9px] font-black tracking-[0.16em] text-amber-300">TRUTH LAYER</span><p className="mt-3 text-sm leading-7 text-amber-50/75">{copy.truth}</p></div>
        </section>
      </div>
      <DailyTrialLimitModal open={showTrialLimit} locale={locale} onClose={() => setShowTrialLimit(false)} />
    </main>
  );
}
