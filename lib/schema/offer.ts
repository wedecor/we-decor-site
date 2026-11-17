import { SCHEMA_IDS } from '@/lib/local-seo/constants';
import { PRICING_PACKAGES } from '@/lib/content/pricing-tiers';
import { absoluteUrl } from '@/lib/metadata';
import { bangaloreAreaServed } from './_helpers';
import type { JsonLdNode } from './types';

export function buildServiceOffer(options: {
  name: string;
  url: string;
  lowPrice: number;
}): JsonLdNode {
  return {
    '@type': 'Offer',
    name: options.name,
    url: options.url,
    priceCurrency: 'INR',
    price: String(options.lowPrice),
    priceSpecification: {
      '@type': 'PriceSpecification',
      priceCurrency: 'INR',
      minPrice: options.lowPrice,
      price: options.lowPrice,
    },
    availability: 'https://schema.org/InStock',
    seller: { '@id': SCHEMA_IDS.localBusiness },
  };
}

export function buildPricingOfferCatalog(pageUrl: string): JsonLdNode {
  const baseId = pageUrl.replace(/\/+$/, '');
  return {
    '@type': 'OfferCatalog',
    '@id': `${baseId}#offer-catalog`,
    name: 'Decoration Packages',
    url: pageUrl,
    itemListElement: PRICING_PACKAGES.map((pkg, index) => {
      const serviceUrl = absoluteUrl(pkg.servicePageHref);
      return {
        '@type': 'Offer',
        '@id': `${baseId}#offer-${pkg.slug}`,
        position: index + 1,
        name: pkg.name,
        description: pkg.description,
        url: serviceUrl,
        priceCurrency: 'INR',
        price: String(pkg.priceFrom),
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'INR',
          minPrice: pkg.priceFrom,
          price: pkg.priceFrom,
        },
        availability: 'https://schema.org/InStock',
        seller: { '@id': SCHEMA_IDS.localBusiness },
        itemOffered: {
          '@type': 'Service',
          name: pkg.name,
          url: serviceUrl,
          areaServed: bangaloreAreaServed(),
          provider: { '@id': SCHEMA_IDS.localBusiness },
        },
      };
    }),
  };
}
