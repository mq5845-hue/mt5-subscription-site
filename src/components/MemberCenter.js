'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { localizePath } from '@/lib/locale';

const copy = {
  en: {
    eyebrow: 'MEMBER CENTER', hello: 'Welcome back,', fallback: 'Member', email: 'Account email', status: 'Membership status', overview: 'Your membership overview', bullets: ['Your identity is handled by Clerk.', 'Payment events are synchronized from Lemon Squeezy to Supabase.', 'Active and on-trial members can use protected resources.'], setup: 'Supabase is not connected yet. Complete the environment setup to see live membership data.', action: 'Membership action', subscribe: 'Start membership', active: 'Your membership is active.', plans: 'View membership plans', data: 'Membership data', plan: 'Plan', lemon: 'Lemon status', event: 'Last event', none: 'none', loading: 'Loading your membership...', error: 'Membership information is temporarily unavailable. Please try again.', retry: 'Try again',
  },
  'zh-Hant': {
    eyebrow: '會員中心', hello: '歡迎回來，', fallback: '會員', email: '帳戶 Email', status: '會員狀態', overview: '會員資料概覽', bullets: ['身分驗證由 Clerk 處理。', '付款事件會從 Lemon Squeezy 同步到 Supabase。', 'active 與 on-trial 會員可以使用受保護資源。'], setup: 'Supabase 尚未連線，完成環境設定後即可查看即時會員資料。', action: '會員動作', subscribe: '開始會員訂閱', active: '你的會員資格目前有效。', plans: '查看會員方案', data: '會員資料', plan: '方案', lemon: 'Lemon 狀態', event: '最後事件', none: '無', loading: '正在載入會員資料…', error: '會員資料暫時無法取得，請稍後再試。', retry: '重新載入',
  },
  'zh-Hans': {
    eyebrow: '会员中心', hello: '欢迎回来，', fallback: '会员', email: '账户 Email', status: '会员状态', overview: '会员资料概览', bullets: ['身份验证由 Clerk 处理。', '付款事件会从 Lemon Squeezy 同步到 Supabase。', 'active 与 on-trial 会员可以使用受保护资源。'], setup: 'Supabase 尚未连接，完成环境设置后即可查看即时会员资料。', action: '会员操作', subscribe: '开始会员订阅', active: '你的会员资格目前有效。', plans: '查看会员方案', data: '会员资料', plan: '方案', lemon: 'Lemon 状态', event: '最后事件', none: '无', loading: '正在载入会员资料…', error: '会员资料暂时无法取得，请稍后再试。', retry: '重新载入',
  },
};

export default function MemberCenter({ locale, supabaseReady }) {
  const text = copy[locale] || copy['zh-Hant'];
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [state, setState] = useState({ loading: true, data: null, error: false });

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.replace(localizePath('/sign-in', locale));
      return;
    }

    const controller = new AbortController();
    fetch('/api/member', { signal: controller.signal, credentials: 'same-origin' })
      .then((response) => {
        if (response.status === 401) {
          router.replace(localizePath('/sign-in', locale));
          return null;
        }
        if (!response.ok) throw new Error('member_data_error');
        return response.json();
      })
      .then((data) => {
        if (data) setState({ loading: false, data, error: false });
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ loading: false, data: null, error: true });
      });

    return () => controller.abort();
  }, [isLoaded, isSignedIn, locale, router]);

  if (!isLoaded || state.loading || !isSignedIn) {
    return <main className="grid min-h-screen place-items-center bg-slate-950 text-cyan-100"><p>{text.loading}</p></main>;
  }

  if (state.error || !state.data) {
    return <main className="grid min-h-screen place-items-center bg-slate-950 px-4 text-center text-slate-100"><div><p>{text.error}</p><button type="button" onClick={() => window.location.reload()} className="mt-5 rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950">{text.retry}</button></div></main>;
  }

  const { user, membership, active } = state.data;
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.14),transparent_28%),linear-gradient(180deg,#020617_0%,#0f172a_42%,#020617_100%)] px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[2rem] border border-cyan-400/20 bg-slate-950/75 p-8 shadow-[0_24px_80px_rgba(8,145,178,0.18)] backdrop-blur">
          <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-1 text-xs font-semibold tracking-[0.28em] text-cyan-200 uppercase">{text.eyebrow}</div>
          <h1 className="mt-5 text-3xl font-black sm:text-4xl">{text.hello}<span className="block bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-500 bg-clip-text text-transparent">{user.displayName || text.fallback}</span></h1>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"><p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">{text.email}</p><p className="mt-2 break-all text-sm text-slate-200">{user.email || text.none}</p></div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"><p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">{text.status}</p><p className={'mt-2 text-sm font-bold ' + (active ? 'text-emerald-300' : 'text-amber-300')}>{active ? 'active' : membership?.membership_status || 'pending'}</p></div>
          </div>
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-5"><h2 className="text-lg font-bold text-white">{text.overview}</h2><ul className="mt-4 space-y-2 text-sm leading-7 text-slate-300">{text.bullets.map((item) => <li key={item}>• {item}</li>)}</ul></div>
          {!supabaseReady ? <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5 text-sm leading-7 text-amber-50/90">{text.setup}</div> : null}
        </section>
        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-950/70 p-6"><h2 className="text-xl font-bold text-white">{text.action}</h2><div className="mt-4 flex flex-col gap-3">{!active ? <Link href={`/api/billing/checkout?locale=${locale}`} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300">{text.subscribe}</Link> : <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">{text.active}</div>}<Link href={localizePath('/membership', locale)} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/35 hover:text-white">{text.plans}</Link></div></div>
          <div className="rounded-[2rem] border border-slate-800 bg-slate-950/70 p-6"><h2 className="text-lg font-bold text-white">{text.data}</h2><div className="mt-4 space-y-3 text-sm text-slate-300"><p>{text.plan}: {membership?.plan_name || text.none}</p><p>{text.lemon}: {membership?.lemon_status || text.none}</p><p>{text.event}: {membership?.last_event_name || text.none}</p></div></div>
        </aside>
      </div>
    </main>
  );
}
