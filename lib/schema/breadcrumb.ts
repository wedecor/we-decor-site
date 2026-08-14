import { absoluteUrl } from '@/lib/metadata';
import { pageId } from './_helpers';
import type { BreadcrumbCrumb, GraphDocument, JsonLdNode } from './types';

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

/**
 * Append a BreadcrumbList to a page graph so it lives in the same @graph as the
 * WebPage node that references it via `breadcrumb: { "@id": "…#breadcrumb" }`.
 * The @id `buildBreadcrumbSchema` derives from the last crumb already matches
 * the one `buildWebPage` emits, so the reference resolves without extra wiring.
 */
export function withBreadcrumb(graph: GraphDocument, crumbs: BreadcrumbCrumb[]): GraphDocument {
  if (!crumbs.length) return graph;
  return { ...graph, '@graph': [...graph['@graph'], buildBreadcrumbNode(crumbs)] };
}
