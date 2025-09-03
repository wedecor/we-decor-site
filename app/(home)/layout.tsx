import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'We Decor - Event Decoration Services in Bangalore',
  description:
    'Professional event decoration services in Bangalore. Birthday decor, wedding setup, haldi decoration, room decoration. Call +91 8880544452 for free quote!',
  openGraph: {
    title: 'We Decor - Event Decoration Services in Bangalore',
    description:
      'Professional event decoration services in Bangalore. Birthday decor, wedding setup, haldi decoration, room decoration.',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'We Decor - Event Decoration Services in Bangalore',
    description:
      'Professional event decoration services in Bangalore. Birthday decor, wedding setup, haldi decoration, room decoration.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}