import type { MetadataRoute } from 'next';
import { SITE_URL, SERVICE_PATHS } from '@/lib/site';
import { AREAS } from './(site)/_data/locations';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = SITE_URL.replace(/\/+$/, '');

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, priority: 1.0 },
    { url: `${base}/about`, lastModified: now, priority: 0.7 },
    { url: `${base}/services`, lastModified: now, priority: 0.9 },
    { url: `${base}/gallery`, lastModified: now, priority: 0.8 },
    { url: `${base}/pricing`, lastModified: now, priority: 0.7 },
    { url: `${base}/faq`, lastModified: now, priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, priority: 0.5 },
    { url: `${base}/reviews`, lastModified: now, priority: 0.7 },
    { url: `${base}/locations`, lastModified: now, priority: 0.8 },
  ];

  const servicePages: MetadataRoute.Sitemap = Object.values(SERVICE_PATHS).map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const locationPages: MetadataRoute.Sitemap = AREAS.map((a) => ({
    url: `${base}/locations/${a.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: a.slug === 'bangalore' ? 0.8 : 0.7,
  }));

  return [...staticPages, ...servicePages, ...locationPages];
}
