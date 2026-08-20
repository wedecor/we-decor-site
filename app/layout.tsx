import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './env-guard';
import GoogleTagManager from '@/components/analytics/GoogleTagManager';
import CriticalStyles from '@/components/lux/CriticalStyles';
import DeferredClientWidgets from '@/components/layout/DeferredClientWidgets';
import { METADATA_BASE, getIndexingRobots } from '@/lib/metadata';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: {
    default: `${SITE_NAME} - Event Decorations Services in Bangalore`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  robots: getIndexingRobots(),
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${cormorant.variable} dark`}
    >
      <body className={`${inter.className} min-h-screen bg-lux-bg text-lux-ivory`}>
        <CriticalStyles />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-lux-emerald focus:text-white focus:text-sm focus:font-medium focus:outline-none focus:ring-2 focus:ring-lux-gold"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <DeferredClientWidgets />
        {/* Analytics last — lazyOnload GTM must not precede hero paint */}
        <GoogleTagManager />
      </body>
    </html>
  );
}
