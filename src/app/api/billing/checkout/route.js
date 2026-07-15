import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { buildCheckoutUrl } from '@/lib/membership-integrations';
import { getMembershipSetupStatus } from '@/lib/membership-setup';
import { localizePath, siteLocales } from '@/lib/locale';

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    const requestedLocale = request.nextUrl.searchParams.get('locale');
    const locale = siteLocales.includes(requestedLocale) ? requestedLocale : 'en';
    const setup = getMembershipSetupStatus();

    if (!setup.clerkReady) {
      return NextResponse.redirect(new URL(localizePath('/membership?setup=clerk', locale), request.url));
    }

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.redirect(new URL(localizePath('/sign-up', locale), request.url));
    }

    if (!setup.lemonCheckoutUrlReady) {
      return NextResponse.redirect(new URL(localizePath('/membership?setup=lemon', locale), request.url));
    }

    const user = await currentUser();
    const checkoutUrl = buildCheckoutUrl(user);

    if (!checkoutUrl) {
      return NextResponse.redirect(new URL(localizePath('/membership?setup=lemon', locale), request.url));
    }

    return NextResponse.redirect(checkoutUrl);
  } catch (error) {
    console.error('Membership checkout redirect error:', error);
    const requestedLocale = request.nextUrl.searchParams.get('locale');
    const locale = siteLocales.includes(requestedLocale) ? requestedLocale : 'en';
    return NextResponse.redirect(new URL(localizePath('/membership?setup=error', locale), request.url));
  }
}
