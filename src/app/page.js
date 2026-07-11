'use client';
// env fix v1

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { getLocaleFromPath, localizePath } from '@/lib/locale';

const glowText = 'drop-shadow-[0_0_10px_rgba(34,211,238,0.22)]';
const tapClass =
  'touch-manipulation select-none active:scale-[0.98] active:translate-y-px transition-transform duration-150';

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
    title: '先抓住目光',
    text: '先用一個夠清楚的主張，讓人停下來，願意往下看第二眼。',
  },
  {
    step: 'A2',
    title: '把路線說明白',
    text: '把策略、教學、模組與知識庫拆成好懂的層次，讓人一眼看懂每一區在回答什麼。',
  },
  {
    step: 'A3',
    title: '把證據攤開',
    text: '原始碼、回測、驗證與 FAQ 一起上場，讓主張不是口號，而是有憑有據。',
  },
  {
    step: 'A4',
    title: '順勢接到下一步',
    text: '當價值、邊界與行動入口都講清楚，方案與 CTA 就會自然出現，不必硬推。',
  },
];

// Signal / proof strip
const signalBlocks = [
  {
    title: '先被注意',
    copy: '用高對比標題、光感與留白，先讓頁面有被停下來看的理由。',
  },
  {
    title: '再被信任',
    copy: '用分層內容與明確標示，讓人知道自己正在讀哪一層，也知道為什麼可信。',
  },
  {
    title: '最後轉換',
    copy: '當價值、證據與下一步都清楚，點擊就不再是衝動，而是順勢。',
  },
];

const lineConversationPreview = {
  badge: 'LINE 對話框示意區',
  title: '先用點選式問題開場，再自然接到官網與預約名單',
  description:
    '這一段不是要人手打長文，而是直接給訪客可點選的下一步。先看懂、先點選、先接住，再慢慢往官網與預約名單導流。',
  messages: [
    {
      type: 'incoming',
      title: '你們是工程師、程式設計師嗎？',
      text: '我想先了解你們是做什麼的。',
    },
    {
      type: 'outgoing',
      title: 'AI-Quant Lab 是什麼？',
      text: '我們聚焦 MQL5 原始碼研發、AI 模組化提示詞工程與量化技術教學。若你想先看全貌，可以直接點選下一步。',
    },
  ],
  quickReplies: [
    { label: '先看功能說明', href: '/line-kb' },
    { label: '先看品牌故事', href: '/line-kb/expansion' },
    { label: '加入預約名單', href: 'https://lin.ee/stqhWhj', external: true },
    { label: '標準會員', href: '/membership' },
  ],
};

const navItems = [
  {
    label: 'AI\u91cd\u69cb\u5f15\u64ce',
    matches: ['/membership', '/converter'],
    children: [
      { href: '/membership', label: '\u6a19\u6e96\u6703\u54e1\u7248' },
      { label: '\u52a0\u76df\u6703\u54e1\u7248', disabled: true },
      { href: '/converter', label: '\u5c0a\u69ae\u5546\u7528\u7248' },
      { label: 'Docker MCP\u4f3a\u670d\u5668\u7248', disabled: true },
    ],
  },
  { href: '/modular', label: '\u6a21\u7d44\u5316\u7a4d\u6728', matches: ['/modular'] },
  { href: '/line-kb', label: 'LINE \u77e5\u8b58\u5eab', matches: ['/line-kb'] },
  {
    label: '\u8a02\u95b1\u65b9\u6848',
    matches: ['/membership'],
    children: [
      { href: '/membership', label: '\u6a19\u6e96\u6703\u54e1' },
      { label: '\u52a0\u76df\u6703\u54e1', disabled: true },
      { label: '\u4f01\u696dVIP\u6703\u54e1', disabled: true },
    ],
  },
];

const languageTabs = [
  { href: '/en', label: 'EN', match: '/en' },
  { href: '/zh-Hant', label: '繁中', match: '/zh-Hant' },
  { href: '/zh-Hans', label: '简中', match: '/zh-Hans' },
];


const navTranslations = {
  'zh-Hant': {
    groups: ['AI重構引擎', '模組化積木', 'LINE 知識庫', '訂閱方案'],
    children: [['標準會員版', '加盟會員版', '尊榮商用版', 'Docker MCP伺服器版'], null, null, ['標準會員', '加盟會員', '企業VIP會員']],
    login: '登錄',
  },
  'zh-Hans': {
    groups: ['AI重构引擎', '模块化积木', 'LINE 知识库', '订阅方案'],
    children: [['标准会员版', '加盟会员版', '尊荣商用版', 'Docker MCP服务器版'], null, null, ['标准会员', '加盟会员', '企业VIP会员']],
    login: '登录',
  },
  en: {
    groups: ['AI Refactoring', 'Modular Blocks', 'LINE Knowledge Base', 'Subscription Plans'],
    children: [['Standard Membership', 'Affiliate Membership', 'Premium Commercial', 'Docker MCP Server'], null, null, ['Standard Membership', 'Affiliate Membership', 'Enterprise VIP']],
    login: 'LOGIN',
  },
};

function getLocalizedNavItems(locale) {
  const translation = navTranslations[locale] || navTranslations['zh-Hant'];
  return navItems.map((item, index) => ({
    ...item,
    label: translation.groups[index],
    children: item.children
      ? item.children.map((child, childIndex) => ({
          ...child,
          label: translation.children[index][childIndex],
        }))
      : undefined,
  }));
}

function getLoginLabel(locale) {
  return (navTranslations[locale] || navTranslations['zh-Hant']).login;
}
const homeCopy = {
  'zh-Hant': {
    topLogin: '\u767b\u9304',
    heroBadge: '\u6cd5\u4eba\u7d1a\u5546\u7528\u767c\u4f48',
    heroTitleTop: 'AI \u9769\u547d\u91cf\u5316\u4ea4\u6613\uff1a',
    heroTitleBottom: '\u89e3\u9396\u6cd5\u4eba\u7d1a MT5 EA \u5546\u696d\u6e90\u4ee3\u78bc',
    heroBody: '\u96f6\u57fa\u790e\u4e5f\u80fd\u7528 AI LLM \u63d0\u793a\u8a5e\u6a21\u677f\u9ad8\u6548\u91cd\u69cb\u6838\u5fc3\u7b56\u7565\u3002\u7121\u7248\u6b0a\u9650\u5236\u3001\u7121\u9808\u8a31\u53ef\uff0c\u6253\u9020\u5c08\u5c6c\u60a8\u7684\u500b\u4eba\u4ea4\u6613\u54c1\u724c\u8207\u6578\u4f4d\u8cc7\u7522\uff0c\u5229\u6f64 100% \u5168\u6b78\u81ea\u5df1\u3002',
    membershipCta: '\u524d\u5f80\u6a19\u6e96\u6703\u54e1',
    knowledgeCta: '\u5148\u770b\u77e5\u8b58\u5eab\u67b6\u69cb',
    reasonsBadge: '\u5148\u770b\u898b\u7bc0\u594f\uff0c\u518d\u770b\u898b\u50f9\u503c',
    reasonsTitle: '\u4e09\u500b\u8b93\u4eba\u9858\u610f\u5f80\u4e0b\u770b\u7684\u7406\u7531',
    reasonsBody: '\u5982\u679c\u4f60\u60f3\u77e5\u9053\u9019\u500b\u9996\u9801\u5230\u5e95\u5728\u8ce3\u4ec0\u9ebc\u3001\u5f37\u5728\u54ea\u88e1\u3001\u9069\u4e0d\u9069\u5408\u4f60\uff0c\u5148\u770b\u5b8c\u9019\u4e09\u500b\u5340\u584a\uff0c\u518d\u5f80\u4e0b\u770b\u65b9\u6848\u6703\u66f4\u6709\u611f\u3002'
  },
  'zh-Hans': {
    topLogin: '\u767b\u5f55',
    heroBadge: '\u6cd5\u4eba\u7ea7\u5546\u7528\u53d1\u5e03',
    heroTitleTop: 'AI \u9769\u547d\u91cf\u5316\u4ea4\u6613\uff1a',
    heroTitleBottom: '\u89e3\u9501\u6cd5\u4eba\u7ea7 MT5 EA \u5546\u4e1a\u6e90\u4ee3\u7801',
    heroBody: '\u96f6\u57fa\u7840\u4e5f\u80fd\u7528 AI LLM \u63d0\u793a\u8bcd\u6a21\u677f\u9ad8\u6548\u91cd\u6784\u6838\u5fc3\u7b56\u7565\u3002\u65e0\u7248\u6743\u9650\u5236\u3001\u65e0\u987b\u8bb8\u53ef\uff0c\u6253\u9020\u4e13\u5c5e\u4e8e\u60a8\u7684\u4e2a\u4eba\u4ea4\u6613\u54c1\u724c\u4e0e\u6570\u5b57\u8d44\u4ea7\uff0c\u5229\u6da6 100% \u5168\u5f52\u81ea\u5df1\u3002',
    membershipCta: '\u524d\u5f80\u6807\u51c6\u4f1a\u5458',
    knowledgeCta: '\u5148\u770b\u77e5\u8bc6\u5e93\u67b6\u6784',
    reasonsBadge: '\u5148\u770b\u89c1\u8282\u594f\uff0c\u518d\u770b\u89c1\u4ef7\u503c',
    reasonsTitle: '\u4e09\u4e2a\u8ba9\u4eba\u613f\u610f\u5f80\u4e0b\u770b\u7684\u7406\u7531',
    reasonsBody: '\u5982\u679c\u4f60\u60f3\u77e5\u9053\u8fd9\u4e2a\u9996\u9875\u5230\u5e95\u5728\u5356\u4ec0\u4e48\u3001\u5f3a\u5728\u54ea\u91cc\u3001\u9002\u4e0d\u9002\u5408\u4f60\uff0c\u5148\u770b\u5b8c\u8fd9\u4e09\u4e2a\u533a\u5757\uff0c\u518d\u5f80\u4e0b\u770b\u65b9\u6848\u4f1a\u66f4\u6709\u611f\u3002'
  },
  en: {
    topLogin: 'LOGIN',
    heroBadge: 'COMMERCIAL RELEASE',
    heroTitleTop: 'AI Quant Trading Revolution:',
    heroTitleBottom: 'Unlock Institutional MT5 EA Source Code',
    heroBody: 'Even from zero, you can use AI LLM prompt templates to rebuild core strategies efficiently. No copyright lock-in, no permission required. Build your own trading brand and digital assets, and keep 100% of the upside.',
    membershipCta: 'Go to Standard Membership',
    knowledgeCta: 'View Knowledge Base',
    reasonsBadge: 'See the rhythm, then the value',
    reasonsTitle: 'Three reasons to keep scrolling',
    reasonsBody: 'If you want to know what this homepage is offering, where it stands out, and whether it fits you, start with these three sections before comparing the plans below.'
  },
};

function isNavItemActive(item, pathname = '') {
  return item.matches?.some((prefix) => pathname.startsWith(prefix)) || false;
}


function MenuDots() {
  return (
    <span aria-hidden="true" className="inline-flex flex-col items-center gap-px">
      <span className="h-0.5 w-0.5 rounded-full bg-cyan-200/90 shadow-[0_0_7px_rgba(165,243,252,0.85)]" />
      <span className="h-0.5 w-0.5 rounded-full bg-cyan-200/75 shadow-[0_0_7px_rgba(165,243,252,0.7)]" />
      <span className="h-0.5 w-0.5 rounded-full bg-cyan-200/60 shadow-[0_0_7px_rgba(165,243,252,0.55)]" />
    </span>
  );
}
function LanguageMenu({ pathname, mobile = false }) {
  const [open, setOpen] = useState(false);
  const activeTab = languageTabs.find((tab) => pathname.startsWith(tab.match)) || languageTabs[0];

  return (
    <div
      className={'group relative ' + (mobile ? 'w-full' : '')}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => (mobile ? !value : true))}
        className={'flex cursor-pointer list-none items-center justify-center gap-1.5 rounded-full border border-cyan-300/20 bg-slate-950/55 px-2.5 py-2 text-xs font-bold tracking-[0.1em] text-slate-200 shadow-[0_0_22px_rgba(34,211,238,0.14)] backdrop-blur-xl transition hover:border-cyan-300/45 hover:text-cyan-100 ' + (mobile ? 'w-full min-h-11' : 'min-w-[5.6rem]')}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_10px_rgba(34,211,238,0.7)]" />
        <span>{activeTab.label}</span>
        <MenuDots />
      </button>
      <div
        className={'absolute right-0 top-full z-[60] pt-2 transition-all duration-150 ' + (mobile ? 'left-0' : '') + ' ' + (open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0') + ' md:group-hover:pointer-events-auto md:group-hover:translate-y-0 md:group-hover:opacity-100'}
      >
        <div className={'overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950/95 p-1.5 shadow-[0_0_28px_rgba(34,211,238,0.22)] backdrop-blur-xl ' + (mobile ? 'w-full' : 'w-20')}>
          {languageTabs.map((tab) => {
            const isActive = tab.label === activeTab.label;
            return (
              <Link
                key={tab.label}
                href={localizePath(pathname || '/', tab.match.slice(1))}
                onClick={() => setOpen(false)}
                className={'flex items-center justify-between rounded-xl px-2 py-2.5 text-xs font-bold tracking-[0.08em] transition ' + (isActive ? 'bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-slate-950 shadow-[0_0_16px_rgba(34,211,238,0.35)]' : 'text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-100')}
              >
                <span className="flex items-center gap-1.5"><span className={'h-1.5 w-1.5 rounded-full ' + (isActive ? 'bg-white' : 'bg-cyan-300/70')} />{tab.label}</span>
                {isActive ? <span aria-hidden="true" className="text-[10px]">✓</span> : null}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
function HomeDesktopNavItem({ item, pathname, locale }) {
  const isActive = isNavItemActive(item, pathname);
  const baseClasses = isActive
    ? 'bg-cyan-500/12 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.18)]'
    : 'text-slate-400 hover:text-cyan-400';
  const dotClasses = isActive
    ? 'bg-cyan-200 shadow-[0_0_12px_rgba(165,243,252,0.95)]'
    : 'bg-cyan-400/65 group-hover:bg-cyan-200 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.65)]';

  if (!item.children) {
    return (
      <Link href={localizePath(item.href, locale)} className={`group relative rounded-full px-4 py-2 transition-all duration-300 ${baseClasses}`}>
        <span className="relative z-10 flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${dotClasses}`} />
          <span className={isActive ? 'drop-shadow-[0_0_12px_rgba(34,211,238,0.36)]' : ''}>{item.label}</span>
        </span>
      </Link>
    );
  }

  return (
    <div className="group relative">
      <button
        type="button"
        className={`group relative flex items-center gap-1.5 rounded-full px-2.5 py-2 transition-all duration-300 ${baseClasses}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${dotClasses}`} />
        <span className={isActive ? 'drop-shadow-[0_0_12px_rgba(34,211,238,0.36)]' : ''}>{item.label}</span>
        <MenuDots />
      </button>
      <div className={'pointer-events-none invisible absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-[opacity,transform,visibility] duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ' + (item.label.includes('訂閱方案') || item.label.includes('订阅方案') || item.label === 'Subscription Plans' ? 'w-28' : (item.label.includes('AI重構引擎') || item.label.includes('AI重构引擎') || item.label === 'AI Refactoring' ? 'w-32' : 'w-56'))}>
        <div className="overflow-hidden rounded-2xl border border-cyan-300/18 bg-slate-950/92 p-2 shadow-[0_0_28px_rgba(34,211,238,0.16)] backdrop-blur-xl">
          {item.children.map((child) =>
            child.disabled ? (
              <span key={child.label} className="flex items-center rounded-xl px-4 py-3 text-sm font-medium text-slate-500">
                {child.label}
              </span>
            ) : (
              <Link
                key={child.label}
                href={localizePath(child.href, locale)}
                className="flex items-center rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-cyan-500/10 hover:text-cyan-200"
              >
                {child.label}
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

function HomeMobileNavItem({ item, pathname, locale, tapClass, onNavigate }) {
  const isActive = isNavItemActive(item, pathname);

  if (!item.children) {
    return (
      <Link
        href={localizePath(item.href, locale)}
        className={`rounded-xl border px-4 py-3 min-h-12 transition ${tapClass} ${
          isActive
            ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.12)]'
            : 'border-slate-800 bg-slate-900/70 hover:border-cyan-400/30 hover:text-cyan-300'
        }`}
        onClick={onNavigate}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className={`rounded-2xl border px-4 py-3 transition ${
        isActive
          ? 'border-cyan-400/35 bg-cyan-500/10 shadow-[0_0_18px_rgba(34,211,238,0.12)]'
          : 'border-slate-800 bg-slate-900/70'
      }`}
    >
      <div className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-200">
        <span>{item.label}</span>
        <MenuDots />
      </div>
      <div className="grid gap-2 pl-2">
        {item.children.map((child) =>
          child.disabled ? (
            <span
              key={child.label}
              className="rounded-xl border border-slate-800/60 bg-slate-950/65 px-3 py-2.5 text-sm text-slate-500"
            >
              {child.label}
            </span>
          ) : (
            <Link
              key={child.label}
              href={localizePath(child.href, locale)}
              className={`rounded-xl border border-slate-800 bg-slate-950/75 px-3 py-2.5 text-sm text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-200 ${tapClass}`}
              onClick={onNavigate}
            >
              {child.label}
            </Link>
          ),
        )}
      </div>
    </div>
  );
}

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
const planHighlights = [
  '100% 原始碼交付',
  'AI LLM 提示詞賦能',
  '1-on-1 技術對接',
];

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
    highlights: planHighlights,
    featured: false,
    cta: '前往會員頁',
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
    highlights: planHighlights,
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
      'A3：標準會員會先經過 Clerk 登入，再透過 Lemon Squeezy 完成訂閱；付款成功後，Supabase 會自動回寫會員狀態並開通權限。加盟會員則保留原本的進階導流流程，後續再補完整串接。',
  },
  {
    question: 'Q4：這些 EA 策略過去的回測表現如何？有包含風控機制嗎？',
    answer:
      'A4：所有上架策略均遵循業界法人級商業EA標準以 5 年以上的歷史數據回測（包含 Walk-Forward 前瞻分析與壓力測試），且每套策略皆內建嚴格的 ATR 動態止損與每筆交易風險上限控制，拒絕馬丁與扛單。',
  },
];

const accordionFaqItems = [
  {
    question: 'Q：使用 AI-Quant Lab 的系統需要具備深厚的 Python 或 MQL5 程式底子嗎？',
    answer:
      'A：不需要。我們將複雜的外匯 EA 邏輯拆解為「模組化積木」，並提供專屬的 AI 提示詞模板。您只需透過與 AI 對話，即可輕鬆進行核心策略的調教與重構。',
  },
  {
    question: 'Q：你們有提供代操資金、保證獲利或特定投顧建議嗎？',
    answer:
      'A：絕對沒有。AI-Quant Lab 是一家純粹的軟體工程與 AI 技術教學實驗室。我們僅提供源代碼與量化工具，不經手任何客戶資金，所有交易決策與風險均由用戶自主控管。',
  },
  {
    question: 'Q：訂閱方案後，我該如何開始使用？',
    answer:
      'A：標準會員請先建立帳號並完成訂閱付款，系統會在 webhook 回寫後自動開通權限。若你目前只是看說明，可以直接從會員頁進入登入、註冊與付款流程。',
  },
];

const englishScrollCards = [
  {
    kicker: '01 / Understand the system',
    title: 'Turn complex trading into a readable roadmap',
    description: 'We do not fill the page with noise. We organize strategy, validation, and upgrades into a path you can follow, so every layer has a clear purpose.',
  },
  {
    kicker: '02 / See the difference',
    title: 'A faster route to source code and practical resources',
    description: 'Backtests, strategy logic, source code, and community support connect in one flow, turning learning into progress you can keep building on.',
  },
  {
    kicker: '03 / Find your next move',
    title: 'When you are ready to begin, clear guidance matters',
    description: 'Keep scrolling to find the plan and next action that fit you best. The clearer the choice, the easier it is to move forward.',
  },
];

const englishNarrativeBlocks = [
  {
    tag: 'Explore',
    title: 'Let the first impression earn a second look',
    note: 'We place the most useful context up front. The goal is not more words, but a clear reason to keep exploring.',
  },
  {
    tag: 'Verify',
    title: 'See the method and the evidence behind it',
    note: 'Backtests, strategy design, source code, and community support form the structure that makes every claim easier to evaluate.',
  },
  {
    tag: 'Move',
    title: 'Turn interest into a clear next step',
    note: 'When value, boundaries, and actions are clear, a plan becomes more than a price. It becomes an understandable entry point.',
  },
];

const englishRouteSteps = [
  {
    step: 'A1',
    title: 'Capture attention',
    text: 'Start with a clear promise that gives visitors a reason to pause and take a closer look.',
  },
  {
    step: 'A2',
    title: 'Explain the route',
    text: 'Break strategy, teaching, modules, and knowledge into clear layers so every area answers a specific question.',
  },
  {
    step: 'A3',
    title: 'Show the evidence',
    text: 'Put source code, backtests, validation, and FAQs together so the promise is supported by substance.',
  },
  {
    step: 'A4',
    title: 'Lead to the next action',
    text: 'Once value, boundaries, and entry points are clear, the plan and CTA can appear naturally.',
  },
];

const englishSignalBlocks = [
  {
    title: 'Be noticed',
    copy: 'High contrast, light, and breathing room give the page a reason to earn attention.',
  },
  {
    title: 'Build trust',
    copy: 'Clear layers and labels help visitors understand what they are reading and why it matters.',
  },
  {
    title: 'Convert naturally',
    copy: 'When value, evidence, and the next action are clear, a click becomes a confident decision.',
  },
];

const englishLineConversationPreview = {
  badge: 'LINE Conversation Preview',
  title: 'Start with guided questions, then connect naturally to your site and reservation flow',
  description: 'Visitors do not need to write a long message. They can choose the next step, understand the offer, and move from conversation to the right page.',
  messages: [
    {
      type: 'incoming',
      title: 'Are you engineers or software developers?',
      text: 'I would like to understand what you do first.',
    },
    {
      type: 'outgoing',
      title: 'What is AI-Quant Lab?',
      text: 'We focus on MQL5 source-code development, AI modular prompt engineering, and quantitative trading education. Choose a next step to see the full picture.',
    },
  ],
  quickReplies: [
    { label: 'View feature guide', href: '/line-kb' },
    { label: 'Read the brand story', href: '/line-kb/expansion' },
    { label: 'Join the reservation list', href: 'https://lin.ee/stqhWhj', external: true },
    { label: 'Standard membership', href: '/membership' },
  ],
};

const englishFeatures = [
  {
    title: 'mq4/mq5 Code Conversion',
    description: 'From code conversion and compilation to strategy design, backtesting, and deployment, build a complete MT5 workflow.',
    icon: 'chart',
  },
  {
    title: 'MQL5 Source-Code Training',
    description: 'Understand EA structure and programming logic directly, ideal for anyone who wants to customize their own strategies.',
    icon: 'code',
  },
  {
    title: 'Community and VIP Support',
    description: 'Get strategy discussion, version updates, and implementation guidance to shorten the learning and testing cycle.',
    icon: 'users',
  },
  {
    kicker: '04 / Real-world feedback',
    title: 'From testing to practical decisions',
    description: 'Use structured feedback, testing notes, and clear checkpoints to turn ideas into repeatable implementation.',
  },
  {
    kicker: '05 / Content extension',
    title: 'Keep expanding the learning path',
    description: 'Connect source code, modular blocks, and knowledge-base content into a path that grows with your skill level.',
  },
  {
    kicker: '06 / Action entry',
    title: 'Move from understanding to action',
    description: 'Choose the right membership, start the workflow, and keep your next quantitative step visible.',
  },
];

const englishPlanHighlights = [
  '100% source-code delivery',
  'AI LLM prompt enablement',
  '1-on-1 technical guidance',
];

const englishPlans = [
  {
    name: 'Standard Membership',
    price: 'USD$ 9.00',
    period: '/ month',
    description: 'A practical starting point for exploring the content and building a foundation in quantitative trading.',
    points: [
      'Selected MT5 EA strategies and backtest reports',
      'Monthly strategy and tool selections',
      'Community discussion access',
    ],
    highlights: englishPlanHighlights,
    featured: false,
    cta: 'Open membership',
  },
  {
    name: 'Affiliate Membership',
    badge: 'Popular choice',
    price: 'USD$ 39.00',
    period: '/ month',
    description: 'For users who want to implement strategies faster and access more hands-on resources.',
    points: [
      'Full MQL5 source-code training and core strategy library',
      'Exclusive EA strategies and templates',
      'One-on-one backtest and deployment guidance',
      'Priority updates for VIP core features',
    ],
    highlights: englishPlanHighlights,
    featured: true,
    cta: 'Join now',
  },
];

const englishFaqItems = [
  {
    question: 'Q1: Do I need a specific forex broker to use the EA strategies after subscribing?',
    answer: 'A1: No. The strategies support any forex broker that provides an MT5 account. Our institutional-grade MT5 EA source code is independent, reusable, and can be reprogrammed, optimized, compiled, or rebuilt into your own digital products.',
  },
  {
    question: 'Q2: Is the MQL5 source-code training suitable for complete beginners?',
    answer: 'A2: Yes. The learning path starts from the fundamentals of using AI LLMs with MQL5 syntax, then moves through EA source-code construction, compilation, and practical use. Templates and modular examples make it approachable for both new and experienced users.',
  },
  {
    question: 'Q3: How are Standard and Affiliate Membership strategies different?',
    answer: 'A3: Standard Membership uses the Clerk sign-in and Lemon Squeezy subscription flow. After payment, Supabase updates the membership status and access automatically. Affiliate Membership keeps the advanced referral flow and will be expanded with a complete integration later.',
  },
  {
    question: 'Q4: How have the EA strategies performed in backtests, and do they include risk controls?',
    answer: 'A4: Published strategies follow an institutional-grade testing process using five or more years of historical data, including walk-forward analysis and stress testing. Each strategy includes dynamic ATR stops and a per-trade risk cap, with no martingale or averaging-down design.',
  },
];

const englishAccordionFaqItems = [
  {
    question: 'Q: Do I need deep Python or MQL5 experience to use AI-Quant Lab?',
    answer: 'A: No. Complex EA logic is broken into modular blocks and paired with dedicated AI prompt templates. You can use guided conversations with AI to tune and rebuild core strategies.',
  },
  {
    question: 'Q: Do you provide managed funds, guaranteed profits, or investment advice?',
    answer: 'A: No. AI-Quant Lab is a software engineering and AI education lab. We provide source code and quantitative tools, never handle customer funds, and leave all trading decisions and risk management to the user.',
  },
  {
    question: 'Q: How do I start after subscribing?',
    answer: 'A: Standard members create an account and complete subscription payment first. Access is enabled automatically after the webhook updates the membership record. If you are only exploring, start with the membership page for sign-in, registration, and payment.',
  },
];

const englishCoreAdvantages = [
  '100% source-code delivery with no account lock, hardware binding, or copy-trading copyright restrictions.',
  'AI LLM prompt enablement with modular blocks and templates for rapid strategy rebuilding.',
  '1-on-1 technical guidance through the official LINE account for dedicated support.',
];

const englishUi = {
  journeyBadge: 'Journey',
  journeyTitle: 'This is more than a landing page. It is a guided path into the system.',
  journeyBody: 'When content has rhythm and structure, visitors find the next answer at every stage. The further they explore, the clearer your value becomes.',
  guideBadge: 'Guide',
  guideTitle: 'Understand the route, then let each layer build confidence',
  guideBody: 'This is not abstract brand copy. It is a guided sequence: capture attention, explain the structure, then lead naturally to plans and action.',
  featuresTitle: 'Source Code Library',
  featuresBody: 'Start by understanding the core source code, then move into modular blocks and their practical extensions.',
  pricingTitle: 'Your Next Step',
  pricingBody: 'Once the route above is clear, this is the natural entry point for taking action.',
  coreLabel: 'Core advantages',
  legalTitle: 'Risk and technical positioning',
  legalIntro: 'To clarify the nature of this content and reduce misunderstanding, please read the following statement before continuing.',
  legalBody: 'AI-Quant Lab focuses on MQL5 source-code development and AI modular prompt engineering education. All content is provided for academic research and technical exchange only. We do not provide copy trading or managed trading, guarantee profits, or handle customer investment funds. Users are responsible for their own trading decisions and risks.',
  faqTitle: 'Clear answers make the next step easier',
  faqBody: 'These are common questions when evaluating a subscription, learning MQL5, or reviewing a strategy. Understand the boundaries first, then decide with confidence.',
  accordionTitle: 'Defensive and subscription guidance',
  accordionBody: 'These additional answers explain usage requirements, risk boundaries, and the subscription flow in more detail.',
  accordionCount: '3 additional answers',
  faqBadge: 'FAQ / Common Questions',   chatVisitorLabel: 'Visitor question',
  chatAgent: 'Replied by the AI-Quant Lab team',
  chatOnline: 'Online',
  chatVisitor: 'Visitor question',
  chatNext: 'Choose a next step, no long message needed',
  footerAbout: 'AI-Quant Lab is a source-code quantitative trading lab focused on MQL5 development, AI modular prompt engineering, and practical quantitative education.',
  footerPill: 'Explore the MT5 source-code quantitative world',
  footerSource: 'Source Code Library',
  footerModular: 'Modular Blocks',
  footerLine: 'LINE Knowledge Base',
  footerPlans: 'Subscription Plans',
  footerJourneyOne: 'Understand the content, see the method, then take action.',
  footerJourneyTwo: 'This is not the destination. It is the start of your next quantitative journey.',
  footerTag: 'AI-Quant Lab Source-Code Quantitative Lab | MQL5 x AI Modular Education',
};
export default function Home({ locale = 'zh-Hant' }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const tapLockRef = useRef(false);

  const currentLocalePath = pathname || `/${locale || 'zh-Hant'}`;
  const pageLocale = getLocaleFromPath(currentLocalePath);
  const currentLocale = homeCopy[pageLocale] ? pageLocale : 'zh-Hant';
  const copy = homeCopy[currentLocale];
  const isEnglish = currentLocale === 'en';
  const localizedScrollCards = isEnglish ? englishScrollCards : scrollCards;
  const localizedNarrativeBlocks = isEnglish ? englishNarrativeBlocks : narrativeBlocks;
  const localizedRouteSteps = isEnglish ? englishRouteSteps : routeSteps;
  const localizedSignalBlocks = isEnglish ? englishSignalBlocks : signalBlocks;
  const localizedLineConversationPreview = isEnglish ? englishLineConversationPreview : lineConversationPreview;
  const localizedFeatures = isEnglish ? englishFeatures : features;
  const localizedPlans = isEnglish ? englishPlans : plans;
  const localizedFaqItems = isEnglish ? englishFaqItems : faqItems;
  const localizedAccordionFaqItems = isEnglish ? englishAccordionFaqItems : accordionFaqItems;
  const localizedCoreAdvantages = isEnglish
    ? englishCoreAdvantages
    : [
        '100% 原始碼交付，無鎖帳號、無硬體綁定、無任何跟單版權限制。',
        'AI LLM 提示詞賦能，透過模組化積木與模板快速重構策略。',
        '1-on-1 技術對接，直接透過 LINE 官方帳號啟動專屬授權。',
      ];
  const ui = isEnglish ? englishUi : null;

  const withTapLock = (callback) => {
    if (tapLockRef.current) {
      return;
    }

    tapLockRef.current = true;
    window.setTimeout(() => {
      tapLockRef.current = false;
    }, 240);

    callback();
  };

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

  useEffect(() => {
    if (!mobileNavOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileNavOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileNavOpen]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      <div className="content-stage relative mx-auto max-w-7xl overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="tech-grid absolute inset-0 opacity-30" />
          <div className="content-fade absolute inset-0" />
          <div className="animate-float-slow absolute -top-24 left-1/2 hidden h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl sm:block" />
          <div className="animate-float-slower absolute right-[-6rem] top-32 hidden h-72 w-72 rounded-full bg-blue-500/10 blur-3xl sm:block" />
          <div className="animate-pulse-glow absolute left-[-5rem] bottom-24 hidden h-80 w-80 rounded-full bg-teal-400/10 blur-3xl sm:block" />
          <div className="animate-scanline absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent opacity-70" />
          <div className="animate-scanline absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent opacity-35 [animation-delay:-3s]" />
          <div className="animate-scanline absolute inset-x-0 top-2/3 h-px bg-gradient-to-r from-transparent via-blue-300/25 to-transparent opacity-30 [animation-delay:-6s]" />
          {particles.map((particle) => (
            <span
              key={`${particle.className}-${particle.delay}`}
              className={`particle-dot absolute hidden h-1.5 w-1.5 rounded-full bg-cyan-300/90 shadow-[0_0_18px_rgba(34,211,238,0.65)] sm:block ${particle.className}`}
              style={{ animationDelay: particle.delay, animationDuration: particle.duration }}
            />
          ))}
        </div>

        <div className="relative z-10">
        <header
          className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 supports-[backdrop-filter]:transition-all max-sm:bg-slate-950/92 max-sm:backdrop-blur-md ${
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

            <div className="flex items-center gap-3 sm:gap-5">
              <nav className="hidden items-center gap-2 text-sm font-medium md:flex">
                {getLocalizedNavItems(pageLocale).map((item) => (
                  <HomeDesktopNavItem key={item.label} item={item} pathname={pathname || ''} locale={pageLocale} />
                ))}
              </nav>

              <LanguageMenu pathname={pathname || '/'} />

              <Link
                href={localizePath('/sign-in', pageLocale)}
                className={`btn-pulse shrink-0 whitespace-nowrap rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3.5 py-2 text-[12px] font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:from-cyan-400 hover:to-blue-500 min-h-11 ${tapClass}`}
                onClick={() => withTapLock(() => {})}
              >
                {copy.topLogin}
              </Link>

              <button
                type="button"
                className={`btn-pulse shrink-0 ml-1 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-100 transition hover:border-cyan-400/40 hover:text-cyan-300 md:hidden ${tapClass}`}
                aria-label={mobileNavOpen ? '關閉導覽選單' : '開啟導覽選單'}
                aria-expanded={mobileNavOpen}
                aria-controls="mobile-nav-menu"
                onClick={() => withTapLock(() => setMobileNavOpen((open) => !open))}
              >
                <span className="sr-only">{mobileNavOpen ? '關閉導覽選單' : '開啟導覽選單'}</span>
                <span className="flex flex-col gap-1.5">
                  <span className="h-0.5 w-5 rounded-full bg-current" />
                  <span className="h-0.5 w-5 rounded-full bg-current" />
                  <span className="h-0.5 w-5 rounded-full bg-current" />
                </span>
              </button>
            </div>
          </div>

          <div
            id="mobile-nav-menu"
            className={`md:hidden overflow-hidden border-t border-slate-800/40 bg-slate-950/95 px-4 transition-[max-height,opacity,transform] duration-200 ease-out ${
              mobileNavOpen
                ? 'max-h-[min(24rem,calc(100vh-5.5rem))] translate-y-0 py-4 opacity-100'
                : 'max-h-0 -translate-y-1 py-0 opacity-0'
            }`}
          >

            <div className="mb-3"><LanguageMenu pathname={pathname || '/'} mobile /></div>

            <div className="grid gap-2 text-sm font-medium text-slate-300">
              {getLocalizedNavItems(pageLocale).map((item) => (
                <HomeMobileNavItem
                  key={item.label}
                  item={item}
                  pathname={pathname || ''}
                  locale={pageLocale}
                  tapClass={tapClass}
                  onNavigate={() => withTapLock(() => setMobileNavOpen(false))}
                />
              ))}
            </div>
          </div>
        </header>

      <main
        className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6 lg:px-8 lg:pt-32"
      >
        <section className="hero-aurora animate-reveal-up relative z-10 mx-auto flex min-h-[74vh] max-w-5xl flex-col items-center justify-center gap-6 py-12 text-center sm:min-h-[74vh] sm:gap-7 sm:py-16 lg:gap-8">
          <div aria-hidden="true" className="hero-aurora-layer hero-aurora-layer-one hidden sm:block" />
          <div aria-hidden="true" className="hero-aurora-layer hero-aurora-layer-two hidden sm:block" />
          <div aria-hidden="true" className="hero-aurora-layer hero-aurora-layer-three hidden sm:block" />
          <div className="relative z-10 space-y-7">
            <div aria-hidden="true" className="hero-spotlight hero-spotlight-one hidden sm:block" />
            <div aria-hidden="true" className="hero-spotlight hero-spotlight-two hidden sm:block" />
            <div aria-hidden="true" className="hero-spotlight hero-spotlight-three hidden sm:block" />
            <div className="hero-badge hero-copy mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/45 bg-cyan-500/12 px-4 py-1.5 text-sm font-semibold tracking-[0.24em] text-white shadow-[0_0_18px_rgba(34,211,238,0.24),0_0_38px_rgba(34,211,238,0.1)] backdrop-blur-md animate-pulse sm:text-base">
              {copy.heroBadge}
            </div>
            <h1 className="mx-auto max-w-6xl text-balance text-4xl font-black leading-[0.96] tracking-tight text-white sm:text-6xl lg:text-[5rem]">
              <span className="hero-bright block text-white">
                {copy.heroTitleTop}
              </span>
              <span className="hero-sharp mt-2 block bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-500 bg-clip-text text-transparent">
                {copy.heroTitleBottom}
              </span>
            </h1>
            <p className="hero-copy mx-auto max-w-3xl text-base leading-relaxed text-slate-100/95 sm:text-lg lg:text-xl">
              {copy.heroBody}
            </p>
            <div className="flex w-full flex-col items-center justify-center gap-3 pt-4 sm:flex-row">
              <Link
                href={localizePath('/membership', pageLocale)}
                className={`btn-pulse w-full rounded-xl bg-cyan-400 px-8 py-3 text-center text-base font-bold text-slate-950 shadow-xl shadow-cyan-400/20 transition hover:bg-cyan-300 sm:w-auto ${tapClass}`}
                onClick={() => withTapLock(() => {})}
              >
                {copy.membershipCta}
              </Link>
              <Link
                href={localizePath('/line-kb', pageLocale)}
                className={`btn-pulse w-full rounded-xl border border-slate-800 bg-slate-900 px-8 py-3 text-center text-base font-medium text-slate-300 transition hover:bg-slate-800 sm:w-auto ${tapClass}`}
                onClick={() => withTapLock(() => {})}
              >
                {copy.knowledgeCta}
              </Link>
            </div>
          </div>
        </section>

        {/* Three reasons */}
        <section className="mt-20 space-y-8">
          <div className="animate-reveal-up mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-300">
              {copy.reasonsBadge}
            </div>
            <h2 className={`mt-5 text-3xl font-black tracking-tight sm:text-4xl ${glowText}`}>
              {copy.reasonsTitle}
            </h2>
            <p className={`mt-4 text-sm leading-relaxed text-slate-400 sm:text-base ${glowText}`}>
              {copy.reasonsBody}
            </p>
          </div>

          <div className="cards-cluster grid gap-5 lg:grid-cols-3">
            {localizedScrollCards.map((card, index) => (
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
              {ui?.journeyBadge || '旅程 / Journey'}
            </div>
            <h2 className={`mt-5 text-3xl font-black tracking-tight sm:text-4xl ${glowText}`}>
              {ui?.journeyTitle || '這不是單頁介紹，而是一條逐步深入的導覽路徑'}
            </h2>
            <p className={`mt-4 text-sm leading-relaxed text-slate-400 sm:text-base ${glowText}`}>
              {ui?.journeyBody || '當內容有節奏、有層次，訪客就會在每一段找到下一個想知道的答案。越往下看，越能看懂你的價值。'}
            </p>
          </div>

          <div className="pointer-events-none relative mx-auto h-10 max-w-4xl">
            <div className="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-fuchsia-400/60 to-transparent" />
            <div className="journey-rail absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 bg-[radial-gradient(circle,_rgba(232,121,249,0.24)_0%,_rgba(232,121,249,0)_70%)]" />
          </div>

          <div className="cards-cluster grid gap-5 lg:grid-cols-3">
            {localizedNarrativeBlocks.map((block, index) => (
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
              {ui?.guideBadge || '導覽 / Guide'}
            </div>
            <h2 className={`mt-5 text-3xl font-black tracking-tight sm:text-4xl ${glowText}`}>
              {ui?.guideTitle || '先看懂路線，再順著內容一層一層被說服'}
            </h2>
            <p className={`mt-4 text-sm leading-relaxed text-slate-400 sm:text-base ${glowText}`}>
              {ui?.guideBody || '這不是抽象的氛圍文案，而是一條有節奏的導覽：先抓住注意，再講清結構，最後把人自然帶到方案與行動。'}
            </p>
          </div>

          <div className="relative mx-auto max-w-5xl">
            <div className="absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-gradient-to-b from-cyan-400/80 via-fuchsia-400/60 to-transparent md:block" />
            <div className="cards-cluster grid gap-5 md:grid-cols-2">
              {localizedRouteSteps.map((step, index) => (
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
            {localizedSignalBlocks.map((signal, index) => (
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

        {/* LINE conversation preview */}
        <section className="mt-16">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="animate-reveal-up space-y-4 text-center lg:text-left">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300 lg:mx-0">
                {localizedLineConversationPreview.badge}
              </div>
              <h2 className={`text-3xl font-black tracking-tight sm:text-4xl ${glowText}`}>
                {localizedLineConversationPreview.title}
              </h2>
              <p className={`mx-auto max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base lg:mx-0 ${glowText}`}>
                {localizedLineConversationPreview.description}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                {localizedLineConversationPreview.quickReplies.map((item) =>
                  item.external ? (
                    <Link
                      key={item.label}
                      href={localizePath(item.href, pageLocale)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:border-emerald-300/40 hover:bg-emerald-400/15 hover:text-white ${tapClass}`}
                      onClick={() => withTapLock(() => {})}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <Link
                      key={item.label}
                      href={localizePath(item.href, pageLocale)}
                      className={`rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:border-emerald-300/40 hover:bg-emerald-400/15 hover:text-white ${tapClass}`}
                      onClick={() => withTapLock(() => {})}
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>
            </div>

            <div className="animate-reveal-up relative mx-auto w-full max-w-[460px] rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,14,28,0.95),rgba(15,23,42,0.9))] p-4 shadow-[0_18px_70px_rgba(8,145,178,0.18)] ring-1 ring-cyan-300/10">
              <div className="overflow-hidden rounded-[1.7rem] border border-slate-800/80 bg-[#f2f6fa] text-slate-900 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
                <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-lime-400 text-xs font-black text-white shadow-[0_0_18px_rgba(16,185,129,0.35)]">
                      AL
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">AI-Quant Lab</p>
                      <p className="text-xs text-emerald-600">{ui?.chatAgent || '由負責人員回覆訊息'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    {ui?.chatOnline || '線上'}
                  </div>
                </div>

                <div className="space-y-4 px-4 py-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-9 w-9 rounded-full bg-emerald-100 ring-1 ring-emerald-200" />
                    <div className="max-w-[82%] rounded-3xl rounded-tl-md bg-white px-4 py-3 shadow-sm">
                      <p className="text-[11px] font-semibold tracking-[0.16em] text-emerald-600">{ui?.chatVisitorLabel || '訪客提問'}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-800">
                        {ui?.chatVisitor || '你們是工程師、程式設計師嗎？'}
                      </p>
                    </div>
                  </div>

                  {localizedLineConversationPreview.messages.slice(1).map((message) => (
                    <div key={message.title} className="flex items-start justify-end gap-3">
                      <div className="max-w-[84%] rounded-3xl rounded-tr-md bg-gradient-to-br from-emerald-300 to-cyan-300 px-4 py-3 shadow-sm">
                        <p className="text-[11px] font-semibold tracking-[0.16em] text-emerald-900">{message.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-950">{message.text}</p>
                      </div>
                      <div className="mt-1 h-9 w-9 rounded-full bg-slate-900 ring-1 ring-cyan-300/30" />
                    </div>
                  ))}

                  <div className="rounded-[1.35rem] border border-slate-200 bg-white px-3 py-3 shadow-sm">
                    <p className="text-[11px] font-semibold tracking-[0.16em] text-slate-500">
                      {ui?.chatNext || '點選下一步，不用打長文'}
                    </p>
                    <div className="mt-3 grid gap-2">
                      {localizedLineConversationPreview.quickReplies.map((item) =>
                        item.external ? (
                          <Link
                            key={item.label}
                            href={localizePath(item.href, pageLocale)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-left text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100 ${tapClass}`}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <Link
                            key={item.label}
                            href={localizePath(item.href, pageLocale)}
                            className={`rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-left text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100 ${tapClass}`}
                          >
                            {item.label}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Source code library */}
        <section id="features" className="mt-12 space-y-12">
          <div className="animate-reveal-up mx-auto max-w-2xl text-center">
            <h2 className={`text-3xl font-bold tracking-tight ${glowText}`}>{ui?.featuresTitle || '源代碼庫'}</h2>
            <p className={`mt-4 text-slate-400 ${glowText}`}>
              {ui?.featuresBody || '這一站先讓你看懂核心源代碼(原始碼Source Code)，再慢慢走進模組化積木的組合與延伸。'}
            </p>
          </div>

          <div className="cards-cluster grid gap-6 md:grid-cols-3">
            {localizedFeatures.map((feature, index) => (
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
            <h2 className={`text-3xl font-bold tracking-tight ${glowText}`}>{ui?.pricingTitle || '前往下一站'}</h2>
            <p className={`mt-4 text-slate-400 ${glowText}`}>
              {ui?.pricingBody || '當你把前面的路看懂了，這裡就是自然接續的行動入口。'}
            </p>
          </div>

          <div className="cards-cluster mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
            {localizedPlans.map((plan, index) => (
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

                  <div className="mt-4 flex flex-wrap gap-2">
                    {plan.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="inline-flex items-center gap-2 rounded-full border border-cyan-200/40 bg-[linear-gradient(135deg,rgba(34,211,238,0.22),rgba(14,165,233,0.12))] px-4 py-1.5 text-[11px] font-bold tracking-[0.16em] text-cyan-50 shadow-[0_0_28px_rgba(34,211,238,0.38)] backdrop-blur-md"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-sm text-slate-500">{plan.period}</span>
                  </div>

                  <p className={`mt-4 text-sm leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300 ${glowText}`}>
                    {plan.description}
                  </p>

                  <div className="mt-5 rounded-2xl border border-slate-700/70 bg-slate-950/55 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200">
                      {ui?.coreLabel || '核心優勢'}
                    </p>
                    <ul className={`mt-3 space-y-2 text-sm leading-6 text-slate-300 ${glowText}`}>
                      {localizedCoreAdvantages.map((advantage) => (
                        <li key={advantage} className="flex gap-2">
                          <span className="mt-1 text-cyan-300">◆</span>
                          <span>{advantage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

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

                <Link
                  href={plan.featured ? 'https://lin.ee/stqhWhj' : localizePath('/membership', pageLocale)}
                  target={plan.featured ? '_blank' : undefined}
                  rel={plan.featured ? 'noopener noreferrer' : undefined}
                  className={`btn-pulse relative z-10 mt-8 w-full rounded-xl px-4 py-3 text-center text-sm font-bold transition-all duration-300 ${
                    plan.featured
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500'
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  {plan.cta}
                </Link>
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
                      {ui?.legalTitle || '免責與技術定調聲明'}
                    </h3>
                    <p className={`max-w-xl text-sm leading-7 text-slate-400 sm:text-[0.95rem] ${glowText}`}>
                      {ui?.legalIntro || '為了清楚界定本站內容屬性、降低誤解風險，以下聲明請於閱覽前一併確認。'}
                    </p>
                  </div>
                </div>

                <div className="relative rounded-[1.4rem] border border-slate-700/70 bg-slate-950/75 p-5 shadow-inner shadow-cyan-500/5 sm:p-6">
                  <div className="absolute inset-0 rounded-[1.4rem] bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_46%)] opacity-80" />
                  <p className={`relative z-10 text-sm leading-8 text-slate-200 sm:text-[0.98rem] ${glowText}`}>
                    {ui?.legalBody || '💡 法律免責與技術定調聲明：AI-Quant Lab 致力於 MQL5 原始碼研發與 AI 模組化提示詞軟體工程教學。本站及相關社群所提供之內容僅供學術研究與程式碼技術交流，絕不提供任何形式的跟單代操、不保證獲利、亦不經手或代管客戶投資資金。用戶應自行承擔交易風險，本站不承擔任何投資損失責任。'}
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
              {ui?.faqBadge || 'FAQ / 常見問題'}
            </div>
            <h2 className={`mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl ${glowText}`}>
              {ui?.faqTitle || '把疑問解開，才有信心開啟源代碼量化事業之旅'}
            </h2>
            <p className={`mt-4 text-sm leading-7 text-slate-400 sm:text-base ${glowText}`}>
              {ui?.faqBody || '這些問題多半是準備訂閱、學習 MQL5 或評估策略時最常遇到的關鍵點。先看懂，再決定下一步，會更清楚也更安心。'}
            </p>
          </div>

          <div className="cards-cluster mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2">
            {localizedFaqItems.map((item, index) => (
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

          <div className="mx-auto mt-12 max-w-5xl" id="faq-accordion">
            <div className="animate-reveal-up rounded-[1.75rem] border border-cyan-400/18 bg-[linear-gradient(180deg,rgba(2,6,23,0.96),rgba(3,7,18,0.88))] p-6 shadow-[0_28px_90px_rgba(8,145,178,0.16)] ring-1 ring-white/5 sm:p-8 lg:p-10">
              <div className="mb-8 flex flex-col gap-4 border-b border-slate-800/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl space-y-3">
                  <div className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
                    FAQ / Accordion
                  </div>
                  <h3 className={`text-2xl font-black tracking-tight text-white sm:text-3xl ${glowText}`}>
                    {ui?.accordionTitle || '防禦性與訂閱說明'}
                  </h3>
                  <p className={`text-sm leading-7 text-slate-400 sm:text-base ${glowText}`}>
                    {ui?.accordionBody || '這一組是補充性的技術問答，專門針對使用門檻、風險邊界與訂閱流程做更清楚的說明。'}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-slate-950/60 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-cyan-100">
                  <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.7)]" />
                  {ui?.accordionCount || '3 個補充問答'}
                </div>
              </div>

              <div className="space-y-4">
                {localizedAccordionFaqItems.map((item, index) => {
                  const isOpen = openAccordionIndex === index;

                  return (
                    <article
                      key={item.question}
                      className="overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/55 shadow-[0_12px_40px_rgba(2,6,23,0.4)] transition-all duration-300"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenAccordionIndex(isOpen ? -1 : index)}
                        aria-expanded={isOpen}
                        aria-controls={`accordion-panel-${index}`}
                        id={`accordion-trigger-${index}`}
                        className="group flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                      >
                        <span className={`text-base font-bold leading-7 text-white transition-colors duration-300 group-hover:text-cyan-300 sm:text-lg ${glowText}`}>
                          {item.question}
                        </span>
                        <span
                          className={`flex h-10 w-10 flex-none items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10 text-cyan-300 transition-all duration-300 ${
                            isOpen ? 'rotate-45 shadow-[0_0_24px_rgba(34,211,238,0.18)]' : ''
                          }`}
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </button>

                      <div
                        id={`accordion-panel-${index}`}
                        role="region"
                        aria-labelledby={`accordion-trigger-${index}`}
                        className={`grid overflow-hidden px-5 transition-[grid-template-rows,opacity] duration-300 ease-out sm:px-6 ${
                          isOpen ? 'grid-rows-[1fr] pb-5 opacity-100' : 'grid-rows-[0fr] pb-0 opacity-0'
                        }`}
                      >
                        <div className="min-h-0">
                          <div className="rounded-2xl border border-cyan-400/12 bg-slate-950/65 p-4 sm:p-5">
                            <div className="mb-3 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                              Technical Answer
                            </div>
                            <p className={`text-sm leading-8 text-slate-300 sm:text-[0.96rem] ${glowText}`}>
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
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
                {ui?.footerAbout || 'AI-Quant Lab 源代碼量化(工廠)實驗室，專注於 MQL5 原始碼研發、AI 模組化提示詞工程與量化技術教學。'}
              </p>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-300">
                {ui?.footerPill || '探幽訪勝_走進MT5源代碼(原始碼Source Code)量化世界'}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">
                Explore
              </h3>
              <div className="flex flex-col gap-3 text-sm text-slate-500">
                <Link href="#features" className="transition hover:text-cyan-300">
            <h2 className={`text-3xl font-bold tracking-tight ${glowText}`}>{ui?.featuresTitle || '源代碼庫'}</h2>
                </Link>
                <Link href={localizePath('/modular', pageLocale)} className="transition hover:text-cyan-300">
                  {ui?.footerModular || '模組化積木'}
                </Link>
                <Link href="/line-kb" className="transition hover:text-cyan-300">
                  {ui?.footerLine || 'LINE 知識庫'}
                </Link>
                <Link href="#pricing" className="transition hover:text-cyan-300">
                  {ui?.footerPlans || '訂閱方案'}
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">
                Journey
              </h3>
              <div className="space-y-3 text-sm leading-6 text-slate-500">
                <p>{ui?.footerJourneyOne || '先看懂內容，再看見方法，最後才接到行動入口。'}</p>
                <p>{ui?.footerJourneyTwo || '這裡不是終點，而是下一段量化旅程的起點。'}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-slate-800/80 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>&copy; 2026 AI-Quant Lab. All rights reserved.</span>
                <span>{ui?.footerTag || 'AI-Quant Lab 源代碼量化工廠實驗室｜MQL5 × AI 模組化量化教學'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
