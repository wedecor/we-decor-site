import { GetServerSideProps } from 'next';

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = 'https://www.wedecorevents.com';
  
  const pages = [
    '',
    '/about',
    '/contact',
    '/gallery',
    '/pricing',
    '/reviews',
    '/services',
    '/services/haldi-decoration',
    '/services/wedding-setup',
    '/services/tent-balloon-setup',
    '/services/birthday-home-decoration',
    '/services/haldi-backdrop-decor',
    '/services/wedding-stage-decor',
    '/services/engagement-decoration',
    '/services/corporate-decoration',
    '/services/room-decoration',
    '/services/birthday-decoration',
    '/services/catering',
    '/services/hair-stylists',
    '/services/makeup-artists',
    '/services/mehndi-artists',
    '/services/photographers',
    '/services/videographers',
    '/faq',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((page) => {
    return `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : page.startsWith('/services') ? '0.9' : '0.8'}</priority>
  </url>`;
  })
  .join('')}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap; 