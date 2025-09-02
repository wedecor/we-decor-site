import { GetServerSideProps } from 'next';
import { SITE_URL } from '@/lib/site';

export default function Sitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = SITE_URL;

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/services',
    '/gallery',
    '/contact',
    '/locations',
    '/areas',
    '/reviews',
    '/faq',
    '/pricing'
  ];

  // Service pages
  const servicePages = [
    '/services/birthday-decoration',
    '/services/wedding-setup',
    '/services/haldi-decoration',
    '/services/engagement',
    '/services/catering',
    '/services/photographers',
    '/services/videographers',
    '/services/makeup-artists',
    '/services/hair-stylists',
    '/services/mehndi-artists',
    '/services/tent-balloon-setup',
    '/services/wedding-stage-decor',
    '/services/haldi-backdrop-decor',
    '/services/birthday-home-decoration',
    '/services/room-decor'
  ];

  // Area pages
  const areaPages = [
    '/areas/east-bangalore',
    '/areas/west-bangalore',
    '/areas/north-bangalore',
    '/areas/south-bangalore',
    '/areas/central-bangalore'
  ];

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('')}
  ${servicePages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}
  ${areaPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};