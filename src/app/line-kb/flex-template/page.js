import { headers } from 'next/headers';
import LineKbSimplePage from '@/components/LineKbSimplePage';

export const metadata = { title: 'Flex Templates | AI-Quant Lab', description: 'Reusable LINE reply templates for AI-Quant Lab.' };

export default async function FlexTemplatePage({ searchParams }) {
  const requestHeaders = await headers();
  const params = await searchParams;
  const queryLocale = Array.isArray(params?.__locale) ? params.__locale[0] : params?.__locale;
  const locale = queryLocale || requestHeaders.get('x-site-locale') || 'zh-Hant';
  return <LineKbSimplePage locale={locale} type="flex" />;
}
