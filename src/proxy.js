import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { detectLocaleFromHeaders } from '@/lib/locale';

export default clerkMiddleware(async (auth, request) => {
  const isMemberRoute = /^\/(?:(?:en|zh-Hant|zh-Hans)\/)?member(?:\/.*)?$/.test(request.nextUrl.pathname);

  if (isMemberRoute) {
    await auth.protect();
  }

  const localeMatch = request.nextUrl.pathname.match(/^\/(zh-Hant|zh-Hans|en)(\/.*)?$/);

  if (localeMatch) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-site-locale', localeMatch[1]);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  if (!request.nextUrl.pathname.startsWith('/api')) {
    const locale = detectLocaleFromHeaders(request.headers);
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = request.nextUrl.pathname === '/' ? `/${locale}` : `/${locale}${request.nextUrl.pathname}`;
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next|.*\..*).*)', '/(api|trpc)(.*)'],
};
