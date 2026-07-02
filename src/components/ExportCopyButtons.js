'use client';

import { useState } from 'react';

async function copyText(text) {
  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  const success = document.execCommand('copy');
  document.body.removeChild(textarea);
  return success;
}

export default function ExportCopyButtons({ markdownText, jsonText, mdHref, jsonHref }) {
  const [status, setStatus] = useState('ready');

  const handleCopy = async (label, text) => {
    setStatus(`正在複製 ${label}...`);
    try {
      await copyText(text);
      setStatus(`${label} 已複製，可直接貼上後台。`);
    } catch {
      setStatus(`${label} 複製失敗，請改用下載檔。`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => handleCopy('Markdown', markdownText)}
          className="rounded-full border border-cyan-300/30 bg-cyan-300/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-300/25"
        >
          複製 Markdown
        </button>
        <button
          type="button"
          onClick={() => handleCopy('JSON', jsonText)}
          className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-2.5 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/20"
        >
          複製 JSON
        </button>
        <a
          href={mdHref}
          className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/30 hover:bg-cyan-300/10"
        >
          下載 Markdown
        </a>
        <a
          href={jsonHref}
          className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/30 hover:bg-cyan-300/10"
        >
          下載 JSON
        </a>
      </div>
      <p className="text-sm text-cyan-100/90">{status}</p>
    </div>
  );
}
