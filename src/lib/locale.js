export const siteLocales = ['en', 'zh-Hant', 'zh-Hans'];

export const defaultLocale = 'en';
export function detectLocaleFromHeaders(headers) {
  const acceptLanguage = headers.get('accept-language') || '';
  const ranges = acceptLanguage.split(',').map((part) => part.trim().split(';')[0].toLowerCase());

  for (const range of ranges) {
    if (range === 'en' || range.startsWith('en-')) return 'en';
    if (range === 'zh-tw' || range === 'zh-hk' || range === 'zh-mo' || range === 'zh-hant') return 'zh-Hant';
    if (range === 'zh' || range.startsWith('zh-') || range === 'zh-hans') return 'zh-Hans';
  }

  const country = (headers.get('x-vercel-ip-country') || '').toUpperCase();
  if (['TW', 'HK', 'MO'].includes(country)) return 'zh-Hant';
  if (['CN', 'SG', 'MY'].includes(country)) return 'zh-Hans';

  return defaultLocale;
}

export function getLocaleFromPath(pathname = '') {
  const match = pathname.match(/^\/(zh-Hant|zh-Hans|en)(?=\/|$)/);
  return match?.[1] || defaultLocale;
}

export function stripLocale(pathname = '') {
  const stripped = pathname.replace(/^\/(zh-Hant|zh-Hans|en)(?=\/|$)/, '');
  return stripped || '/';
}

export function localizePath(pathname = '/', locale = defaultLocale) {
  if (!pathname || pathname.startsWith('#') || /^https?:\/\//.test(pathname)) {
    return pathname;
  }

  const [pathAndQuery, hash = ''] = pathname.split('#');
  const [pathOnly, query = ''] = pathAndQuery.split('?');
  const cleanPath = stripLocale(pathOnly || '/');
  const localizedPath = cleanPath === '/' ? '/' + locale : '/' + locale + cleanPath;
  const suffix = (query ? '?' + query : '') + (hash ? '#' + hash : '');

  return localizedPath + suffix;
}
