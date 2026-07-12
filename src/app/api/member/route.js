import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import {
  getDisplayName,
  getMembershipByEmail,
  getPrimaryEmailAddress,
  isMembershipActive,
} from '@/lib/membership-integrations';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
    }

    const user = await currentUser();
    const email = getPrimaryEmailAddress(user);
    const membership = email ? await getMembershipByEmail(email) : null;

    return NextResponse.json({
      ok: true,
      user: {
        displayName: getDisplayName(user),
        email,
      },
      membership,
      active: isMembershipActive(membership?.membership_status),
    });
  } catch (error) {
    console.error('Member data error:', error);
    return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 });
  }
}
