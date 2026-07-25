import Script from 'next/script';

export default function PromoPlayerPage() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-black">
      <hyperframes-player src="/api/promo-composition" controls muted className="block h-full w-full" />
      <Script src="http://127.0.0.1:3033/player.js" strategy="afterInteractive" />
      <Script id="promo-player-bridge" strategy="afterInteractive">{`
        (() => {
          const messageType = 'ai-quant-promo';
          const player = document.querySelector('hyperframes-player');
          if (!player) return;
          const playFromStart = () => {
            player.seek?.(0);
            player.play?.();
          };
          const reportReady = () => window.parent.postMessage({ type: messageType, action: 'ready' }, window.location.origin);
          player.addEventListener('ready', reportReady);
          window.addEventListener('message', (event) => {
            if (event.origin !== window.location.origin || event.data?.type !== messageType) return;
            if (event.data.action === 'play-from-start') playFromStart();
            if (event.data.action === 'pause') player.pause?.();
          });
        })();
      `}</Script>
    </main>
  );
}