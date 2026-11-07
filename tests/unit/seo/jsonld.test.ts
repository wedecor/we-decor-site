import { describe, expect, it } from 'vitest';
import { serializeJsonLd } from '@/lib/seo';
import { CONTACT } from '@/lib/contact';
import { NAP, SCHEMA_IDS } from '@/lib/local-seo/constants';
import { absoluteUrl } from '@/lib/metadata';
import { AREAS, getAreaBySlug } from '@/app/(site)/_data/locations';
import { faqsForArea } from '@/app/(site)/_data/faqs';
import { BLOG_POSTS } from '@/lib/content/blog-posts';
import {
  DECORATION_SERVICE_SLUGS,
  getDecorationServicePage,
} from '@/lib/services/decoration-service-pages';
import { localityCrumbs } from '@/app/(site)/_components/LocalBizJsonLd';
import {
  buildAboutPageGraph,
  buildBlogPostingGraph,
  buildContactPageGraph,
  buildFaqSitePageGraph,
  buildGalleryPageGraph,
  buildHomePageGraph,
  buildLocalityPageGraph,
  buildLocalityServiceSchema,
  buildLocationsHubGraph,
  buildPricingPageGraph,
  buildReviewsPageGraph,
  buildServiceDetailGraph,
  buildServicesHubGraph,
  buildStaticPageGraph,
  withBreadcrumb,
  type GraphDocument,
  type JsonLdNode,
} from '@/lib/schema';

/**
 * Structured-data audit. Builds the same graphs the pages render and checks
 * the properties that matter to Google and to AI crawlers reading one page at
 * a time: one business entity, every reference resolvable, every Service
 * provided by that entity, nothing fabricated.
 */

type NamedGraph = { name: string; graph: GraphDocument };

function serviceGraph(slug: string): GraphDocument {
  const config = getDecorationServicePage(slug)!;
  return withBreadcrumb(
    buildServiceDetailGraph({
      name: config.title,
      description: config.description,
      path: `/services/${slug}`,
      serviceType: config.serviceType,
      serviceId: config.coreServiceId ?? slug,
      image: absoluteUrl(config.ogImage),
      faqs: config.faqs,
      includeServiceFaq: !config.faqs?.length,
    }),
    [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: config.title, path: `/services/${slug}` },
    ]
  );
}

function localityGraph(slug: string): GraphDocument {
  const area = getAreaBySlug(slug)!;
  const url = absoluteUrl(`/locations/${slug}`);
  return withBreadcrumb(
    buildLocalityPageGraph({
      name: `Event Decorators in ${area.name}`,
      description: `Event decorators in ${area.name}`,
      url,
      serviceNode: buildLocalityServiceSchema(area.name, slug, { landmark: area.landmarks?.[0] }),
      faqs: faqsForArea(slug, area.name).map((f) => ({ question: f.q, answer: f.a })),
    }),
    localityCrumbs(area.name, slug).map((c) => ({ name: c.name, path: c.href }))
  );
}

const crumbs = (name: string, path: string) => [
  { name: 'Home', path: '/' },
  { name, path },
];

const GRAPHS: NamedGraph[] = [
  { name: '/', graph: buildHomePageGraph() },
  {
    name: '/about',
    graph: withBreadcrumb(
      buildAboutPageGraph({ name: 'About', description: 'd' }),
      crumbs('About', '/about')
    ),
  },
  {
    name: '/contact',
    graph: withBreadcrumb(
      buildContactPageGraph({ name: 'Contact', description: 'd' }),
      crumbs('Contact', '/contact')
    ),
  },
  {
    name: '/faq',
    graph: withBreadcrumb(
      buildFaqSitePageGraph({ name: 'FAQ', description: 'd' }),
      crumbs('FAQ', '/faq')
    ),
  },
  {
    name: '/pricing',
    graph: withBreadcrumb(
      buildPricingPageGraph({ name: 'Pricing', description: 'd' }),
      crumbs('Pricing', '/pricing')
    ),
  },
  {
    name: '/reviews',
    graph: withBreadcrumb(
      buildReviewsPageGraph({ name: 'Reviews', description: 'd' }),
      crumbs('Reviews', '/reviews')
    ),
  },
  {
    name: '/privacy',
    graph: withBreadcrumb(
      buildStaticPageGraph({ name: 'Privacy', description: 'd', path: '/privacy' }),
      crumbs('Privacy', '/privacy')
    ),
  },
  {
    name: '/services',
    graph: withBreadcrumb(
      buildServicesHubGraph({
        name: 'Services',
        description: 'd',
        services: DECORATION_SERVICE_SLUGS.map((s) => ({ name: s, path: `/services/${s}` })),
      }),
      crumbs('Services', '/services')
    ),
  },
  {
    name: '/gallery',
    graph: withBreadcrumb(
      buildGalleryPageGraph({
        name: 'Gallery',
        description: 'd',
        images: [{ url: absoluteUrl('/og-banner.jpg'), caption: 'c', name: 'Haldi' }],
      }),
      crumbs('Gallery', '/gallery')
    ),
  },
  {
    name: '/locations',
    graph: withBreadcrumb(
      buildLocationsHubGraph({
        name: 'Locations',
        description: 'd',
        localityUrls: AREAS.map((a) => ({ name: a.name, slug: a.slug })),
      }),
      crumbs('Locations', '/locations')
    ),
  },
  ...DECORATION_SERVICE_SLUGS.map((slug) => ({
    name: `/services/${slug}`,
    graph: serviceGraph(slug),
  })),
  ...AREAS.map((a) => ({ name: `/locations/${a.slug}`, graph: localityGraph(a.slug) })),
  ...BLOG_POSTS.map((p) => ({
    name: `/blog/${p.slug}`,
    graph: withBreadcrumb(
      buildBlogPostingGraph({
        title: p.title,
        description: p.description,
        url: absoluteUrl(`/blog/${p.slug}`),
        image: p.featuredImage,
        datePublished: p.datePublished,
        dateModified: p.dateModified,
      }),
      [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: p.title, path: `/blog/${p.slug}` },
      ]
    ),
  })),
];

const nodesOf = (g: GraphDocument) => g['@graph'];
const typeOf = (n: JsonLdNode) => ([] as string[]).concat(n['@type'] as string | string[]);

/** Every `{ "@id": "..." }`-only object anywhere in the graph. */
function bareReferences(value: unknown, out: string[] = []): string[] {
  if (Array.isArray(value)) value.forEach((v) => bareReferences(v, out));
  else if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if (typeof obj['@id'] === 'string' && Object.keys(obj).length === 1) out.push(obj['@id']);
    else Object.values(obj).forEach((v) => bareReferences(v, out));
  }
  return out;
}

/** Every @id that is *defined* (carries properties beyond @id) anywhere in the graph. */
function definedIds(value: unknown, out: Set<string> = new Set()): Set<string> {
  if (Array.isArray(value)) value.forEach((v) => definedIds(v, out));
  else if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if (typeof obj['@id'] === 'string' && Object.keys(obj).length > 1) out.add(obj['@id']);
    Object.values(obj).forEach((v) => definedIds(v, out));
  }
  return out;
}

describe('JSON-LD serialisation', () => {
  it('escapes script-closing sequences so the payload cannot break out of its tag', () => {
    const payload = serializeJsonLd({ name: '</script><script>alert(1)</script>', note: '-->' });
    expect(payload).not.toContain('</script>');
    expect(payload).not.toContain('-->');
    expect(payload).toContain('\\u003c/script');
    // Still valid JSON after escaping — parsers decode the \u escapes.
    expect(JSON.parse(payload)).toEqual({
      name: '</script><script>alert(1)</script>',
      note: '-->',
    });
  });

  it.each(GRAPHS.map((g) => [g.name, g.graph] as const))(
    '%s round-trips through JSON',
    (_n, graph) => {
      const payload = serializeJsonLd(graph);
      expect(payload).not.toContain('</script');
      expect(JSON.parse(payload)).toEqual(JSON.parse(JSON.stringify(graph)));
    }
  );
});

describe('business entity', () => {
  it('uses one stable @id for the business everywhere', () => {
    expect(SCHEMA_IDS.organization).toBe(SCHEMA_IDS.localBusiness);
    expect(SCHEMA_IDS.localBusiness).toBe(`${NAP.url}/#localbusiness`);
  });

  it('defines the business on every page that references it, with consistent NAP', () => {
    const problems: string[] = [];
    for (const { name, graph } of GRAPHS) {
      const nodes = nodesOf(graph);
      const business = nodes.filter((n) => n['@id'] === SCHEMA_IDS.localBusiness);
      if (business.length !== 1) {
        problems.push(`${name}: ${business.length} business nodes`);
        continue;
      }
      const b = business[0];
      if (b.name !== NAP.name) problems.push(`${name}: name ${String(b.name)}`);
      if (b.telephone !== CONTACT.PRIMARY_NUMBER)
        problems.push(`${name}: telephone ${String(b.telephone)}`);
      if (b.url !== NAP.url) problems.push(`${name}: url ${String(b.url)}`);
      const addr = b.address as JsonLdNode | undefined;
      if (addr?.streetAddress !== NAP.streetAddress || addr?.postalCode !== NAP.postalCode) {
        problems.push(`${name}: address ${JSON.stringify(addr)}`);
      }
    }
    expect(problems).toEqual([]);
  });

  it('publishes AggregateRating on the homepage only', () => {
    // Google ignores self-published ratings on inner pages, and a second copy
    // risks a structured-data manual action. See CLAUDE.md.
    const withRating = GRAPHS.filter(({ graph }) =>
      nodesOf(graph).some((n) => n.aggregateRating !== undefined)
    ).map((g) => g.name);
    expect(withRating).toEqual(['/']);
    const home = nodesOf(GRAPHS[0].graph).find((n) => n['@id'] === SCHEMA_IDS.localBusiness)!;
    expect(home.aggregateRating).toMatchObject({ '@type': 'AggregateRating' });
  });

  it('never emits individual Review nodes', () => {
    const offenders = GRAPHS.filter(({ graph }) =>
      JSON.stringify(graph).includes('"@type":"Review"')
    ).map((g) => g.name);
    expect(offenders).toEqual([]);
  });
});

describe('references and services', () => {
  it('every bare @id reference resolves to a node in the same graph', () => {
    const dangling: string[] = [];
    for (const { name, graph } of GRAPHS) {
      // Hub pages define child WebPage nodes inline under hasPart (with @id and
      // url) and reference them from the ItemList — a definition is a
      // definition wherever it sits in the graph.
      const defined = definedIds(graph);
      const refs = Array.from(new Set(bareReferences(graph)));
      refs.filter((id) => !defined.has(id)).forEach((id) => dangling.push(`${name} → ${id}`));
    }
    expect(dangling).toEqual([]);
  });

  it('every Service names the business as provider and links to a real page', () => {
    const bad: string[] = [];
    for (const { name, graph } of GRAPHS) {
      for (const n of nodesOf(graph)) {
        if (!typeOf(n).includes('Service')) continue;
        const provider = n.provider as JsonLdNode | undefined;
        if (provider?.['@id'] !== SCHEMA_IDS.localBusiness)
          bad.push(`${name}: ${String(n['@id'])} provider`);
        if (typeof n.url === 'string' && !n.url.startsWith(NAP.url)) bad.push(`${name}: ${n.url}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('one WebPage per page, whose url is the page canonical', () => {
    const bad: string[] = [];
    for (const { name, graph } of GRAPHS) {
      const pages = nodesOf(graph).filter((n) =>
        typeOf(n).some((t) => /Page$/.test(t) && t !== 'FAQPage')
      );
      if (pages.length !== 1) bad.push(`${name}: ${pages.length} page nodes`);
      const expected = name === '/' ? NAP.url : `${NAP.url}${name}`;
      if (pages[0] && pages[0].url !== expected) bad.push(`${name}: url ${String(pages[0].url)}`);
    }
    expect(bad).toEqual([]);
  });

  it('breadcrumb trails match the page and end on the page itself', () => {
    const bad: string[] = [];
    for (const { name, graph } of GRAPHS) {
      if (name === '/') continue;
      const crumb = nodesOf(graph).find((n) => typeOf(n).includes('BreadcrumbList'));
      if (!crumb) {
        bad.push(`${name}: no BreadcrumbList`);
        continue;
      }
      const items = crumb.itemListElement as JsonLdNode[];
      const last = items[items.length - 1]?.item;
      if (last !== `${NAP.url}${name}`) bad.push(`${name}: last crumb ${String(last)}`);
      if (items[0]?.item !== `${NAP.url}/`)
        bad.push(`${name}: first crumb ${String(items[0]?.item)}`);
    }
    expect(bad).toEqual([]);
  });
});

describe('FAQPage', () => {
  it('has non-empty, non-duplicate questions on every page that emits one', () => {
    const bad: string[] = [];
    for (const { name, graph } of GRAPHS) {
      const faq = nodesOf(graph).find((n) => typeOf(n).includes('FAQPage'));
      if (!faq) continue;
      const qs = (faq.mainEntity as JsonLdNode[]).map((q) => ({
        q: String(q.name ?? ''),
        a: String((q.acceptedAnswer as JsonLdNode | undefined)?.text ?? ''),
      }));
      if (qs.length === 0) bad.push(`${name}: empty FAQPage`);
      qs.forEach((x, i) => {
        if (!x.q.trim() || !x.a.trim()) bad.push(`${name}[${i}] empty`);
      });
      const names = qs.map((x) => x.q.trim().toLowerCase());
      if (new Set(names).size !== names.length) bad.push(`${name}: duplicate question`);
    }
    expect(bad).toEqual([]);
  });

  it('does not repeat one locality FAQ answer across localities', () => {
    // The answer text, not just the question, must differ — swapping the
    // area name into one template fifty times is the doorway-page pattern.
    const seen = new Map<string, string>();
    const dupes: string[] = [];
    for (const a of AREAS) {
      for (const f of faqsForArea(a.slug, a.name)) {
        const key = f.a.replace(new RegExp(a.name, 'gi'), '{area}').trim().toLowerCase();
        const prior = seen.get(key);
        if (prior && prior !== a.slug) dupes.push(`${prior} / ${a.slug}: ${f.q.slice(0, 50)}`);
        else seen.set(key, a.slug);
      }
    }
    expect(dupes).toEqual([]);
  });
});
