import { NextResponse } from 'next/server';
import { GALLERY_ITEMS } from '../(site)/_data/gallery';

export async function GET() {
  const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.wedecorevents.com';
  const urls = [
    `${SITE}/`,
    `${SITE}/services`,
    `${SITE}/gallery`,
    `${SITE}/locations`,
    `${SITE}/about`,
    `${SITE}/contact`,
    `${SITE}/pricing`,
    `${SITE}/faq`,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map(
    (u) => `
  <url>
    <loc>${u}</loc>
    ${GALLERY_ITEMS.map(
      (g) => `
      <image:image>
        <image:loc>${SITE}${g.src}</image:loc>
        <image:title><![CDATA[${g.altBase}]]></image:title>
        <image:caption><![CDATA[${g.captionBase}]]></image:caption>
        <image:geo_location>Bengaluru, Karnataka, India</image:geo_location>
      </image:image>`
    ).join('')}
  </url>`
  )
  .join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
