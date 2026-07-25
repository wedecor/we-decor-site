import { SCHEMA_IDS } from '@/lib/local-seo/constants';
import { buildWebPage } from './webpage';
import type { JsonLdNode } from './types';

export function buildAboutPageSchema(options: {
  name: string;
  description: string;
  url: string;
  primaryImage?: string;
}): JsonLdNode {
  return buildWebPage({
    type: 'AboutPage',
    name: options.name,
    description: options.description,
    url: options.url,
    primaryImage: options.primaryImage,
    about: { '@id': SCHEMA_IDS.organization },
    mainEntity: { '@id': SCHEMA_IDS.organization },
  });
}
