'use client';

import { useMemo, useState } from 'react';
import LlmProviderHoverPicker from '@/components/LlmProviderHoverPicker';
import LlmModelHoverPicker from '@/components/LlmModelHoverPicker';
import { getMqlEngineCopy } from '@/lib/mqlEngineI18n';

function EyeIcon({ hidden }) {
  return (
    <span aria-hidden="true" className="relative block h-4 w-6">
      <span className="absolute left-0 top-1 h-3 w-6 rounded-[50%] border border-current" />
      <span className="absolute left-[9px] top-[7px] h-1.5 w-1.5 rounded-full bg-current" />
      {hidden ? <span className="absolute left-0 top-2 h-px w-6 -rotate-45 bg-current" /> : null}
    </span>
  );
}

export default function PrivateLlmVault({ locale = 'en' }) {
  const c = getMqlEngineCopy(locale).vault;
  const [provider, setProvider] = useState('openai');
  const [model, setModel] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [visible, setVisible] = useState(false);
  const [customEndpoint, setCustomEndpoint] = useState('');

  const keyState = useMemo(() => {
    if (!apiKey) return { label: c.unset, color: 'text-slate-600', live: false };
    if (apiKey.length < 12) return { label: c.review, color: 'text-amber-300', live: false };
    return { label: c.loaded, color: 'text-emerald-300', live: true };
  }, [apiKey, c]);

  function clearSecrets() {
    setApiKey('');
    setVisible(false);
    setCustomEndpoint('');
  }

  return (
    <section aria-labelledby="llm-vault-title" className="relative z-30 mt-5 overflow-visible rounded-[1.5rem] border border-fuchsia-300/20 bg-[radial-gradient(circle_at_0%_0%,rgba(217,70,239,0.12),transparent_30%),radial-gradient(circle_at_100%_100%,rgba(34,211,238,0.08),transparent_30%),rgba(3,6,17,0.78)] shadow-[0_20px_80px_rgba(2,6,23,0.5)] backdrop-blur-2xl">
      <div aria-hidden="true" className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-300/70 to-transparent" />
      <div className="grid gap-6 p-5 sm:p-6 xl:grid-cols-[0.72fr_1.28fr] xl:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/25 bg-fuchsia-300/8 px-3 py-1.5 font-mono text-[9px] font-black tracking-[0.18em] text-fuchsia-200"><span className="h-1.5 w-1.5 rounded-full bg-fuchsia-300 shadow-[0_0_12px_rgba(232,121,249,0.9)]" /> PRIVATE LLM VAULT</span>
            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/5 px-3 py-1.5 font-mono text-[9px] font-black tracking-[0.15em] text-emerald-200">MEMORY ONLY</span>
          </div>
          <h2 id="llm-vault-title" className="mt-4 text-2xl font-black tracking-tight text-white">{c.title}</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">{c.body}</p>
          <div className="mt-4 flex items-center gap-2 font-mono text-[10px]"><span className={`h-1.5 w-1.5 rounded-full ${keyState.live ? 'bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]' : 'bg-slate-700'}`} /><span className={keyState.color}>{keyState.label}</span></div>
        </div>

        <div className="grid gap-3 lg:grid-cols-[0.8fr_1fr_1.55fr_auto] lg:items-end">
          <LlmProviderHoverPicker value={provider} onChange={setProvider} copy={c} locale={locale} />

          <LlmModelHoverPicker provider={provider} value={model} onChange={setModel} copy={c} locale={locale} />

          <label className="block">
            <span className="mb-2 flex items-center justify-between font-mono text-[9px] font-black tracking-[0.14em] text-slate-600"><span>ENCRYPTED API KEY INPUT</span><span>NEVER LOGGED</span></span>
            <span className="relative block">
              <input type={visible ? 'text' : 'password'} value={apiKey} onChange={(event) => setApiKey(event.target.value)} placeholder={c.placeholder} autoComplete="new-password" autoCapitalize="none" autoCorrect="off" spellCheck={false} data-1p-ignore="true" data-lpignore="true" className="h-12 w-full rounded-xl border border-slate-700 bg-slate-950/85 px-4 pr-14 font-mono text-xs tracking-[0.08em] text-fuchsia-100 outline-none transition placeholder:tracking-normal placeholder:text-slate-700 focus:border-fuchsia-300/55 focus:ring-2 focus:ring-fuchsia-300/10" />
              <button type="button" onClick={() => setVisible((value) => !value)} aria-label={visible ? c.hide : c.show} aria-pressed={visible} className="absolute right-2 top-1/2 flex h-9 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-800 hover:text-fuchsia-200 focus-visible:outline-2 focus-visible:outline-fuchsia-300"><EyeIcon hidden={!visible} /></button>
            </span>
          </label>

          <button type="button" onClick={clearSecrets} disabled={!apiKey && !customEndpoint} className="h-12 rounded-xl border border-slate-700 bg-slate-900/80 px-4 text-xs font-bold text-slate-400 transition hover:border-rose-300/35 hover:text-rose-200 disabled:cursor-not-allowed disabled:opacity-40">{c.clear}</button>
        </div>
      </div>

      {provider === 'custom' ? (
        <div className="border-t border-slate-800/80 px-5 py-4 sm:px-6">
          <label className="grid gap-2 sm:grid-cols-[11rem_1fr] sm:items-center"><span className="font-mono text-[9px] font-black tracking-[0.14em] text-slate-600">PRIVATE BASE URL</span><input type="url" value={customEndpoint} onChange={(event) => setCustomEndpoint(event.target.value)} placeholder="https://your-private-endpoint.example/v1" autoComplete="off" spellCheck={false} className="h-11 rounded-xl border border-slate-700 bg-slate-950/85 px-4 font-mono text-xs text-slate-200 outline-none transition placeholder:text-slate-700 focus:border-cyan-300/50" /></label>
        </div>
      ) : null}

      <div className="grid border-t border-slate-800/80 bg-slate-950/55 text-[10px] text-slate-500 sm:grid-cols-3">
        {c.privacy.map(([title, text], index) => <div key={title} className={`px-5 py-3 ${index < 2 ? 'border-b border-slate-800 sm:border-b-0 sm:border-r' : ''}`}><strong className="text-slate-300">{title}</strong><span className="ml-2">{text}</span></div>)}
      </div>

      <div className="border-t border-amber-300/15 bg-amber-300/[0.035] px-5 py-3 text-[10px] leading-5 text-amber-100/65 sm:px-6"><strong className="text-amber-300">{c.safetyTitle}</strong>{c.safety}</div>
    </section>
  );
}
