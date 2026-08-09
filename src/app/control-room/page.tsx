"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLocaleFromPath, localizePath } from '../../lib/locale';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { Shield, Radio, Activity, Cpu, AlertTriangle, Check, X, ShieldAlert, Zap } from 'lucide-react';


import MqlEvolutionEngineExperience from '../../components/MqlEvolutionEngineExperience';

const generateInitialVolData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: `${15 + Math.floor(i / 4)}:${(i % 4) * 15 === 0 ? '00' : (i % 4) * 15}`,
    vol: 0.05 + Math.random() * 0.08,
    ofi: Math.floor(Math.random() * 30) - 15
  }));
};

const initialAccounts = [
  { id: 'Acc_Prop1', netLiq: '$120,425,100', drawdown: -0.84, spread: 0.2, latency: 0.84, status: 'NOMINAL' },
  { id: 'Acc_Prop2', netLiq: '$84,110,900', drawdown: -1.12, spread: 0.3, latency: 0.91, status: 'NOMINAL' },
  { id: 'Acc_Prop3', netLiq: '$210,850,000', drawdown: -0.15, spread: 0.2, latency: 1.14, status: 'NOMINAL' },
  { id: 'Acc_Prop4', netLiq: '$56,300,200', drawdown: -4.62, spread: 0.8, latency: 4.25, status: 'WARNING' },
];

const initialRadarData = [
  { subject: 'Macro Alignment', A: 85, B: 90, fullMark: 100 },
  { subject: 'OrderFlow Imbalance', A: 70, B: 85, fullMark: 100 },
  { subject: 'VPIN Toxicity', A: 42, B: 50, fullMark: 100 },
  { subject: 'GARCH Stability', A: 90, B: 75, fullMark: 100 },
  { subject: 'Regime Conviction', A: 87, B: 80, fullMark: 100 },
];

export default function ControlRoomDashboard() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const homeLabel = pathname.startsWith('/en') ? 'Back to home' : pathname.startsWith('/zh-Hans') ? '\u56de\u9996\u9875' : '\u56de\u9996\u9801';
  const institutionalEdition = ({
    en: { label: 'Institutional Edition — 100% Offline Private Enterprise Cloud', detail: 'Built for financial investment and trading, this 100% offline, fully private enterprise-cloud architecture meets institutions\' highest demands for quantitative strategies, client-asset privacy, high-frequency algorithms, and protection against insider or industrial espionage leaks.' },
    'zh-Hant': { label: '\u6cd5\u4eba\u6a5f\u69cb\u7248_\u96e2\u7dda100%\u79c1\u5bc6-\u4f01\u696d\u79c1\u6709\u96f2', detail: '\u91dd\u5c0d\u91d1\u878d\u6295\u8cc7\u4ea4\u6613\u9818\u57df\uff0c\u4e3b\u6253\u300c100%\u96e2\u7dda\u3001\u7d55\u5c0d\u79c1\u5bc6\u3001\u4f01\u696d\u79c1\u6709\u96f2\u300d\u7684\u67b6\u69cb\uff0c\u6700\u80fd\u5207\u4e2d\u9019\u985e\u6a5f\u69cb\u5c0d\u65bc\u91cf\u5316\u4ea4\u6613\u7b56\u7565\u3001\u5ba2\u6236\u8cc7\u7522\u96b1\u79c1\u3001\u9ad8\u983b\u4ea4\u6613\u6f14\u7b97\u6cd5\u4ee5\u53ca\u9632\u7bc4\u5167\u7dda/\u5546\u696d\u9593\u8adc\u5916\u6d29\u7684\u6975\u81f4\u8981\u6c42\u3002' },
    'zh-Hans': { label: '\u6cd5\u4eba\u673a\u6784\u7248_\u79bb\u7ebf100%\u79c1\u5bc6-\u4f01\u4e1a\u79c1\u6709\u4e91', detail: '\u9488\u5bf9\u91d1\u878d\u6295\u8d44\u4ea4\u6613\u9886\u57df\uff0c\u4e3b\u6253\u300c100%\u79bb\u7ebf\u3001\u7edd\u5bf9\u79c1\u5bc6\u3001\u4f01\u4e1a\u79c1\u6709\u4e91\u300d\u7684\u67b6\u6784\uff0c\u6700\u80fd\u5207\u4e2d\u8fd9\u7c7b\u673a\u6784\u5bf9\u4e8e\u91cf\u5316\u4ea4\u6613\u7b56\u7565\u3001\u5ba2\u6237\u8d44\u4ea7\u9690\u79c1\u3001\u9ad8\u9891\u4ea4\u6613\u7b97\u6cd5\u4ee5\u53ca\u9632\u8303\u5185\u7ebf/\u5546\u4e1a\u95f4\u8c0d\u5916\u6cc4\u7684\u6781\u81f4\u8981\u6c42\u3002' },
  })[locale] || { label: 'Institutional Edition', detail: '' };  const institutionalCap = ({
    en: 'TOP-TIER ISO/IEC 27001 NETWORK ISOLATION & PHYSICAL SECURITY CERTIFICATION',
    'zh-Hant': '\u6700\u9802\u7d1aISO/IEC 27001\u7db2\u8def\u9694\u96e2\u8207\u5be6\u9ad4\u5b89\u5168\u8a8d\u8b49',
    'zh-Hans': '\u6700\u9876\u7ea7ISO/IEC 27001\u7f51\u7edc\u9694\u79bb\u4e0e\u5b9e\u4f53\u5b89\u5168\u8ba4\u8bc1',
  })[locale] || 'ISO/IEC 27001 SECURITY CERTIFICATION';  const institutionalSecuritySummary = ({
    en: 'Our system is a capsule-core Docker Compose deployment that is 100% offline. It meets ISO 27001 A.8.22 network-boundary physical-isolation requirements, and its core encryption reaches FIPS 140-3 military-grade protection. This enterprise private cloud aligns with global financial DORA and SOC 2 privacy-compliance frameworks.',
    'zh-Hant': '\u300c\u6211\u5011\u7684\u7cfb\u7d71\u662f\u81a0\u56ca\u8259\u6838\u5fc3Docker compose100% \u96e2\u7dda\u5e03\u7f72\uff0c\u5b8c\u5168\u7b26\u5408 ISO 27001 A.8.22 \u6700\u56b4\u683c\u7684\u7db2\u8def\u908a\u754c\u5be6\u9ad4\u9694\u96e2\u6a19\u6e96\uff0c\u6838\u5fc3\u52a0\u5bc6\u6a21\u7d44\u66f4\u9054\u5230 FIPS 140-3 \u8ecd\u898f\u7d1a\u9632\u8b77\u3002\u9019\u4e0d\u662f\u4e00\u500b\u5c01\u9589\u7684\u967d\u6625\u7cfb\u7d71\uff0c\u800c\u662f\u5b8c\u5168\u7b26\u5408\u5168\u7403\u91d1\u878d DORA \u6cd5\u6848\u8207 SOC 2 \u96b1\u79c1\u5408\u898f\u67b6\u69cb\u7684\u9802\u7d1a\u4f01\u696d\u79c1\u6709\u96f2\u3002\u300d',
    'zh-Hans': '\u300c\u6211\u4eec\u7684\u7cfb\u7edf\u662f\u80f6\u56ca\u8231\u6838\u5fc3Docker compose100% \u79bb\u7ebf\u90e8\u7f72\uff0c\u5b8c\u5168\u7b26\u5408 ISO 27001 A.8.22 \u6700\u4e25\u683c\u7684\u7f51\u7edc\u8fb9\u754c\u5b9e\u4f53\u9694\u79bb\u6807\u51c6\uff0c\u6838\u5fc3\u52a0\u5bc6\u6a21\u7ec4\u66f4\u8fbe\u5230 FIPS 140-3 \u519b\u89c4\u7ea7\u9632\u62a4\u3002\u8fd9\u4e0d\u662f\u4e00\u4e2a\u5c01\u95ed\u7684\u7b80\u964b\u7cfb\u7edf\uff0c\u800c\u662f\u5b8c\u5168\u7b26\u5408\u5168\u7403\u91d1\u878d DORA \u6cd5\u6848\u4e0e SOC 2 \u9690\u79c1\u5408\u89c4\u67b6\u6784\u7684\u9876\u7ea7\u4f01\u4e1a\u79c1\u6709\u4e91\u3002\u300d',
  })[locale] || '';

  const institutionalNotices = {
  en: 'Institutional Edition notice: this page is an interactive front-end demonstration. It can display sample MQL5 output and logs, but it is not connected to a live AI model API, MetaEditor compilation, or MT5 backtesting and optimization service. Visitors may try up to five sample source-code conversions per day with their own valid AI LLM and API credentials.',
  'zh-Hant': '法人機構版說明：本頁為可互動的前端展示，會呈現範例 MQL5 輸出與日誌；目前未連接實際 AI 模型 API、MetaEditor 編譯或 MT5 回測與最佳化服務。訪客可使用自己的有效 AI LLM 與 API 憑證，每日試用最多五次範例原始碼轉換。',
  'zh-Hans': '法人机构版说明：本页为可交互的前端展示，会呈现示例 MQL5 输出与日志；目前未连接实际 AI 模型 API、MetaEditor 编译或 MT5 回测与优化服务。访客可使用自己的有效 AI LLM 与 API 凭证，每日试用最多五次示例源代码转换。',
  ja: '法人向けエディションのお知らせ：このページは対話型フロントエンドのデモです。サンプルの MQL5 出力とログを表示しますが、実際の AI モデル API、MetaEditor のコンパイル、MT5 のバックテストや最適化サービスには接続していません。有効な AI LLM と API 認証情報を利用して、サンプルソースコード変換を 1 日最大 5 回試せます。',
  de: 'Hinweis zur Institutional Edition: Diese Seite ist eine interaktive Frontend-Demonstration. Sie zeigt beispielhafte MQL5-Ausgaben und Protokolle, ist jedoch nicht mit einer echten KI-Modell-API, der MetaEditor-Kompilierung oder MT5-Backtests und -Optimierungen verbunden. Mit eigenen gültigen AI-LLM- und API-Zugangsdaten sind bis zu fünf Beispiel-Quellcodekonvertierungen pro Tag möglich.',
  es: 'Aviso de la edición institucional: esta página es una demostración interactiva de interfaz. Puede mostrar resultados y registros de ejemplo de MQL5, pero no está conectada a una API real de IA, a la compilación de MetaEditor ni a servicios de pruebas retrospectivas u optimización de MT5. Con credenciales válidas propias de AI LLM y API, se pueden probar hasta cinco conversiones de código fuente de ejemplo al día.',
};
  const [systemState, setSystemState] = useState<'NOMINAL' | 'WARNING' | 'CRISIS' | 'HALT'>('NOMINAL');
  const [volData, setVolData] = useState(generateInitialVolData());
  const [accounts, setAccounts] = useState(initialAccounts);
  const [showApproval, setShowApproval] = useState(true);
  const [twoManLock, setTwoManLock] = useState(false);


  useEffect(() => {
    if (systemState === 'HALT') return;

    const interval = setInterval(() => {
      setVolData(prev => {
        const next = [...prev.slice(1)];
        const lastHour = parseInt(prev[prev.length - 1].time.split(':')[0]);
        const lastMin = parseInt(prev[prev.length - 1].time.split(':')[1]);
        let newMin = lastMin + 1;
        let newHour = lastHour;
        if (newMin >= 60) { newMin = 0; newHour += 1; }
        
        next.push({
          time: `${newHour}:${newMin < 10 ? '0' + newMin : newMin}`,
          vol: 0.04 + Math.random() * 0.1,
          ofi: Math.floor(Math.random() * 40) - 20
        });
        return next;
      });

      setAccounts(prev => prev.map(acc => {
        if (acc.id === 'Acc_Prop4' && systemState === 'NOMINAL') {
          return { ...acc, latency: 3.5 + Math.random() * 2, spread: 0.6 + Math.random() * 0.4 };
        }
        return {
          ...acc,
          latency: acc.id === 'Acc_Prop4' ? acc.latency : 0.7 + Math.random() * 0.5,
          spread: acc.id === 'Acc_Prop4' ? acc.spread : 0.1 + Math.random() * 0.2
        };
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [systemState]);

  const triggerGlobalHalt = () => {
    setSystemState('HALT');
    setShowApproval(false);
    setAccounts(prev => prev.map(acc => ({ ...acc, status: 'TERMINATED', drawdown: 0, spread: 0, latency: 0 })));
  };

  return (
    <div className={`min-h-screen bg-[#0B0F19] text-slate-200 font-mono p-4 selection:bg-cyan-500 selection:text-black transition-colors duration-500 ${systemState === 'CRISIS' ? 'border-4 border-red-600' : systemState === 'HALT' ? 'border-4 border-amber-600' : ''}`}>
      
      <div aria-hidden="true" className="control-room-scan-line" />
      <aside className="mb-4 text-left text-[10px] leading-5 text-white/80 sm:text-[11px]" role="note">
        {'\uD83D\uDEE1\uFE0F '}{institutionalNotices[locale]}
      </aside>
      <div aria-hidden="true" className="mb-4 h-px w-full bg-gradient-to-r from-transparent via-white/90 to-transparent shadow-[0_0_8px_rgba(255,255,255,0.72)]" />
      <div className="mb-6">
        <span className="inline-flex rounded-xl bg-cyan-500 px-4 py-1.5 text-sm font-semibold text-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.5),0_0_36px_rgba(34,211,238,0.25)]">{institutionalEdition.label}</span>
        <p className="mt-2 text-xs font-medium tracking-wide text-cyan-100/90">{institutionalEdition.detail}</p>
      </div>
      <header className="flex flex-wrap justify-between items-center border border-slate-800 bg-[#0F1524] p-3 rounded-t-lg shadow-2xl mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Radio className={`w-5 h-5 ${systemState === 'HALT' ? 'text-amber-500 animate-pulse' : 'text-cyan-400 animate-pulse'}`} />
            <span className="text-sm font-bold tracking-widest text-slate-400">C4ISR META-TRADING OPERATIONAL CONTROL</span>
          </div>
          <div className={`px-3 py-1 rounded text-xs font-bold ${
            systemState === 'NOMINAL' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30' :
            systemState === 'WARNING' ? 'bg-yellow-950/80 text-yellow-400 border border-yellow-500/30' :
            systemState === 'CRISIS' ? 'bg-red-950/80 text-red-400 border border-red-500/30 animate-pulse' :
            'bg-amber-950/80 text-amber-500 border border-amber-500/50'
          }`}>
            SYSTEM: {systemState}
          </div>
        </div>
        
        <div className="flex items-center space-x-8 text-xs mt-2 sm:mt-0">
          <div><span className="text-slate-500">GLOBAL AUM:</span> <span className="text-cyan-400 font-bold">$2.45B</span></div>
          <div><span className="text-slate-500">1-DAY VaR (99%):</span> <span className="text-red-400 font-bold">$14.2M</span></div>
          <div><span className="text-slate-500">ZMQ KERNEL CORE:</span> <span className="text-emerald-400 font-bold">ONLINE (CORES 4-16)</span></div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        
        <div className="xl:col-span-4 space-y-4">
          <div className="border border-slate-800 bg-[#0F1524] p-4 rounded-lg shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
            <h2 className="text-xs font-bold text-slate-400 tracking-wider mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" /> [M2] MARKET REGIME SENSING UNIT
            </h2>
            
            <div className="space-y-3 mb-4">
              <div className="text-xs text-slate-400 flex justify-between mb-1">
                <span>HMM State 3: High Volatility Trend</span>
                <span className="text-cyan-400 font-bold">87.4% [ACTIVE]</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-full rounded-full" style={{ width: '87.4%' }} />
              </div>

              <div className="text-xs text-slate-400 flex justify-between mb-1">
                <span>HMM State 1: Low Volatility Entropy</span>
                <span className="text-slate-500">10.2%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-slate-700 h-full rounded-full" style={{ width: '10.2%' }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-800/60 pt-3">
              <div className="bg-slate-950 p-2 rounded border border-slate-900">
                <div className="text-slate-500">Order Flow (OFI)</div>
                <div className="text-emerald-400 font-bold text-sm">+14.2 Delta</div>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-900">
                <div className="text-slate-500">VPIN Toxicity</div>
                <div className="text-cyan-400 font-bold text-sm">0.42 [SAFE]</div>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-900 col-span-2">
                <div className="text-slate-500">NLP Sentiment (Fed/X-Stream)</div>
                <div className="text-yellow-400 font-bold text-sm">Hawk Tilt (+0.24)</div>
              </div>
            </div>
          </div>

          <div className="border border-slate-800 bg-[#0F1524] p-4 rounded-lg shadow-xl">
            <h2 className="text-xs font-bold text-slate-400 tracking-wider mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" /> VOLATILITY DYNAMICS & STREAMING INFERENCE
            </h2>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={volData}>
                  <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={10} domain={['auto', 'auto']} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0F1524', borderColor: '#334155', fontFamily: 'monospace', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="vol" stroke="#06b6d4" strokeWidth={2} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="ofi" stroke="#10b981" strokeWidth={1} strokeDasharray="3 3" dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="xl:col-span-5 space-y-4">
          <div className="border border-slate-800 bg-[#0F1524] p-4 rounded-lg shadow-xl relative min-h-[460px] flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-1 h-full bg-violet-500" />
            <div>
              <h2 className="text-xs font-bold text-slate-400 tracking-wider mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-violet-400" /> [M3] LANGGRAPH INTERRUPT & ORCHESTRATION ENGINE
              </h2>
              
              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="p-2 bg-slate-950 rounded border border-emerald-500/20 text-xs">
                  <div className="text-emerald-400 font-bold">AGENT A</div>
                  <span className="text-[10px] text-slate-500">Macro Analyst</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-emerald-500/20 text-xs">
                  <div className="text-emerald-400 font-bold">AGENT B</div>
                  <span className="text-[10px] text-slate-500">Structure Matrix</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-violet-500 animate-pulse text-xs">
                  <div className="text-violet-400 font-bold">AGENT C</div>
                  <span className="text-[10px] text-slate-500">Portfolio Allocator</span>
                </div>
              </div>

              <div className="h-44 flex justify-center items-center my-2">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={initialRadarData}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={9} />
                    <Radar name="Agent Conviction" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.15} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {showApproval ? (
              <div className="bg-slate-950 p-3 rounded-lg border border-violet-500/40 shadow-inner animate-fade-in">
                <div className="flex items-center gap-2 text-xs font-bold text-violet-400 mb-1">
                  <AlertTriangle className="w-4 h-4 animate-bounce" /> {`>> PENDING REBALANCE INTERRUPT GENERATED <<`}
                </div>
                <div className="text-xs text-slate-300 space-y-1 bg-[#0F1524] p-2 rounded border border-slate-900 mb-3">
                  <p><span className="text-slate-500">PROPOSAL:</span> Reduce Trend EA Weight by <span className="text-red-400 font-bold">30%</span> on Cluster Alpha.</p>
                  <p><span className="text-slate-500">REASONING:</span> Volatility Clustering (GARCH: 0.024) detected. Order Book toxic imbalance exceeds threshold.</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => { setShowApproval(false); setSystemState('NOMINAL'); }}
                    className="flex items-center justify-center gap-1 bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white font-bold text-xs py-2 px-3 rounded transition shadow-lg shadow-emerald-950/50"
                  >
                    <Check className="w-3 h-3" /> CONFIRM & BROADCAST
                  </button>
                  <button 
                    onClick={() => { setShowApproval(false); setSystemState('CRISIS'); }}
                    className="flex items-center justify-center gap-1 bg-red-950/80 hover:bg-red-900/60 text-red-400 border border-red-700/50 font-bold text-xs py-2 px-3 rounded transition"
                  >
                    <X className="w-3 h-3" /> REJECT & RE-OPT
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-slate-600 bg-slate-950/40 rounded border border-dashed border-slate-800">
                No pending Graph interrupts. Intelligent agents operating within nominal guardrails.
              </div>
            )}
          </div>
        </div>

        <div className="xl:col-span-3 space-y-4">
          <div className="border border-slate-800 bg-[#0F1524] p-4 rounded-lg shadow-xl relative overflow-hidden h-full flex flex-col justify-between min-h-[460px]">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
            <div>
              <h2 className="text-xs font-bold text-slate-400 tracking-wider mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" /> [M4] REALTIME MT5 EXECUTION MATRIX
              </h2>
              
              <div className="space-y-2">
                {accounts.map(acc => (
                  <div key={acc.id} className="p-2 bg-slate-950 rounded border border-slate-900 text-[11px] space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-300">{acc.id}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        acc.status === 'NOMINAL' ? 'bg-emerald-950 text-emerald-400' :
                        acc.status === 'WARNING' ? 'bg-yellow-950 text-yellow-400 animate-pulse' :
                        'bg-slate-900 text-slate-600'
                      }`}>{acc.status}</span>
                    </div>
                    <div className="grid grid-cols-2 text-slate-500 gap-y-0.5">
                      <div>Liq: <span className="text-slate-300">{acc.netLiq}</span></div>
                      <div>Draw: <span className={acc.drawdown < -3 ? 'text-red-400' : 'text-slate-300'}>{acc.drawdown}%</span></div>
                      <div>Spread: <span className="text-slate-300">{acc.spread.toFixed(1)} p</span></div>
                      <div>ZMQ: <span className={acc.latency > 3 ? 'text-yellow-400' : 'text-emerald-400'}>{acc.latency.toFixed(2)}ms</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-800/60 pt-3 text-[10px] text-slate-500 space-y-1">
              <div className="flex justify-between">
                <span>ZMQ PIPELINE CAPACITY:</span>
                <span className="text-slate-300 font-bold">14,250 Ticks/s</span>
              </div>
              <div className="flex justify-between">
                <span>PROTOBUF DESERIALIZATION:</span>
                <span className="text-emerald-400 font-bold">18敺桃?</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <footer className="mt-4 border border-red-950 bg-gradient-to-r from-red-950/20 via-[#0F1524] to-red-950/20 p-4 rounded-lg shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-3">
          <ShieldAlert className={`w-8 h-8 ${systemState === 'HALT' ? 'text-amber-500' : 'text-red-500 animate-pulse'}`} />
          <div>
            <h3 className="text-xs font-bold tracking-wider text-red-400">CRITICAL SAFETY OVERRIDE INTERFACE</h3>
            <p className="text-[11px] text-slate-500">Evaporate all open exposure across connected multi-account terminals natively via ZeroMQ Emergency Wire.</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <label className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-950 p-2 rounded border border-slate-800 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={twoManLock} 
              onChange={(e) => setTwoManLock(e.target.checked)}
              disabled={systemState === 'HALT'}
              className="accent-red-600 rounded" 
            />
            <span>RELEASE TWO-MAN SECURITY VALVE</span>
          </label>

          <button
            onClick={triggerGlobalHalt}
            disabled={!twoManLock || systemState === 'HALT'}
            className={`w-full md:w-auto font-bold text-xs py-3 px-6 rounded tracking-widest transition-all duration-300 ${
              systemState === 'HALT' 
                ? 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'
                : twoManLock 
                  ? 'bg-red-700 hover:bg-red-600 active:bg-red-800 text-white animate-pulse border border-red-500 shadow-lg shadow-red-950'
                  : 'bg-red-950/40 text-red-700 border border-red-950 cursor-not-allowed'
            }`}
          >
            {systemState === 'HALT' ? 'SYSTEM TERMINATED' : 'GLOBAL CLOSE ALL & HALT SYSTEM'}
          </button>
        </div>
      </footer>

      <div className="mt-8 flex justify-center">
        <Link
          href={localizePath('/', locale)}
          className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-1.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-cyan-300/70 hover:bg-cyan-500/10 hover:text-cyan-100 hover:shadow-[0_0_14px_rgba(34,211,238,0.65),0_0_30px_rgba(34,211,238,0.28)]"
        >
          {homeLabel}
        </Link>
      </div>

      <section className="mt-6" aria-label="AI Refactoring Engine">
        <MqlEvolutionEngineExperience showNotice={false} showEdition={false} edition={institutionalEdition} frameCap={institutionalCap} securitySummary={institutionalSecuritySummary} />
      </section>

    </div>
  );
}
