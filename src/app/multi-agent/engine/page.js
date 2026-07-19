'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getLocaleFromPath, localizePath } from '../../../lib/locale';
import { getMqlEngineCopy } from '../../../lib/mqlEngineI18n';
import PrivateLlmVault from '../../../components/PrivateLlmVault';

const agentColors = ['cyan', 'blue', 'violet', 'amber', 'emerald'];
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

function AgentNode({ agent, active, onSelect }) {
  return (
    <button type="button" onClick={onSelect} className={`group relative flex h-32 w-full min-w-0 flex-col rounded-2xl border bg-slate-950/72 p-3 text-left backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-slate-900/90 sm:p-4 ${active ? accent[agent.color] : 'border-slate-700/70 text-slate-400'}`}>
      <div aria-hidden="true" className={`absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent ${active ? 'via-cyan-300/80' : 'via-slate-600/40'} to-transparent`} />
      <div className="flex items-center justify-between gap-2"><span className="font-mono text-[10px] font-black tracking-[0.18em]">{agent.code}</span><SignalDot live={active} /></div>
      <strong className="mt-5 block min-h-10 text-sm leading-5 text-white">{agent.role}</strong>
      <span className="mt-auto flex min-w-0 items-center gap-2 pt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-600"><span aria-hidden="true" className="flex h-5 w-5 flex-none items-center justify-center rounded-md border border-cyan-300/15 bg-cyan-300/[0.07] text-[12px] shadow-[0_0_12px_rgba(34,211,238,0.1)]">{agent.avatar}</span><span className="truncate">{agent.name}</span></span>
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

export default function MqlEvolutionEngineExperience() {
  const pathname = usePathname() || '/en/multi-agent/engine';
  const locale = getLocaleFromPath(pathname);
  const copy = getMqlEngineCopy(locale);
  const productTypes = Object.entries(copy.products);
  const agentNodes = copy.agents.map(([name, role, detail], index) => ({ code: `A${index + 1}`, name, role, detail, color: agentColors[index], avatar: agentAvatars[index] }));
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
        <header className="overflow-hidden rounded-[1.75rem] border border-cyan-300/15 bg-slate-950/55 shadow-[0_24px_90px_rgba(2,6,23,0.58)] backdrop-blur-2xl">
          <div className="grid gap-8 px-5 py-7 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-10 lg:py-9">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/8 px-3 py-1.5 font-mono text-[10px] font-black tracking-[0.18em] text-cyan-200"><SignalDot live /> NEURAL ORCHESTRATION ONLINE</span>
                <span className="rounded-full border border-violet-300/20 bg-violet-300/8 px-3 py-1.5 font-mono text-[10px] font-black tracking-[0.18em] text-violet-200">MASTER × 5 AGENTS</span>
              </div>
              <h1 className="mt-5 text-balance text-3xl font-black leading-[1.04] tracking-[-0.04em] sm:text-5xl lg:text-6xl">{copy.hero1}<br /><span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">{copy.hero2}</span></h1>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">{copy.hero}</p>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/15 blur-3xl" />
              <div className="relative grid grid-cols-[minmax(0,1fr)_8rem_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[minmax(0,1fr)_10rem_minmax(0,1fr)] sm:gap-4">
                <div className="space-y-4">{agentNodes.slice(0, 2).map((agent, index) => <AgentNode key={agent.code} agent={agent} active={activeAgent === index} onSelect={() => setActiveAgent(index)} />)}</div>
                <button type="button" onClick={() => setActiveAgent(-1)} className="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-cyan-200/45 bg-[radial-gradient(circle_at_50%_25%,rgba(34,211,238,0.28),rgba(8,15,35,0.96)_65%)] text-center shadow-[0_0_60px_rgba(34,211,238,0.22)] transition hover:scale-[1.03]">
                  <div aria-hidden="true" className="absolute inset-3 rounded-[1.4rem] border border-cyan-300/10" />
                  <span className="font-mono text-[9px] tracking-[0.2em] text-cyan-300">MASTER</span><strong className="mt-2 text-4xl font-black text-white">M</strong><span className="mt-2 flex items-center gap-1.5 text-[9px] font-bold tracking-[0.12em] text-slate-500"><span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-lg border border-cyan-200/25 bg-cyan-300/10 text-sm shadow-[0_0_16px_rgba(34,211,238,0.18)]">🤖</span><span>COMMAND CORE</span></span>
                </button>
                <div className="space-y-4">{agentNodes.slice(2, 4).map((agent, index) => <AgentNode key={agent.code} agent={agent} active={activeAgent === index + 2} onSelect={() => setActiveAgent(index + 2)} />)}</div>
              </div>
              <div className="mx-auto mt-4 w-full max-w-48"><AgentNode agent={agentNodes[4]} active={activeAgent === 4} onSelect={() => setActiveAgent(4)} /></div>
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

        <PrivateLlmVault locale={locale} />

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
    </main>
  );
}
