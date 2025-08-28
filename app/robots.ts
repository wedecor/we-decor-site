import type { MetadataRoute } from 'next';
import { SITE } from './(site)/_data/locations';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: [`${SITE}/sitemap.xml`, `${SITE}/image-sitemap`],
    host: SITE,
  };
}