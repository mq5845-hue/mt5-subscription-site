import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { buildCheckoutUrl } from '@/lib/membership-integrations';
import { getMembershipSetupStatus } from '@/lib/membership-setup';

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    const setup = getMembershipSetupStatus();

    if (!setup.clerkReady) {
      return NextResponse.redirect(new URL('/membership?setup=clerk', request.url));
    }

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.redirect(new URL('/sign-up', request.url));
    }

    if (!setup.lemonCheckoutUrlReady) {
      return NextResponse.redirect(new URL('/membership?setup=lemon', request.url));
    }

    const user = await currentUser();
    const checkoutUrl = buildCheckoutUrl(user);

    if (!checkoutUrl) {
      return NextResponse.redirect(new URL('/membership?setup=lemon', request.url));
    }

    return NextResponse.redirect(checkoutUrl);
  } catch (error) {
    console.error('Membership checkout redirect error:', error);
    return NextResponse.redirect(new URL('/membership?setup=error', request.url));
  }
}
