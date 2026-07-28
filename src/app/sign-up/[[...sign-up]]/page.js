'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignUp } from '@clerk/nextjs';
import { getLocaleFromPath, localizePath } from '@/lib/locale';

const clerkReady = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim());
const labels = { en: { title: 'Create your member account', text: 'Create an account to access membership, protected resources, and future releases.', back: 'View membership', signin: 'Already have an account? Sign in', setup: 'Clerk is not configured yet.' }, 'zh-Hant': { title: '建立你的會員帳戶', text: '建立帳戶即可使用會員方案、受保護資源與後續版本。', back: '查看會員方案', signin: '已有帳戶？登入', setup: 'Clerk 尚未完成設定。' }, 'zh-Hans': { title: '建立你的会员帐户', text: '建立帐户即可使用会员方案、受保护资源与后续版本。', back: '查看会员方案', signin: '已有帐户？登录', setup: 'Clerk 尚未完成设置。' } };
export default function SignUpPage() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const text = labels[locale] || labels.en;
  const signInPath = localizePath('/sign-in', locale);
  const signUpPath = localizePath('/sign-up', locale);
  const memberPath = localizePath('/member', locale);
  return <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_34%),linear-gradient(180deg,#020617_0%,#0f172a_100%)] px-4 py-14 text-white sm:px-6 lg:px-8"><div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1fr]"><section className="rounded-[2rem] border border-slate-800 bg-slate-950/75 p-8"><div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">Clerk Sign Up</div><h1 className="mt-5 text-3xl font-black sm:text-4xl">{text.title}</h1><p className="mt-4 text-sm leading-7 text-slate-300">{text.text}</p><div className="mt-8 flex flex-wrap gap-3"><Link href={localizePath('/membership', locale)} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400/35 hover:text-white">{text.back}</Link><Link href={localizePath('/sign-in', locale)} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300">{text.signin}</Link></div></section><section className="rounded-[2rem] border border-cyan-400/20 bg-slate-950/75 p-4 shadow-[0_24px_80px_rgba(8,145,178,0.14)]">{clerkReady ? <SignUp routing="path" path={signUpPath} signInUrl={signInPath} fallbackRedirectUrl={memberPath} /> : <div className="rounded-[1.5rem] border border-amber-400/20 bg-amber-400/10 p-6 text-amber-50/90"><h2 className="text-lg font-bold text-amber-100">{text.setup}</h2><Link href={localizePath('/membership?setup=clerk', locale)} className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-amber-200 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-100">{text.back}</Link></div>}</section></div></main>;
}