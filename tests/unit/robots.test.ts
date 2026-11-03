import { describe, expect, it } from 'vitest';
import robots from '@/app/robots';
import { SITE_URL } from '@/lib/site';

describe('robots.txt', () => {
  const result = robots();
  const base = SITE_URL.replace(/\/+$/, '');

  it('advertises both the page sitemap and the image sitemap', () => {
    const sitemaps = ([] as string[]).concat(result.sitemap ?? []);
    expect(sitemaps).toContain(`${base}/sitemap.xml`);
    expect(sitemaps).toContain(`${base}/image-sitemap`);
  });

  it('does not block the image optimiser or the image sitemap', () => {
    const rules = ([] as NonNullable<typeof result.rules>[]).concat(result.rules ?? []).flat();
    const disallow = rules.flatMap((r) => ([] as string[]).concat(r.disallow ?? []));
    expect(disallow).not.toContain('/');
    expect(disallow.some((d) => '/_next/image'.startsWith(d))).toBe(false);
    expect(disallow.some((d) => '/image-sitemap'.startsWith(d))).toBe(false);
  });
});
