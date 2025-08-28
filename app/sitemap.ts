import type { MetadataRoute } from 'next';
import { SITE, AREAS } from './(site)/_data/locations';
import fs from 'fs';
import path from 'path';

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
    { url: `${SITE}/areas`, lastModified: now, priority: 0.7 },
  ];

  const locationPages: MetadataRoute.Sitemap = AREAS.map(a => ({
    url: `${SITE}/locations/${a.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: a.slug === 'bangalore' ? 0.8 : 0.7,
  }));

  // Add areas pages dynamically
  const areasPages: MetadataRoute.Sitemap = [];
  const areasDir = path.join(process.cwd(), "app", "areas");
  if (fs.existsSync(areasDir)) {
    for (const entry of fs.readdirSync(areasDir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        const slug = entry.name;
        const pageTsx = path.join(areasDir, slug, "page.tsx");
        const pageMdx = path.join(areasDir, slug, "page.mdx");
        if (fs.existsSync(pageTsx) || fs.existsSync(pageMdx)) {
          areasPages.push({
            url: `${SITE}/areas/${slug}`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        }
      }
    }
  }

  return [...staticPages, ...locationPages, ...areasPages];
}