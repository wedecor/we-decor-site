import { GEO, NAP, SCHEMA_IDS } from '@/lib/local-seo/constants';
import { optionalEmail } from './_helpers';
import { buildWebPage } from './webpage';
import type { JsonLdNode } from './types';

export function buildContactPageSchema(options: {
  name: string;
  description: string;
  url: string;
}): JsonLdNode[] {
  const contactPoint: JsonLdNode = {
    '@type': 'ContactPoint',
    '@id': `${options.url.replace(/\/+$/, '')}#contactpoint`,
    telephone: NAP.telephone,
    ...optionalEmail(NAP.email),
    contactType: 'customer service',
    areaServed: GEO.country,
    availableLanguage: ['English', 'Hindi', 'Kannada'],
  };

  const page = buildWebPage({
    type: 'ContactPage',
    name: options.name,
    description: options.description,
    url: options.url,
    about: { '@id': SCHEMA_IDS.localBusiness },
    mainEntity: contactPoint,
  });

  return [page, contactPoint];
}
