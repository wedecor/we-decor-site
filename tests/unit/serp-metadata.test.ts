import { describe, expect, it } from 'vitest';
import { LOCALITY_PAGE_META } from '@/app/(site)/_data/location-metadata';
import { AREAS } from '@/app/(site)/_data/locations';
import { GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from '@/lib/local-seo/constants';

/**
 * Guards the search-snippet rewrite (Sep 2026).
 *
 * Three months of Search Console data showed 13.2k impressions converting at
 * 1.9% from an average position of 9.9 — the site was being seen and not
 * clicked. The locality descriptions were atmospheric prose ("Time load-in
 * before Richmond Circle jams") that gave a searcher no reason to choose us
 * over nine results above. These tests keep the replacements honest: short
 * enough to survive truncation, and carrying the proof and offer that earn
 * the click.
 *
 * If a description here legitimately needs to change, change the assertion
 * too — don't silently drop back to page-copy voice.
 */

/** Google truncates desktop snippets around 160 characters. */
const MAX_DESCRIPTION = 165;

/** The localities that actually earn impressions, per Search Console. */
const EARNING_SLUGS = [
  'whitefield',
  'rt-nagar',
  'koramangala',
  'rajajinagar',
  'indiranagar',
  'btm-layout',
  'jayanagar',
] as const;

describe('locality search snippets', () => {
  const entries = Object.entries(LOCALITY_PAGE_META);

  it('has metadata for every earning locality', () => {
    const missing = EARNING_SLUGS.filter((s) => !LOCALITY_PAGE_META[s]);
    expect(missing).toEqual([]);
  });

  it('has a hand-written snippet for every area in the sitemap', () => {
    // locations/[slug] falls back to a generated description when an area has
    // no entry here. That fallback is written as page copy, not as a search
    // snippet, so a new area added without metadata would quietly ship the
    // exact voice this rewrite removed.
    const missing = AREAS.map((a) => a.slug).filter((s) => !LOCALITY_PAGE_META[s]);

    expect(missing).toEqual([]);
  });

  it.each(entries)('%s description fits in a snippet', (_slug, meta) => {
    expect(meta.description.length).toBeLessThanOrEqual(MAX_DESCRIPTION);
  });

  it.each(entries)('%s leads with the searched phrase', (_slug, meta) => {
    // "event decorators near me" is the largest non-brand query (603
    // impressions); the snippet should echo it rather than "event decoration".
    // Some localities read "on Sarjapur Road" rather than "in", hence the
    // looser match.
    expect(meta.description.toLowerCase()).toMatch(/event decorators (in|on) /);
  });

  it.each(entries)('%s carries social proof', (_slug, meta) => {
    expect(meta.description).toContain(String(GOOGLE_RATING));
    expect(meta.description).toContain(String(GOOGLE_REVIEW_COUNT));
  });

  it.each(entries)('%s carries an offer', (_slug, meta) => {
    expect(meta.description.toLowerCase()).toMatch(
      /free (site )?visit|₹3,000|next day/
    );
  });

  it('keeps snippets distinct — no two localities share a description', () => {
    // A single templated string repeated 30 times reads as doorway pages to
    // Google. Each locality names its own venues and occasions.
    const seen = new Map<string, string>();
    const dupes: string[] = [];
    for (const [slug, meta] of entries) {
      const prior = seen.get(meta.description);
      if (prior) dupes.push(`${prior} / ${slug}`);
      else seen.set(meta.description, slug);
    }
    expect(dupes).toEqual([]);
  });

  it('does not reintroduce a phone number into any snippet', () => {
    // A number in a snippet burns characters nobody acts on — searchers click,
    // they do not dial from the SERP.
    const offenders = entries
      .filter(([, m]) => /\d{5}\s?\d{5}|\+91/.test(m.description))
      .map(([s]) => s);

    expect(offenders).toEqual([]);
  });
});
