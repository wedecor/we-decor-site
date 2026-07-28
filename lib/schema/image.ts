import type { JsonLdNode } from './types';

export function buildImageObject(options: {
  url: string;
  caption?: string;
  name?: string;
  width?: number;
  height?: number;
}): JsonLdNode {
  const node: JsonLdNode = {
    '@type': 'ImageObject',
    url: options.url,
    contentUrl: options.url,
  };
  if (options.caption) node.caption = options.caption;
  if (options.name) node.name = options.name;
  if (options.width) node.width = options.width;
  if (options.height) node.height = options.height;
  return node;
}

export function buildImageItemList(
  images: ReadonlyArray<{ url: string; caption?: string; name?: string }>,
  listName: string,
  listId: string
): JsonLdNode {
  return {
    '@type': 'ItemList',
    '@id': listId,
    name: listName,
    numberOfItems: images.length,
    itemListElement: images.map((img, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: buildImageObject(img),
    })),
  };
}
