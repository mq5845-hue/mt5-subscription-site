'use client';

import { useState } from 'react';
import { useAuth, SignInButton, SignUpButton } from '@clerk/nextjs'; // 🔐 引入 Clerk 權限與按鈕元件

export default function MqlConverter() {
  const { isSignedIn } = useAuth(); // 获取使用者登入狀態
  const [mql4Code, setMql4Code] = useState('');
  const [mql5Code, setMql5Code] = useState('');
  const [useAi, setUseAi] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleConvert = async () => {
    // 安全防線：即使繞過前端 UI，未登入也無法觸發 API
    if (!isSignedIn) {
      alert('請先登入會員！');
      return;
    }

    if (!mql4Code.trim()) {
      alert('請先輸入或貼上 MQL4 原始碼！');
      return;
    }

    setIsLoading(true);
    setMql5Code('');
    setIsCopied(false);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: mql4Code,
          use_ai: useAi,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMql5Code(data.converted_code);
      } else {
        alert('核心引擎回傳錯誤，請確認後端狀態。');
      }
    } catch (error) {
      console.error('連線失敗:', error);
      alert('無法連線到 AI 重構後端伺服器！請確保黑色的 Python 視窗正開著。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!mql5Code) return;
    try {
      await navigator.clipboard.writeText(mql5Code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch (err) {
      console.error('複製失敗:', err);
      alert('瀏覽器不支援自動複製，請手動全選複製。');
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* 標頭 */}
        <div className="mb-8 border-b border-slate-700 pb-4">
          <h1 className="text-3xl font-bold text-cyan-400">AI-Quant Lab 量化代碼重構引擎</h1>
          <p className="text-slate-400 mt-2">基於靜態規則與大語言模型（LLM）雙軌制，一鍵將舊版 MQL4 升級為標準 MQL5 程式碼。</p>
        </div>

        {/* 控制列 */}
        <div className="flex items-center gap-6 mb-6 bg-slate-800 p-4 rounded-lg border border-slate-700">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={useAi}
              onChange={(e) => setUseAi(e.target.checked)}
              className="w-4 h-4 text-cyan-500 rounded bg-slate-700 border-slate-600 focus:ring-cyan-500 focus:ring-2"
            />
            <span className="text-sm font-medium text-slate-200">
              啟用 AI 深度語意重構 <span className="text-xs text-amber-400">（需消耗點數/額度）</span>
            </span>
          </label>

          <button
            onClick={handleConvert}
            disabled={isLoading}
            className="ml-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-2.5 rounded-lg font-bold shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                核心編譯重構中...
              </span>
            ) : '開始一鍵升級 🚀'}
          </button>
        </div>

        {/* 雙欄工作區 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左欄：輸入 */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-400 mb-2">▼ 請貼上您的 MQL4 原始程式碼：</span>
            <textarea
              value={mql4Code}
              onChange={(e) => setMql4Code(e.target.value)}
              disabled={!isSignedIn} // 未登入不可輸入
              placeholder={isSignedIn ? "// 在此貼上您的 MQL4 EA 或指標代碼..." : "🔒 登入會員後即可解鎖輸入..."}
              className="w-full h-[550px] bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-sm text-slate-300 focus:outline-none focus:border-cyan-500 transition-all resize-none shadow-inner"
            />
          </div>

          {/* 右欄：輸出 */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-400 mb-2">▼ 重構完成的 MQL5 標準代碼：</span>
            <div className="relative w-full h-[550px] bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-sm text-emerald-400 overflow-auto shadow-inner">
              {mql5Code && (
                <button
                  onClick={handleCopy}
                  className={`absolute top-4 right-4 z-10 px-3 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                    isCopied
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {isCopied ? '已複製！ ✓' : '複製程式碼 📋'}
                </button>
              )}

              {mql5Code ? (
                <pre className="whitespace-pre-wrap pr-16">{mql5Code}</pre>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-600 italic">
                  {isLoading ? 'AI 正在梳理邏輯並注入 MT4Orders 相容庫...' : '等待點擊一鍵升級...'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 🔐 會員權限鎖遮罩：未登入時才會無縫浮現 */}
      {!isSignedIn && (
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 rounded-xl">
          <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl max-w-md text-center shadow-2xl mx-4">
            <div className="text-4xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-white mb-2">專屬核心功能未解鎖</h2>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              「AI 量化代碼重構引擎」僅開放給 <span className="text-cyan-400 font-semibold">AI-Quant Lab 標準會員與訂閱用戶</span> 使用。請先登入或建立您的量化帳戶。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignInButton mode="modal">
                <button className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-all shadow-md">
                  立即登入 🔑
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-all shadow-lg">
                  免費註冊帳戶 🚀
                </button>
              </SignUpButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}