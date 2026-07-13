import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './env-guard';
import GoogleTagManager from '@/components/analytics/GoogleTagManager';
import AnalyticsPageView from '@/components/analytics/AnalyticsPageView';
import WebVitalsReporter from '@/components/WebVitalsReporter';
import CriticalStyles from '@/components/lux/CriticalStyles';
import { METADATA_BASE, getIndexingRobots } from '@/lib/metadata';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-cormorant',
});

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: {
    default: `${SITE_NAME} - Event Decoration Services in Bangalore`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  robots: getIndexingRobots(),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${cormorant.variable} dark`}
    >
      <body className={`${inter.className} min-h-screen bg-lux-bg text-lux-ivory`}>
        <GoogleTagManager />
        <CriticalStyles />
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
        <WebVitalsReporter />
        <AnalyticsPageView />
      </body>
    </html>
  );
}
