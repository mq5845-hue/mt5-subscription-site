import { ClerkProvider } from '@clerk/nextjs';
import { headers } from 'next/headers';
import { defaultLocale } from '@/lib/locale';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import SiteChrome from '@/components/SiteChrome';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-quant-lab.vercel.app';
const siteDescription = 'AI-Quant Lab brings MQL5 quantitative strategies, AI workflows, and practical knowledge resources together in one clear member experience.';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'AI-Quant Lab',
    template: '%s | AI-Quant Lab',
  },
  description: siteDescription,
  openGraph: {
    title: 'AI-Quant Lab',
    description: siteDescription,
    url: siteUrl,
    siteName: 'AI-Quant Lab',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'AI-Quant Lab',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Quant Lab',
    description: siteDescription,
    images: ['/og-image.svg'],
  },
};

export default async function RootLayout({ children }) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get('x-site-locale') || defaultLocale;

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <Script
            id="detect-locale"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var p=window.location.pathname;var m=p.match(/^\/(en|zh-Hant|zh-Hans)(?=\/|$)/);var l=m?m[1]:(/^(zh-TW|zh-HK|zh-MO)/i.test(navigator.language)?'zh-Hant':(/^zh/i.test(navigator.language)?'zh-Hans':(/^en/i.test(navigator.language)?'en':'zh-Hant')));document.documentElement.lang=l;}catch(e){}})();`,
            }}
          />          <Script
            id="detect-android"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(){try{if(/Android/i.test(navigator.userAgent)){document.documentElement.classList.add('is-android');}}catch(e){}})();`,
            }}
          />
          <SiteChrome>{children}</SiteChrome>
        </ClerkProvider>
      </body>
    </html>
  );
}
