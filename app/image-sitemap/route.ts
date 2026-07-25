import { NextResponse } from 'next/server';
import { GALLERY_ITEMS } from '../(site)/_data/gallery';
import { SITE_URL } from '@/lib/site';

export async function GET() {
  const base = SITE_URL.replace(/\/+$/, '');
  const urls = [
    `${base}/`,
    `${base}/services`,
    `${base}/gallery`,
    `${base}/locations`,
    `${base}/about`,
    `${base}/contact`,
    `${base}/pricing`,
    `${base}/faq`,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map(
    (u) => `
  <url>
    <loc>${u}</loc>
    ${GALLERY_ITEMS.map((g) => {
      // Cloudinary (and other absolute) URLs must not be prefixed with SITE_URL
      const imageLoc = /^https?:\/\//i.test(g.src)
        ? g.src
        : `${base}${g.src.startsWith('/') ? g.src : `/${g.src}`}`;
      return `
      <image:image>
        <image:loc>${imageLoc}</image:loc>
        <image:title><![CDATA[${g.altBase}]]></image:title>
        <image:caption><![CDATA[${g.captionBase}]]></image:caption>
        <image:geo_location>Bengaluru, Karnataka, India</image:geo_location>
      </image:image>`;
    }).join('')}
  </url>`
  )
  .join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
