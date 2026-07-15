const tones = {
  cyan: 'border-cyan-300/20 bg-cyan-300/10 shadow-[0_0_14px_rgba(34,211,238,0.14)]',
  violet: 'border-violet-300/20 bg-violet-300/10 shadow-[0_0_14px_rgba(139,92,246,0.14)]',
  emerald: 'border-emerald-300/20 bg-emerald-300/10 shadow-[0_0_14px_rgba(52,211,153,0.14)]',
  amber: 'border-amber-300/20 bg-amber-300/10 shadow-[0_0_14px_rgba(251,191,36,0.14)]',
  rose: 'border-rose-300/20 bg-rose-300/10 shadow-[0_0_14px_rgba(251,113,133,0.14)]',
};

export default function EmojiAvatar({ emoji, tone = 'cyan', className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-6 w-6 flex-none items-center justify-center rounded-lg border text-[13px] leading-none transition-transform duration-300 group-hover:scale-110 ${tones[tone] || tones.cyan} ${className}`}
    >
      {emoji}
    </span>
  );
}
