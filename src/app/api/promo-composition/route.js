export const dynamic = 'force-dynamic';

const compositionUrl = 'http://127.0.0.1:3033/composition/index.html';
const bridgeScript = `
<script>
(() => {
  const root = document.getElementById('root');
  const narration = document.getElementById('narration');
  if (narration) narration.muted = true;
  const fit = () => {
    if (!root) return;
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    root.style.transformOrigin = 'top left';
    root.style.transform = 'scale(' + scale + ')';
  };
  const playFromStart = () => {
    const timeline = window.__timelines?.main;
    if (!timeline) return;
    timeline.pause(0);
    timeline.play(0);
  };
  window.addEventListener('resize', fit);
  fit();
  if (window.__PROMO_AUTOPLAY__) window.setTimeout(playFromStart, 0);
})();
</script>`;

export async function GET(request) {
  try {
    const shouldAutoplay = new URL(request.url).searchParams.get('autoplay') === '1';
    const response = await fetch(compositionUrl, { cache: 'no-store' });
    if (!response.ok) return new Response('Promo composition is unavailable.', { status: 503 });

    const html = await response.text();
    const sameOriginHtml = html
      .replace('<head>', '<head><base href="http://127.0.0.1:3033/composition/">')
      .replace('</body>', `<script>window.__PROMO_AUTOPLAY__ = ${shouldAutoplay};</script>${bridgeScript}</body>`);

    return new Response(sameOriginHtml, {
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch {
    return new Response('Promo composition is unavailable.', { status: 503 });
  }
}