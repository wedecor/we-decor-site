import type { Metadata } from 'next';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import StickyCTA from '@/components/StickyCTA';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './env-guard';
import Script from 'next/script';
import { GA_ID } from '@/lib/gtag';
import './_app-web-vitals.client';
import { poppins, playfair, inter } from './fonts';

export const metadata: Metadata = {
  title: 'We Decor - Event Decoration Services in Bangalore',
  description:
    'Professional event decoration services in Bangalore. Birthday decor, wedding setup, haldi decoration, room decoration. Call +91 8880544452 for free quote!',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};

export const viewport = {
  themeColor: '#10b981',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${inter.variable} ${playfair.variable} font-sans bg-white text-[#0f3d3e] dark:bg-[#0f3d3e] dark:text-[#faf7f2]`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 bg-emerald-600 text-white px-3 py-2 rounded"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <Navbar />
          <main id="main" className="pt-16 pb-16 min-h-screen transition-colors duration-200">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <StickyCTA />
        {GA_ID ? (
          <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
