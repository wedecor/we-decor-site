import type { Metadata } from 'next';
import { inter } from './fonts';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import './env-guard';


export const metadata: Metadata = {
  title: 'We Decor - Event Decoration Services in Bangalore',
  description: 'Professional event decoration services in Bangalore. Birthday decor, wedding setup, haldi decoration, room decoration. Call +91 8880544452 for free quote!',
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
} 