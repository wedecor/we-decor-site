import { JsonLd } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#localbusiness`,
  name: 'We Decor',
  description:
    "Bangalore's trusted decor experts for weddings, birthdays, haldi, and more. Professional event decoration services starting from ₹2999.",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.webp`,
  image: `${SITE_URL}/og-banner.webp`,
  telephone: '+91-8880544452',
  additionalProperty: [
    { '@type': 'PropertyValue', name: 'Secondary Phone', value: '+91-9591232166' },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 12.9716, longitude: 77.5946 },
  openingHours: 'Mo-Su 09:00-18:00',
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, Credit Card, UPI, Bank Transfer',
  areaServed: { '@type': 'City', name: 'Bangalore' },
  serviceArea: { '@type': 'City', name: 'Bangalore' },
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

export default function HomeJsonLd() {
  return (
    <>
      <JsonLd data={localBusiness} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': `${SITE_URL}/#org`,
          name: 'We Decor',
          url: SITE_URL,
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.webp` },
          sameAs: [
            'https://www.instagram.com/wedecorevents',
            'https://www.facebook.com/wedecorevents',
          ],
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: 'We Decor',
        }}
      />
    </>
  );
}
