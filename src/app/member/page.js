import { headers } from 'next/headers';
import MemberCenter from '@/components/MemberCenter';
import { getMembershipSetupStatus } from '@/lib/membership-setup';

export const metadata = {
  title: 'Member Center | AI-Quant Lab',
  description: 'AI-Quant Lab member center.',
};

export default async function MemberPage() {
  const requestHeaders = await headers();
  const locale = requestHeaders.get('x-site-locale') || 'en';
  const setup = getMembershipSetupStatus();

  return <MemberCenter locale={locale} supabaseReady={setup.supabaseReady} />;
}