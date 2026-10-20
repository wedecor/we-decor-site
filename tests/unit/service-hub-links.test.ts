import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SERVICE_PATHS, INDEXABLE_SERVICE_PATHS } from '@/lib/site';

/**
 * Orphan guard for the services hub.
 *
 * Every path in the sitemap needs at least one internal link from a
 * high-authority page, or Google discovers the URL and then declines to spend
 * crawl budget on it. In Aug 2026, Search Console listed four service pages as
 * "Discovered - currently not indexed" with "Referring page: None detected":
 * home-decoration, terrace-decoration, nikah-decoration and car-decoration.
 * All four were in sitemap.xml and rendered fine — they were simply missing
 * from the /services hub, the only page that links the long tail.
 *
 * Asserting against the page source (rather than exported constants) keeps the
 * hub free to render each group differently — photo cards vs text links — while
 * still failing loudly the moment a sitemap entry loses its last inbound link.
 */
const HUB_SOURCE = readFileSync(
  join(process.cwd(), 'app/services/page.tsx'),
  'utf8'
);

/** `/services` and `/services/decoration` are hubs, not leaf services. */
const HUB_PATHS = new Set(['/services', '/services/decoration']);

describe('services hub internal linking', () => {
  const leafPaths = Object.values(SERVICE_PATHS).filter((p) => !HUB_PATHS.has(p));

  it.each(leafPaths)('links to %s', (path) => {
    expect(HUB_SOURCE).toContain(`'${path}'`);
  });

  it('links every indexable service path that the sitemap advertises', () => {
    const orphans = INDEXABLE_SERVICE_PATHS.filter(
      (path) => !HUB_PATHS.has(path) && !HUB_SOURCE.includes(`'${path}'`)
    );

    expect(orphans).toEqual([]);
  });

  it('does not link paths that are absent from the sitemap', () => {
    // Plain exec loop rather than matchAll/spread — tsconfig targets ES5 for
    // this project and iterator spread needs --downlevelIteration.
    const pattern = /'(\/services\/[a-z0-9-]+)'/g;
    const linked: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = pattern.exec(HUB_SOURCE)) !== null) {
      if (linked.indexOf(match[1]) === -1) linked.push(match[1]);
    }

    const advertised = new Set<string>(INDEXABLE_SERVICE_PATHS);
    const unadvertised = linked.filter((p) => !advertised.has(p));

    expect(unadvertised).toEqual([]);
  });
});
