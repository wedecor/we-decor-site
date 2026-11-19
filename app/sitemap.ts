import type { MetadataRoute } from 'next';
import { SITE_URL, INDEXABLE_SERVICE_PATHS } from '@/lib/site';
import { AREAS } from './(site)/_data/locations';
import { BLOG_POSTS } from '@/lib/content/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL.replace(/\/+$/, '');
  const siteLastModified = new Date('2026-11-19T00:00:00Z');

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: siteLastModified, priority: 1.0 },
    { url: `${base}/about`, lastModified: siteLastModified, priority: 0.7 },
    { url: `${base}/services`, lastModified: siteLastModified, priority: 0.9 },
    { url: `${base}/gallery`, lastModified: siteLastModified, priority: 0.8 },
    { url: `${base}/blog`, lastModified: siteLastModified, priority: 0.7 },
    { url: `${base}/pricing`, lastModified: siteLastModified, priority: 0.9 },
    { url: `${base}/faq`, lastModified: siteLastModified, priority: 0.6 },
    { url: `${base}/contact`, lastModified: siteLastModified, priority: 0.5 },
    { url: `${base}/reviews`, lastModified: siteLastModified, priority: 0.7 },
    { url: `${base}/locations`, lastModified: siteLastModified, priority: 0.8 },
    { url: `${base}/privacy`, lastModified: siteLastModified, priority: 0.2 },
    // `/thank-you` is deliberately absent — it is noindex, and a confirmation
    // page reached without submitting anything is a poor search result.
    //
    // `/llms.txt` and `/llms-full.txt` are also absent. A sitemap tells search
    // engines which pages to show as results; these are plain-text feeds for
    // AI assistants, discovered by convention at the well-known path and linked
    // from robots-era tooling, not from the sitemap. Listing them invited Google
    // and Bing to rank raw text files as landing pages.
  ];

  const servicePages: MetadataRoute.Sitemap = INDEXABLE_SERVICE_PATHS.map((path) => ({
    url: `${base}${path}`,
    lastModified: siteLastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const locationPages: MetadataRoute.Sitemap = AREAS.map((a) => ({
    url: `${base}/locations/${a.slug}`,
    lastModified: siteLastModified,
    changeFrequency: 'monthly' as const,
    priority: a.slug === 'bangalore' ? 0.8 : 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified ?? post.datePublished),
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }));

  return [...staticPages, ...servicePages, ...locationPages, ...blogPages];
}
