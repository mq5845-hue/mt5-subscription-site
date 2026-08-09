import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { defaultLocale, siteLocales } from './lib/locale';

const localePattern = siteLocales.join('|');
const hasClerkConfiguration = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export default clerkMiddleware(async (auth, request) => {
  const pathname = request.nextUrl.pathname;
  const isMemberRoute = new RegExp(`^/(?:(?:${localePattern})/)?member(?:/.*)?$`).test(pathname);
  if (isMemberRoute) {
    if (!hasClerkConfiguration) {
      const locale = pathname.match(new RegExp('^/(' + localePattern + ')'))?.[1] || defaultLocale;
      return NextResponse.redirect(new URL('/' + locale + '/sign-in', request.url));
    }
    await auth.protect();
  }

  const localeMatch = pathname.match(new RegExp(`^/(${localePattern})(/.*)?$`));
  if (localeMatch) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-site-locale', localeMatch[1]);
    const localizedUrl = request.nextUrl.clone();
    localizedUrl.pathname = localeMatch[2] || '/';
    return NextResponse.rewrite(localizedUrl, { request: { headers: requestHeaders } });
  }

  if (!pathname.startsWith('/api')) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(redirectUrl);
  }
  return NextResponse.next();
});

export const config = { matcher: ['/((?!_next|.*\\..*).*)', '/(api|trpc)(.*)'] };