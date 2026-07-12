const baseUrl = new URL(process.argv[2] || 'http://127.0.0.1:3100');
const localeRoots = ['/en', '/zh-Hant', '/zh-Hans'];
const queue = [...localeRoots];
const visited = new Map();
const failures = [];
const localeLeaks = [];

function normalizeHref(href, currentUrl) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
    return null;
  }

  try {
    const url = new URL(href, currentUrl);
    if (
      url.origin !== baseUrl.origin ||
      url.pathname.startsWith('/api/') ||
      url.pathname.startsWith('/_next/')
    ) {
      return null;
    }
    url.hash = '';
    return `${url.pathname}${url.search}`;
  } catch {
    return null;
  }
}

function extractLinks(html, currentUrl) {
  const links = new Set();
  const hrefPattern = /\shref=["']([^"']+)["']/gi;
  let match;

  while ((match = hrefPattern.exec(html))) {
    const href = normalizeHref(match[1], currentUrl);
    if (href) links.add(href);
  }

  return [...links];
}

function expectedLocale(pathname) {
  return pathname.match(/^\/(en|zh-Hant|zh-Hans)(?:\/|$)/)?.[1] || null;
}

while (queue.length > 0) {
  const path = queue.shift();
  if (visited.has(path) || visited.size >= 500) continue;

  const requestUrl = new URL(path, baseUrl);
  try {
    const response = await fetch(requestUrl, { redirect: 'follow' });
    const contentType = response.headers.get('content-type') || '';
    const html = contentType.includes('text/html') ? await response.text() : '';
    const finalUrl = new URL(response.url);

    visited.set(path, {
      status: response.status,
      finalPath: `${finalUrl.pathname}${finalUrl.search}`,
    });

    if (!response.ok) {
      failures.push({ path, status: response.status, finalPath: finalUrl.pathname });
      continue;
    }

    const locale = expectedLocale(new URL(path, baseUrl).pathname);
    if (locale && expectedLocale(finalUrl.pathname) !== locale) {
      localeLeaks.push({ path, expected: locale, finalPath: finalUrl.pathname });
    }

    for (const href of extractLinks(html, requestUrl)) {
      if (!visited.has(href)) queue.push(href);
    }
  } catch (error) {
    failures.push({ path, status: 'FETCH_ERROR', error: error instanceof Error ? error.message : String(error) });
  }
}

const report = {
  baseUrl: baseUrl.origin,
  checked: visited.size,
  failures,
  localeLeaks,
  pages: Object.fromEntries(visited),
};

console.log(JSON.stringify(report, null, 2));

if (failures.length > 0 || localeLeaks.length > 0) {
  process.exitCode = 1;
}
