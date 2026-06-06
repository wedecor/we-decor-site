/**
 * Additional LocalBusiness JSON-LD schema block for the homepage.
 * NOTE: this is supplemental to the existing organization/LocalBusiness graph
 * in lib/local-seo/schema.ts (HomeJsonLd) and is rendered as its own script tag.
 */
const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'We Decor',
  alternateName: 'We Decor Events',
  description:
    'Premium event decoration company in Bengaluru specializing in weddings, birthdays, haldi, engagements, and corporate events.',
  url: 'https://www.wedecorevents.com',
  logo: 'https://www.wedecorevents.com/logo.png',
  image: 'https://www.wedecorevents.com/og-banner.webp',
  telephone: ['+918880544452', '+919591232166'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Royal Manor, Ranoji Rao Rd',
    addressLocality: 'Basavanagudi',
    addressRegion: 'Karnataka',
    postalCode: '560004',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 12.9416,
    longitude: 77.5741,
  },
  openingHours: 'Mo-Su 09:00-21:00',
  priceRange: '₹₹',
  sameAs: ['https://www.instagram.com/wedecorbangalore'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Event Decoration Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wedding Decoration' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Birthday Decoration' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Haldi Decoration' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Engagement Decoration' } },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Corporate Event Decoration' },
      },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Room Decoration' } },
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '75',
    bestRating: '5',
  },
};

export default function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
    />
  );
}
