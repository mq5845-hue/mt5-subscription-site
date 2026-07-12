import { headers } from 'next/headers';
import LineKbSimplePage from '@/components/LineKbSimplePage';

export const metadata = { title: 'Formal FAQ Tree | AI-Quant Lab', description: 'A structured FAQ tree for the AI-Quant Lab LINE knowledge base.' };

export default async function FormalTreePage({ searchParams }) {
  const requestHeaders = await headers();
  const params = await searchParams;
  const queryLocale = Array.isArray(params?.__locale) ? params.__locale[0] : params?.__locale;
  const locale = queryLocale || requestHeaders.get('x-site-locale') || 'zh-Hant';
  return <LineKbSimplePage locale={locale} type="formal" />;
}
