import { describe, expect, it } from 'vitest';
import { getAllAreaSlugs } from '@/app/(site)/_data/locations';
import { workHeading, workShownOn } from '@/app/(site)/_data/work-images';

/**
 * A photograph may be DISPLAYED on any locality page. It may only be CLAIMED
 * by the page whose areaSlug it carries. workShownOn() is the only function
 * allowed to pick the grid; these assertions keep fifty pages from collapsing
 * back into one shared photo set.
 */

const MIN_TILES = 6;

function gridKey(slug: string): string {
  const shown = workShownOn(slug);
  return [...shown.local, ...shown.nearby].map((w) => w.file).join('|');
}

describe('workShownOn locality grids', () => {
  const slugs = getAllAreaSlugs();

  it('covers all 50 locality pages', () => {
    expect(slugs).toHaveLength(50);
  });

  it('never repeats the same grid across two pages', () => {
    const seen = new Map<string, string>();
    const dupes: string[] = [];
    for (const slug of slugs) {
      const key = gridKey(slug);
      const previous = seen.get(key);
      if (previous) dupes.push(`${previous} ≡ ${slug}`);
      else seen.set(key, slug);
    }
    expect(dupes).toEqual([]);
  });

  it('fills every page to at least six tiles', () => {
    const short = slugs.filter((slug) => {
      const shown = workShownOn(slug);
      return shown.local.length + shown.nearby.length < MIN_TILES;
    });
    expect(short).toEqual([]);
  });

  it('never captions a nearby tile with the page’s own area', () => {
    const claimed: string[] = [];
    for (const slug of slugs) {
      const shown = workShownOn(slug);
      for (const tile of shown.nearby) {
        if (tile.areaSlug === slug) claimed.push(`${slug} ← ${tile.file}`);
      }
    }
    expect(claimed).toEqual([]);
  });

  it('names the area in the heading only when local photographs exist', () => {
    let named = 0;
    for (const slug of slugs) {
      const shown = workShownOn(slug);
      const heading = workHeading(slug, slug);
      if (shown.local.length > 0) {
        expect(heading).toContain(slug);
        named += 1;
      } else {
        expect(heading).toBe('Our work across Bengaluru');
      }
    }
    expect(named).toBe(33);
  });
});
