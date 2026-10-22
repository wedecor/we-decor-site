import { NextResponse } from 'next/server';
import { INDEXABLE_SERVICE_PATHS, SITE_URL } from '@/lib/site';
import { getAllAreaSlugs } from '@/app/(site)/_data/locations';
import {
  WORK,
  workForService,
  workShownOn,
  workUrl,
  type WorkImage,
} from '@/app/(site)/_data/work-images';

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function imageNodes(images: WorkImage[]): string {
  return images
    .map((w) => {
      return `
      <image:image>
        <image:loc>${xmlEscape(workUrl(w))}</image:loc>
        <image:title><![CDATA[${w.alt}]]></image:title>
        <image:caption><![CDATA[${w.alt}]]></image:caption>
        <image:geo_location>Bengaluru, Karnataka, India</image:geo_location>
      </image:image>`;
    })
    .join('');
}

function urlBlock(loc: string, images: WorkImage[]): string {
  if (!images.length) {
    return `
  <url>
    <loc>${xmlEscape(loc)}</loc>
  </url>`;
  }
  return `
  <url>
    <loc>${xmlEscape(loc)}</loc>
    ${imageNodes(images)}
  </url>`;
}

export async function GET() {
  const base = SITE_URL.replace(/\/+$/, '');

  const localityBlocks = getAllAreaSlugs().map((slug) => {
    const shown = workShownOn(slug);
    return urlBlock(`${base}/locations/${slug}`, [...shown.local, ...shown.nearby]);
  });

  const serviceBlocks = INDEXABLE_SERVICE_PATHS.map((path) => {
    const slug = path.replace(/^\/services\//, '');
    return urlBlock(`${base}${path}`, workForService(slug).slice(0, 12));
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlBlock(`${base}/gallery`, WORK)}
${localityBlocks.join('')}
${serviceBlocks.join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
