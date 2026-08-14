import { absoluteUrl } from '@/lib/metadata';
import { SCHEMA_IDS } from '@/lib/local-seo/constants';
import { pageId } from './_helpers';
import { buildWebPage } from './webpage';
import type { JsonLdNode } from './types';

export function buildCollectionPageSchema(options: {
  name: string;
  description: string;
  pageUrl: string;
  items: ReadonlyArray<{ name: string; url: string; description?: string; image?: string }>;
}): JsonLdNode {
  const url = options.pageUrl.replace(/\/+$/, '') || options.pageUrl;
  return buildWebPage({
    type: 'CollectionPage',
    name: options.name,
    description: options.description,
    url,
    about: { '@id': SCHEMA_IDS.localBusiness },
    /*
     * Items that are their own page become bare @id references, using the same
     * @id that page emits for itself. The target page owns its name and
     * description, so a hub must not assert a competing name for the same @id.
     * The list label lives on ListItem.name in the companion ItemList.
     *
     * Fragment-only items (in-page anchors, e.g. gallery sections) are not
     * separately addressable entities, so they stay inline and un-@id'd.
     */
    hasPart: options.items.map((item) =>
      item.url.includes('#')
        ? {
            '@type': 'WebPage',
            name: item.name,
            url: item.url,
            ...(item.image
              ? { primaryImageOfPage: { '@type': 'ImageObject', url: item.image } }
              : {}),
          }
        : { '@type': 'WebPage', '@id': pageId(item.url, 'webpage'), url: item.url }
    ),
    mainEntity: {
      '@id': pageId(url, 'itemlist'),
    },
  });
}

/** Locations hub CollectionPage + ItemList (legacy shape enhanced). */
export function buildLocationsCollectionSchema(options: {
  name: string;
  pageUrl: string;
  localityUrls: { name: string; slug: string }[];
  description?: string;
}): JsonLdNode[] {
  const items = options.localityUrls.map((loc) => ({
    name: loc.name,
    url: absoluteUrl(`/locations/${loc.slug}`),
  }));

  const collection = buildCollectionPageSchema({
    name: options.name,
    description:
      options.description ??
      'Browse Bengaluru localities where We Decor Events provides event decorations.',
    pageUrl: options.pageUrl,
    items,
  });

  const itemList: JsonLdNode = {
    '@type': 'ItemList',
    '@id': pageId(options.pageUrl, 'itemlist'),
    name: 'Bengaluru service localities',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
      item: {
        '@type': 'Place',
        name: item.name,
        url: item.url,
      },
    })),
  };

  return [collection, itemList];
}

export function buildItemListSchema(options: {
  name: string;
  listId: string;
  items: ReadonlyArray<{ name: string; url: string; description?: string }>;
}): JsonLdNode {
  return {
    '@type': 'ItemList',
    '@id': options.listId,
    name: options.name,
    numberOfItems: options.items.length,
    itemListElement: options.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
      // References the WebPage node emitted for this URL (by the caller's
      // matching buildCollectionPageSchema hasPart, or by that page itself)
      // instead of spawning a second anonymous WebPage node per item.
      ...(item.url.includes('#') ? {} : { item: { '@id': pageId(item.url, 'webpage') } }),
    })),
  };
}
