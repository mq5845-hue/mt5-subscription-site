'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { getLocaleFromPath, localizePath, stripLocale } from '../lib/locale';
import EmojiAvatar from './EmojiAvatar';
import FlagAvatar from './FlagAvatar';

const homeRoutes = new Set(['/', '/zh-Hant', '/zh-Hans', '/en', '/ja', '/de', '/es']);

const navItems = [
  {
    label: 'AI\u91cd\u69cb\u5f15\u64ce',
    matches: ['/membership', '/converter', '/multi-agent'],
    children: [
      { label: '\u6a19\u6e96\u6703\u54e1\u7248', disabled: true },
      { label: '\u52a0\u76df\u6703\u54e1\u7248', disabled: true },
      { href: '/converter', label: '\u5c0a\u69ae\u5546\u7528\u7248' },
      { href: '/multi-agent/engine', label: '\u591a\u667a\u80fd\u9ad4MQL\u5168\u81ea\u52d5\u9032\u5316\u5f15\u64ce' },
      { href: '/control-room', label: 'Docker MCP\u4f3a\u670d\u5650\u7248(\u4f01\u696d\u79c1\u6709\u96f2)' },
    ],
  },
  { href: '/modular', label: '\u6a21\u7d44\u5316\u7a4d\u6728', matches: ['/modular'] },
  { href: '/line-kb', label: 'LINE \u77e5\u8b58\u5eab', matches: ['/line-kb'] },
  {
    label: '\u8a02\u95b1\u65b9\u6848',
    matches: ['/membership'],
    children: [
      { label: '\u6a19\u6e96\u6703\u54e1', disabled: true },
      { label: '\u52a0\u76df\u6703\u54e1', disabled: true },
      { label: '\u4f01\u696dVIP\u6703\u54e1', disabled: true },
    ],
  },
];

const footerLinks = [
  {
    title: 'Explore',
    links: [
      { href: '/', label: '\u9996\u9801' },
      { href: '/converter', label: 'AI\u91cd\u69cb\u5f15\u64ce' },
      { href: '/modular', label: '\u6a21\u7d44\u5316\u7a4d\u6728' },
    ],
  },
  {
    title: 'Journey',
    links: [
      { href: '/line-kb', label: 'LINE \u77e5\u8b58\u5eab' },
      { href: '/membership', label: '\u6a19\u6e96\u6703\u54e1' },
      { href: '/member', label: '\u6703\u54e1\u4e2d\u5fc3' },
    ],
  },
];

const languageTabs = [
  { href: '/en', locale: 'en', ariaLabel: 'English', match: '/en' },
  { href: '/zh-Hant', locale: 'zh-Hant', ariaLabel: '繁體中文', match: '/zh-Hant' },
  { href: '/zh-Hans', locale: 'zh-Hans', ariaLabel: '简体中文', match: '/zh-Hans' },
  { href: '/ja', locale: 'ja', ariaLabel: '日本語', match: '/ja' },
  { href: '/de', locale: 'de', ariaLabel: 'Deutsch', match: '/de' },
  { href: '/es', locale: 'es', ariaLabel: 'Español', match: '/es' },
];

function isNavItemActive(item, pathname) {
  const cleanPath = stripLocale(pathname);
  return item.matches?.some((prefix) => cleanPath.startsWith(prefix)) || false;
}


const navTranslations = {
  'zh-Hant': {
    groups: ['AI重構引擎', '模組化積木', 'Lab知識庫', '訂閱方案'],
    children: [['標準會員版', '加盟會員版', '尊爵商用版', '多智能體MQL全自動進化引擎', 'Docker MCP伺服噐版(企業私有雲)'], null, null, ['標準會員', '加盟會員', '企業VIP會員']],
    login: '登錄',
  },
  'zh-Hans': {
    groups: ['AI重构引擎', '模块化积木', 'Lab知识库', '订阅方案'],
    children: [['标准会员版', '加盟会员版', '尊爵商用版', '多智能体MQL全自动进化引擎', 'Docker MCP服务器版(企业私有云)'], null, null, ['标准会员', '加盟会员', '企业VIP会员']],
    login: '登录',
  },
  en: {
    groups: ['AI Refactoring', 'Modular Blocks', 'Lab Knowledge Base', 'Subscription Plans'],
    children: [['Standard Membership', 'Affiliate Membership', 'Premium Commercial', 'Multi-Agent MQL Evolution Engine', 'Docker MCP Server (Enterprise Private Cloud)'], null, null, ['Standard Membership', 'Affiliate Membership', 'Enterprise VIP']],
    login: 'LOGIN',
  },
};

Object.assign(navTranslations, {
  ja: { groups: ['AIリファクタリング', 'モジュール・ブロック', 'Labナレッジベース', 'サブスクリプション'], children: [['標準メンバーシップ', 'アフィリエイト会員', 'プレミアム商用版', 'マルチエージェントMQL自動進化エンジン', 'Docker MCPサーバー（企業プライベートクラウド）'], null, null, ['標準会員', 'アフィリエイト会員', '企業VIP会員']], login: 'ログイン' },
  de: { groups: ['KI-Refactoring', 'Modulare Bausteine', 'Lab-Wissensbasis', 'Abonnements'], children: [['Standardmitgliedschaft', 'Affiliate-Mitgliedschaft', 'Premium Commercial', 'Multi-Agent-MQL-Evolutionsengine', 'Docker-MCP-Server (Enterprise Private Cloud)'], null, null, ['Standardmitglied', 'Affiliate-Mitglied', 'Enterprise VIP']], login: 'ANMELDEN' },
  es: { groups: ['Refactorización con IA', 'Bloques modulares', 'Base de conocimiento Lab', 'Suscripciones'], children: [['Membresía estándar', 'Membresía afiliada', 'Comercial premium', 'Motor de evolución MQL multiagente', 'Servidor Docker MCP (nube privada empresarial)'], null, null, ['Miembro estándar', 'Miembro afiliado', 'VIP empresarial']], login: 'INICIAR SESIÓN' },
});
const footerTranslations = {
  'zh-Hant': {
    description: 'AI-Quant Lab 專注於把 MQL5 量化策略、AI 工作流與知識入口整合成一套好看、好讀、好行動的品牌體驗。',
    badge: '商業級 MT5 原始碼 (Source Code) 入口',
    tagline: 'AI-Quant Lab｜量化交易、MQL5 與 AI 工作流',
  },
  'zh-Hans': {
    description: 'AI-Quant Lab 专注于把 MQL5 量化策略、AI 工作流与知识入口整合成一套好看、好读、好行动的品牌体验。',
    badge: '商业级 MT5 原始码 (Source Code) 入口',
    tagline: 'AI-Quant Lab｜量化交易、MQL5 与 AI 工作流',
  },
  en: {
    description: 'AI-Quant Lab brings MQL5 quantitative strategies, AI workflows, and knowledge resources together in a clear, polished, action-oriented brand experience.',
    badge: 'Institutional MT5 Source Code',
    tagline: 'AI-Quant Lab | Quantitative Trading, MQL5, and AI Workflows',
  },
};

const footerLabels = {
  'zh-Hant': [
    ['探索', '首頁', 'AI 重構引擎', '模組化積木'],
    ['旅程', 'LINE 知識庫', '標準會員', '會員中心'],
  ],
  'zh-Hans': [
    ['探索', '首页', 'AI 重构引擎', '模块化积木'],
    ['旅程', 'LINE 知识库', '标准会员', '会员中心'],
  ],
  en: [
    ['Explore', 'Home', 'AI Refactoring Engine', 'Modular Blocks'],
    ['Journey', 'LINE Knowledge Base', 'Standard Membership', 'Member Center'],
  ],
};

function getFooterLinks(locale) {
  const labels = footerLabels[locale] || footerLabels.en;
  return footerLinks.map((group, groupIndex) => ({
    ...group,
    title: labels[groupIndex][0],
    links: group.links.map((link, linkIndex) => ({
      ...link,
      label: labels[groupIndex][linkIndex + 1],
    })),
  }));
}
function getLocalizedNavItems(locale) {
  const translation = navTranslations[locale] || navTranslations.en;
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
  return (navTranslations[locale] || navTranslations.en).login;
}
function LogoMark() {
  return (
    <div className="animate-badge-glow relative flex h-9 w-9 flex-none sm:h-10 sm:w-10 items-center justify-center overflow-hidden rounded-[1.25rem] border border-white/35 bg-gradient-to-br from-white via-cyan-100 to-cyan-400 px-2 py-1 text-[0.72rem] font-black leading-none tracking-[0.14em] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.22),0_0_22px_rgba(34,211,238,0.92),0_0_14px_rgba(59,130,246,0.52),inset_0_1px_0_rgba(255,255,255,0.95)] ring-2 ring-cyan-300/28">
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
  );
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
function useDropdownBoundary(open, setOpen) {
  const boundaryRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const closeOutside = (event) => {
      if (!boundaryRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointermove', closeOutside, true);
    return () => document.removeEventListener('pointermove', closeOutside, true);
  }, [open, setOpen]);

  return boundaryRef;
}
function LanguageMenu({ pathname, mobile = false }) {
  const [open, setOpen] = useState(false);
  const boundaryRef = useDropdownBoundary(open, setOpen);

  return (
    <details ref={boundaryRef} open={open} onPointerEnter={() => setOpen(true)} onPointerLeave={() => setOpen(false)} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onToggle={(event) => setOpen(event.currentTarget.open)} className={'group relative ' + (mobile ? 'w-full' : '')}>
      <summary className={'flex cursor-pointer list-none items-center justify-center gap-1.5 rounded-full border border-cyan-300/20 bg-slate-950/55 px-2.5 py-2 text-xs font-bold tracking-[0.1em] text-slate-200 shadow-[0_0_22px_rgba(34,211,238,0.14)] backdrop-blur-xl transition hover:border-cyan-300/45 hover:text-cyan-100 [&::-webkit-details-marker]:hidden ' + (mobile ? 'w-full min-h-11' : 'min-w-[5.6rem] max-sm:min-w-[4.5rem] max-sm:gap-1 max-sm:px-2 max-sm:py-1.5 max-sm:text-[11px]')}>
        <span aria-hidden="true" className="inline-flex h-9 w-9 items-center justify-center text-[23px] leading-none">🌐</span>
        <MenuDots />
      </summary>
      <div className={'site-dropdown-panel absolute right-0 top-full z-[1300] pt-2 ' + (mobile ? 'left-0' : '')}>
        <div className={'overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#020617] p-1.5 shadow-[0_0_28px_rgba(34,211,238,0.22)] ' + (mobile ? 'w-full' : 'w-16')}>
          {languageTabs.map((tab) => {
            const isActive = pathname.startsWith(tab.match);
            return (
              <Link key={tab.locale} href={localizePath(pathname || '/', tab.match.slice(1))} aria-label={tab.ariaLabel} title={tab.ariaLabel} className={'flex items-center justify-center rounded-xl px-2 py-2 text-xs font-bold tracking-[0.08em] transition ' + (isActive ? 'bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-slate-950 shadow-[0_0_16px_rgba(34,211,238,0.35)]' : 'text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-100')}>
                <FlagAvatar locale={tab.locale} />
                {isActive ? <span aria-hidden="true" className="text-[10px]">✓</span> : null}
              </Link>
            );
          })}
        </div>
      </div>
    </details>
  );
}
function DesktopNavItem({ item, pathname, locale }) {
  const [open, setOpen] = useState(false);
  const boundaryRef = useDropdownBoundary(open, setOpen);
  const isActive = isNavItemActive(item, pathname);
  const isAiMenu = item.children?.some((child) => child.href === '/multi-agent/engine');
  const baseClasses = 'text-slate-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_18px_rgba(34,211,238,0.18)]';
  const dotClasses = 'bg-cyan-400/65 group-hover:bg-cyan-200 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.65)]';

  if (!item.children) {
    return <Link href={localizePath(item.href, locale)} className={`group relative rounded-full px-4 py-2 transition-all duration-300 ${baseClasses}`}><span className="relative z-10 flex items-center gap-2"><span className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${dotClasses}`} /><span>{item.label}</span></span></Link>;
  }

  const menuWidth = item.label.includes('訂閱方案') || item.label.includes('订阅方案') || item.label === 'Subscription Plans' ? 'w-28' : (item.label.includes('AI重構引擎') || item.label.includes('AI重构引擎') || item.label === 'AI Refactoring' ? 'w-36' : 'w-56');
  return (
    <details ref={boundaryRef} open={open} onPointerEnter={() => setOpen(true)} onPointerLeave={() => setOpen(false)} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onToggle={(event) => setOpen(event.currentTarget.open)} className="group relative">
      <summary className={`flex cursor-pointer list-none items-center gap-1.5 rounded-full px-2.5 py-2 transition-all duration-300 [&::-webkit-details-marker]:hidden ${baseClasses}`}>
        <span className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${dotClasses}`} />
        <span>{item.label}</span>
        <MenuDots />
      </summary>
      <div className={`site-dropdown-panel absolute left-1/2 top-full z-[1300] -translate-x-1/2 pt-3 ${menuWidth}`}>
        <div className="overflow-hidden rounded-2xl border border-cyan-300/18 bg-[#020617] p-2 shadow-[0_0_28px_rgba(34,211,238,0.16)]">
          {item.children.map((child) => child.disabled || child.muted ? <span key={child.label} className={'flex items-center rounded-xl py-3 font-medium text-slate-500 ' + (isAiMenu ? 'px-3 text-[12px] leading-4 whitespace-normal break-words' : 'px-4 text-sm')}>{child.label}</span> : <Link key={child.label} href={localizePath(child.href, locale) + (child.href === '/converter' ? '#converter-top' : '')} target={child.newTab ? '_blank' : undefined} rel={child.newTab ? 'noopener noreferrer' : undefined} onClick={() => { setOpen(false); window.scrollTo(0, 0); window.setTimeout(() => window.scrollTo(0, 0), 120); }} className={'flex items-center rounded-xl py-3 font-medium text-slate-300 transition hover:bg-cyan-500/10 hover:text-cyan-200 ' + (isAiMenu ? 'px-3 text-[12px] leading-4 whitespace-normal break-words' : 'px-4 text-sm')}>{child.label}</Link>)}
        </div>
      </div>
    </details>
  );
}
function MobileNavItem({ item, pathname, locale, onNavigate }) {
  const isActive = isNavItemActive(item, pathname);
  const [expanded, setExpanded] = useState(false);


  if (!item.children) {
    return (
      <Link
        href={localizePath(item.href, locale)}
        className={"rounded-xl border px-4 py-3 transition " + (
          isActive
            ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.12)]"
            : "border-slate-800 bg-slate-900/70 hover:border-cyan-400/30 hover:text-cyan-300"
        )}
        onClick={onNavigate}
      >
        {item.label}
      </Link>
    );
  }

  const submenuId = 'site-mobile-submenu-' + item.label.replace(/\s+/g, '-');

  return (
    <div
      className={"rounded-2xl border px-4 py-3 transition " + (
        isActive
          ? "border-cyan-400/35 bg-cyan-500/10 shadow-[0_0_18px_rgba(34,211,238,0.12)]"
          : "border-slate-800 bg-slate-900/70"
      )}
    >
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={submenuId}
        className="flex min-h-12 w-full items-center justify-between text-left text-sm font-semibold text-slate-200"
        onClick={() => setExpanded((open) => !open)}
      >
        <span>{item.label}</span>
        <MenuDots />
      </button>
      <div
        id={submenuId}
        className={"grid overflow-hidden pl-2 transition-[max-height,opacity] duration-200 " + (
          expanded ? "mt-2 max-h-96 gap-2 opacity-100" : "max-h-0 gap-0 opacity-0"
        )}
      >
        {item.children.map((child) =>
          child.disabled || child.muted ? (
            <span
              key={child.label}
              className="rounded-xl border border-slate-800/60 bg-slate-950/65 px-3 py-2.5 text-sm text-slate-500"
            >
              {child.label}
            </span>
          ) : (
            <Link
              key={child.label}
              href={localizePath(child.href, locale) + (child.href === '/converter' ? '#converter-top' : '')}
              target={child.newTab ? '_blank' : undefined}
              rel={child.newTab ? 'noopener noreferrer' : undefined}
              className="rounded-xl border border-slate-800 bg-slate-950/75 px-3 py-2.5 text-sm text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-200"
              onClick={() => { setExpanded(false); onNavigate(); window.scrollTo(0, 0); window.setTimeout(() => window.scrollTo(0, 0), 120); }}
            >
              {child.label}
            </Link>
          ),
        )}
      </div>
    </div>
  );
}

export default function SiteChrome({ children }) {
  const pathname = usePathname() || '/';
  const isNoticeDividerRoute =
    pathname.endsWith('/multi-agent/engine') ||
    pathname.endsWith('/converter') ||
    pathname.endsWith('/control-room');
  const locale = getLocaleFromPath(pathname);
  const footerText = footerTranslations[locale] || footerTranslations.en;
  const localizedNavItems = getLocalizedNavItems(locale);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) return undefined;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileNavOpen]);

  if (homeRoutes.has(pathname)) {
    return children;
  }


  return (
    <div className="relative flex min-h-screen flex-col text-slate-100">
      <header data-site-header
        className={`fixed inset-x-0 top-0 z-[1000] isolate ${isNoticeDividerRoute ? 'border-b !border-transparent' : 'border-b'} transition-all duration-300 max-sm:!bg-transparent max-sm:!backdrop-blur-0 ${
          scrolled
            ? 'border-slate-700/10 bg-slate-950/05 sm:backdrop-blur-[22px] supports-[backdrop-filter]:bg-slate-950/[0.03]'
            : 'border-slate-800/14 bg-slate-950/10 sm:backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/06'
        }`}
      >
        <div className="flex h-14 w-full min-w-0 max-w-none items-center justify-between bg-slate-950/80 px-3 backdrop-blur-md sm:h-16 sm:bg-transparent sm:px-4 sm:backdrop-blur-0 lg:px-5">
          <Link href={localizePath('/', locale)} className="flex min-w-0 shrink items-center gap-2 sm:gap-3">
            <LogoMark />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-[clamp(0.8rem,4.3vw,1.25rem)] font-black leading-none whitespace-nowrap tracking-wide text-transparent sm:text-xl drop-shadow-[0_0_16px_rgba(34,211,238,0.34)]">
              AI-Quant Lab
            </span>
            <span className="inline-flex shrink-0 items-center rounded-full border border-amber-100/70 bg-amber-300 px-1.5 py-1 text-[8px] font-black leading-none tracking-[0.04em] text-amber-950 shadow-[0_0_14px_rgba(252,211,77,0.48)] sm:px-2.5 sm:text-[10px]">
              <span className="sm:hidden">Beta</span><span className="hidden sm:inline">{locale === 'en' ? 'Beta Testing' : 'Beta版測試'}</span>
            </span>
          </Link>

          <div className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-3 lg:gap-5">
            <nav className="hidden items-center gap-2 text-sm font-medium md:flex">
              {localizedNavItems.map((item) => (
                <DesktopNavItem key={item.label} item={item} pathname={pathname} locale={locale} />
              ))}
            </nav>

            <LanguageMenu pathname={pathname} />

            <Link
              href={localizePath('/sign-in', locale)}
              className="btn-pulse shrink-0 whitespace-nowrap rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-2.5 py-2 text-[11px] font-bold text-slate-950 sm:px-3.5 sm:text-[12px] shadow-lg shadow-cyan-500/20 transition hover:from-cyan-400 hover:to-blue-500"
>{getLoginLabel(locale)}</Link>

            <button
              type="button"
              className="btn-pulse ml-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg sm:h-10 sm:w-10 border border-slate-700 bg-slate-900 text-slate-100 transition hover:border-cyan-400/40 hover:text-cyan-300 md:hidden"
              aria-label={mobileNavOpen ? '\u95dc\u9589\u9078\u55ae' : '\u958b\u555f\u9078\u55ae'}
              aria-expanded={mobileNavOpen}
              aria-controls="site-mobile-nav"
              onClick={() => setMobileNavOpen((open) => !open)}
            >
              <span className="sr-only">{mobileNavOpen ? '\u95dc\u9589\u9078\u55ae' : '\u958b\u555f\u9078\u55ae'}</span>
              <span className="flex flex-col gap-1.5">
                <span className="h-0.5 w-5 rounded-full bg-current" />
                <span className="h-0.5 w-5 rounded-full bg-current" />
                <span className="h-0.5 w-5 rounded-full bg-current" />
              </span>
            </button>
          </div>
        </div>

        <div
          id="site-mobile-nav"
          className={`relative z-[1100] ml-auto w-1/2 max-w-[22rem] overflow-hidden rounded-b-2xl border-b border-l border-t border-slate-800/40 bg-slate-950/98 px-3 transition-[max-height,opacity,transform] duration-200 ease-out md:hidden ${
            mobileNavOpen
              ? 'max-h-[min(34rem,calc(100vh-5.5rem))] translate-y-0 py-4 opacity-100'
              : 'max-h-0 -translate-y-1 py-0 opacity-0'
          }`}
        >

          <div className="grid gap-2 text-sm font-medium text-slate-300">
            {localizedNavItems.map((item) => (
              <MobileNavItem
                key={item.label + "-" + (mobileNavOpen ? "open" : "closed")}
                item={item}
                pathname={pathname}
                locale={locale}
                onNavigate={() => setMobileNavOpen(false)}
              />
            ))}
          </div>
        </div>
      </header>

      <div className="flex-1 pt-20">{children}</div>

      <footer className="relative z-10 mt-12 overflow-hidden border-t border-slate-900 bg-slate-950/95 backdrop-blur-sm">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_32%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.08),transparent_34%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <LogoMark />
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-lg font-black tracking-wide text-transparent">
                  AI-Quant Lab
                </span>
              </div>
              <p className="max-w-md text-sm leading-7 text-slate-400">
                {footerText.description}
              </p>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-300">
                {footerText.badge}
              </div>
            </div>

            {getFooterLinks(locale).map((group) => (
              <div key={group.title} className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">{group.title}</h3>
                <ul className="space-y-3 text-sm text-slate-400">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={localizePath(link.href, locale)} className="transition hover:text-cyan-300">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-slate-800/80 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>&copy; 2026 AI-Quant Lab. All rights reserved.</span>
            <span>{footerText.tagline}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
