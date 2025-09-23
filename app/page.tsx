import { SITE_URL } from '@/lib/site';
import { JsonLd } from '@/lib/seo';
import HomePageClient from '@/components/HomePageClient';

// List of services to display on the homepage
const services = [
  {
    title: 'Birthday Decoration',
    description:
      'Creative and vibrant birthday decorations for all ages. From themed parties to elegant celebrations, we bring your birthday vision to life with stunning decor arrangements.',
    image: '/services/birthday.JPG',
    href: '/services',
  },
  {
    title: 'Haldi Decoration',
    description:
      'Traditional and modern haldi ceremony decorations. Beautiful yellow-themed setups with traditional elements and contemporary touches for your special pre-wedding celebration.',
    image: '/services/haldi.jpg',
    href: '/services/haldi-decoration',
  },
  {
    title: 'Engagement Decoration',
    description:
      'Romantic and elegant engagement party decorations. Create the perfect atmosphere for your special moment with our professional decor services and stunning arrangements.',
    image: '/services/engagement.jpg',
    href: '/services/engagement-decoration',
  },
  {
    title: 'Corporate Event Decoration',
    description:
      'Professional corporate event decorations for meetings, conferences, and celebrations. Impress your clients and team with our sophisticated corporate decor solutions.',
    image: '/services/corporate.JPG',
    href: '/services/corporate-decoration',
  },
  {
    title: 'Tent & Balloon Setup',
    description:
      'Professional tent and balloon arrangements for outdoor events. From elegant balloon arches to complete tent setups, we handle all your outdoor decoration needs.',
    image: '/services/tent and baloon.jpg',
    href: '/services/tent-balloon-setup',
  },
  {
    title: 'Room Decoration',
    description:
      'Transform any space with our room decoration services. From intimate gatherings to large celebrations, we create beautiful and personalized room decor arrangements.',
    image: '/services/room decor.jpg',
    href: '/services/room-decoration',
  },
];

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
  telephone: '+91-8880544452',
  additionalProperty: [
    {
      '@type': 'PropertyValue',
      name: 'Secondary Phone',
      value: '+91-9591232166',
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
    images: [{ url: '/og/home.jpg', width: 1200, height: 630, alt: 'We Decor Bangalore' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'We Decor | Bangalore Decorators',
    description: 'Weddings, birthdays, haldi, more.',
    images: ['/og/home.jpg'],
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
