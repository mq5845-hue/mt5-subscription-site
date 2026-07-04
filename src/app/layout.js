import { ClerkProvider } from '@clerk/nextjs';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
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
const siteDescription =
  'AI-Quant Lab 專注於 MQL5 原始碼研發、AI 模組化提示詞工程與量化技術教學。';

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

export default function RootLayout({ children }) {
  return (
    <html
      lang="zh-Hant"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <Script
            id="detect-android"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(){try{if(/Android/i.test(navigator.userAgent)){document.documentElement.classList.add('is-android');}}catch(e){}})();`,
            }}
          />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
