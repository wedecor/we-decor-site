import { absoluteUrl } from '@/lib/metadata';
import { pageId } from './_helpers';
import type { BreadcrumbCrumb, JsonLdNode } from './types';

/** BreadcrumbList with stable @id matching visual trail (absolute URLs). */
export function buildBreadcrumbSchema(crumbs: BreadcrumbCrumb[]): JsonLdNode {
  if (!crumbs.length) {
    return {
      '@type': 'BreadcrumbList',
      itemListElement: [],
    };
  }

  const pageUrl = absoluteUrl(crumbs[crumbs.length - 1].path);

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': pageId(pageUrl, 'breadcrumb'),
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** Graph-friendly node without @context (for @graph). */
export function buildBreadcrumbNode(crumbs: BreadcrumbCrumb[]): JsonLdNode {
  const schema = buildBreadcrumbSchema(crumbs);
  const { '@context': _ctx, ...node } = schema;
  return node;
}
