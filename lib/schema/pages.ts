import { absoluteUrl } from '@/lib/metadata';
import { CORE_DECORATION_SERVICES, NAP, SCHEMA_IDS } from '@/lib/local-seo/constants';
import { SITE_FAQS } from '@/lib/content/site-faq';
import { SERVICE_PAGE_FAQS } from '@/lib/content/service-faq';
import { asGraph, pageId } from './_helpers';
import { buildOrganization } from './organization';
import { buildLocalBusiness } from './local-business';
import { buildWebSite } from './website';
import { buildWebPage } from './webpage';
import { buildCoreServiceCatalog, buildCoreServiceNodes, buildServiceSchema } from './service';
import { buildFaqPageNode } from './faq';
import { buildAboutPageSchema } from './about';
import { buildContactPageSchema } from './contact';
import {
  buildCollectionPageSchema,
  buildItemListSchema,
  buildLocationsCollectionSchema,
} from './collection';
import { buildPricingOfferCatalog, buildPricingOffersItemList } from './offer';
import { buildImageItemList, buildImageObject } from './image';
import type { GraphDocument, JsonLdNode } from './types';

/** Homepage: Organization + LocalBusiness + WebSite + Services + WebPage. */
export function buildHomePageGraph(): GraphDocument {
  const url = NAP.url;
  return asGraph(
    buildOrganization(),
    buildLocalBusiness(),
    buildWebSite(),
    buildWebPage({
      name: `${NAP.name} | Event Decorations in Bengaluru`,
      description: NAP.description,
      url,
      primaryImage: NAP.image,
      includeBreadcrumb: false,
    }),
    ...buildCoreServiceNodes()
  );
}

export function buildAboutPageGraph(options: { name: string; description: string }): GraphDocument {
  const url = absoluteUrl('/about');
  return asGraph(
    buildAboutPageSchema({
      name: options.name,
      description: options.description,
      url,
      primaryImage: NAP.image,
    })
  );
}

export function buildContactPageGraph(options: {
  name: string;
  description: string;
}): GraphDocument {
  const url = absoluteUrl('/contact');
  return asGraph(
    ...buildContactPageSchema({
      name: options.name,
      description: options.description,
      url,
    })
  );
}

export function buildFaqSitePageGraph(options: {
  name: string;
  description: string;
}): GraphDocument {
  const url = absoluteUrl('/faq');
  const faq = buildFaqPageNode([...SITE_FAQS], url);
  return asGraph(
    buildWebPage({
      name: options.name,
      description: options.description,
      url,
      mainEntity: { '@id': pageId(url, 'faq') },
    }),
    faq
  );
}

export function buildPricingPageGraph(options: {
  name: string;
  description: string;
}): GraphDocument {
  const url = absoluteUrl('/pricing');
  const catalog = buildPricingOfferCatalog(url);
  return asGraph(
    buildWebPage({
      name: options.name,
      description: options.description,
      url,
      mainEntity: { '@id': catalog['@id'] as string },
    }),
    catalog,
    buildPricingOffersItemList(url)
  );
}

export function buildServicesHubGraph(options: {
  name: string;
  description: string;
  services: ReadonlyArray<{ name: string; path: string; description?: string }>;
}): GraphDocument {
  const url = absoluteUrl('/services');
  const items = options.services.map((s) => ({
    name: s.name,
    url: absoluteUrl(s.path),
    description: s.description,
  }));
  const itemList = buildItemListSchema({
    name: 'Decoration & partner services',
    listId: pageId(url, 'itemlist'),
    items,
  });
  return asGraph(
    buildCollectionPageSchema({
      name: options.name,
      description: options.description,
      pageUrl: url,
      items,
    }),
    itemList
  );
}

export function buildGalleryPageGraph(options: {
  name: string;
  description: string;
  images: ReadonlyArray<{ url: string; caption: string; name?: string }>;
}): GraphDocument {
  const url = absoluteUrl('/gallery');
  const representative = options.images[0];
  const imageList = buildImageItemList(
    options.images,
    'Gallery collections',
    pageId(url, 'itemlist')
  );
  return asGraph(
    buildCollectionPageSchema({
      name: options.name,
      description: options.description,
      pageUrl: url,
      items: options.images.map((img) => ({
        name: img.name ?? img.caption,
        url: absoluteUrl(
          `/gallery#${(img.name ?? img.caption).toLowerCase().replace(/\s+/g, '-')}`
        ),
        image: img.url,
      })),
    }),
    imageList,
    representative
      ? {
          ...buildImageObject({
            url: representative.url,
            caption: representative.caption,
            name: representative.name ?? 'Representative gallery image',
          }),
          '@id': pageId(url, 'primaryimage'),
          representativeOfPage: true,
        }
      : null
  );
}

export function buildLocationsHubGraph(options: {
  name: string;
  description: string;
  localityUrls: { name: string; slug: string }[];
}): GraphDocument {
  return asGraph(
    ...buildLocationsCollectionSchema({
      name: options.name,
      description: options.description,
      pageUrl: absoluteUrl('/locations'),
      localityUrls: options.localityUrls,
    })
  );
}

/**
 * Reviews page: WebPage only, pointing at the sitewide LocalBusiness by @id.
 *
 * Deliberately emits no AggregateRating or Review nodes. Google ignores ratings
 * a business publishes about itself for review snippets, so they earn nothing,
 * and Places API review content carries caching terms that do not sit well with
 * republishing it as structured data.
 */
export function buildReviewsPageGraph(options: {
  name: string;
  description: string;
}): GraphDocument {
  return asGraph(
    buildWebPage({
      name: options.name,
      description: options.description,
      url: absoluteUrl('/reviews'),
      about: { '@id': SCHEMA_IDS.localBusiness },
    })
  );
}

export function buildServiceDetailGraph(options: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  serviceId?: string;
  image?: string;
  includeServiceFaq?: boolean;
  /** Page-specific FAQs take priority over shared SERVICE_PAGE_FAQS. */
  faqs?: ReadonlyArray<{ question: string; answer: string }>;
  /**
   * Force a site-scoped `/#service-{id}` @id for a service that is not in
   * CORE_DECORATION_SERVICES (e.g. the umbrella decoration service).
   */
  useSiteScopedId?: boolean;
  /** Attach the core decoration services as a nested OfferCatalog. */
  includesCoreServices?: boolean;
}): GraphDocument {
  const url = absoluteUrl(options.path);
  const isCore = Boolean(
    options.serviceId && CORE_DECORATION_SERVICES.some((s) => s.id === options.serviceId)
  );

  const service = buildServiceSchema({
    name: options.name,
    serviceType: options.serviceType,
    description: options.description,
    path: options.path,
    serviceId: options.serviceId,
    useSiteScopedId: options.useSiteScopedId ?? isCore,
    image: options.image,
    hasOfferCatalog: options.includesCoreServices
      ? buildCoreServiceCatalog(pageId(url, 'catalog'))
      : undefined,
  });

  const faqSource =
    options.faqs && options.faqs.length > 0
      ? options.faqs
      : options.includeServiceFaq
        ? [...SERVICE_PAGE_FAQS]
        : null;
  const faq = faqSource ? buildFaqPageNode(faqSource, url) : null;

  return asGraph(
    buildWebPage({
      name: options.name,
      description: options.description,
      url,
      primaryImage: options.image,
      mainEntity: { '@id': service['@id'] as string },
    }),
    service,
    faq
  );
}

/** Blog hub: CollectionPage + ItemList of posts — same shape as buildServicesHubGraph. */
export function buildBlogHubGraph(options: {
  name: string;
  description: string;
  posts: ReadonlyArray<{ title: string; path: string; description?: string; image?: string }>;
}): GraphDocument {
  const url = absoluteUrl('/blog');
  const items = options.posts.map((p) => ({
    name: p.title,
    url: absoluteUrl(p.path),
    description: p.description,
    image: p.image ? (p.image.startsWith('http') ? p.image : absoluteUrl(p.image)) : undefined,
  }));
  const itemList = buildItemListSchema({
    name: 'Celebration insights — planning guides',
    listId: pageId(url, 'itemlist'),
    items,
  });
  return asGraph(
    buildCollectionPageSchema({
      name: options.name,
      description: options.description,
      pageUrl: url,
      items,
    }),
    itemList
  );
}

export function buildLocalityPageGraph(options: {
  name: string;
  description: string;
  url: string;
  serviceNode: JsonLdNode;
  faqs?: ReadonlyArray<{ question: string; answer: string }>;
}): GraphDocument {
  const faq = options.faqs?.length ? buildFaqPageNode(options.faqs, options.url) : null;

  return asGraph(
    buildWebPage({
      name: options.name,
      description: options.description,
      url: options.url,
      mainEntity: { '@id': options.serviceNode['@id'] as string },
    }),
    options.serviceNode,
    faq
  );
}
