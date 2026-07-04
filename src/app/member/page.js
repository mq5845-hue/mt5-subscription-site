import Link from 'next/link';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import {
  getDisplayName,
  getMembershipByEmail,
  getPrimaryEmailAddress,
  isMembershipActive,
} from '@/lib/membership-integrations';
import { getMembershipSetupStatus } from '@/lib/membership-setup';

export const metadata = {
  title: '會員中心',
  description: 'AI-Quant Lab 標準會員中心頁面。',
};

export default async function MemberPage() {
  const setup = getMembershipSetupStatus();
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const user = await currentUser();
  const email = getPrimaryEmailAddress(user);
  const membership = email ? await getMembershipByEmail(email) : null;
  const displayName = getDisplayName(user);
  const active = isMembershipActive(membership?.membership_status);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.14),transparent_28%),linear-gradient(180deg,#020617_0%,#0f172a_42%,#020617_100%)] px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[2rem] border border-cyan-400/20 bg-slate-950/75 p-8 shadow-[0_24px_80px_rgba(8,145,178,0.18)] backdrop-blur">
          <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-1 text-xs font-semibold tracking-[0.28em] text-cyan-200 uppercase">
            Member Center
          </div>
          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            歡迎回來，
            <span className="block bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-500 bg-clip-text text-transparent">
              {displayName || '會員'}
            </span>
          </h1>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">登入 Email</p>
              <p className="mt-2 break-all text-sm text-slate-200">{email || '尚未讀取到 email'}</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">會員狀態</p>
              <p className={`mt-2 text-sm font-bold ${active ? 'text-emerald-300' : 'text-amber-300'}`}>
                {active ? 'active' : membership?.membership_status || 'pending'}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <h2 className="text-lg font-bold text-white">目前你可確認的重點</h2>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-300">
              <li>• 會員登入與身份已由 Clerk 管理</li>
              <li>• 訂閱完成後，Lemon Squeezy webhook 會回寫 Supabase</li>
              <li>• 只有在 active / on_trial 時，才代表會員權限已開通</li>
            </ul>
          </div>

          {!setup.supabaseReady ? (
            <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5 text-sm leading-7 text-amber-50/90">
              Supabase 尚未完成設定，所以這裡目前只能顯示登入身份，還無法準確讀取會員訂閱回寫狀態。
            </div>
          ) : null}
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-slate-800 bg-slate-950/70 p-6">
            <h2 className="text-xl font-bold text-white">會員操作</h2>
            <div className="mt-4 flex flex-col gap-3">
              {!active ? (
                <Link
                  href="/api/billing/checkout"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
                >
                  前往訂閱付款
                </Link>
              ) : (
                <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                  你的標準會員已經開通。
                </div>
              )}

              <Link
                href="/membership"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/35 hover:text-white"
              >
                回到訂閱說明
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-950/70 p-6">
            <h2 className="text-lg font-bold text-white">回寫資訊摘要</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>• 會員方案：{membership?.plan_name || '尚未建立'}</p>
              <p>• Lemon 狀態：{membership?.lemon_status || 'none'}</p>
              <p>• 最後事件：{membership?.last_event_name || 'none'}</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
