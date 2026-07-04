'use client';

import Link from 'next/link';
import { SignIn } from '@clerk/nextjs';

const clerkReady = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim());

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_34%),linear-gradient(180deg,#020617_0%,#0f172a_100%)] px-4 py-14 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1fr]">
        <section className="rounded-[2rem] border border-slate-800 bg-slate-950/75 p-8">
          <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
            Clerk Sign In
          </div>
          <h1 className="mt-5 text-3xl font-black sm:text-4xl">登入你的會員帳號</h1>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            登入後可以直接前往標準會員訂閱、查看會員狀態，並接續 Lemon Squeezy 的付款流程。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/membership"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400/35 hover:text-white"
            >
              回到會員頁
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              沒有帳號，去註冊
            </Link>
          </div>
        </section>

        <section className="rounded-[2rem] border border-cyan-400/20 bg-slate-950/75 p-4 shadow-[0_24px_80px_rgba(8,145,178,0.14)]">
          {clerkReady ? (
            <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" fallbackRedirectUrl="/member" />
          ) : (
            <div className="rounded-[1.5rem] border border-amber-400/20 bg-amber-400/10 p-6 text-amber-50/90">
              <h2 className="text-lg font-bold text-amber-100">Clerk 尚未完成設定</h2>
              <p className="mt-3 text-sm leading-7">
                目前沒有偵測到 `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`，所以登入表單先不顯示。請先補上
                Clerk 金鑰，再回來測試這個頁面。
              </p>
              <Link
                href="/membership?setup=clerk"
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-amber-200 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-100"
              >
                回到會員設定說明
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
