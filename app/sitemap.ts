import type { MetadataRoute } from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.wedecorevents.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE}/`,         lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE}/gallery`,  lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/pricing`,  lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/faq`,      lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/contact`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.5 },
  ];
}