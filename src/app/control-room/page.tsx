"use client";
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { Shield, Radio, Activity, Cpu, AlertTriangle, Check, X, ShieldAlert, Zap } from 'lucide-react';

// --- 模擬高頻即時數據生成器 ---
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
  // 系統全局狀態機: NOMINAL | WARNING | CRISIS | HALT
  const [systemState, setSystemState] = useState<'NOMINAL' | 'WARNING' | 'CRISIS' | 'HALT'>('NOMINAL');
  const [volData, setVolData] = useState(generateInitialVolData());
  const [accounts, setAccounts] = useState(initialAccounts);
  const [showApproval, setShowApproval] = useState(true);
  const [twoManLock, setTwoManLock] = useState(false);

  // 模擬 WebSocket 每秒推送 Tick 數據更新
  useEffect(() => {
    if (systemState === 'HALT') return;

    const interval = setInterval(() => {
      // 動態更新波動率圖表
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

      // 隨機微調帳戶延遲與點差，模擬真實網路狀況
      setAccounts(prev => prev.map(acc => {
        if (acc.id === 'Acc_Prop4' && systemState === 'NOMINAL') {
          // 隨機讓某個帳戶進入 WARNING 觸發大廳視覺感官變化
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

  // 緊急斷路器 (Circuit Breaker) 觸發程序
  const triggerGlobalHalt = () => {
    setSystemState('HALT');
    setShowApproval(false);
    setAccounts(prev => prev.map(acc => ({ ...acc, status: 'TERMINATED', drawdown: 0, spread: 0, latency: 0 })));
  };

  return (
    <div className={`min-h-screen bg-[#0B0F19] text-slate-200 font-mono p-4 selection:bg-cyan-500 selection:text-black transition-colors duration-500 ${systemState === 'CRISIS' ? 'border-4 border-red-600' : systemState === 'HALT' ? 'border-4 border-amber-600' : ''}`}>
      
      {/* HEADER SECTION (軍事級戰術頂層狀態列) */}
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

      {/* CORE CONTROL QUADRANTS (核心交易戰術象限) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        
        {/* 象限 A：環境感知與狀態切換艙 (Left Column - 4 Cols) */}
        <div className="xl:col-span-4 space-y-4">
          <div className="border border-slate-800 bg-[#0F1524] p-4 rounded-lg shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
            <h2 className="text-xs font-bold text-slate-400 tracking-wider mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" /> [M2] MARKET REGIME SENSING UNIT
            </h2>
            
            {/* HMM 狀態分類器 */}
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

            {/* 微觀結構衍生指標 */}
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

          {/* 實時動態圖形 (GARCH / Vol 曲線) */}
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

        {/* 象限 B：MULTI-AGENT 辯論與人機審批流 (Center Column - 5 Cols) */}
        <div className="xl:col-span-5 space-y-4">
          <div className="border border-slate-800 bg-[#0F1524] p-4 rounded-lg shadow-xl relative min-h-[460px] flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-1 h-full bg-violet-500" />
            <div>
              <h2 className="text-xs font-bold text-slate-400 tracking-wider mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-violet-400" /> [M3] LANGGRAPH INTERRUPT & ORCHESTRATION ENGINE
              </h2>
              
              {/* 多智能體狀態視覺化 */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="p-2 bg-slate-950 rounded border border-emerald-500/20 text-xs">
                  <div className="text-emerald-400 font-bold">● AGENT A</div>
                  <span className="text-[10px] text-slate-500">Macro Analyst</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-emerald-500/20 text-xs">
                  <div className="text-emerald-400 font-bold">● AGENT B</div>
                  <span className="text-[10px] text-slate-500">Structure Matrix</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-violet-500 animate-pulse text-xs">
                  <div className="text-violet-400 font-bold">⏳ AGENT C</div>
                  <span className="text-[10px] text-slate-500">Portfolio Allocator</span>
                </div>
              </div>

              {/* 決策碰撞雷達圖 */}
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

            {/* 人機協同審批工作流卡片 */}
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

        {/* 象限 C：多帳戶執行矩陣與底層通訊架構健康度 (Right Column - 3 Cols) */}
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

            {/* 常態資訊統計底欄 */}
            <div className="border-t border-slate-800/60 pt-3 text-[10px] text-slate-500 space-y-1">
              <div className="flex justify-between">
                <span>ZMQ PIPELINE CAPACITY:</span>
                <span className="text-slate-300 font-bold">14,250 Ticks/s</span>
              </div>
              <div className="flex justify-between">
                <span>PROTOBUF DESERIALIZATION:</span>
                <span className="text-emerald-400 font-bold">18微秒</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* EMERGENCY OVERRIDE OVERLAY / THE BIG RED BUTTON (航天級極限防禦組件) */}
      <footer className="mt-4 border border-red-950 bg-gradient-to-r from-red-950/20 via-[#0F1524] to-red-950/20 p-4 rounded-lg shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-3">
          <ShieldAlert className={`w-8 h-8 ${systemState === 'HALT' ? 'text-amber-500' : 'text-red-500 animate-pulse'}`} />
          <div>
            <h3 className="text-xs font-bold tracking-wider text-red-400">CRITICAL SAFETY OVERRIDE INTERFACE</h3>
            <p className="text-[11px] text-slate-500">Evaporate all open exposure across connected multi-account terminals natively via ZeroMQ Emergency Wire.</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          {/* 二手防誤觸鎖 */}
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
    </div>
  );
}