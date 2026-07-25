import { GEO, NAP, SCHEMA_IDS, getSameAsLinks } from '@/lib/local-seo/constants';
import { bangaloreAreaServed, buildPostalAddress } from './_helpers';
import type { JsonLdNode } from './types';

export function buildOrganization(): JsonLdNode {
  return {
    '@type': 'Organization',
    '@id': SCHEMA_IDS.organization,
    name: NAP.name,
    legalName: NAP.name,
    alternateName: NAP.alternateName,
    url: NAP.url,
    description: NAP.description,
    logo: {
      '@type': 'ImageObject',
      '@id': `${NAP.url}/#logo`,
      url: NAP.logo,
      contentUrl: NAP.logo,
      caption: `${NAP.name} logo`,
    },
    image: {
      '@type': 'ImageObject',
      url: NAP.image,
      contentUrl: NAP.image,
      caption: `${NAP.name} — event decorations in ${GEO.city}`,
    },
    email: NAP.email,
    telephone: NAP.telephone,
    address: buildPostalAddress(),
    areaServed: bangaloreAreaServed(),
    sameAs: getSameAsLinks(),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: NAP.telephone,
        email: NAP.email,
        contactType: 'customer service',
        areaServed: GEO.country,
        availableLanguage: ['English', 'Hindi', 'Kannada'],
      },
    ],
  };
}
