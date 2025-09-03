import type { Metadata } from 'next';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './env-guard';
import Script from 'next/script';
import { GA_ID } from '@/lib/gtag';
import './_app-web-vitals.client';

export const metadata: Metadata = {
  title: 'We Decor - Event Decoration Services in Bangalore',
  description:
    'Professional event decoration services in Bangalore. Birthday decor, wedding setup, haldi decoration, room decoration. Call +91 8880544452 for free quote!',
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider>
          <Navbar />
          <main className="pt-20 pb-24 min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-200">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
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
