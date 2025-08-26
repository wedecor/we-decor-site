import { GetServerSideProps } from 'next';
import { getAllLocationSlugs } from '../lib/data/locationPages';
import { locations } from '../lib/data/locations';
import { services } from '../lib/data/services';
import { SITE_URL } from '../lib/site';

// Helper function to build canonical URLs (no trailing slash)
const url = (path: string) =>
  `${SITE_URL}${path.replace(/\/+$/, '')}`;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Set proper headers
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');

  // Define static pages with their priorities and change frequencies
  const staticPages = [
    { path: '/', priority: 1.0, changefreq: 'daily' },
    { path: '/about', priority: 0.8, changefreq: 'monthly' },
    { path: '/contact', priority: 0.8, changefreq: 'monthly' },
    { path: '/gallery', priority: 0.8, changefreq: 'weekly' },
    { path: '/pricing', priority: 0.8, changefreq: 'monthly' },
    { path: '/reviews', priority: 0.8, changefreq: 'weekly' },
    { path: '/services', priority: 0.9, changefreq: 'weekly' },
    { path: '/faq', priority: 0.7, changefreq: 'monthly' },
    { path: '/locations', priority: 0.9, changefreq: 'weekly' },
  ];

  // Define service pages dynamically from services data
  const servicePages = services.map(service => ({
    path: service.path,
    priority: 0.9,
    changefreq: 'weekly'
  }));

  // Add location pages
  const locationSlugs = getAllLocationSlugs();
  const locationPages = locationSlugs.map(slug => ({
    path: `/locations/${slug}`,
    priority: 0.9,
    changefreq: 'weekly'
  }));

  // Add location-service pages (330 combinations)
  const locationServicePages: { path: string; priority: number; changefreq: string }[] = [];
  locations.forEach(location => {
    services.forEach(service => {
      locationServicePages.push({
        path: `/locations/${location.slug}/${service.slug}`,
        priority: 0.9,
        changefreq: 'weekly'
      });
    });
  });

  // Combine all pages
  const allPages = [
    ...staticPages,
    ...servicePages,
    ...locationPages,
    ...locationServicePages
  ];

  // Log total pages for verification
  console.log(`Sitemap generated with ${allPages.length} total URLs (including ${locationServicePages.length} location-service combinations)`);

  // Generate XML sitemap
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(({ path, priority, changefreq }) => `
  <url>
    <loc>${url(path)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`)
  .join('')}
</urlset>`;

  res.write(xml);
  res.end();

  return {
    props: {},
  };
};

// This component won't render anything, it's just for the sitemap
export default function Sitemap() {
  return null;
} 