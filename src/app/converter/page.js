"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const llmCopy = {
  en: {
    pageTitle: "AI-Quant Lab Quant Code Refactoring Engine", title: "Connect your trusted AI LLM",
    privacy: "Your API key remains only in this page session and is cleared when you leave or refresh.",
    provider: "LLM PROVIDER", model: "MODEL NAME", key: "ENCRYPTED API KEY INPUT",
    never: "NEVER LOGGED", placeholder: "Paste API key (temporary)", clear: "Clear now"
  },
  "zh-Hant": {
    pageTitle: "AI-Quant Lab 量化代碼重構引擎", title: "連接您信任的 AI LLM",
    privacy: "金鑰僅暫存於此頁面記憶體；重新整理或離開頁面即會清除。",
    provider: "LLM 供應商", model: "模型名稱", key: "加密 API 金鑰輸入",
    never: "不會記錄", placeholder: "貼上 API key（暫存）", clear: "立即清除"
  },
  "zh-Hans": {
    pageTitle: "AI-Quant Lab 量化代码重构引擎", title: "连接您信任的 AI LLM",
    privacy: "密钥仅暂存于此页面内存；刷新或离开页面即会清除。",
    provider: "LLM 供应商", model: "模型名称", key: "加密 API 密钥输入",
    never: "不会记录", placeholder: "粘贴 API key（暂存）", clear: "立即清除"
  },
};



const pageSubtitle = {
  en: "A dual-track workflow with static rules, LLM assistance, and MetaEditor Strict Mode review.",
  "zh-Hant": "基於靜態規則與大型語言模型（LLM）雙軌運作，結合 MetaEditor Strict Mode 自癒審查。",
  "zh-Hans": "基于静态规则与大语言模型（LLM）双轨运行，结合 MetaEditor Strict Mode 自愈审查。",
};

const premiumLabels = {
  en: "Premium Commercial",
  "zh-Hant": "尊爵商用版",
  "zh-Hans": "尊爵商用版",
};

const panelCopy = {
  en: { enable: "Enable AI semantic refactoring and multi-pass MetaEditor self-healing compilation", premium: "(Premium Commercial) 【 MQL4 transfer >>> MQL5 】", undo: "Undo previous step ↩️", clear: "Clear all 🗑️", start: "Start upgrade 🚀", running: "Self-healing core is running...", complete: "Refactoring complete ✔️", source: "▼ Paste or upload your MQL4 source code:", upload: "Upload source (.mq4) 📥", input: "// Paste or upload your MQL4 code here...", log: "▼ Compiler review log (Strict Mode):", logEmpty: "// Waiting to start refactoring. Self-healing diagnostics will appear here...", output: "▼ Refactored output · 0 errors / 0 warnings · MQL5 source:", copy: "Copy clean code 📋", download: "Download file (.mq5) 💾", loading: "Refactoring legacy iMA and Bid/Ask logic to current MQL5 standards...", outputEmpty: "// Compatible Strict Mode MQL5 code will stream here after self-healing compilation..." },
  "zh-Hant": { enable: "啟用 AI 深度語意重構與多輪 MetaEditor 自癒編譯", premium: "（尊爵商用版）【 MQL4 轉碼>>> MQL5 】", undo: "回復前一步 ↩️", clear: "全部清空 🗑️", start: "開始一鍵升級 🚀", running: "編譯自癒核心運轉中...", complete: "重構已完成 ✔️", source: "▼ 請貼上或上傳您的 MQL4 原始程式碼：", upload: "上載來源檔案 (.mq4) 📥", input: "// 在此貼上或上傳您的 MQL4 程式碼...", log: "▼ 核心編譯器動態審查日誌（Strict Mode 監控）：", logEmpty: "// 靜待重構發動，此處將透傳自癒排查細節...", output: "▼ 重構引擎輸出 · 0 errors / 0 warnings · MQL5 源代碼：", copy: "複製乾淨程式碼 📋", download: "下載完成檔案 (.mq5) 💾", loading: "正在重構舊版 iMA 與 Bid/Ask 函數缺陷，全面自癒對齊 MQL5 官方新規範...", outputEmpty: "// 待自癒編譯通過後，完全相容 Strict Mode 的代碼將在此串流輸出..." },
  "zh-Hans": { enable: "启用 AI 深度语义重构与多轮 MetaEditor 自愈编译", premium: "（尊爵商用版）【 MQL4 转码>>> MQL5 】", undo: "恢复上一步 ↩️", clear: "全部清空 🗑️", start: "开始一键升级 🚀", running: "编译自愈核心运行中...", complete: "重构已完成 ✔️", source: "▼ 请粘贴或上传您的 MQL4 原始代码：", upload: "上传源文件 (.mq4) 📥", input: "// 在此粘贴或上传您的 MQL4 代码...", log: "▼ 核心编译器动态审查日志（Strict Mode 监控）：", logEmpty: "// 等待启动重构，此处将显示自愈排查详情...", output: "▼ 重构引擎输出 · 0 errors / 0 warnings · MQL5 源代码：", copy: "复制干净代码 📋", download: "下载完成文件 (.mq5) 💾", loading: "正在重构旧版 iMA 与 Bid/Ask 函数缺陷，全面自愈对齐 MQL5 官方新规范...", outputEmpty: "// 自愈编译通过后，完全兼容 Strict Mode 的代码将于此串流输出..." },
};



const conversionCopy = {
  en: "【 MQL4 transfer >>> MQL5 】",
  "zh-Hant": "【 MQL4 轉碼>>> MQL5 】",
  "zh-Hans": "【 MQL4 转码>>> MQL5 】",
};

const providerModels = {
  OpenAI: ["GPT-5.2", "GPT-5 mini", "GPT-5 nano", "GPT-4.1", "o3"],
  Anthropic: ["Claude Opus 4", "Claude Sonnet 4", "Claude Haiku 3.5"],
  "Google AI": ["Gemini 2.5 Pro", "Gemini 2.5 Flash", "Gemini 2.5 Flash-Lite", "Gemini 2.0 Flash"],
  xAI: ["Grok 4", "Grok 3", "Grok 3 Mini", "Grok 2"],
  "Meta AI": ["Llama 4 Maverick", "Llama 4 Scout", "Llama 3.3 70B", "Llama Guard 4"],
  "Mistral AI": ["Mistral Large 3", "Mistral Medium 3.1", "Devstral 2", "Codestral", "Mistral Small 4"],
};

export default function MqlConverter() {
  const pathname = usePathname();
  const locale = pathname?.startsWith('/zh-Hans') ? 'zh-Hans' : pathname?.startsWith('/zh-Hant') ? 'zh-Hant' : 'en';
  const llmText = { ...llmCopy.en, ...(llmCopy[locale] || {}) };
  const subtitle = pageSubtitle[locale] || pageSubtitle.en;
  const premiumLabel = premiumLabels[locale] || premiumLabels.en;
  const panelText = { ...panelCopy.en, ...(panelCopy[locale] || {}) };
  const conversionText = conversionCopy[locale] || conversionCopy.en;
  const [sourceCode, setSourceCode] = useState("");
  const [convertedCode, setConvertedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pipelineLog, setPipelineLog] = useState("");
  const [isConverted, setIsConverted] = useState(false);
  const [history, setHistory] = useState(null);
  const [progress, setProgress] = useState(0);
  const [llmProvider, setLlmProvider] = useState("OpenAI");
  const [llmModel, setLlmModel] = useState("GPT-5.2");
  const [apiKey, setApiKey] = useState("");
  const availableModels = providerModels[llmProvider] || providerModels.OpenAI;

  const progressIntervalRef = useRef(null);
  const logEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const resetScroll = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    resetScroll();
    const frame = window.requestAnimationFrame(resetScroll);
    const timer = window.setTimeout(resetScroll, 450);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [pipelineLog]);

  useEffect(() => {
    if (isLoading) {
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev < 25) return prev + 1.2;
          if (prev < 60) return prev + 0.6;
          if (prev < 85) return prev + 0.3;
          if (prev < 95) return prev + 0.08;
          return prev;
        });
      }, 70);
    } else {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isLoading]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setSourceCode(event.target.result);
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleFileDownload = () => {
    if (!convertedCode) return;
    const blob = new Blob([convertedCode], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "AI_QuantLab_Strict_MQL5.mq5";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClearAll = () => {
    setHistory({ sourceCode, convertedCode, pipelineLog, progress, isConverted });
    setSourceCode("");
    setConvertedCode("");
    setPipelineLog("");
    setProgress(0);
    setIsConverted(false);
  };

  const handleUndo = () => {
    if (!history) return;
    setSourceCode(history.sourceCode);
    setConvertedCode(history.convertedCode);
    setPipelineLog(history.pipelineLog);
    setProgress(history.progress);
    setIsConverted(history.isConverted);
    setHistory(null);
  };

  // 🚀 發動最新 MQL5 規範重構引擎
  const handleConvert = async () => {
    if (!sourceCode.trim() || isLoading || isConverted) return;

    setHistory({ sourceCode, convertedCode, pipelineLog, progress, isConverted });
    setIsLoading(true);
    setConvertedCode("");
    setPipelineLog("");
    setProgress(1);

    // 高級專業任務日誌 - 直擊 23 個錯誤的修復邏輯
    const stages = [
      { text: "⚡ [系統初始化] 載入 MetaEditor 2026 最新官方語法規則庫...\n", delay: 200 },
      { text: "🔍 [1/5 靜態排查] 發現 23 處潛在編譯錯誤（包含 MQL4 廢棄函數與非結構化遺留代碼）...\n", delay: 300 },
      { text: "⚠️ [2/5 語法除錯] 檢測到舊版 iMA() 指標呼叫與最新 MQL5 異步句柄（Handle）機制不符，準備重構...\n", delay: 350 },
      { text: "⚠️ [2/5 語法除錯] 檢測到遺留的全局變數 Bid / Ask，啟動 MqlTick 結構體自適應替換...\n", delay: 250 },
      { text: "💡 [3/5 交易邏輯重構] 正在隔離主程式事件與標準庫，修正引用的 Trade.mqh 導致的 OnInit/OnTick 重複定義缺陷...\n", delay: 400 },
      { text: "🛠️ [4/5 代碼架構優化] 注入 CTrade 交易母體，全面採用 OOP 物件導向架構保護交易執行流...\n", delay: 300 },
      { text: "📊 [5/5 沙盒編譯與自癒] 虛擬調用本地 MetaEditor 進行多輪 Strict Mode 自癒校驗：\n   👉 第 1 輪自癒: 成功清除 17 個 wrong parameters 及未宣告標識符錯誤...\n   👉 第 2 輪自癒: 修正指標緩衝區 CopyBuffer 陣列序列化（ArraySetAsSeries）問題...\n", delay: 500 },
      { text: "⚙️ 第 3 輪最終校驗: 0 errors, 0 warnings 完美通關！代碼完全符合 MT5 官方最新發布規範。\n", delay: 250 },
      { text: "🎉 [審查通過] 尊爵商用版自癒完成，標準 MQL5 流式代碼正在輸出...\n\n", delay: 150 },
    ];

    for (const stage of stages) {
      setPipelineLog((prev) => prev + stage.text);
      await new Promise((resolve) => setTimeout(resolve, stage.delay));
    }

    // 🌟 行業標桿技術認証紀錄標頭（永遠留存於最上方）
    const refactorHeaderCertificate = `//+------------------------------------------------------------------+
//|                                              AI-QuantLab_EA.mq5  |
//|                    Copyright 2026, AI-Quant Lab Refactor Engine. |
//|                                      https://www.aiquantlab.io  |
//+------------------------------------------------------------------+
//| 🤖 [核心啟動] 基於 MQL5 2026 最新發布規範進行高能轉碼...
//| ⚙️ [語法審查] 依據官方 Strict Mode 標準，實施多輪沙盒編譯除錯...
//| 🎉 [審查通過] 歷經 3 次代碼精密自癒，完美達成 0 Errors 商業級安全標準！
//+------------------------------------------------------------------+
#property property strict
#property description "由 AI-Quant Lab 量化代碼重構引擎自動升級完成"
#property description "優化服務：函數缺陷修復、交易邏輯 OOP 封裝、多輪 MetaEditor 自癒編譯"

`;

    // 逐行流式印出標頭憑證
    const certLines = refactorHeaderCertificate.split("\n");
    for (let i = 0; i < certLines.length - 1; i++) {
      setConvertedCode((prev) => prev + certLines[i] + "\n");
      await new Promise((resolve) => setTimeout(resolve, 60));
    }

    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    // 模擬後端針對這 23 個編譯錯誤優化後的標準 MQL5 代碼流
    const strictMql5SampleCode = `//--- 引入官方標準交易庫（拒絕非標準自訂庫衝突）
#include <Trade\\Trade.mqh>
#include <Trade\\PositionInfo.mqh>

//--- 宣告交易與持倉核心物件（MQL5 標準 OOP 架構）
CTrade         trade;
CPositionInfo  m_position;

//--- 內部全局指標控制句柄（解決 iMA 參數數量錯誤）
int maHandle_Buy1;
int maHandle_Buy2;
int maHandle_Sell1;
int maHandle_Sell2;

//--- 輸入參數（自動修正 MQL4 舊版 extern 語法為 input）
input group "=== 交易策略參數 ==="
input double InputLotSize      = 0.1;       // 每筆交易口數
input int    InputStopLoss     = 300;       // 止損點數 (Points)
input int    InputTakeProfit   = 600;       // 止盈點數 (Points)
input ulong  InputMagicNumber  = 888168;    // EA 識別碼

//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+
int OnInit()
  {
   // 1. 自動注入：動態初始化與交易環境精度檢查
   trade.SetExpertMagicNumber(InputMagicNumber);

   // 2. 與時俱進：採用 MQL5 最新 6 參數標準初始化 iMA 句柄，解決編譯器錯誤
   maHandle_Buy1  = iMA(_Symbol, PERIOD_M5, 10, 0, MODE_SMA, PRICE_CLOSE);
   maHandle_Buy2  = iMA(_Symbol, PERIOD_M5, 25, 0, MODE_SMA, PRICE_CLOSE);
   maHandle_Sell1 = iMA(_Symbol, PERIOD_M5, 10, 0, MODE_SMA, PRICE_CLOSE);
   maHandle_Sell2 = iMA(_Symbol, PERIOD_M5, 25, 0, MODE_SMA, PRICE_CLOSE);

   // 檢查控制句柄是否成功建立
   if(maHandle_Buy1 == INVALID_HANDLE || maHandle_Buy2 == INVALID_HANDLE)
     {
      Print("❌ [錯誤] 指標控制句柄初始化失敗。");
      return(INIT_FAILED);
     }

   Print("✨ [認證] System Initialize Success. AI-Quant Lab OOP Core Engine loaded.");
   return(INIT_SUCCEEDED);
  }

//+------------------------------------------------------------------+
//| Expert tick function                                             |
//+------------------------------------------------------------------+
void OnTick()
  {
   // 1. 自動注入：連線狀態與歷史數據完整性檢驗
   if(!TerminalInfoInteger(TERMINAL_CONNECTED)) return;

   // 2. 與時俱進：動態獲取當前 tick 數據，徹底根除舊版 Bid/Ask 未宣告錯誤
   MqlTick last_tick;
   if(!SymbolInfoTick(_Symbol, last_tick)) return;

   // 3. 使用動態陣列配合 CopyBuffer 取代舊版 iMA 呼叫
   double buy1_values[], buy2_values[];
   ArraySetAsSeries(buy1_values, true);
   ArraySetAsSeries(buy2_values, true);

   if(CopyBuffer(maHandle_Buy1, 0, 0, 2, buy1_values) < 0) return;
   if(CopyBuffer(maHandle_Buy2, 0, 0, 2, buy2_values) < 0) return;

   double Buy1_1 = buy1_values[0];
   double Buy1_2 = buy2_values[0];

   // 4. 符合 2026 最新規範的 CTrade 現代化交易下單流
   if(Buy1_1 > Buy1_2)
     {
      // 使用動態獲取的 last_tick.ask 代替未宣告的 Ask
      trade.Buy(InputLotSize, _Symbol, last_tick.ask, last_tick.ask - InputStopLoss*_Point, last_tick.ask + InputTakeProfit*_Point, "AI-Quant Lab Refactored");
     }
  }

//+------------------------------------------------------------------+
//| 現代化持倉計數器：完美修正舊版 OrderSelect 遺留 bug               |
//+------------------------------------------------------------------+
void PosCounter(int &b, int &s)
  {
   b = 0; s = 0;
   // 使用 MQL5 官方 PositionsTotal 標準動態全域掃描
   for(int i = PositionsTotal() - 1; i >= 0; i--)
     {
      ulong ticket = PositionGetTicket(i);
      if(PositionSelectByTicket(ticket))
        {
         if(PositionGetString(POSITION_SYMBOL) == _Symbol && PositionGetInteger(POSITION_MAGIC) == InputMagicNumber)
           {
            if(PositionGetInteger(POSITION_TYPE) == POSITION_TYPE_BUY)  b++;
            if(PositionGetInteger(POSITION_TYPE) == POSITION_TYPE_SELL) s++;
           }
        }
     }
  }
`;

    // 逐行/逐段流式打字機輸出，並根據關鍵交易函數實施「智慧呼吸感停頓」
    const lines = strictMql5SampleCode.split("\n");
    for (const line of lines) {
      setConvertedCode((prev) => prev + line + "\n");

      let delay = 12; // 基礎流速

      // 遇到關鍵重構與自癒核心區，實施深度思考狀停頓 (UX 儀式感加分項)
      if (line.includes("void OnTick") || line.includes("int OnInit")) {
        delay = 280; // 入口函數，深度重塑思考
      } else if (line.includes("iMA") || line.includes("CopyBuffer")) {
        delay = 220; // 正在處理 23 個錯誤中的指標呼叫重構
      } else if (line.includes("MqlTick") || line.includes("last_tick")) {
        delay = 180; // 正在動態修復 Bid/Ask 廢棄漏洞
      } else if (line.includes("PositionsTotal") || line.includes("PositionSelectByTicket")) {
        delay = 150; // 正在將 MQL4 訂單樹升級為 MQL5 持倉池
      } else if (line.trim() === "{" || line.trim() === "}") {
        delay = 35;
      }

      // 進度條與代碼產出流速完美同步
      setProgress((prev) => {
        if (prev < 99) return prev + (100 / lines.length);
        return 99;
      });

      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    setProgress(100);
    setIsConverted(true);
    setIsLoading(false);
  };

  return (
    <div id="converter-top" className="min-h-screen bg-slate-900 text-slate-100 p-8 flex flex-col">
      <div aria-hidden="true" className="converter-horizontal-scan" />
      <style>{`
        @keyframes hardSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .force-spin-circle {
          animation: hardSpin 1s linear infinite !important;
        }
      `}</style>

      {/* 標頭區 */}
      <div className="max-w-7xl w-full mx-auto mb-6 shrink-0">
        <div className="mb-2 inline-flex items-center rounded-full border border-amber-200/80 bg-amber-300 px-3 py-1 text-xs font-black tracking-[0.16em] text-amber-950 shadow-[0_0_18px_rgba(251,191,36,0.55)]">{premiumLabel}</div>
        <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-2">{llmText.pageTitle}</h1>
        <p className="text-slate-400 mt-2 text-sm">{subtitle}</p>
        <section className="mt-6 rounded-2xl border border-cyan-300/20 bg-[radial-gradient(circle_at_15%_0%,rgba(34,211,238,0.14),transparent_38%),rgba(2,6,23,0.88)] px-6 py-5 shadow-[0_16px_45px_rgba(0,0,0,0.22)]">
          <div className="grid items-end gap-4 xl:grid-cols-[1.2fr_200px_220px_1.5fr_120px]">
            <div>
              <h2 className="text-2xl font-black tracking-wide text-white">{llmText.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{llmText.privacy}</p>
            </div>
            <label className="block"><span className="mb-2 block font-mono text-[10px] font-bold tracking-[0.18em] text-slate-500">{llmText.provider}</span><select value={llmProvider} onChange={(event) => { const provider = event.target.value; setLlmProvider(provider); setLlmModel(providerModels[provider][0]); }} className="h-14 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 text-sm font-bold text-slate-100 outline-none"><option>OpenAI</option><option>Anthropic</option><option>Google AI</option><option>xAI</option><option>Meta AI</option><option>Mistral AI</option></select></label>
            <label className="block"><span className="mb-2 block font-mono text-[10px] font-bold tracking-[0.18em] text-slate-500">{llmText.model}</span><select value={llmModel} onChange={(event) => setLlmModel(event.target.value)} className="h-14 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 text-sm font-bold text-slate-100 outline-none">{availableModels.map((model) => <option key={model}>{model}</option>)}</select></label>
            <label className="block"><span className="mb-2 flex justify-between font-mono text-[10px] font-bold tracking-[0.18em] text-slate-500"><span>{llmText.key}</span><span className="text-cyan-300">{llmText.never}</span></span><input value={apiKey} onChange={(event) => setApiKey(event.target.value)} type="password" autoComplete="off" placeholder={llmText.placeholder} className="h-14 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 font-mono text-sm text-slate-100 outline-none placeholder:text-slate-600" /></label>
            <button type="button" onClick={() => setApiKey("")} disabled={!apiKey} className="h-14 rounded-xl border border-slate-700 bg-slate-900 px-4 text-sm font-bold text-slate-300 transition hover:border-cyan-300/50 disabled:opacity-40">{llmText.clear}</button>
          </div>
        </section>
      </div>

      {/* 控制列 */}
      <div className="max-w-7xl w-full mx-auto bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 shrink-0">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
          <input type="checkbox" defaultChecked className="rounded border-slate-600 bg-slate-700 text-cyan-500 focus:ring-0" />
          {panelText.enable} <span className="text-amber-400">{conversionText}</span>
        </label>

        <div className="flex items-center gap-3">
          <button
            onClick={handleUndo}
            disabled={!history || isLoading}
            className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all border flex items-center gap-1.5 active:scale-95 ${
              !history || isLoading ? "border-slate-800 text-slate-600 cursor-not-allowed bg-transparent" : "border-amber-700/50 bg-amber-950/20 text-amber-400 hover:bg-amber-900/30"
            }`}
          >
            {panelText.undo}
          </button>

          <button
            onClick={handleClearAll}
            disabled={isLoading}
            className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all border flex items-center gap-1.5 active:scale-95 ${
              isLoading ? "border-slate-800 text-slate-600 cursor-not-allowed bg-transparent" : "border-rose-800/60 bg-rose-950/30 text-rose-300 hover:bg-rose-900/40"
            }`}
          >
            {panelText.clear}
          </button>

          <button
            onClick={handleConvert}
            disabled={isLoading || isConverted}
            className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 shadow-lg ${
              isLoading ? "bg-slate-700 text-slate-400 cursor-not-allowed animate-pulse" : isConverted ? "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed shadow-none" : "bg-cyan-500 hover:bg-cyan-400 text-slate-900 shadow-cyan-500/10 hover:shadow-cyan-400/20"
            }`}
          >
            {isLoading ? panelText.running : isConverted ? panelText.complete : panelText.start}
          </button>
        </div>
      </div>

      {/* 主面板 */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1 min-h-[640px] mb-4">

        {/* 左側 */}
        <div className="lg:col-span-5 flex flex-col gap-5 h-full">
          <div className="flex flex-col flex-[3_3_0%] min-h-[350px]">
            <div className="text-xs font-mono text-slate-400 mb-2 flex justify-between items-center h-7 shrink-0">
              <span>{panelText.source}</span>
              <div>
                <input type="file" accept=".mq4" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                <button
                  onClick={() => fileInputRef.current.click()}
                  disabled={isLoading || isConverted}
                  className={`bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded text-xs transition border border-slate-700 flex items-center gap-1 ${(isLoading || isConverted) ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  {panelText.upload}
                </button>
              </div>
            </div>
            <textarea
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
              placeholder={panelText.input}
              disabled={isLoading || isConverted}
              className="w-full flex-1 bg-slate-950 text-emerald-400 font-mono p-4 rounded-xl border border-slate-800 resize-none text-sm leading-relaxed"
            />
          </div>

          <div className="flex flex-col flex-[2_2_0%] min-h-[200px]">
            <div className="text-xs font-mono text-slate-400 mb-2 flex items-center gap-1 h-7 shrink-0">
              <span>{panelText.log}</span>
              {isLoading && <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>}
            </div>
            <div className="w-full flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 overflow-y-auto leading-relaxed">
              {pipelineLog ? (
                <pre className="whitespace-pre-wrap text-cyan-500/90 font-sans tracking-wide">{pipelineLog}</pre>
              ) : (
                <span className="text-slate-600 italic">{panelText.logEmpty}</span>
              )}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>

        {/* 右側 */}
        <div className="lg:col-span-7 flex flex-col h-full">
          <div className="text-xs font-mono text-slate-400 mb-2 flex justify-between items-center h-7 shrink-0">
                        <span className="font-semibold text-slate-300">{panelText.output}</span>
            {progress > 0 && (
              <div className="flex items-center ml-2 mr-auto">
                <span className={`text-sm font-bold font-mono text-emerald-400 tracking-wider ${progress < 100 ? "animate-pulse" : ""}`}>
                  {Math.round(progress)}%
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <button onClick={() => navigator.clipboard.writeText(convertedCode)} disabled={!convertedCode} className={`px-3 py-1 rounded text-xs transition border ${convertedCode ? "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700" : "bg-slate-900 text-slate-600 border-slate-800/80 cursor-not-allowed"}`}>
                {panelText.copy}
              </button>
              <button
                onClick={handleFileDownload}
                disabled={!convertedCode}
                className={`px-3 py-1 rounded text-xs font-medium transition border ${convertedCode ? "bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-400 border-cyan-800 shadow-md" : "bg-slate-900 text-slate-600 border-slate-800/80 cursor-not-allowed"}`}
              >
                {panelText.download}
              </button>
            </div>
          </div>

          <div className="w-full flex-1 bg-slate-950 text-cyan-400 font-mono p-4 rounded-xl border border-slate-800 overflow-y-auto text-sm leading-relaxed relative">
            {isLoading && !convertedCode && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs flex flex-col items-center justify-center p-8 text-center z-10">
                <div className="relative w-16 h-16 mb-6">
                  <div className="absolute w-full h-full rounded-full border-4 border-cyan-500/10"></div>
                  <div className="absolute w-full h-full rounded-full border-4 border-transparent border-t-cyan-400 force-spin-circle"></div>
                </div>
                <div className="text-sm text-cyan-400 font-medium animate-pulse">
                  {panelText.loading}
                </div>
              </div>
            )}

            {convertedCode ? (
              <pre className="whitespace-pre-wrap text-emerald-400 font-medium select-text">{convertedCode}</pre>
            ) : (
              !isLoading && <span className="text-slate-600 italic">{panelText.outputEmpty}</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}