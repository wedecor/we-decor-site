import type { MetadataRoute } from 'next';
import { SITE_URL, isPreview } from '@/lib/site';

/**
 * Single source of truth for robots.txt (replaces public/robots.txt).
 * Preview deployments: disallow all crawlers.
 */
export default function robots(): MetadataRoute.Robots {
  const base = SITE_URL.replace(/\/+$/, '');

  if (isPreview) {
    return {
      rules: { userAgent: '*', disallow: '/' },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Do not disallow /_next/ — that also blocks /_next/image (optimized
      // photos for Google Images) and /_next/static (JS/CSS Googlebot renders).
      disallow: ['/api/', '/admin/', '/private/'],
    },
    // Single sitemap entry for crawlers (canonical index)
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
