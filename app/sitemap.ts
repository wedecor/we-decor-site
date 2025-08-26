import type { MetadataRoute } from 'next';
import { SITE, AREAS } from './(site)/_data/locations';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, priority: 1.0 },
    { url: `${SITE}/services`, lastModified: now, priority: 0.9 },
    { url: `${SITE}/gallery`, lastModified: now, priority: 0.8 },
    { url: `${SITE}/pricing`, lastModified: now, priority: 0.7 },
    { url: `${SITE}/faq`, lastModified: now, priority: 0.6 },
    { url: `${SITE}/contact`, lastModified: now, priority: 0.5 },
    { url: `${SITE}/locations`, lastModified: now, priority: 0.6 },
  ];

  const locationPages: MetadataRoute.Sitemap = AREAS.map(a => ({
    url: `${SITE}/locations/${a.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: a.slug === 'bangalore' ? 0.8 : 0.7,
  }));

  return [...staticPages, ...locationPages];
}