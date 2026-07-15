import Link from 'next/link';
import { headers } from 'next/headers';
import { getMembershipSetupStatus } from '@/lib/membership-setup';
import { defaultLocale, localizePath } from '@/lib/locale';
import EmojiAvatar from '@/components/EmojiAvatar';

const membershipEmojis = { stack: ['🔐', '💳', '🗄️', '👤'], setup: ['🔑', '💰', '🧾', '🛡️'], flow: ['👋', '🪪', '💳', '✅'] };

const copy = {
  'zh-Hant': {
    metadataTitle: '標準會員訂閱 MVP',
    badge: 'STANDARD MEMBERSHIP MVP',
    title: '標準會員訂閱',
    accent: '真正可用的最小可行版本',
    description: '這一版已經把「登入、付款、Webhook 回寫、會員中心」串起來，讓你不只是有一個訂閱按鈕，而是有完整的會員流程。',
    setupTitle: '設定狀態',
    flowTitle: '流程說明',
    mvpTitle: 'MVP 注意事項',
    signup: '先建立帳號',
    signin: '已有帳號，先登入',
    checkout: '前往訂閱付款',
    clerkBox: 'Clerk 身份登入 / 註冊',
    lemonBox: 'Lemon Squeezy 訂閱付款',
    supabaseBox: 'Supabase 會員狀態回寫',
    memberBox: '會員中心與受保護頁面',
    ready: '已設定',
    pending: '待設定',
    stepTitles: ['1. 建立會員身份', '2. 完成訂閱付款', '3. 開通會員權限'],
    stepTexts: [
      '先用 Clerk 建立登入帳號，之後所有會員狀態都會對應到你的 email。',
      '透過 Lemon Squeezy 的正式訂閱頁完成付款，付款完成後會自動回寫 Supabase。',
      'Webhook 觸發後，會員資料會被標記為 active，會員即可看到可用狀態。',
    ],
    mvpNote: 'Lemon Squeezy 的 checkout 與 webhook 參數已接好，但仍需要把正式環境的付款網址與 webhook 金鑰填入部署環境。',
    banners: {
      clerk: 'Clerk 設定提示：請確認登入、註冊與會員身份驗證已完成。',
      lemon: 'Lemon Squeezy 設定提示：請填入 checkout URL 與 webhook secret。',
      error: '目前設定尚未完整，請確認 Clerk、Lemon Squeezy 與 Supabase 的環境設定。',
    },
    details: {
      clerkReady: '登入、註冊與會員身份驗證已可使用。',
      clerkPending: '尚缺 Clerk 的公開金鑰或秘密金鑰。',
      lemonReady: '付款頁與 webhook 金鑰都已就緒。',
      lemonPending: '尚缺 Lemon Squeezy 的 checkout URL 或 webhook secret。',
      supabaseReady: '會員回寫與狀態查詢已可使用。',
      supabasePending: '尚缺 Supabase URL 或服務角色金鑰。',
    },
  },
  'zh-Hans': {
    metadataTitle: '标准会员订阅 MVP',
    badge: 'STANDARD MEMBERSHIP MVP',
    title: '标准会员订阅',
    accent: '真正可用的最小可行版本',
    description: '这一版已经把「登录、付款、Webhook 回写、会员中心」串起来，让你不只是有一个订阅按钮，而是有完整的会员流程。',
    setupTitle: '设置状态',
    flowTitle: '流程说明',
    mvpTitle: 'MVP 注意事项',
    signup: '先建立账号',
    signin: '已有账号，先登录',
    checkout: '前往订阅付款',
    clerkBox: 'Clerk 身份登录 / 注册',
    lemonBox: 'Lemon Squeezy 订阅付款',
    supabaseBox: 'Supabase 会员状态回写',
    memberBox: '会员中心与受保护页面',
    ready: '已设置',
    pending: '待设置',
    stepTitles: ['1. 建立会员身份', '2. 完成订阅付款', '3. 开通会员权限'],
    stepTexts: [
      '先用 Clerk 建立登录账号，之后所有会员状态都会对应到你的 email。',
      '通过 Lemon Squeezy 的正式订阅页完成付款，付款完成后会自动回写 Supabase。',
      'Webhook 触发后，会员资料会被标记为 active，会员即可看到可用状态。',
    ],
    mvpNote: 'Lemon Squeezy 的 checkout 与 webhook 参数已经接好，但仍需要把正式环境的付款网址与 webhook 金钥填入部署环境。',
    banners: {
      clerk: 'Clerk 设置提示：请确认登录、注册与会员身份验证已完成。',
      lemon: 'Lemon Squeezy 设置提示：请填入 checkout URL 与 webhook secret。',
      error: '目前设置尚未完整，请确认 Clerk、Lemon Squeezy 与 Supabase 的环境设置。',
    },
    details: {
      clerkReady: '登录、注册与会员身份验证已经可以使用。',
      clerkPending: '尚缺 Clerk 的公开金钥或秘密金钥。',
      lemonReady: '付款页与 webhook 金钥都已就绪。',
      lemonPending: '尚缺 Lemon Squeezy 的 checkout URL 或 webhook secret。',
      supabaseReady: '会员回写与状态查询已经可以使用。',
      supabasePending: '尚缺 Supabase URL 或服务角色金钥。',
    },
  },
  en: {
    metadataTitle: 'Standard Membership MVP',
    badge: 'STANDARD MEMBERSHIP MVP',
    title: 'Standard Membership',
    accent: 'A working minimum viable version',
    description: 'This version connects sign-in, payments, webhook updates, and the member center into one complete membership flow.',
    setupTitle: 'Setup status',
    flowTitle: 'How it works',
    mvpTitle: 'MVP note',
    signup: 'Create an account',
    signin: 'Already have an account? Sign in',
    checkout: 'Go to subscription checkout',
    clerkBox: 'Clerk identity sign-in / sign-up',
    lemonBox: 'Lemon Squeezy subscription payment',
    supabaseBox: 'Supabase membership status sync',
    memberBox: 'Member center and protected pages',
    ready: 'Ready',
    pending: 'Pending',
    stepTitles: ['1. Create your member identity', '2. Complete subscription payment', '3. Activate member access'],
    stepTexts: [
      'Create your sign-in account with Clerk. All membership status updates will be linked to your email.',
      'Complete payment through the official Lemon Squeezy subscription page. The result is written back to Supabase automatically.',
      'After the webhook is processed, the membership is marked active and the member can see the available status.',
    ],
    mvpNote: 'The Lemon Squeezy checkout and webhook wiring is ready. Production payment URL and webhook secret still need to be configured in the deployment environment.',
    banners: {
      clerk: 'Clerk setup note: confirm that sign-in, sign-up, and identity verification are ready.',
      lemon: 'Lemon Squeezy setup note: enter the checkout URL and webhook secret.',
      error: 'Some setup is still missing. Check Clerk, Lemon Squeezy, and Supabase settings.',
    },
    details: {
      clerkReady: 'Sign-in, sign-up, and identity verification are ready.',
      clerkPending: 'The Clerk publishable key or secret key is missing.',
      lemonReady: 'The checkout page and webhook key are ready.',
      lemonPending: 'The Lemon Squeezy checkout URL or webhook secret is missing.',
      supabaseReady: 'Membership sync and status lookup are ready.',
      supabasePending: 'The Supabase URL or service role key is missing.',
    },
  },
};

export async function generateMetadata({ searchParams }) {
  const query = (await searchParams) || {};
  const queryLocale = Array.isArray(query.__locale) ? query.__locale[0] : query.__locale;
  const requestHeaders = await headers();
  const locale = copy[queryLocale] ? queryLocale : getLocale(requestHeaders);
  return { title: copy[locale].metadataTitle };
}

function getLocale(requestHeaders) {
  const value = requestHeaders.get('x-site-locale');
  return copy[value] ? value : defaultLocale;
}

function getSetupBanner(type, text) {
  return text.banners[type] || '';
}

function buildSetupCards(setup, text) {
  return [
    { name: 'Clerk', ready: setup.clerkReady, detail: setup.clerkReady ? text.details.clerkReady : text.details.clerkPending },
    { name: 'Lemon Squeezy', ready: setup.lemonReady, detail: setup.lemonReady ? text.details.lemonReady : text.details.lemonPending },
    { name: 'Supabase', ready: setup.supabaseReady, detail: setup.supabaseReady ? text.details.supabaseReady : text.details.supabasePending },
  ];
}

export default async function MembershipPage({ searchParams }) {
  const setup = getMembershipSetupStatus();
  const query = (await searchParams) || {};
  const requestHeaders = await headers();
  const queryLocale = Array.isArray(query.__locale) ? query.__locale[0] : query.__locale;
  const locale = copy[queryLocale] ? queryLocale : getLocale(requestHeaders);
  const text = copy[locale];
  const setupType = Array.isArray(query.setup) ? query.setup[0] : query.setup;
  const setupBanner = getSetupBanner(setupType, text);
  const setupCards = buildSetupCards(setup, text);
  const signUpHref = localizePath('/sign-up', locale);
  const signInHref = localizePath('/sign-in', locale);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_35%),linear-gradient(180deg,#020617_0%,#0f172a_44%,#020617_100%)] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {setupBanner ? <div className="mb-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-5 py-4 text-sm leading-7 text-amber-50">{setupBanner}</div> : null}

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <section className="rounded-[2rem] border border-cyan-400/20 bg-slate-950/75 p-8 shadow-[0_24px_80px_rgba(8,145,178,0.18)] backdrop-blur">
            <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-1 text-xs font-semibold tracking-[0.28em] text-cyan-200 uppercase">{text.badge}</div>
            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">{text.title}<span className="mt-2 block bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-500 bg-clip-text text-transparent">{text.accent}</span></h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{text.description}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {setup.clerkReady ? <><Link href={signUpHref} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300">{text.signup}</Link><Link href={signInHref} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/35 hover:text-white">{text.signin}</Link></> : <><span className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/70 px-6 py-3 text-sm font-semibold text-slate-400">{text.clerkBox}</span><span className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/70 px-6 py-3 text-sm font-semibold text-slate-400">{text.clerkPending}</span></>}
              {setup.clerkReady && setup.lemonCheckoutUrlReady ? <Link href="/api/billing/checkout" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-6 py-3 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400/15">{text.checkout}</Link> : <span className="inline-flex min-h-12 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/5 px-6 py-3 text-sm font-semibold text-emerald-100/70">{text.lemonPending}</span>}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">{[text.clerkBox, text.lemonBox, text.supabaseBox, text.memberBox].map((item, index) => <div key={item} className="group flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-4 text-sm text-slate-200"><EmojiAvatar emoji={membershipEmojis.stack[index]} tone="violet" />{item}</div>)}</div>
          </section>

          <aside className="space-y-6 rounded-[2rem] border border-slate-800 bg-slate-950/70 p-6 backdrop-blur">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/55 p-5"><h2 className="text-xl font-bold text-white">{text.setupTitle}</h2><div className="mt-5 space-y-4">{setupCards.map((item, index) => <div key={item.name} className="rounded-2xl border border-slate-800/80 bg-slate-950/55 p-4"><div className="flex items-center justify-between gap-4"><p className="flex items-center gap-2 text-sm font-semibold text-white"><EmojiAvatar emoji={membershipEmojis.setup[index % membershipEmojis.setup.length]} tone={item.ready ? 'emerald' : 'amber'} />{item.name}</p><span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.ready ? 'bg-emerald-400/15 text-emerald-200' : 'bg-amber-400/15 text-amber-100'}`}>{item.ready ? text.ready : text.pending}</span></div><p className="mt-2 text-sm leading-7 text-slate-300">{item.detail}</p></div>)}</div></div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/55 p-5"><h2 className="text-xl font-bold text-white">{text.flowTitle}</h2><div className="mt-5 space-y-4">{text.stepTitles.map((title, index) => <div key={title} className="rounded-2xl border border-slate-800/80 bg-slate-950/55 p-4"><p className="flex items-center gap-2 text-sm font-semibold text-cyan-200"><EmojiAvatar emoji={membershipEmojis.flow[index % membershipEmojis.flow.length]} />{title}</p><p className="mt-2 text-sm leading-7 text-slate-300">{text.stepTexts[index]}</p></div>)}</div></div>
            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5"><h3 className="text-sm font-bold uppercase tracking-[0.24em] text-amber-100">{text.mvpTitle}</h3><p className="mt-3 text-sm leading-7 text-amber-50/90">{text.mvpNote}</p></div>
          </aside>
        </div>
      </div>
    </main>
  );
}
