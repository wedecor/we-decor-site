import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Services | We Decor - Decoration, Catering & More in Bangalore',
  description: 'Comprehensive event services in Bangalore: decoration, catering, makeup artists, photography, and more. Professional event planning and execution by We Decor.',
  openGraph: {
    title: 'Event Services | We Decor - Decoration, Catering & More in Bangalore',
    description: 'Comprehensive event services in Bangalore: decoration, catering, makeup artists, photography, and more.',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event Services | We Decor - Decoration, Catering & More in Bangalore',
    description: 'Comprehensive event services in Bangalore: decoration, catering, makeup artists, photography, and more.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}