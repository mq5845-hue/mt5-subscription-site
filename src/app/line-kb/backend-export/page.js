import Link from 'next/link';
import ExportCopyButtons from '@/components/ExportCopyButtons';
import {
  topicTreeBackendText,
  topicTreeBlueprint,
  topicTreeExpandedEntries,
} from '@/data/lineTopicTree';

export const metadata = {
  title: 'LINE 後台題庫匯出 | AI-Quant Lab',
  description: '把 FAQ 題庫整理成可直接複製與下載的 Markdown / JSON 匯出頁。',
};

const mdHref = '/api/line-backend-export?format=md&download=1';
const jsonHref = '/api/line-backend-export?format=json&download=1';

export default function LineBackendExportPage() {
  const pointAndClickFlow = `歡迎來到 AI-Quant Lab。

請直接點選下方按鈕，不需要先打字：
- 認識我們
- 先看知識庫
- 我要預約

如果你只是想先查一眼，也可以回傳這些備援字詞：
認識我們 / 知識庫 / 預約名單`;

  const markdownText = `# AI-Quant Lab LINE 後台題庫匯出\n\n總節點數：${topicTreeExpandedEntries.length}\n\n${topicTreeBackendText}`;
  const jsonText = JSON.stringify(
    {
      metadata: {
        title: 'AI-Quant Lab LINE 後台題庫匯出',
        generatedAt: new Date().toISOString(),
        totalEntries: topicTreeExpandedEntries.length,
        families: topicTreeBlueprint.families,
      },
      blueprint: topicTreeBlueprint,
      entries: topicTreeExpandedEntries,
    },
    null,
    2
  );

  return (
    <main className="min-h-screen bg-[#050816] text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.16),transparent_26%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.12),transparent_24%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.55),rgba(2,6,23,0.92))]" />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <header className="rounded-[1.75rem] border border-cyan-400/15 bg-white/[0.03] p-5 shadow-[0_20px_80px_rgba(8,145,178,0.14)] backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-semibold tracking-[0.24em] text-cyan-200">
                  LINE 後台題庫匯出
                </div>
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                    題庫匯出與複製貼上頁
                  </h1>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                    這一頁把主題樹與 1000+ 擴充規則整理成可直接備份的 Markdown / JSON。
                    你可以先複製，也可以直接下載檔案，再貼到 LINE 後台自動回應頁。
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 lg:pt-2">
                <Link
                  href="/line-kb/expansion"
                  className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-cyan-100 transition hover:bg-cyan-300/18"
                >
                  回 FAQ 擴充藍圖
                </Link>
                <Link
                  href="/line-kb"
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-slate-100 transition hover:border-cyan-300/30 hover:bg-cyan-300/10"
                >
                  回知識庫入口
                </Link>
              </div>
            </div>
          </header>

          <section className="mt-8 grid gap-4 lg:grid-cols-3">
            <article className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5">
              <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">資料規模</p>
              <h2 className="mt-3 text-2xl font-bold text-white">可量產的題庫骨架</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                目前已生成 {topicTreeExpandedEntries.length} 則擴充題目，會依主題家族與模板自動長大。
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5">
              <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">使用方式</p>
              <h2 className="mt-3 text-2xl font-bold text-white">先複製，再貼到後台</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                先用 Markdown 看全貌，若要備份或串流程，就改用 JSON。兩種格式都可以下載。
              </p>
            </article>
            <article className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5">
              <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">重點提醒</p>
              <h2 className="mt-3 text-2xl font-bold text-white">LINE 後台可直接貼上</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                題庫已整理成 `Q：` / `A：` 結構，後續只要更新主資料，網站和 LINE 會一起同步。
              </p>
            </article>
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(8,15,31,0.82),rgba(3,7,18,0.94))] p-5 shadow-[0_16px_50px_rgba(34,211,238,0.08)] ring-1 ring-white/5 sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold tracking-[0.22em] text-cyan-300">一鍵操作</p>
                <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">直接複製或下載匯出檔</h2>
                <p className="mt-3 text-sm leading-7 text-slate-200/90 sm:text-base">
                  這裡同時提供 Markdown、JSON 與後台貼上預覽。你可以先看預覽，再決定要複製哪一種格式。
                </p>
              </div>
            </div>

            <div className="mt-6">
              <ExportCopyButtons
                markdownText={markdownText}
                jsonText={jsonText}
                mdHref={mdHref}
                jsonHref={jsonHref}
              />
            </div>
          </section>

          <section className="mt-8 rounded-[1.75rem] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(8,15,31,0.82),rgba(3,7,18,0.94))] p-5 shadow-[0_16px_50px_rgba(34,211,238,0.08)] ring-1 ring-white/5 sm:p-7">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.22em] text-cyan-300">點選式修正</p>
              <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">把打字流程改成按鈕流程</h2>
              <p className="mt-3 text-sm leading-7 text-slate-200/90 sm:text-base">
                你剛剛提到的重點是對的：大多數訪客不想先打字。實作上，請把「關鍵字回應」當成備援，
                真正的主流程改成圖文選單、快速回覆或 Flex Message 的點選按鈕。
              </p>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <article className="rounded-[1.25rem] border border-cyan-400/14 bg-white/[0.04] p-4">
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">STEP 1</p>
                <h3 className="mt-2 text-lg font-bold text-white">主流程入口</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  先讓訪客只做一件事：點按鈕。建議三個入口是「認識我們」、「先看知識庫」、「我要預約」。
                </p>
              </article>
              <article className="rounded-[1.25rem] border border-cyan-400/14 bg-white/[0.04] p-4">
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">STEP 2</p>
                <h3 className="mt-2 text-lg font-bold text-white">文字只做備援</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  「功能說明」、「我想預約正式版」這些字詞保留即可，但不要當唯一入口，避免訪客被迫輸入文字。
                </p>
              </article>
              <article className="rounded-[1.25rem] border border-cyan-400/14 bg-white/[0.04] p-4">
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">STEP 3</p>
                <h3 className="mt-2 text-lg font-bold text-white">下一步導流</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  每個按鈕都接到對應的回覆或網頁，讓人先看內容，再決定要不要留下來或加入預約名單。
                </p>
              </article>
            </div>

            <div className="mt-6 rounded-[1.25rem] border border-cyan-300/10 bg-[#020617] p-4">
              <p className="text-sm font-semibold text-cyan-200">可直接拿去改的主流程文案</p>
              <pre className="mt-3 whitespace-pre-wrap rounded-[1rem] bg-white/[0.03] p-4 text-sm leading-7 text-slate-100">
{pointAndClickFlow}
              </pre>
            </div>
          </section>

          <section className="mt-8 grid gap-4 lg:grid-cols-2">
            <article className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5">
              <h2 className="text-2xl font-bold text-white">Markdown 預覽</h2>
              <pre className="mt-4 max-h-[36rem] overflow-auto whitespace-pre-wrap rounded-[1rem] border border-cyan-300/10 bg-[#020617] p-4 text-sm leading-7 text-slate-200">
{markdownText}
              </pre>
            </article>
            <article className="rounded-[1.5rem] border border-cyan-400/14 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(8,15,31,0.95))] p-5 shadow-[0_16px_50px_rgba(2,132,199,0.08)] ring-1 ring-white/5">
              <h2 className="text-2xl font-bold text-white">JSON 預覽</h2>
              <pre className="mt-4 max-h-[36rem] overflow-auto whitespace-pre-wrap rounded-[1rem] border border-cyan-300/10 bg-[#020617] p-4 text-sm leading-7 text-slate-200">
{jsonText}
              </pre>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
}
