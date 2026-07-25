import { absoluteUrl } from '@/lib/metadata';
import { SCHEMA_IDS } from '@/lib/local-seo/constants';
import { PRICING_TIERS } from '@/lib/content/pricing-tiers';
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

function offerIdSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function buildPricingOfferCatalog(pageUrl: string): JsonLdNode {
  return {
    '@type': 'OfferCatalog',
    '@id': `${pageUrl.replace(/\/+$/, '')}#offer-catalog`,
    name: 'Event decoration starting prices',
    url: pageUrl,
    itemListElement: PRICING_TIERS.map((tier, index) => ({
      '@type': 'Offer',
      '@id': `${pageUrl.replace(/\/+$/, '')}#offer-${offerIdSlug(tier.name)}`,
      position: index + 1,
      name: tier.name,
      description: tier.description,
      url: pageUrl,
      priceCurrency: 'INR',
      price: String(tier.lowPrice),
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'INR',
        minPrice: tier.lowPrice,
        price: tier.lowPrice,
      },
      availability: 'https://schema.org/InStock',
      seller: { '@id': SCHEMA_IDS.localBusiness },
      itemOffered: {
        '@type': 'Service',
        name: tier.name,
        provider: { '@id': SCHEMA_IDS.localBusiness },
      },
    })),
  };
}

export function buildPricingOffersItemList(pageUrl: string): JsonLdNode {
  return {
    '@type': 'ItemList',
    '@id': `${pageUrl.replace(/\/+$/, '')}#itemlist`,
    name: 'Decoration pricing starting points',
    numberOfItems: PRICING_TIERS.length,
    itemListElement: PRICING_TIERS.map((tier, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tier.name,
      url: `${pageUrl}#${offerIdSlug(tier.name)}`,
      item: {
        '@type': 'Offer',
        name: tier.name,
        priceCurrency: 'INR',
        price: String(tier.lowPrice),
        availability: 'https://schema.org/InStock',
        seller: { '@id': SCHEMA_IDS.localBusiness },
        url: absoluteUrl('/pricing'),
      },
    })),
  };
}
