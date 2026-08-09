const flags = {
  en: (
    <svg viewBox="0 0 30 20" aria-hidden="true" className="h-full w-full"><rect width="30" height="20" fill="#fff" /><path d="M0 0h30M0 4h30M0 8h30M0 12h30M0 16h30" stroke="#b22234" strokeWidth="2" /><rect width="13" height="11" fill="#3c3b6e" /></svg>
  ),
  'zh-Hant': (
    <svg viewBox="0 0 30 20" aria-hidden="true" className="h-full w-full"><rect width="30" height="20" fill="#de2910" /><rect width="13" height="11" fill="#192f6b" /><circle cx="6.5" cy="5.5" r="3" fill="#fff" /></svg>
  ),
  'zh-Hans': (
    <svg viewBox="0 0 30 20" aria-hidden="true" className="h-full w-full"><rect width="30" height="20" fill="#de2910" /><path d="M6 3l.9 2.7H10L7.5 7.3l.9 2.7L6 8.4 3.6 10l.9-2.7L2 5.7h3.1z" fill="#ffde00" /></svg>
  ),
  ja: (
    <svg viewBox="0 0 30 20" aria-hidden="true" className="h-full w-full"><rect width="30" height="20" fill="#fff" /><circle cx="15" cy="10" r="5.5" fill="#bc002d" /></svg>
  ),
  de: (
    <svg viewBox="0 0 30 20" aria-hidden="true" className="h-full w-full"><rect width="30" height="6.67" fill="#111" /><rect y="6.67" width="30" height="6.67" fill="#dd0000" /><rect y="13.34" width="30" height="6.66" fill="#ffce00" /></svg>
  ),
  es: (
    <svg viewBox="0 0 30 20" aria-hidden="true" className="h-full w-full"><rect width="30" height="20" fill="#f1bf00" /><rect width="30" height="5" fill="#aa151b" /><rect y="15" width="30" height="5" fill="#aa151b" /></svg>
  ),
};

export default function FlagAvatar({ locale, className = '' }) {
  return <span aria-hidden="true" className={`inline-flex h-5 w-7 flex-none overflow-hidden rounded-sm border border-cyan-200/35 shadow-[0_0_8px_rgba(34,211,238,0.16)] ${className}`}>{flags[locale] || flags.en}</span>;
}
