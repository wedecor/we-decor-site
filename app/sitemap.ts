import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { AREAS } from './(site)/_data/locations';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = SITE_URL.replace(/\/+$/, '');

  const serviceSlugs = [
    'birthday-decoration',
    'haldi-decoration',
    'engagement-decoration',
    'corporate-decoration',
    'tent-balloon-setup',
    'room-decoration',
    'catering',
    'decoration',
    'hair-stylists',
    'makeup-artists',
    'mehndi-artists',
    'photographers',
    'videographers',
  ];
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${base}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, priority: 1.0 },
    { url: `${base}/services`, lastModified: now, priority: 0.9 },
    { url: `${base}/gallery`, lastModified: now, priority: 0.8 },
    { url: `${base}/reviews`, lastModified: now, priority: 0.7 },
    { url: `${base}/pricing`, lastModified: now, priority: 0.7 },
    { url: `${base}/faq`, lastModified: now, priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, priority: 0.5 },
    { url: `${base}/locations`, lastModified: now, priority: 0.6 },
    { url: `${base}/areas`, lastModified: now, priority: 0.7 },
  ];

  const locationPages: MetadataRoute.Sitemap = AREAS.map((a) => ({
    url: `${base}/locations/${a.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: a.slug === 'bangalore' ? 0.8 : 0.7,
  }));

  const areasPages: MetadataRoute.Sitemap = AREAS.map((a) => ({
    url: `${base}/areas/${a.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...locationPages, ...areasPages];
}
