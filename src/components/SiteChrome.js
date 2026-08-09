'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { getLocaleFromPath, localizePath, localeLabels, siteLocales } from '../lib/locale';

const navigation = [
  ['/converter', 'AI Engine'],
  ['/modular', 'Modules'],
  ['/line-kb', 'Knowledge Base'],
  ['/membership', 'Membership'],
];

const copy = {
  en: { login: 'Login', description: 'Quantitative trading, MQL5, and AI workflows.' },
  ja: { login: 'Login', description: 'Quantitative trading, MQL5, and AI workflows.' },
  de: { login: 'Anmelden', description: 'Quantitative trading, MQL5, and AI workflows.' },
  es: { login: 'Acceder', description: 'Quantitative trading, MQL5, and AI workflows.' },
};

export default function SiteChrome({ children }) {
  const pathname = usePathname() || '/en';
  const locale = getLocaleFromPath(pathname);
  const text = copy[locale] || copy.en;
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Link href={localizePath('/', locale)} className="font-black tracking-wide text-cyan-300">AI-Quant Lab</Link>
          <nav className="hidden flex-1 items-center justify-center gap-5 text-sm text-slate-300 md:flex">
            {navigation.map(([href, label]) => <Link key={href} href={localizePath(href, locale)} className="transition hover:text-cyan-200">{label}</Link>)}
          </nav>
          <div className="relative ml-auto">
            <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-bold text-slate-100">
              {localeLabels[locale] || 'English'}
            </button>
            {open ? <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-700 bg-slate-900 p-1 shadow-xl">
              {siteLocales.map((code) => <Link key={code} href={localizePath(pathname, code)} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-cyan-400/10">{localeLabels[code]}</Link>)}
            </div> : null}
          </div>
          <Link href={localizePath('/sign-in', locale)} className="hidden rounded-lg bg-cyan-300 px-3 py-2 text-xs font-bold text-slate-950 sm:block">{text.login}</Link>
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <footer className="border-t border-slate-800 px-5 py-8 text-center text-sm text-slate-400">© 2026 AI-Quant Lab · {text.description}</footer>
    </div>
  );
}