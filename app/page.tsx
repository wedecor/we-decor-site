import { SITE_URL } from '@/lib/site';
import { JsonLd } from '@/lib/seo';
import HomePageClient from '@/components/HomePageClient';
import { CONTACT } from '@/lib/contact';

// Structured data for SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'We Decor',
  description:
    "Bangalore's trusted decor experts for weddings, birthdays, haldi, and more. Professional event decoration services starting from ₹2999.",
  url: '/',
  logo: '/logo.png',
  image: '/og-banner.jpg',
  telephone: CONTACT.PRIMARY_NUMBER,
  additionalProperty: [
    {
      '@type': 'PropertyValue',
      name: 'Secondary Phone',
      value: CONTACT.SECONDARY_NUMBER,
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 12.9716,
    longitude: 77.5946,
  },
  openingHours: 'Mo-Su 09:00-18:00',
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, Credit Card, UPI, Bank Transfer',
  areaServed: {
    '@type': 'City',
    name: 'Bangalore',
  },
  serviceArea: {
    '@type': 'City',
    name: 'Bangalore',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Event Decoration Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Wedding Decoration',
          description:
            'Complete wedding decoration services including stage, mandap, and venue setup',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Birthday Decoration',
          description: 'Creative birthday party decorations for all ages',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Haldi Decoration',
          description: 'Traditional haldi ceremony decorations with yellow theme',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Corporate Event Decoration',
          description: 'Professional corporate event and conference decorations',
        },
      },
    ],
  },
  sameAs: ['https://www.facebook.com/wedecorevents', 'https://www.instagram.com/wedecorevents'],
};

export const metadata = {
  title: 'We Decor | Wedding & Birthday Decor in Bangalore',
  description:
    "Bangalore's trusted decor experts for weddings, birthdays, haldi, and more. Call +91 8880544452.",
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'We Decor | Wedding & Birthday Decor in Bangalore',
    description: 'Trusted event decorators in Bangalore',
    images: [{ url: '/og-banner.jpg', width: 1200, height: 630, alt: 'We Decor Bangalore' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'We Decor | Bangalore Decorators',
    description: 'Weddings, birthdays, haldi, more.',
    images: ['/og-banner.jpg'],
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <HomePageClient />
    </>
  );
}
