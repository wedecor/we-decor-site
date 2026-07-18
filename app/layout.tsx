import type { Metadata } from 'next';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
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
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,

};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} ${playfair.variable} ${inter.variable} bg-white text-[#1e3a5f] dark:bg-[#1e3a5f] dark:text-[#faf7f2]`}>
        <ThemeProvider>
          <a
            href="#main"
            className="absolute -top-full left-4 focus:top-4 z-[100] px-4 py-2 rounded-lg bg-[#b76e7a] text-white font-semibold outline-none ring-2 ring-transparent focus:ring-[#1e3a5f] transition-[top]"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main" className="pt-20 pb-24 min-h-screen transition-colors duration-200">
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
