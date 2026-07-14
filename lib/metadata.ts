import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL, isPreview } from './site';

/** Single metadataBase for all routes (www canonical host). */
export const METADATA_BASE = new URL(`${SITE_URL}/`);

/** Absolute canonical URL; trailing slash only for homepage. */
export function absoluteUrl(path: string = '/'): string {
  if (!path || path === '/') return `${SITE_URL}/`;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${clean.replace(/\/+$/, '') || ''}`;
}

/** Production indexing rules; preview/staging blocks crawlers. */
export function getIndexingRobots(noindex = false): NonNullable<Metadata['robots']> {
  if (noindex || isPreview) {
    return {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    };
  }
  return {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  };
}

/**
 * Strip brand suffixes so the root `title.template` (`%s | We Decor`) adds the brand once.
 * Handles legacy titles like "Page | We Decor" / "Page | We Decor Events".
 */
export function stripBrandFromTitle(title: string): string {
  let t = title.trim();

  // Drop pipe-separated segments that are brand (or brand + marketing tagline)
  const parts = t
    .split('|')
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length > 1) {
    const kept = parts.filter((p) => !/^We Decor\b/i.test(p));
    t = (kept.length > 0 ? kept : [parts[0]]).join(' | ').trim();
  }

  // Trailing " - We Decor" / " — We Decor Bangalore" / " - We Decor Events"
  t = t.replace(/\s*[-–—]\s*We Decor(?:\s+Events)?(?:\s+Bangalore)?\s*$/i, '').trim();

  return t;
}

/** Document + social title with the brand exactly once. */
export function withBrandTitle(title: string): string {
  const clean = stripBrandFromTitle(title);
  if (!clean) return SITE_NAME;
  if (new RegExp(`\\|\\s*${SITE_NAME}\\s*$`, 'i').test(clean)) return clean;
  return `${clean} | ${SITE_NAME}`;
}

type PageMetadataOptions = {
  /** Path starting with `/` (e.g. `/contact`). Use `/` for homepage. */
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  noindex?: boolean;
};

/**
 * Consistent page metadata: absolute canonical, matching OG/Twitter URLs, shared robots.
 * Document titles use the root template (`%s | We Decor`) except the homepage (absolute).
 */
export function pageMetadata({
  path,
  title,
  description,
  ogImage = '/logo.png',
  noindex = false,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = ogImage.startsWith('http') ? ogImage : absoluteUrl(ogImage);
  const isHome = path === '/' || path === '';
  const cleanTitle = stripBrandFromTitle(title);
  const brandedTitle = isHome
    ? `${SITE_NAME} - Event Decorations Services in Bangalore`
    : withBrandTitle(cleanTitle);

  return {
    // Absolute branded title so <title>, og:title, and twitter:title stay aligned
    // (nested layouts under /services can otherwise drop the root title.template).
    title: { absolute: brandedTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: brandedTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_IN',
      type: 'website',
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title: brandedTitle,
      description,
      images: [imageUrl],
    },
    robots: getIndexingRobots(noindex),
  };
}
