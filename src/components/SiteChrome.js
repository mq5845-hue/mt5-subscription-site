'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getLocaleFromPath, localizePath, stripLocale } from '@/lib/locale';

const homeRoutes = new Set(['/', '/zh-Hant', '/zh-Hans', '/en']);

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
  { href: '/en', label: 'EN', match: '/en' },
  { href: '/zh-Hant', label: '繁中', match: '/zh-Hant' },
  { href: '/zh-Hans', label: '简中', match: '/zh-Hans' },
];

function isNavItemActive(item, pathname) {
  const cleanPath = stripLocale(pathname);
  return item.matches?.some((prefix) => cleanPath.startsWith(prefix)) || false;
}


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
function LogoMark() {
  return (
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
function DesktopNavItem({ item, pathname, locale }) {
  const isActive = isNavItemActive(item, pathname);
  const baseClasses = isActive
    ? 'bg-cyan-500/12 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.18)]'
    : 'text-slate-400 hover:text-cyan-300';
  const dotClasses = isActive
    ? 'bg-cyan-200 shadow-[0_0_12px_rgba(165,243,252,0.95)]'
    : 'bg-cyan-400/65 group-hover:bg-cyan-200 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.65)]';

  if (!item.children) {
    return (
      <Link
        href={localizePath(item.href, locale)}
        className={`group relative rounded-full px-4 py-2 transition-all duration-300 ${baseClasses}`}
      >
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
              <span
                key={child.label}
                className="flex items-center rounded-xl px-4 py-3 text-sm font-medium text-slate-500"
              >
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

function MobileNavItem({ item, pathname, locale, onNavigate }) {
  const isActive = isNavItemActive(item, pathname);

  if (!item.children) {
    return (
      <Link
        href={localizePath(item.href, locale)}
        className={`rounded-xl border px-4 py-3 transition ${
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
    </div>
  );
}

export default function SiteChrome({ children }) {
  const pathname = usePathname() || '/';
  const locale = getLocaleFromPath(pathname);
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
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 max-sm:bg-slate-950/92 max-sm:backdrop-blur-md ${
          scrolled
            ? 'border-slate-700/10 bg-slate-950/05 backdrop-blur-[22px] supports-[backdrop-filter]:bg-slate-950/[0.03]'
            : 'border-slate-800/14 bg-slate-950/10 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/06'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href={localizePath('/', locale)} className="flex items-center gap-3">
            <LogoMark />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-xl font-black tracking-wide text-transparent drop-shadow-[0_0_16px_rgba(34,211,238,0.34)]">
              AI-Quant Lab
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <nav className="hidden items-center gap-2 text-sm font-medium md:flex">
              {localizedNavItems.map((item) => (
                <DesktopNavItem key={item.label} item={item} pathname={pathname} locale={locale} />
              ))}
            </nav>

            <LanguageMenu pathname={pathname} />

            <Link
              href={localizePath('/sign-in', locale)}
              className="btn-pulse shrink-0 whitespace-nowrap rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3.5 py-2 text-[12px] font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:from-cyan-400 hover:to-blue-500"
>{getLoginLabel(locale)}</Link>

            <button
              type="button"
              className="btn-pulse ml-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-100 transition hover:border-cyan-400/40 hover:text-cyan-300 md:hidden"
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
          className={`overflow-hidden border-t border-slate-800/40 bg-slate-950/95 px-4 transition-[max-height,opacity,transform] duration-200 ease-out md:hidden ${
            mobileNavOpen
              ? 'max-h-[min(34rem,calc(100vh-5.5rem))] translate-y-0 py-4 opacity-100'
              : 'max-h-0 -translate-y-1 py-0 opacity-0'
          }`}
        >

          <div className="grid gap-2 text-sm font-medium text-slate-300">
            {localizedNavItems.map((item) => (
              <MobileNavItem
                key={item.label}
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
                {'AI-Quant Lab \u5c08\u6ce8\u65bc\u628a MQL5 \u91cf\u5316\u7b56\u7565\u3001AI \u5de5\u4f5c\u6d41\u8207\u77e5\u8b58\u5165\u53e3\u6574\u5408\u6210\u4e00\u5957\u597d\u770b\u3001\u597d\u8b80\u3001\u597d\u884c\u52d5\u7684\u54c1\u724c\u9ad4\u9a57\u3002'}
              </p>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-300">
                {'\u5546\u696d\u7d1a MT5 \u539f\u59cb\u78bc (Source Code) \u5165\u53e3'}
              </div>
            </div>

            {footerLinks.map((group) => (
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
            <span>{'AI-Quant Lab \uff5c\u91cf\u5316\u4ea4\u6613\u3001MQL5 \u8207 AI \u5de5\u4f5c\u6d41'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
