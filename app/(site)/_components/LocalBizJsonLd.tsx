export default function LocalBizJsonLd({ areaName }: { areaName: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'We Decor',
    url: 'https://www.wedecorevents.com',
    telephone: '+91 9591232166',
    areaServed: `${areaName}, Bengaluru`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bengaluru',
      addressRegion: 'KA',
      addressCountry: 'IN',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Event Decoration Services',
      itemListElement: [
        { '@type': 'Offer', name: 'Birthday Decoration' },
        { '@type': 'Offer', name: 'Haldi Decoration' },
        { '@type': 'Offer', name: 'Wedding Decoration' },
        { '@type': 'Offer', name: 'Corporate Events' },
        { '@type': 'Offer', name: 'Balloon Decoration' },
        { '@type': 'Offer', name: 'Floral Arrangements' },
      ],
    },
    description: `Professional event decoration services in ${areaName}, Bangalore. We specialize in birthday, wedding, haldi, and corporate event decoration with custom themes and professional setup.`,
    priceRange: '₹₹',
    openingHours: 'Mo-Su 09:00-21:00',
    sameAs: ['https://instagram.com/wedecorbangalore'],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
