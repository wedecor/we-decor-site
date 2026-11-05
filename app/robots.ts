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

  const disallowPaths = ['/api/', '/admin/', '/private/'];
  const aiBots = [
    'OAI-SearchBot',
    'ChatGPT-User',
    'GPTBot',
    'PerplexityBot',
    'ClaudeBot',
    'anthropic-ai',
    'Google-Extended',
    'Applebot-Extended',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Do not disallow /_next/ — that also blocks /_next/image (optimized
        // photos for Google Images) and /_next/static (JS/CSS Googlebot renders).
        disallow: disallowPaths,
      },
      ...aiBots.map((bot) => ({
        userAgent: bot,
        allow: '/',
        disallow: disallowPaths,
      })),
    ],
    // Page sitemap plus the image sitemap (app/image-sitemap/route.ts), which
    // lists real event photos per page for Google Images.
    sitemap: [`${base}/sitemap.xml`, `${base}/image-sitemap`],
    host: base,
  };
}
