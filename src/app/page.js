'use client';


import Link from 'next/link';
import { useEffect, useState } from 'react';

const glowText = 'drop-shadow-[0_0_10px_rgba(34,211,238,0.22)]';

// Hero / ambient motion
const particles = [
  { className: 'left-[6%] top-[16%] h-2.5 w-2.5', delay: '0s', duration: '3.2s' },
  { className: 'left-[10%] top-[70%] h-1.5 w-1.5', delay: '0.2s', duration: '3.4s' },
  { className: 'left-[18%] top-[42%] h-2.5 w-2.5', delay: '0.4s', duration: '3.1s' },
  { className: 'left-[28%] top-[22%] h-1.5 w-1.5', delay: '0.6s', duration: '3.3s' },
  { className: 'left-[37%] top-[78%] h-2.5 w-2.5', delay: '0.8s', duration: '3.2s' },
  { className: 'left-[48%] top-[30%] h-1.5 w-1.5', delay: '1s', duration: '3.4s' },
  { className: 'left-[57%] top-[66%] h-2.5 w-2.5', delay: '1.2s', duration: '3.1s' },
  { className: 'left-[66%] top-[18%] h-1.5 w-1.5', delay: '1.4s', duration: '3.3s' },
  { className: 'left-[74%] top-[54%] h-2.5 w-2.5', delay: '1.6s', duration: '3.2s' },
  { className: 'left-[82%] top-[28%] h-1.5 w-1.5', delay: '1.8s', duration: '3.4s' },
  { className: 'left-[89%] top-[72%] h-2.5 w-2.5', delay: '2s', duration: '3.1s' },
  { className: 'left-[94%] top-[40%] h-1.5 w-1.5', delay: '2.2s', duration: '3.3s' },
  { className: 'left-[12%] top-[8%] h-2.5 w-2.5', delay: '2.4s', duration: '3.2s' },
  { className: 'left-[22%] top-[90%] h-1.5 w-1.5', delay: '2.6s', duration: '3.4s' },
  { className: 'left-[34%] top-[12%] h-2.5 w-2.5', delay: '2.8s', duration: '3.1s' },
  { className: 'left-[44%] top-[86%] h-1.5 w-1.5', delay: '3s', duration: '3.3s' },
  { className: 'left-[54%] top-[10%] h-2.5 w-2.5', delay: '3.2s', duration: '3.2s' },
  { className: 'left-[63%] top-[88%] h-1.5 w-1.5', delay: '3.4s', duration: '3.4s' },
  { className: 'left-[72%] top-[14%] h-2.5 w-2.5', delay: '3.6s', duration: '3.1s' },
  { className: 'left-[84%] top-[82%] h-1.5 w-1.5', delay: '3.8s', duration: '3.3s' },
];

// Three reasons / scroll cards
const scrollCards = [
  {
    kicker: '01 / 先看懂系統',
    title: '把複雜交易，整理成一張可被閱讀的路線圖',
    description:
      '不是把內容塞滿，而是把策略、驗證與升級的順序，整理成一條可跟著走的路。先理解框架，才知道哪一層是方法，哪一層是成果。',
  },
  {
    kicker: '02 / 再看懂差異',
    title: '獲得源碼的捷徑入口，讓你少走彎路',
    description:
      '把回測、策略邏輯、原始碼與社群支援串成同一條線，讓每一步都能接上下一步，讓學習變成可延伸的累積。',
  },
  {
    kicker: '03 / 最後看懂指引',
    title: '當你準備開始，需要的是清楚的指引',
    description:
      '往下看，你會更快找到適合自己的方案與下一步動作。越早看懂選擇，越容易把瀏覽轉成行動。',
  },
];

// Journey / narrative blocks
const narrativeBlocks = [
  {
    tag: '探索 / Explore',
    title: '先讓眼睛停下來，故事才有機會被讀完',
    note: '我們把最有溫度的資訊放在前面，不是堆滿字，而是先建立一個值得往下看的理由。',
  },
  {
    tag: '驗證 / Verify',
    title: '看見方法，也看見它背後的證據',
    note: '回測、策略、原始碼與社群支援，不是附加值，而是讓內容站得住腳的骨架。',
  },
  {
    tag: '行動 / Move',
    title: '把興趣收束成下一步，讓點擊變成方向',
    note: '當價值被說清楚，方案就不再只是價格，而是清楚的入口。這一步做得好，停留才會變成轉換。',
  },
];

// Guide / route steps
const routeSteps = [
  {
    step: 'A1',
    title: '亮相',
    text: '先讓畫面抓住目光，接著才開始讀故事。這是流量能不能留下來的起點。',
  },
  {
    step: 'A2',
    title: '辨路',
    text: '把策略、教學與資料收整成清楚的層次，讓脈絡一眼可見。',
  },
  {
    step: 'A3',
    title: '驗證',
    text: '用回測、原始碼與實戰脈絡建立可信度，讓內容不只是漂亮，而是真的有根據。',
  },
  {
    step: 'A4',
    title: '啟程',
    text: '當故事走到這裡，方案頁就是順勢接續的下一站，而不是硬生生推銷。',
  },
];

// Signal / proof strip
const signalBlocks = [
  {
    title: '被看見',
    copy: '用光感和節奏先抓住注意，再用層次把人留住。',
  },
  {
    title: '被理解',
    copy: '讓內容一層接一層展開，訪客自然會想知道下一段。',
  },
  {
    title: '被行動',
    copy: '當價值被說明白，點擊就不再只是瀏覽，而是開始。',
  },
];

function FeatureIcon({ type }) {
  if (type === 'chart') {
    return (
      <div
        className="flex h-20 w-20 items-center justify-center rounded-xl bg-[#111935] shadow-sm shadow-cyan-500/10 ring-1 ring-[#1f2a4d]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-16 w-16" aria-hidden="true">
          <rect x="5.4" y="5" width="13.2" height="13.4" rx="4.1" fill="#0f1a33" />
          <rect x="7" y="6.1" width="10" height="1.25" rx="0.62" fill="#22d3ee" />
          <rect x="7.4" y="7.6" width="9.2" height="8" rx="2.5" fill="#eff6ff" />
          <circle cx="10.3" cy="10.1" r="1.02" fill="#22d3ee" />
          <circle cx="13.7" cy="10.1" r="1.02" fill="#f59e0b" />
          <rect x="9.2" y="12.2" width="5.6" height="0.95" rx="0.47" fill="#1e293b" />
          <rect x="7.8" y="15.2" width="8.4" height="1.15" rx="0.57" fill="#0ea5e9" />
          <rect x="8.7" y="16.5" width="6.6" height="0.78" rx="0.39" fill="#f59e0b" />
        </svg>
      </div>
    );
  }

  if (type === 'code') {
    return (
      <div
        className="flex h-20 w-20 items-center justify-center rounded-xl bg-[#111935] shadow-sm shadow-cyan-500/10 ring-1 ring-[#1f2a4d]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-[4.75rem] w-[4.75rem]" aria-hidden="true">
          <rect x="6.2" y="6.1" width="11.6" height="11.8" rx="2.6" fill="#13203c" />
          <rect x="7.8" y="8" width="3.6" height="2.2" rx="0.7" fill="#22c55e" />
          <rect x="11.1" y="8" width="3.6" height="2.2" rx="0.7" fill="#f59e0b" />
          <rect x="14.4" y="8" width="2" height="2.2" rx="0.7" fill="#60a5fa" />
          <rect x="7.8" y="10.9" width="8.6" height="2.1" rx="0.7" fill="#dbeafe" />
          <rect x="7.8" y="13.8" width="5.7" height="2.1" rx="0.7" fill="#94a3b8" />
        </svg>
      </div>
    );
  }

  if (type === 'users') {
    return (
      <div
        className="flex h-20 w-20 items-center justify-center rounded-xl bg-[#111935] shadow-sm shadow-cyan-500/10 ring-1 ring-[#1f2a4d]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-16 w-16" aria-hidden="true">
          <rect x="5.8" y="7.1" width="12.4" height="9.6" rx="2.4" fill="#eff6ff" />
          <rect x="8.1" y="10.1" width="8" height="1.7" rx="0.8" fill="#0f172a" />
          <circle cx="10.1" cy="12.9" r="0.9" fill="#0f172a" />
          <circle cx="13.9" cy="12.9" r="0.9" fill="#0f172a" />
          <path d="M10.3 16.3H13.7" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="17.1" cy="10" r="0.9" fill="#8b5cf6" />
        </svg>
      </div>
    );
  }

  return null;
}

// Source code library / features
const features = [
  {
    title: 'mq4/mq5源碼轉換',
    description: '從轉碼編譯、策略設計、回測驗證到上線部署，建立完整的 MT5 交易流程。',
    icon: 'chart',
  },
  {
    title: 'MQL5 原始碼教學',
    description: '直接看懂 EA 結構與程式邏輯，適合想自己改策略的使用者。',
    icon: 'code',
  },
  {
    title: '社群與VIP支援',
    description: '提供策略交流、版本更新與實作建議，縮短學習與試錯時間。',
    icon: 'users',
  },
  {
    kicker: '04 / 實戰回饋',
    title: '看懂策略只是開始，能不能持續優化才是關鍵',
    description:
      '真正有價值的內容，不只讓你看過，而是讓你能拿去驗證、修正、再進一步。這也是我們把教學、範例與回測脈絡一起放進首頁的原因。',
  },
  {
    kicker: '05 / 內容延伸',
    title: '當你往下看，會發現每個區塊都在接下一步',
    description:
      '首頁不是把資訊一次倒完，而是用節奏帶你理解：先建立信任，再看到內容，最後才對應到方案。這種路徑，比單純丟價格更能促成停留。',
  },
  {
    kicker: '06 / 行動入口',
    title: '讓有興趣的人，能快速找到下一個動作',
    description:
      '當頁面把價值說清楚，方案區就不只是價格，而是清楚的下一步。你會更容易知道自己該看哪一層、該從哪裡開始。',
  },
];

// Pricing / plans
const plans = [
  {
    name: '標準會員',
    price: 'USD$ 9.00',
    period: '/ 月',
    description: '適合想先體驗內容、建立量化交易基礎的入門使用者。',
    points: [
      '解鎖精選 MT5 EA 策略下載與回測報告',
      '每月精選策略與工具',
      '社群討論區瀏覽權限',
    ],
    featured: false,
    cta: '立即訂閱',
  },
  {
    name: '加盟會員',
    badge: '熱門首選',
    price: 'USD$ 39.00',
    period: '/ 月',
    description: '適合想更快落地策略、並取得更多實作資源的進階使用者。',
    points: [
      '解鎖全站 MQL5 源代碼(原始碼)課程與專屬核心策略庫',
      '專屬 EA 策略與模板',
      '一對一回測與部署建議',
      'VIP 核心功能優先更新',
    ],
    featured: true,
    cta: '立即加入',
  },
];

// FAQ / common questions
const faqItems = [
  {
    question: 'Q1：訂閱方案後，需要綁定特定的外匯券商（Broker）才能使用EA策略嗎？',
    answer:
      'A1：不需要綁定，完全支援全球任何提供 MT5 帳戶的外匯券商。況且，我們提供法人級商用 MT5 EA 源代碼策略完全獨立自主(無須許可與無版權限制)，可自由使用並得再編程、優化、編譯或重構為自己個人品牌所有之數位產品，甚至出售EA利潤百分之百全歸自己。',
  },
  {
    question: 'Q2：我是零基礎的交易新手小白，適合 MQL5 原始碼課程嗎？',
    answer:
      'A2：完全可以！我們的課程專為零基礎設計，從最基本的AI LLM大模型基於MQL5語法有系統地建構MT5 EA源代碼，到編譯執行檔落地使用；並提供法人級商業EA模組化的源代碼範本，讓您用正確提示詞.md 標準模板複製貼上與積木組合嵌套的方式，任何新手老手都能輕鬆上手。',
  },
  {
    question: 'Q3：標準會員與加盟會員的 EA 策略有什麼不同？',
    answer:
      'A3：標準會員可下載並體驗精選的編譯版 EA 策略與詳細回測報告；加盟會員則能進階解鎖全站 MQL5 核心源代碼，您可以自由修改邏輯、優化參數，甚至發展成您自己的商業策略或成為個人品牌作商業用途。',
  },
  {
    question: 'Q4：這些 EA 策略過去的回測表現如何？有包含風控機制嗎？',
    answer:
      'A4：所有上架策略均遵循業界法人級商業EA標準以 5 年以上的歷史數據回測（包含 Walk-Forward 前瞻分析與壓力測試），且每套策略皆內建嚴格的 ATR 動態止損與每筆交易風險上限控制，拒絕馬丁與扛單。',
  },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const isAndroid = /Android/i.test(navigator.userAgent);

    if (isAndroid) {
      document.documentElement.classList.add('is-android');
    }

    return () => {
      document.documentElement.classList.remove('is-android');
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      <div className="content-stage relative mx-auto max-w-7xl overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="tech-grid absolute inset-0 opacity-30" />
          <div className="content-fade absolute inset-0" />
          <div className="animate-float-slow absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="animate-float-slower absolute right-[-6rem] top-32 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="animate-pulse-glow absolute left-[-5rem] bottom-24 h-80 w-80 rounded-full bg-teal-400/10 blur-3xl" />
          <div className="animate-scanline absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent opacity-70" />
          <div className="animate-scanline absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent opacity-35 [animation-delay:-3s]" />
          <div className="animate-scanline absolute inset-x-0 top-2/3 h-px bg-gradient-to-r from-transparent via-blue-300/25 to-transparent opacity-30 [animation-delay:-6s]" />
          {particles.map((particle) => (
            <span
              key={`${particle.className}-${particle.delay}`}
              className={`particle-dot absolute h-1.5 w-1.5 rounded-full bg-cyan-300/90 shadow-[0_0_18px_rgba(34,211,238,0.65)] ${particle.className}`}
              style={{ animationDelay: particle.delay, animationDuration: particle.duration }}
            />
          ))}
        </div>

        <div className="relative z-10">
        <header
          className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 supports-[backdrop-filter]:transition-all ${
            scrolled
              ? 'border-slate-700/10 bg-slate-950/05 backdrop-blur-[22px] supports-[backdrop-filter]:bg-slate-950/[0.03]'
              : 'border-slate-800/14 bg-slate-950/10 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/06'
          }`}
        >
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="animate-badge-glow relative flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-[1.25rem] border border-white/35 bg-gradient-to-br from-white via-cyan-100 to-cyan-400 px-2 py-1 text-[0.72rem] font-black leading-none tracking-[0.14em] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.22),0_0_22px_rgba(34,211,238,0.92),0_0_14px_rgba(59,130,246,0.52),inset_0_1px_0_rgba(255,255,255,0.95)] ring-2 ring-cyan-300/28">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.55),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.2),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_60%)]"
                />
                <span
                  className="relative z-10 normal-case drop-shadow-[0_0_8px_rgba(255,255,255,0.65)]"
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontStyle: 'italic',
                    letterSpacing: '0.06em',
                    color: '#0f172a',
                  }}
                >
                  mq5
                </span>
              </div>
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-xl font-black tracking-wide text-transparent">
                AI-Quant Lab
              </span>
            </div>

            <nav className="hidden items-center gap-8 text-sm font-medium text-slate-400 md:flex">
              <a href="#features" className="transition hover:text-cyan-400">
                源代碼庫
              </a>
              <a href="#modular" className="transition hover:text-cyan-400">
                模組化積木
              </a>
              <Link href="/line-kb" className="transition hover:text-cyan-400">
                LINE 知識庫
              </Link>
              <a href="#pricing" className="transition hover:text-cyan-400">
                訂閱方案
              </a>
            </nav>

            <a
              href="https://lin.ee/stqhWhj"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pulse rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:from-cyan-400 hover:to-blue-500"
            >
              立即加入
            </a>
          </div>
        </header>

      <main
        className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6 lg:px-8 lg:pt-32"
      >
        <section className="hero-aurora animate-reveal-up relative z-10 mx-auto flex min-h-[78vh] max-w-5xl flex-col items-center justify-center gap-7 py-14 text-center sm:min-h-[74vh] sm:py-16 lg:gap-8">
          <div aria-hidden="true" className="hero-aurora-layer hero-aurora-layer-one" />
          <div aria-hidden="true" className="hero-aurora-layer hero-aurora-layer-two" />
          <div aria-hidden="true" className="hero-aurora-layer hero-aurora-layer-three" />
          <div className="relative z-10 space-y-7">
            <div aria-hidden="true" className="hero-spotlight hero-spotlight-one" />
            <div aria-hidden="true" className="hero-spotlight hero-spotlight-two" />
            <div aria-hidden="true" className="hero-spotlight hero-spotlight-three" />
            <div className="hero-badge hero-copy mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/45 bg-cyan-500/12 px-4 py-1.5 text-sm font-semibold tracking-[0.24em] text-white shadow-[0_0_18px_rgba(34,211,238,0.24),0_0_38px_rgba(34,211,238,0.1)] backdrop-blur-md animate-pulse sm:text-base">
              法人級商用發佈
            </div>
            <h1 className="mx-auto max-w-6xl text-balance text-5xl font-black leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-[5rem]">
              <span className="hero-bright block text-white">
                AI 革命量化交易：
              </span>
              <span className="hero-sharp mt-2 block bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-500 bg-clip-text text-transparent">
                解鎖法人級 MT5 EA 商業源代碼
              </span>
            </h1>
            <p className="hero-copy mx-auto max-w-3xl text-base leading-relaxed text-slate-100/95 sm:text-lg lg:text-xl">
              零基礎也能用 AI LLM 提示詞模板高效重構核心策略。無版權限制、無須許可，打造專屬您的個人交易品牌與數位資產，利潤 100% 全歸自己。
            </p>
            <div className="flex w-full flex-col items-center justify-center gap-3 pt-4 sm:flex-row">
              <a
                href="https://lin.ee/stqhWhj"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pulse w-full rounded-xl bg-cyan-400 px-8 py-3 text-center text-base font-bold text-slate-950 shadow-xl shadow-cyan-400/20 transition hover:bg-cyan-300 sm:w-auto"
              >
                立即加入，開創量化事業
              </a>
              <a
                href="/line-kb"
                className="btn-pulse w-full rounded-xl border border-slate-800 bg-slate-900 px-8 py-3 text-center text-base font-medium text-slate-300 transition hover:bg-slate-800 sm:w-auto"
              >
                先看知識庫架構
              </a>
            </div>
          </div>
        </section>

        {/* Three reasons */}
        <section className="mt-20 space-y-8">
          <div className="animate-reveal-up mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-300">
              先看見節奏，再看見價值
            </div>
            <h2 className={`mt-5 text-3xl font-black tracking-tight sm:text-4xl ${glowText}`}>
              三個讓人願意往下看的理由
            </h2>
            <p className={`mt-4 text-sm leading-relaxed text-slate-400 sm:text-base ${glowText}`}>
              如果你想知道這個首頁到底在賣什麼、強在哪裡、適不適合你，先看完這三個區塊，再往下看方案會更有感。
            </p>
          </div>

          <div className="cards-cluster grid gap-5 lg:grid-cols-3">
            {scrollCards.map((card, index) => (
              <article
                key={card.kicker}
                className="interactive-card group animate-card-in relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/50 p-7 transition-all duration-300 hover:border-cyan-400/40 hover:bg-slate-900/70"
                style={{ animationDelay: `${index * 170}ms` }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_58%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-0 ring-cyan-300/0 transition-all duration-300 group-hover:ring-1 group-hover:ring-cyan-300/25" />

                <div className="relative z-10">
                  <div className="mb-5 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-cyan-300">
                    {card.kicker}
                  </div>
                  <h3 className={`text-xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-cyan-300 ${glowText}`}>
                    {card.title}
                  </h3>
                  <p className={`mt-4 text-sm leading-7 text-slate-400 transition-colors duration-300 group-hover:text-slate-300 ${glowText}`}>
                    {card.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Journey */}
        <section id="journey" className="mt-12 space-y-10">
          <div className="animate-reveal-up mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-medium text-fuchsia-200">
              旅程 / Journey
            </div>
            <h2 className={`mt-5 text-3xl font-black tracking-tight sm:text-4xl ${glowText}`}>
              這不是單頁介紹，而是一條逐步深入的導覽路徑
            </h2>
            <p className={`mt-4 text-sm leading-relaxed text-slate-400 sm:text-base ${glowText}`}>
              當內容有節奏、有層次，訪客就會在每一段找到下一個想知道的答案。越往下看，越能看懂你的價值。
            </p>
          </div>

          <div className="pointer-events-none relative mx-auto h-10 max-w-4xl">
            <div className="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-fuchsia-400/60 to-transparent" />
            <div className="journey-rail absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 bg-[radial-gradient(circle,_rgba(232,121,249,0.24)_0%,_rgba(232,121,249,0)_70%)]" />
          </div>

          <div className="cards-cluster grid gap-5 lg:grid-cols-3">
            {narrativeBlocks.map((block, index) => (
              <article
                key={block.tag}
                className="interactive-card group animate-card-in relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/50 p-7 transition-all duration-300 hover:border-fuchsia-400/40 hover:bg-slate-900/75"
                style={{ animationDelay: `${index * 190}ms` }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(232,121,249,0.14),transparent_58%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-0 ring-fuchsia-300/0 transition-all duration-300 group-hover:ring-1 group-hover:ring-fuchsia-300/25" />
                <div className="relative z-10">
                  <div className="mb-5 inline-flex items-center rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-fuchsia-200">
                    {block.tag}
                  </div>
                  <h3 className={`text-xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-fuchsia-200 ${glowText}`}>
                    {block.title}
                  </h3>
                  <p className={`mt-4 text-sm leading-7 text-slate-400 transition-colors duration-300 group-hover:text-slate-300 ${glowText}`}>
                    {block.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Guide */}
        <section id="modular" className="mt-8 space-y-8">
          <div className="animate-reveal-up mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-300">
              導覽 / Guide
            </div>
            <h2 className={`mt-5 text-3xl font-black tracking-tight sm:text-4xl ${glowText}`}>
              跟著光走，內容才會一步一步打開
            </h2>
            <p className={`mt-4 text-sm leading-relaxed text-slate-400 sm:text-base ${glowText}`}>
              這一段像導遊路線，先把入口帶出來，再慢慢把價值打開，最後自然走到方案與行動。
            </p>
          </div>

          <div className="relative mx-auto max-w-5xl">
            <div className="absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-gradient-to-b from-cyan-400/80 via-fuchsia-400/60 to-transparent md:block" />
            <div className="cards-cluster grid gap-5 md:grid-cols-2">
              {routeSteps.map((step, index) => (
                <article
                  key={step.step}
                  className={`interactive-card group animate-card-in relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/50 p-7 transition-all duration-300 hover:border-cyan-400/40 hover:bg-slate-900/70 ${
                    index % 2 === 0 ? 'md:translate-y-0' : 'md:translate-y-8'
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_58%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-0 rounded-3xl ring-0 ring-cyan-300/0 transition-all duration-300 group-hover:ring-1 group-hover:ring-cyan-300/25" />
                  <div className="relative z-10">
                    <div className="mb-5 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-cyan-300">
                      {step.step}
                    </div>
                    <h3 className={`text-xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-cyan-300 ${glowText}`}>
                      {step.title}
                    </h3>
                    <p className={`mt-4 text-sm leading-7 text-slate-400 transition-colors duration-300 group-hover:text-slate-300 ${glowText}`}>
                      {step.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Signal strip */}
        <section className="mt-16">
          <div className="cards-cluster mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
            {signalBlocks.map((signal, index) => (
              <article
                key={signal.title}
                className="interactive-card group animate-card-in relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-900/40 p-6 transition-all duration-300 hover:border-cyan-300/50 hover:bg-slate-900/70"
                style={{ animationDelay: `${index * 140}ms` }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-400/20">
                    0{index + 1}
                  </div>
                  <h3 className={`text-lg font-bold text-white transition-colors duration-300 group-hover:text-cyan-300 ${glowText}`}>
                    {signal.title}
                  </h3>
                  <p className={`mt-3 text-sm leading-6 text-slate-400 transition-colors duration-300 group-hover:text-slate-300 ${glowText}`}>
                    {signal.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Source code library */}
        <section id="features" className="mt-12 space-y-12">
          <div className="animate-reveal-up mx-auto max-w-2xl text-center">
            <h2 className={`text-3xl font-bold tracking-tight ${glowText}`}>源代碼庫</h2>
            <p className={`mt-4 text-slate-400 ${glowText}`}>
              這一站先讓你看懂核心源代碼(原始碼Source Code)，再慢慢走進模組化積木的組合與延伸。
            </p>
          </div>

          <div className="cards-cluster grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <article
                key={feature.title}
                className="interactive-card group animate-card-in relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 p-8 transition-all duration-300 hover:border-cyan-400/40 hover:bg-slate-900/70"
                style={{ animationDelay: `${index * 160}ms` }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-cyan-300/0 transition-all duration-300 group-hover:ring-1 group-hover:ring-cyan-300/25" />
                <div className="mb-4">
                  <FeatureIcon type={feature.icon} />
                </div>
                <h3 className={`text-xl font-bold transition-colors duration-300 group-hover:text-cyan-300 ${glowText}`}>{feature.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300 ${glowText}`}>
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mt-12 pb-20">
          <div className="animate-reveal-up mx-auto max-w-2xl text-center">
            <h2 className={`text-3xl font-bold tracking-tight ${glowText}`}>前往下一站</h2>
            <p className={`mt-4 text-slate-400 ${glowText}`}>
              當你把前面的路看懂了，這裡就是自然接續的行動入口。
            </p>
          </div>

          <div className="cards-cluster mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
            {plans.map((plan, index) => (
              <article
                key={plan.name}
                className={`interactive-card group animate-card-in relative flex flex-col justify-between overflow-hidden rounded-2xl p-8 transition-all duration-300 ${
                  plan.featured
                    ? 'border-2 border-cyan-500 bg-slate-900/80 shadow-2xl shadow-cyan-500/10 hover:border-cyan-300'
                    : 'border border-slate-800 bg-slate-900/40 hover:border-cyan-400/40 hover:bg-slate-900/65'
                }`}
                style={{ animationDelay: `${index * 180 + 120}ms` }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-cyan-300/0 transition-all duration-300 group-hover:ring-1 group-hover:ring-cyan-300/25" />
                {plan.badge ? (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1 text-xs font-black uppercase tracking-wider text-slate-950 shadow-lg shadow-cyan-500/20">
                    {plan.badge}
                  </div>
                ) : null}

                <div className="relative z-10">
                  <h3 className={`text-lg font-bold transition-colors duration-300 group-hover:text-cyan-300 ${glowText} ${plan.featured ? 'text-cyan-400' : 'text-slate-300'}`}>
                    {plan.name}
                  </h3>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-sm text-slate-500">{plan.period}</span>
                  </div>

                  <p className={`mt-4 text-sm leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300 ${glowText}`}>
                    {plan.description}
                  </p>

                  <hr className="my-6 border-slate-800" />

                  <ul className={`space-y-3 text-sm text-slate-300 ${glowText}`}>
                    {plan.points.map((point) => (
                      <li key={point} className="flex items-center gap-2">
                        <span className={plan.featured ? 'text-cyan-300' : 'text-emerald-400'}>
                          {plan.featured ? '✦' : '●'}
                        </span>
                        <span className={plan.featured ? 'font-medium' : ''}>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="https://lin.ee/stqhWhj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-pulse relative z-10 mt-8 w-full rounded-xl px-4 py-3 text-center text-sm font-bold transition-all duration-300 ${
                    plan.featured
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500'
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  {plan.cta}
                </a>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-5xl">
            <section
              aria-labelledby="legal-disclaimer-title"
              role="note"
              className="relative overflow-hidden rounded-[1.75rem] border border-cyan-400/18 bg-[linear-gradient(180deg,rgba(3,7,18,0.96),rgba(2,6,23,0.86))] p-6 shadow-[0_24px_90px_rgba(8,145,178,0.14)] ring-1 ring-white/5 backdrop-blur-xl sm:p-8 lg:p-10"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_100%_0%,rgba(59,130,246,0.12),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_42%,rgba(34,211,238,0.04))]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent"
              />
              <div className="relative z-10 grid gap-6 lg:grid-cols-[0.95fr_1.6fr] lg:items-start">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-500/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.28em] text-cyan-200 uppercase">
                    Legal / Technical Note
                  </div>
                  <div className="space-y-3">
                    <h3
                      id="legal-disclaimer-title"
                      className="text-xl font-black tracking-tight text-white sm:text-2xl"
                    >
                      免責與技術定調聲明
                    </h3>
                    <p className={`max-w-xl text-sm leading-7 text-slate-400 sm:text-[0.95rem] ${glowText}`}>
                      為了清楚界定本站內容屬性、降低誤解風險，以下聲明請於閱覽前一併確認。
                    </p>
                  </div>
                </div>

                <div className="relative rounded-[1.4rem] border border-slate-700/70 bg-slate-950/75 p-5 shadow-inner shadow-cyan-500/5 sm:p-6">
                  <div className="absolute inset-0 rounded-[1.4rem] bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_46%)] opacity-80" />
                  <p className={`relative z-10 text-sm leading-8 text-slate-200 sm:text-[0.98rem] ${glowText}`}>
                    💡 法律免責與技術定調聲明：AI-Quant Lab 致力於 MQL5 原始碼研發與 AI 模組化提示詞軟體工程教學。本站及相關社群所提供之內容僅供學術研究與程式碼技術交流，絕不提供任何形式的跟單代操、不保證獲利、亦不經手或代管客戶投資資金。用戶應自行承擔交易風險，本站不承擔任何投資損失責任。
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="relative py-10 pb-24">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
          <div className="animate-reveal-up mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              FAQ / 常見問題
            </div>
            <h2 className={`mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl ${glowText}`}>
              把疑問解開，才有信心開啟源代碼量化事業之旅
            </h2>
            <p className={`mt-4 text-sm leading-7 text-slate-400 sm:text-base ${glowText}`}>
              這些問題多半是準備訂閱、學習 MQL5 或評估策略時最常遇到的關鍵點。先看懂，再決定下一步，會更清楚也更安心。
            </p>
          </div>

          <div className="cards-cluster mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2">
            {faqItems.map((item, index) => (
              <article
                key={item.question}
                className="interactive-card group animate-card-in relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 p-7 transition-all duration-300 hover:border-cyan-400/45 hover:bg-slate-900/75"
                style={{ animationDelay: `${index * 140}ms` }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-cyan-300/0 transition-all duration-300 group-hover:ring-1 group-hover:ring-cyan-300/25" />
                <div className="relative z-10">
                  <h3 className={`text-lg font-bold leading-8 text-white transition-colors duration-300 group-hover:text-cyan-300 ${glowText}`}>
                    {item.question}
                  </h3>
                  <p className={`mt-4 text-sm leading-8 text-slate-400 transition-colors duration-300 group-hover:text-slate-300 ${glowText}`}>
                    {item.answer}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      </div>
      </div>
      {/* Footer */}
      <footer className="relative z-10 mt-12 overflow-hidden border-t border-slate-900 bg-slate-950/95 backdrop-blur-sm">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_32%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.08),transparent_34%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="animate-badge-glow relative flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-[1.25rem] border border-white/30 bg-gradient-to-br from-white via-cyan-100 to-cyan-400 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_0_22px_rgba(34,211,238,0.88),0_0_14px_rgba(59,130,246,0.5),inset_0_1px_0_rgba(255,255,255,0.95)] ring-2 ring-cyan-300/22">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.48),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.16),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_60%)]"
                  />
                  <span
                    className="relative z-10 text-[0.72rem] font-black leading-none normal-case drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                    style={{
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontStyle: 'italic',
                      letterSpacing: '0.06em',
                      color: '#0f172a',
                    }}
                  >
                    mq5
                  </span>
                </div>
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-lg font-black tracking-wide text-transparent">
                  AI-Quant Lab
                </span>
              </div>
              <p className="max-w-md text-sm leading-7 text-slate-400">
                以量化交易、MQL5 原始碼與實戰回測脈絡，打造一條可以優化、可以驗證、持續更新的源代碼事業。
              </p>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-300">
                探幽訪勝，走進 MT5 源代碼(原始碼Source Code) 量化世界
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">
                Explore
              </h3>
              <div className="flex flex-col gap-3 text-sm text-slate-500">
                <a href="#features" className="transition hover:text-cyan-300">
                  源代碼庫
                </a>
                <a href="#modular" className="transition hover:text-cyan-300">
                  模組化積木
                </a>
                <Link href="/line-kb" className="transition hover:text-cyan-300">
                  LINE 知識庫
                </Link>
                <a href="#pricing" className="transition hover:text-cyan-300">
                  訂閱方案
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">
                Journey
              </h3>
              <div className="space-y-3 text-sm leading-6 text-slate-500">
                <p>先看懂內容，再看見方法，最後才接到行動入口。</p>
                <p>這裡不是終點，而是下一段量化旅程的起點。</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-slate-800/80 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>&copy; 2026 AI-Quant Lab. All rights reserved.</span>
            <span>Designed as a guided journey, not a one-page brochure.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
