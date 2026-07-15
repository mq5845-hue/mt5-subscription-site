'use client';

import { useEffect, useMemo, useState } from 'react';

const modelCatalog = {
  openai: [
    ['gpt-5.2', 'GPT-5.2', '通用推理與代理工作'],
    ['gpt-5.1', 'GPT-5.1', '程式設計與 Agent 任務'],
    ['gpt-5-mini', 'GPT-5 mini', '快速、成本平衡'],
    ['gpt-5-nano', 'GPT-5 nano', '高頻輕量任務'],
    ['gpt-4.1', 'GPT-4.1', '非推理通用模型'],
    ['o3', 'o3', '複雜推理'],
    ['o4-mini', 'o4-mini', '快速推理'],
  ],
  anthropic: [
    ['claude-opus-4-8', 'Claude Opus 4.8', '複雜代理編程與企業任務'],
    ['claude-sonnet-5', 'Claude Sonnet 5', '速度與智能平衡'],
    ['claude-sonnet-4-6', 'Claude Sonnet 4.6', '日常代理與程式工作'],
    ['claude-haiku-4-5', 'Claude Haiku 4.5', '低延遲、高吞吐'],
  ],
  google: [
    ['gemini-3.5-flash', 'Gemini 3.5 Flash', 'Agent 與 coding 穩定模型'],
    ['gemini-3.1-pro-preview', 'Gemini 3.1 Pro', '進階多模態推理'],
    ['gemini-3.1-flash-lite', 'Gemini 3.1 Flash-Lite', '高頻率、低成本'],
    ['gemini-2.5-flash', 'Gemini 2.5 Flash', '低延遲通用任務'],
    ['gemini-2.5-flash-lite', 'Gemini 2.5 Flash-Lite', '輕量高吞吐'],
  ],
  xai: [
    ['grok-4.5', 'Grok 4.5', 'coding、agent 與知識工作'],
    ['grok-4.3', 'Grok 4.3', '長上下文通用任務'],
    ['grok-build-0.1', 'Grok Build 0.1', '代理式程式開發'],
    ['grok-4.20-multi-agent-0309', 'Grok 4.20 Multi-Agent', '多智能體工作流'],
    ['grok-4.20-0309-reasoning', 'Grok 4.20 Reasoning', '深度推理'],
  ],
  meta: [
    ['meta-llama/llama-4-scout-17b-16e-instruct', 'Llama 4 Scout', '多模態、長上下文'],
    ['llama-3.3-70b-versatile', 'Llama 3.3 70B', '通用開源模型'],
    ['llama-3.1-8b-instant', 'Llama 3.1 8B Instant', '快速輕量'],
  ],
  mistral: [
    ['mistral-large-latest', 'Mistral Large 3', '高階通用多模態'],
    ['mistral-medium-latest', 'Mistral Medium 3.1', '品質與成本平衡'],
    ['mistral-small-latest', 'Mistral Small 3.2', '快速通用任務'],
    ['devstral-latest', 'Devstral 2', '代理式軟件工程'],
    ['codestral-latest', 'Codestral', '程式碼生成與補全'],
  ],
  deepseek: [
    ['deepseek-chat', 'DeepSeek Chat / V3', '通用與程式任務'],
    ['deepseek-reasoner', 'DeepSeek Reasoner / R1', '深度推理'],
    ['deepseek-v3-0324', 'DeepSeek V3 0324', '工具使用與前端開發'],
  ],
  qwen: [
    ['qwen3.7-max', 'Qwen 3.7 Max', '旗艦複雜任務'],
    ['qwen3.7-plus', 'Qwen 3.7 Plus', '高品質通用任務'],
    ['qwen3.6-flash', 'Qwen 3.6 Flash', '低延遲高吞吐'],
    ['qwen-plus', 'Qwen Plus', '穩定通用 API'],
    ['qwen3-coder', 'Qwen Coder', '程式設計與 Agent'],
  ],
  cohere: [
    ['command-a-03-2025', 'Command A', '企業 Agent 與工具使用'],
    ['command-r-plus', 'Command R+', 'RAG 與企業工作負載'],
    ['command-r', 'Command R', '檢索增強生成'],
    ['command-r7b-12-2024', 'Command R7B', '輕量高效率'],
  ],
  perplexity: [
    ['sonar', 'Sonar', '網路檢索與引用'],
    ['sonar-pro', 'Sonar Pro', '進階研究與問答'],
    ['sonar-deep-research', 'Sonar Deep Research', '多步驟深度研究'],
  ],
  groq: [
    ['groq/compound', 'Groq Compound', '工具整合 AI 系統'],
    ['groq/compound-mini', 'Groq Compound Mini', '快速工具工作流'],
    ['openai/gpt-oss-120b', 'GPT-OSS 120B', '大型開放權重推理'],
    ['openai/gpt-oss-20b', 'GPT-OSS 20B', '快速開放權重模型'],
    ['qwen/qwen3-32b', 'Qwen3 32B', '推理與平行工具'],
    ['llama-3.3-70b-versatile', 'Llama 3.3 70B', '通用高效能'],
  ],
  openrouter: [
    ['openrouter/auto', 'Auto Router', '自動選擇合適模型'],
    ['openai/gpt-5.2', 'OpenAI · GPT-5.2', 'OpenRouter 路由'],
    ['anthropic/claude-sonnet-4-6', 'Anthropic · Claude Sonnet 4.6', 'OpenRouter 路由'],
    ['google/gemini-3-flash-preview', 'Google · Gemini 3 Flash', 'OpenRouter 路由'],
    ['custom-openrouter-model', '其他 OpenRouter 模型', '使用完整模型 slug'],
  ],
  custom: [
    ['custom-model-id', '自訂模型 ID', '由私人端點提供'],
    ['models-list-endpoint', '從 /v1/models 取得', '正式串接時動態載入'],
  ],
};

function canHover() {
  return typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

export default function LlmModelHoverPicker({ provider, value, onChange, copy, locale }) {
  const [open, setOpen] = useState(false);
  const models = useMemo(() => modelCatalog[provider] || modelCatalog.custom, [provider]);
  const selected = models.find((model) => model[0] === value) || models[0];

  useEffect(() => {
    if (!models.some((model) => model[0] === value)) onChange(models[0][0]);
  }, [models, onChange, value]);

  function choose(model) {
    onChange(model[0]);
    setOpen(false);
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => { if (canHover()) setOpen(true); }}
      onMouseLeave={() => { if (canHover()) setOpen(false); }}
      onFocus={() => { if (canHover()) setOpen(true); }}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
      onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); }}
    >
      <span className="mb-2 flex items-center justify-between font-mono text-[9px] font-black tracking-[0.14em] text-slate-600"><span>MODEL NAME</span><span className="text-cyan-300/70">{copy.hover}</span></span>
      <button type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => {
        if (canHover()) {
          setOpen(true);
          return;
        }
        setOpen((current) => !current);
      }} className={`flex h-12 w-full items-center justify-between gap-3 rounded-xl border bg-slate-950/85 px-4 text-left outline-none transition ${open ? 'border-cyan-300/55 ring-2 ring-cyan-300/10' : 'border-slate-700 hover:border-cyan-300/35'}`}>
        <span className="min-w-0"><span className="block truncate text-sm font-semibold text-slate-200">{selected[1]}</span><span className="mt-0.5 block truncate font-mono text-[8px] text-slate-600">{selected[0]}</span></span><span aria-hidden="true" className={`text-[10px] text-slate-500 transition ${open ? 'rotate-180 text-cyan-300' : ''}`}>▼</span>
      </button>

      <div role="listbox" aria-label={copy.chooseModel} className={`absolute left-0 top-full z-[79] w-[min(34rem,calc(100vw-2rem))] origin-top-left overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950/98 p-2 shadow-[0_30px_90px_rgba(2,6,23,0.78),0_0_50px_rgba(34,211,238,0.1)] backdrop-blur-2xl transition duration-200 ${open ? 'pointer-events-auto translate-y-0 scale-100 opacity-100' : 'pointer-events-none -translate-y-2 scale-[0.98] opacity-0'}`}>
        <div className="mb-2 flex items-center justify-between border-b border-slate-800 px-2 pb-2"><span className="font-mono text-[9px] font-black tracking-[0.16em] text-cyan-300">SELECT MODEL</span><span className="text-[9px] text-slate-600">{copy.filter}</span></div>
        <div className="grid max-h-80 gap-1 overflow-y-auto">
          {models.map((model) => {
            const active = model[0] === selected[0];
            return <button key={model[0]} type="button" role="option" aria-selected={active} onClick={() => choose(model)} className={`group grid grid-cols-[1fr_auto] gap-4 rounded-xl border px-3 py-2.5 text-left transition ${active ? 'border-cyan-300/35 bg-cyan-300/10' : 'border-transparent hover:border-slate-700 hover:bg-slate-900'}`}><span className="min-w-0"><strong className={`block truncate text-xs ${active ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>{model[1]}</strong><span className="mt-1 block truncate font-mono text-[8px] text-slate-600">{model[0]}</span></span><span className="self-center text-[9px] text-slate-600">{active ? <span className="text-cyan-300">✓</span> : (locale === 'zh-Hant' ? model[2] : copy.modelDetail)}</span></button>;
          })}
        </div>
        <div className="mt-2 border-t border-slate-800 px-2 pt-2 text-[9px] leading-4 text-slate-600">{copy.modelNote}</div>
      </div>
    </div>
  );
}
