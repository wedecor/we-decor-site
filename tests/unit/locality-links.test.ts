import { describe, expect, it } from 'vitest';
import { AREAS } from '@/app/(site)/_data/locations';
import {
  ALL_LOCALITY_LINKS,
  EXPLORE_LOCALITIES_BY_PAGE,
  NEARBY_LOCALITY_SLUGS,
  getExploreLocalitiesFor,
  getNearbyLocalitySlugs,
} from '@/lib/seo/internal-links';

/**
 * Every published locality page must sit inside the locality link graph.
 * The first 30 pages had nearby/explore links; the 20 added later had none
 * and were reachable only from the /locations hub.
 */
const slugs = AREAS.map((a) => a.slug);
const slugSet = new Set(slugs);
const slugOf = (href: string) => href.replace(/^\/locations\//, '');

/** Page keys whose explore block actually renders locality links. */
const RENDERED_EXPLORE_KEYS = [
  'home',
  'services-hub',
  'pricing',
  'reviews',
  'gallery',
  'about',
  'blog-hub',
  'faq',
];

describe('locality internal links', () => {
  it('publishes 50 locality pages', () => {
    expect(slugs).toHaveLength(50);
    expect(slugSet.size).toBe(50);
  });

  it('ALL_LOCALITY_LINKS lists exactly the published pages, with matching names', () => {
    const linked = ALL_LOCALITY_LINKS.map((l) => slugOf(l.href));
    expect(new Set(linked)).toEqual(slugSet);
    expect(linked).toHaveLength(slugSet.size);
    for (const link of ALL_LOCALITY_LINKS) {
      expect(link.name).toBe(AREAS.find((a) => a.slug === slugOf(link.href))?.name);
    }
  });

  it.each(slugs)('%s has 3–5 valid nearby localities', (slug) => {
    const nearby = getNearbyLocalitySlugs(slug);
    expect(nearby.length).toBeGreaterThanOrEqual(3);
    expect(nearby.length).toBeLessThanOrEqual(5);
    expect(new Set(nearby).size).toBe(nearby.length);
    expect(nearby).not.toContain(slug);
    for (const peer of nearby) expect(slugSet.has(peer), `${slug} → ${peer}`).toBe(true);
  });

  it('has no nearby entries for slugs that are not published', () => {
    for (const key of Object.keys(NEARBY_LOCALITY_SLUGS)) {
      expect(slugSet.has(key), key).toBe(true);
    }
  });

  it.each(slugs)('%s is linked from at least one other locality page', (slug) => {
    const inbound = slugs.filter(
      (other) => other !== slug && getNearbyLocalitySlugs(other).includes(slug)
    );
    expect(inbound.length, `no locality page links to ${slug}`).toBeGreaterThan(0);
  });

  it('every locality appears in at least one rendered explore block', () => {
    const covered = new Set(
      RENDERED_EXPLORE_KEYS.flatMap((key) =>
        getExploreLocalitiesFor(key).map((l) => slugOf(l.href))
      )
    );
    const missing = slugs.filter((s) => !covered.has(s));
    expect(missing).toEqual([]);
  });

  it('explore blocks only link to published localities, without duplicates per block', () => {
    for (const [key, links] of Object.entries(EXPLORE_LOCALITIES_BY_PAGE)) {
      const hrefs = links.map((l) => l.href);
      expect(new Set(hrefs).size, key).toBe(hrefs.length);
      for (const href of hrefs) expect(slugSet.has(slugOf(href)), `${key}: ${href}`).toBe(true);
    }
  });

  it('fallback explore rotation (service pages) draws from all 50 pages', () => {
    const rotated = getExploreLocalitiesFor('service-some-unlisted-key');
    expect(rotated).toHaveLength(6);
    for (const l of rotated) expect(slugSet.has(slugOf(l.href))).toBe(true);
  });
});
