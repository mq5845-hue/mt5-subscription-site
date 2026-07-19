'use client';

import { useState } from 'react';

const providers = [
  { value: 'openai', company: 'OpenAI', mark: 'OA', tone: 'text-emerald-200 border-emerald-300/25 bg-emerald-300/8' },
  { value: 'anthropic', company: 'Anthropic', mark: 'AN', tone: 'text-orange-200 border-orange-300/25 bg-orange-300/8' },
  { value: 'google', company: 'Google DeepMind', mark: 'GD', tone: 'text-blue-200 border-blue-300/25 bg-blue-300/8' },
  { value: 'xai', company: 'xAI', mark: 'xAI', tone: 'text-slate-200 border-slate-300/25 bg-slate-300/8' },
  { value: 'meta', company: 'Meta AI', mark: 'ME', tone: 'text-sky-200 border-sky-300/25 bg-sky-300/8' },
  { value: 'mistral', company: 'Mistral AI', mark: 'MI', tone: 'text-amber-200 border-amber-300/25 bg-amber-300/8' },
  { value: 'deepseek', company: 'DeepSeek', mark: 'DS', tone: 'text-indigo-200 border-indigo-300/25 bg-indigo-300/8' },
  { value: 'qwen', company: 'Alibaba Cloud · Qwen', mark: 'QW', tone: 'text-violet-200 border-violet-300/25 bg-violet-300/8' },
  { value: 'cohere', company: 'Cohere', mark: 'CO', tone: 'text-fuchsia-200 border-fuchsia-300/25 bg-fuchsia-300/8' },
  { value: 'perplexity', company: 'Perplexity AI', mark: 'PX', tone: 'text-cyan-200 border-cyan-300/25 bg-cyan-300/8' },
  { value: 'groq', company: 'Groq', mark: 'GQ', tone: 'text-rose-200 border-rose-300/25 bg-rose-300/8' },
  { value: 'openrouter', company: 'OpenRouter', mark: 'OR', tone: 'text-lime-200 border-lime-300/25 bg-lime-300/8' },
  { value: 'custom', company: '自架／OpenAI 相容端點', mark: '◎', tone: 'text-slate-300 border-slate-500/30 bg-slate-500/8' },
];

function canHover() {
  return typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

export default function LlmProviderHoverPicker({ value, onChange, copy }) {
  const [open, setOpen] = useState(false);
  const selected = providers.find((provider) => provider.value === value) || providers[0];

  function choose(provider) {
    onChange(provider.value);
    setOpen(false);
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => { if (canHover()) setOpen(true); }}
      onMouseLeave={() => { if (canHover()) setOpen(false); }}
      onFocus={() => { if (canHover()) setOpen(true); }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setOpen(false);
      }}
    >
      <span className="mb-2 flex items-center justify-between font-mono text-[9px] font-black tracking-[0.14em] text-slate-600">
        <span>LLM PROVIDER</span><span className="text-fuchsia-300/70">{copy.hover}</span>
      </span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          if (canHover()) {
            setOpen(true);
            return;
          }
          setOpen((current) => !current);
        }}
        className={`flex h-12 w-full items-center justify-between gap-3 rounded-xl border bg-slate-950/85 px-3 text-left outline-none transition ${open ? 'border-fuchsia-300/55 ring-2 ring-fuchsia-300/10' : 'border-slate-700 hover:border-fuchsia-300/35'}`}
      >
        <span className="flex min-w-0 items-center gap-2.5"><span className={`flex h-7 min-w-7 items-center justify-center rounded-lg border px-1.5 font-mono text-[8px] font-black ${selected.tone}`}>{selected.mark}</span><span className="truncate text-sm font-semibold text-slate-200">{selected.value === 'custom' ? copy.custom : selected.company}</span></span>
        <span aria-hidden="true" className={`text-[10px] text-slate-500 transition ${open ? 'rotate-180 text-fuchsia-300' : ''}`}>▼</span>
      </button>

      <div
        role="listbox"
        aria-label={copy.chooseCompany}
        style={{ left: 0, right: 0, width: 'auto', maxWidth: 'none' }}
        className={`absolute top-full z-[80] origin-top-left overflow-hidden rounded-2xl border border-fuchsia-300/20 bg-slate-950/98 p-2 shadow-[0_30px_90px_rgba(2,6,23,0.78),0_0_50px_rgba(217,70,239,0.1)] backdrop-blur-2xl transition duration-200 ${open ? 'pointer-events-auto translate-y-0 scale-100 opacity-100' : 'pointer-events-none -translate-y-2 scale-[0.98] opacity-0'}`}
      >
        <div className="mb-2 flex items-center justify-between border-b border-slate-800 px-2 pb-2"><span className="font-mono text-[9px] font-black tracking-[0.16em] text-fuchsia-300">SELECT AI COMPANY</span><span className="text-[9px] text-slate-600">{copy.hover}</span></div>
        <div style={{ gridTemplateColumns: 'minmax(0, 1fr)' }} className="grid max-h-80 gap-1 overflow-y-auto">
          {providers.map((provider) => {
            const active = provider.value === value;
            return (
              <button
                key={provider.value}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => choose(provider)}
                className={`group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition ${active ? 'border-fuchsia-300/35 bg-fuchsia-300/10' : 'border-transparent hover:border-slate-700 hover:bg-slate-900'}`}
              >
                <span className={`flex h-8 min-w-8 items-center justify-center rounded-lg border px-1.5 font-mono text-[8px] font-black ${provider.tone}`}>{provider.mark}</span>
                <span className={`min-w-0 flex-1 truncate text-xs font-semibold ${active ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>{provider.value === 'custom' ? copy.custom : provider.company}</span>
                {active ? <span className="text-xs text-fuchsia-300">✓</span> : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
