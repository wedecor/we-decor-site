import type { MetadataRoute } from 'next';
import { SITE_URL, INDEXABLE_SERVICE_PATHS } from '@/lib/site';
import { AREAS } from './(site)/_data/locations';
import { BLOG_POSTS } from '@/lib/content/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL.replace(/\/+$/, '');

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, priority: 1.0 },
    { url: `${base}/about`, priority: 0.7 },
    { url: `${base}/services`, priority: 0.9 },
    { url: `${base}/gallery`, priority: 0.8 },
    { url: `${base}/blog`, priority: 0.7 },
    { url: `${base}/pricing`, priority: 0.7 },
    { url: `${base}/faq`, priority: 0.6 },
    { url: `${base}/contact`, priority: 0.5 },
    { url: `${base}/reviews`, priority: 0.7 },
    { url: `${base}/locations`, priority: 0.8 },
    { url: `${base}/privacy`, priority: 0.2 },
    // `/thank-you` is deliberately absent — it is noindex, and a confirmation
    // page reached without submitting anything is a poor search result.
  ];

  const servicePages: MetadataRoute.Sitemap = INDEXABLE_SERVICE_PATHS.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const locationPages: MetadataRoute.Sitemap = AREAS.map((a) => ({
    url: `${base}/locations/${a.slug}`,
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
