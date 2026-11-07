/**
 * Registry of every indexable HTML route, built from the same data the App
 * Router uses to generate pages. The SEO tests load each route's real
 * `metadata` / `generateMetadata` output and compare it with the sitemap, so
 * adding a page in one place and forgetting the other fails the build.
 *
 * Not a test file (no `.test.ts`), so vitest does not collect it.
 */
import type { Metadata } from 'next';
import { AREAS } from '@/app/(site)/_data/locations';
import { DECORATION_SERVICE_SLUGS } from '@/lib/services/decoration-service-pages';
import { BLOG_POSTS } from '@/lib/content/blog-posts';

export type RouteEntry = {
  /** Path as it appears in the sitemap and canonical (`/` for the homepage). */
  path: string;
  /** Loads the page module and resolves its metadata. */
  load: () => Promise<Metadata>;
  /** True when the page deliberately carries `noindex`. */
  noindex?: boolean;
};

type StaticModule = { metadata: Metadata };
type DynamicModule<P> = { generateMetadata: (props: { params: Promise<P> }) => Promise<Metadata> };

function staticRoute(path: string, importer: () => Promise<StaticModule>, noindex = false) {
  return { path, noindex, load: async () => (await importer()).metadata } satisfies RouteEntry;
}

function dynamicRoute<P>(
  path: string,
  importer: () => Promise<DynamicModule<P>>,
  params: P
): RouteEntry {
  return {
    path,
    load: async () => (await importer()).generateMetadata({ params: Promise.resolve(params) }),
  };
}

export const STATIC_ROUTES: RouteEntry[] = [
  staticRoute('/', () => import('@/app/page')),
  staticRoute('/about', () => import('@/app/about/page')),
  // The hub's metadata lives on the segment layout; `app/services/page.tsx`
  // exports none of its own. Child pages override it with their own absolute titles.
  staticRoute('/services', () => import('@/app/services/layout')),
  staticRoute(
    '/services/birthday-decoration',
    () => import('@/app/services/birthday-decoration/page')
  ),
  staticRoute('/services/decoration', () => import('@/app/services/decoration/page')),
  staticRoute('/gallery', () => import('@/app/gallery/page')),
  staticRoute('/blog', () => import('@/app/blog/page')),
  staticRoute('/pricing', () => import('@/app/pricing/page')),
  staticRoute('/faq', () => import('@/app/faq/page')),
  staticRoute('/contact', () => import('@/app/contact/page')),
  staticRoute('/reviews', () => import('@/app/reviews/page')),
  staticRoute('/locations', () => import('@/app/(site)/locations/page')),
  staticRoute('/privacy', () => import('@/app/privacy/page')),
  staticRoute('/thank-you', () => import('@/app/thank-you/page'), true),
];

export const SERVICE_ROUTES: RouteEntry[] = DECORATION_SERVICE_SLUGS.map((slug) =>
  dynamicRoute(`/services/${slug}`, () => import('@/app/services/[slug]/page'), { slug })
);

export const LOCALITY_ROUTES: RouteEntry[] = AREAS.map((a) =>
  dynamicRoute(`/locations/${a.slug}`, () => import('@/app/(site)/locations/[slug]/page'), {
    slug: a.slug,
  })
);

export const BLOG_ROUTES: RouteEntry[] = BLOG_POSTS.map((p) =>
  dynamicRoute(`/blog/${p.slug}`, () => import('@/app/blog/[slug]/page'), { slug: p.slug })
);

export const ALL_ROUTES: RouteEntry[] = [
  ...STATIC_ROUTES,
  ...SERVICE_ROUTES,
  ...LOCALITY_ROUTES,
  ...BLOG_ROUTES,
];

export const INDEXABLE_ROUTES: RouteEntry[] = ALL_ROUTES.filter((r) => !r.noindex);

/** Non-HTML route handlers that internal links may legitimately point at. */
export const HANDLER_ROUTES = [
  '/sitemap.xml',
  '/robots.txt',
  '/image-sitemap',
  '/llms.txt',
  '/llms-full.txt',
];

/** Paths that exist only to 301 — valid destinations for old URLs, never for new internal links. */
export const REDIRECT_ONLY_PATHS = [
  '/services/wedding-decoration',
  '/services/birthday-home-decoration',
  '/services/haldi-backdrop-decor',
  '/services/wedding-stage-decor',
  '/services/catering',
  '/services/hair-stylists',
  '/services/makeup-artists',
  '/services/mehndi-artists',
  '/services/photographers',
  '/services/videographers',
  '/areas',
  '/sentry-example-page',
  '/api/sitemap.xml',
];

/** Pull a plain string title out of Next's Metadata title union. */
export function titleText(meta: Metadata): string {
  const t = meta.title;
  if (!t) return '';
  if (typeof t === 'string') return t;
  if ('absolute' in t && t.absolute) return t.absolute;
  if ('default' in t && t.default) return t.default;
  return '';
}

export function canonicalOf(meta: Metadata): string {
  const c = meta.alternates?.canonical;
  if (!c) return '';
  if (typeof c === 'string') return c;
  if (c instanceof URL) return c.toString();
  return String(c.url);
}

export function robotsIndexable(meta: Metadata): boolean {
  const r = meta.robots;
  if (!r) return true;
  if (typeof r === 'string') return !/noindex/i.test(r);
  return r.index !== false;
}
