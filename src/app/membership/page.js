import Link from 'next/link';
import { getMembershipSetupStatus } from '@/lib/membership-setup';

const steps = [
  {
    title: '1. 建立會員身份',
    text: '先用 Clerk 建立登入帳號，之後所有會員狀態都會對應到你的 email。',
  },
  {
    title: '2. 完成訂閱付款',
    text: '透過 Lemon Squeezy 的正式訂閱頁完成付款，付款完成後會自動回寫 Supabase。',
  },
  {
    title: '3. 開通會員權限',
    text: 'Webhook 觸發後，會員資料會被標記為 active，會員頁即可看到可用狀態。',
  },
];

const deliverables = [
  'Clerk 身份登入 / 註冊',
  'Lemon Squeezy 訂閱付款',
  'Supabase 會員狀態回寫',
  '會員中心與受保護頁面',
];

export const metadata = {
  title: '標準會員訂閱 MVP',
  description: 'AI-Quant Lab 標準會員訂閱最小可行版本，串起登入、付款、Webhook 與會員中心。',
};

function getSetupBanner(type) {
  switch (type) {
    case 'clerk':
      return 'Clerk 尚未完成設定，登入與註冊區目前只會顯示說明，請先補上 Clerk 金鑰。';
    case 'lemon':
      return 'Lemon Squeezy 尚未完成設定，付款入口已先導回此頁，請先補上 checkout URL 與 webhook secret。';
    case 'error':
      return '剛剛的訂閱跳轉沒有成功，請先確認環境變數與 Clerk / Lemon Squeezy 設定。';
    default:
      return '';
  }
}

function buildSetupCards(setup) {
  return [
    {
      name: 'Clerk',
      ready: setup.clerkReady,
      detail: setup.clerkReady
        ? '登入、註冊與會員身份驗證已可使用。'
        : '缺少 NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY 或 CLERK_SECRET_KEY。',
    },
    {
      name: 'Lemon Squeezy',
      ready: setup.lemonReady,
      detail: setup.lemonReady
        ? '付款頁與 webhook 金鑰都已就緒。'
        : '缺少 LEMON_SQUEEZY_CHECKOUT_URL 或 LEMON_SQUEEZY_WEBHOOK_SECRET。',
    },
    {
      name: 'Supabase',
      ready: setup.supabaseReady,
      detail: setup.supabaseReady
        ? '會員回寫與狀態查詢已可使用。'
        : '缺少 SUPABASE_URL 或 SUPABASE_SERVICE_ROLE_KEY。',
    },
  ];
}

export default async function MembershipPage({ searchParams }) {
  const setup = getMembershipSetupStatus();
  const query = (await searchParams) || {};
  const setupType = Array.isArray(query.setup) ? query.setup[0] : query.setup;
  const setupBanner = getSetupBanner(setupType);
  const setupCards = buildSetupCards(setup);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_35%),linear-gradient(180deg,#020617_0%,#0f172a_44%,#020617_100%)] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {setupBanner ? (
          <div className="mb-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-5 py-4 text-sm leading-7 text-amber-50">
            {setupBanner}
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <section className="rounded-[2rem] border border-cyan-400/20 bg-slate-950/75 p-8 shadow-[0_24px_80px_rgba(8,145,178,0.18)] backdrop-blur">
            <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-1 text-xs font-semibold tracking-[0.28em] text-cyan-200 uppercase">
              Standard Membership MVP
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
              標準會員訂閱
              <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-500 bg-clip-text text-transparent">
                真的可用的最小可行版本
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              這一版已經把「登入、付款、Webhook 回寫、會員中心」串起來，讓你不只是有一個訂閱按鈕，而是有完整的會員流程。
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {setup.clerkReady ? (
                <>
                  <Link
                    href="/sign-up"
                    className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                  >
                    先建立帳號
                  </Link>
                  <Link
                    href="/sign-in"
                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/35 hover:text-white"
                  >
                    已有帳號，先登入
                  </Link>
                </>
              ) : (
                <>
                  <span className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/70 px-6 py-3 text-sm font-semibold text-slate-400">
                    Clerk 尚未設定
                  </span>
                  <span className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/70 px-6 py-3 text-sm font-semibold text-slate-400">
                    先補 Clerk 金鑰
                  </span>
                </>
              )}

              {setup.clerkReady && setup.lemonCheckoutUrlReady ? (
                <Link
                  href="/api/billing/checkout"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-6 py-3 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400/15"
                >
                  前往訂閱付款
                </Link>
              ) : (
                <span className="inline-flex min-h-12 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/5 px-6 py-3 text-sm font-semibold text-emerald-100/70">
                  付款入口待設定完成
                </span>
              )}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {deliverables.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-4 text-sm text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-6 rounded-[2rem] border border-slate-800 bg-slate-950/70 p-6 backdrop-blur">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/55 p-5">
              <h2 className="text-xl font-bold text-white">設定狀態</h2>
              <div className="mt-5 space-y-4">
                {setupCards.map((item) => (
                  <div key={item.name} className="rounded-2xl border border-slate-800/80 bg-slate-950/55 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-semibold text-white">{item.name}</p>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.ready
                            ? 'bg-emerald-400/15 text-emerald-200'
                            : 'bg-amber-400/15 text-amber-100'
                        }`}
                      >
                        {item.ready ? '已設定' : '待設定'}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/55 p-5">
              <h2 className="text-xl font-bold text-white">流程說明</h2>
              <div className="mt-5 space-y-4">
                {steps.map((step) => (
                  <div key={step.title} className="rounded-2xl border border-slate-800/80 bg-slate-950/55 p-4">
                    <p className="text-sm font-semibold text-cyan-200">{step.title}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5">
              <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-amber-100">
                MVP 注意事項
              </h3>
              <p className="mt-3 text-sm leading-7 text-amber-50/90">
                Lemon Squeezy 的 checkout 與 webhook 參數已接好，但你仍需要把
                `LEMON_SQUEEZY_CHECKOUT_URL` 與 webhook signing secret 實際填入 Vercel。
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
