'use client';

import { useState } from 'react';
import { useAuth, SignInButton, SignUpButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { getLocaleFromPath } from '@/lib/locale';

const copy = {
  en: {
    title: 'AI-Quant Lab MQL Code Refactoring Engine',
    description: 'Convert MQL4 Expert Advisors and indicators into clean, readable MQL5 code with optional AI assistance.',
    aiLabel: 'Use AI-assisted refactoring',
    beta: 'Beta feature: AI processing may take a little longer.',
    convert: 'Convert to MQL5',
    loading: 'Converting...',
    inputLabel: 'Paste your MQL4 code',
    inputPlaceholder: '// Paste your MQL4 EA or indicator code here...',
    lockedPlaceholder: 'Sign in to unlock the editor...',
    outputLabel: 'Converted MQL5 code',
    copied: 'Copied',
    copyCode: 'Copy code',
    loadingOutput: 'The AI is preparing your MQL5 output...',
    emptyOutput: 'Your converted code will appear here.',
    lockedTitle: 'Core feature locked',
    lockedBody: 'The AI Quant Code Refactoring Engine is available to AI-Quant Lab standard members and subscribers. Please sign in or create an account first.',
    signIn: 'Sign in',
    signUp: 'Create a free account',
    signInAlert: 'Please sign in as a member first.',
    inputAlert: 'Please paste your MQL4 code first.',
    apiError: 'The conversion service returned an error.',
    backendError: 'The conversion service is unavailable. Please start the local conversion service and try again.',
    copyError: 'Copy failed. Please copy the code manually.',
  },
  'zh-Hant': {
    title: 'AI-Quant Lab 量化代碼重構引擎',
    description: '將 MQL4 EA 與指標轉換為清晰易讀的 MQL5 程式碼，並可選用 AI 輔助重構。',
    aiLabel: '使用 AI 輔助重構',
    beta: '測試功能：AI 處理可能需要較長時間。',
    convert: '轉換為 MQL5',
    loading: '轉換中...',
    inputLabel: '貼上您的 MQL4 程式碼',
    inputPlaceholder: '// 在此貼上您的 MQL4 EA 或指標程式碼...',
    lockedPlaceholder: '登入會員後即可解鎖編輯器...',
    outputLabel: '轉換後的 MQL5 程式碼',
    copied: '已複製',
    copyCode: '複製程式碼',
    loadingOutput: 'AI 正在準備您的 MQL5 輸出...',
    emptyOutput: '轉換後的程式碼會顯示在這裡。',
    lockedTitle: '專屬核心功能未解鎖',
    lockedBody: 'AI 量化代碼重構引擎僅開放給 AI-Quant Lab 標準會員與訂閱用戶使用。請先登入或建立您的量化帳戶。',
    signIn: '立即登入',
    signUp: '免費註冊帳戶',
    signInAlert: '請先登入會員。',
    inputAlert: '請先貼上 MQL4 程式碼。',
    apiError: '轉換服務回傳錯誤。',
    backendError: '轉換服務目前無法使用，請啟動本機服務後再試。',
    copyError: '複製失敗，請手動複製程式碼。',
  },
  'zh-Hans': {
    title: 'AI-Quant Lab 量化代码重构引擎',
    description: '将 MQL4 EA 与指标转换为清晰易读的 MQL5 代码，并可选用 AI 辅助重构。',
    aiLabel: '使用 AI 辅助重构',
    beta: '测试功能：AI 处理可能需要较长时间。',
    convert: '转换为 MQL5',
    loading: '转换中...',
    inputLabel: '粘贴您的 MQL4 代码',
    inputPlaceholder: '// 在此粘贴您的 MQL4 EA 或指标代码...',
    lockedPlaceholder: '登录会员后即可解锁编辑器...',
    outputLabel: '转换后的 MQL5 代码',
    copied: '已复制',
    copyCode: '复制代码',
    loadingOutput: 'AI 正在准备您的 MQL5 输出...',
    emptyOutput: '转换后的代码会显示在这里。',
    lockedTitle: '专属核心功能未解锁',
    lockedBody: 'AI 量化代码重构引擎仅开放给 AI-Quant Lab 标准会员与订阅用户使用。请先登录或创建您的量化账户。',
    signIn: '立即登录',
    signUp: '免费注册账户',
    signInAlert: '请先登录会员。',
    inputAlert: '请先粘贴 MQL4 代码。',
    apiError: '转换服务返回错误。',
    backendError: '转换服务目前无法使用，请启动本机服务后再试。',
    copyError: '复制失败，请手动复制代码。',
  },
};

export default function MqlConverter() {
  const pathname = usePathname() || '/';
  const locale = getLocaleFromPath(pathname);
  const text = copy[locale] || copy['zh-Hant'];
  const { isSignedIn } = useAuth();
  const [mql4Code, setMql4Code] = useState('');
  const [mql5Code, setMql5Code] = useState('');
  const [useAi, setUseAi] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleConvert = async () => {
    if (!isSignedIn) {
      window.alert(text.signInAlert);
      return;
    }

    if (!mql4Code.trim()) {
      window.alert(text.inputAlert);
      return;
    }

    setIsLoading(true);
    setMql5Code('');
    setIsCopied(false);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: mql4Code, use_ai: useAi }),
      });
      const data = await response.json();

      if (data.success) {
        setMql5Code(data.converted_code);
      } else {
        window.alert(text.apiError);
      }
    } catch (error) {
      console.error('Converter request failed:', error);
      window.alert(text.backendError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!mql5Code) return;

    try {
      await navigator.clipboard.writeText(mql5Code);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1500);
    } catch (error) {
      console.error('Copy failed:', error);
      window.alert(text.copyError);
    }
  };

  return (
    <main className="relative min-h-screen bg-slate-900 p-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 border-b border-slate-700 pb-4">
          <h1 className="text-3xl font-bold text-cyan-400">{text.title}</h1>
          <p className="mt-2 text-slate-400">{text.description}</p>
        </div>

        <div className="mb-6 flex items-center gap-6 rounded-lg border border-slate-700 bg-slate-800 p-4">
          <label className="flex cursor-pointer select-none items-center gap-2">
            <input
              type="checkbox"
              checked={useAi}
              onChange={(event) => setUseAi(event.target.checked)}
              className="h-4 w-4 rounded border-slate-600 bg-slate-700 text-cyan-500 focus:ring-2 focus:ring-cyan-500"
            />
            <span className="text-sm font-medium text-slate-200">
              {text.aiLabel} <span className="text-xs text-amber-400">({text.beta})</span>
            </span>
          </label>

          <button
            type="button"
            onClick={handleConvert}
            disabled={isLoading}
            className="ml-auto rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-2.5 font-bold text-white shadow-lg transition-all hover:from-cyan-600 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? text.loading : text.convert}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col">
            <span className="mb-2 text-sm font-semibold text-slate-400">{text.inputLabel}</span>
            <textarea
              value={mql4Code}
              onChange={(event) => setMql4Code(event.target.value)}
              disabled={!isSignedIn}
              placeholder={isSignedIn ? text.inputPlaceholder : text.lockedPlaceholder}
              className="h-[550px] w-full resize-none rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-sm text-slate-300 shadow-inner transition-all focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <span className="mb-2 text-sm font-semibold text-slate-400">{text.outputLabel}</span>
            <div className="relative h-[550px] w-full overflow-auto rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-sm text-emerald-400 shadow-inner">
              {mql5Code && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className={isCopied
                    ? 'absolute right-4 top-4 z-10 rounded-md border border-emerald-500 bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-300'
                    : 'absolute right-4 top-4 z-10 rounded-md border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white'}
                >
                  {isCopied ? text.copied : text.copyCode}
                </button>
              )}

              {mql5Code ? (
                <pre className="whitespace-pre-wrap pr-16">{mql5Code}</pre>
              ) : (
                <div className="flex h-full items-center justify-center text-slate-600">
                  {isLoading ? text.loadingOutput : text.emptyOutput}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {!isSignedIn && (
        <div className="absolute inset-0 z-50 flex items-center justify-center rounded-xl bg-slate-950/60 p-4 backdrop-blur-md">
          <div className="mx-4 max-w-md rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center shadow-2xl">
            <div className="mb-4 text-4xl" aria-hidden="true">🔒</div>
            <h2 className="mb-2 text-2xl font-bold text-white">{text.lockedTitle}</h2>
            <p className="mb-6 text-sm leading-relaxed text-slate-400">{text.lockedBody}</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <SignInButton mode="modal">
                <button type="button" className="rounded-lg bg-slate-700 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-slate-600">
                  {text.signIn} 🔑
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button type="button" className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:from-cyan-600 hover:to-blue-700">
                  {text.signUp} 🚀
                </button>
              </SignUpButton>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}