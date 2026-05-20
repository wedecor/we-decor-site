import type { Metadata } from 'next';
import { SITE_URL, isPreview } from './site';

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
 */
export function pageMetadata({
  path,
  title,
  description,
  ogImage = '/logo.webp',
  noindex = false,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = ogImage.startsWith('http') ? ogImage : absoluteUrl(ogImage);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'We Decor',
      locale: 'en_IN',
      type: 'website',
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: getIndexingRobots(noindex),
  };
}
