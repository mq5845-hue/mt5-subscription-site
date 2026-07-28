'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

const promoPlayerUrl = '/promo/autoplay.html';
const narrationPlaybackRate = 23.645 / 20;

export default function HeroPromoVideo() {
  const [isOpen, setIsOpen] = useState(false);
  const [playbackKey, setPlaybackKey] = useState(0);
  const narrationRef = useRef(null);

  const startNarration = () => {
    const narration = narrationRef.current;
    if (!narration) return;
    narration.pause();
    narration.currentTime = 0;
    narration.playbackRate = narrationPlaybackRate;
    narration.muted = false;
    narration.volume = 1;
    narration.play().catch(() => {});
  };

  const openPromo = () => {
    startNarration();
    setIsOpen(true);
  };

  const replayPromo = () => {
    startNarration();
    setPlaybackKey((key) => key + 1);
  };

  const closePromo = () => {
    narrationRef.current?.pause();
    setIsOpen(false);
  };

  return (
    <>
      <audio ref={narrationRef} preload="auto" src="/ai-quant-promo-narration.wav" />
      <button type="button" onClick={openPromo} aria-label="Play the 20-second AI-Quant Lab product promo with English narration" className="group relative block aspect-video w-full overflow-hidden lg:h-full lg:aspect-auto rounded-2xl border border-white/80 bg-slate-950 text-left shadow-[0_0_12px_rgba(255,255,255,0.45),0_0_28px_rgba(34,211,238,0.2)] transition duration-300 hover:scale-[1.015] hover:border-cyan-100 hover:shadow-[0_0_60px_rgba(34,211,238,0.68)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300/55">
        <Image src="/ai-quant-promo-preview.png" alt="AI-Quant Lab 20-second promo preview" fill sizes="(min-width: 1024px) 22vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(2,6,24,0.24)_70%,rgba(2,6,24,0.8)_100%)]" />
        <span className="absolute inset-0 flex items-center justify-center"><span className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-100/80 bg-cyan-400/20 pl-1 text-xl text-white shadow-[0_0_35px_rgba(34,211,238,0.9)] backdrop-blur transition group-hover:scale-110 group-hover:bg-cyan-300/35">▶</span></span>
        <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-xs font-bold tracking-[0.12em] text-cyan-50"><span>PLAY 20s PROMO</span><span className="rounded-full border border-cyan-100/45 bg-slate-950/65 px-2.5 py-1 text-[10px]">SOUND ON · EXPAND ↗</span></span>
      </button>

      <div className={`fixed inset-0 z-[1200] items-center justify-center bg-slate-950/95 p-3 sm:p-6 ${isOpen ? 'flex' : 'hidden'}`} role="dialog" aria-modal="true" aria-label="AI-Quant Lab product promo">
        <div className="relative aspect-video h-auto w-full max-w-[min(96vw,calc(100vh*1.7778))] overflow-hidden rounded-2xl border border-white/85 bg-slate-950 shadow-[0_0_18px_rgba(255,255,255,0.5),0_0_90px_rgba(34,211,238,0.45)]">
          <iframe key={playbackKey} title="AI-Quant Lab 20-second product promo player" src={isOpen ? promoPlayerUrl : 'about:blank'} className="absolute inset-0 h-full w-full border-0" allow="autoplay; fullscreen" />
          <div className="absolute right-4 top-4 z-10 flex gap-2">
            <button type="button" onClick={replayPromo} className="rounded-full border border-cyan-200/50 bg-slate-950/90 px-4 py-2 text-xs font-bold tracking-[0.14em] text-cyan-100 backdrop-blur transition hover:border-cyan-100 hover:bg-cyan-400/20">↻ REPLAY</button>
            <button type="button" onClick={closePromo} className="rounded-full border border-white/30 bg-slate-950/90 px-4 py-2 text-xs font-bold tracking-[0.14em] text-white backdrop-blur transition hover:border-cyan-200 hover:text-cyan-100">CLOSE</button>
          </div>
        </div>
      </div>
    </>
  );
}