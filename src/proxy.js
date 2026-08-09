import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { defaultLocale, siteLocales } from './lib/locale';

const localePattern = siteLocales.join('|');
const hasClerkConfiguration = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

async function localeProxy(request) {
  const pathname = request.nextUrl.pathname;
  const isMemberRoute = new RegExp(`^/(?:(?:${localePattern})/)?member(?:/.*)?$`).test(pathname);

  if (isMemberRoute && !hasClerkConfiguration) {
    const locale = pathname.match(new RegExp(`^/(${localePattern})`))?.[1] || defaultLocale;
    const signInUrl = request.nextUrl.clone();
    signInUrl.pathname = `/${locale}/sign-in`;
    return NextResponse.redirect(signInUrl);
  }

  const localeMatch = pathname.match(new RegExp(`^/(${localePattern})(?:/|$)`));
  if (localeMatch) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-site-locale', localeMatch[1]);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  if (!pathname.startsWith('/api')) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

const proxy = hasClerkConfiguration
  ? clerkMiddleware(async (auth, request) => {
      const pathname = request.nextUrl.pathname;
      const isMemberRoute = new RegExp(`^/(?:(?:${localePattern})/)?member(?:/.*)?$`).test(pathname);
      if (isMemberRoute) await auth.protect();
      return localeProxy(request);
    })
  : localeProxy;

export default proxy;

export const config = { matcher: ['/((?!_next|.*\\..*).*)', '/(api|trpc)(.*)'] };