import { describe, expect, it } from 'vitest';
import { LOCALITY_FAQS, faqsForArea } from '@/app/(site)/_data/faqs';
import { AREAS } from '@/app/(site)/_data/locations';

/**
 * Twenty locality pages shipped in Oct 2026 with no FAQ entries at all. They
 * rendered no FAQ section and an empty FAQPage JSON-LD, and nothing in the
 * build complained — the pages were valid, just hollow. All twenty landed in
 * "Crawled – currently not indexed" in Search Console.
 *
 * So coverage is asserted here rather than left to whoever adds area 51.
 *
 * KNOWN_EMPTY is now empty: all fifty localities have FAQs. It stays as the
 * escape hatch for a newly added area that has not been written yet, but a
 * slug sitting in it is a debt, not a resting place. Writing filler to clear
 * this test would defeat its purpose.
 *
 * Nine of the fifty have no placeable photograph in work-images.ts, so their
 * answers deliberately make no claim about past work in that area — they
 * cover venue mix, access, notice and price only.
 */

const KNOWN_EMPTY: readonly string[] = [];

const MIN_QUESTIONS = 4;

describe('locality FAQ coverage', () => {
  const slugs = AREAS.map((a) => a.slug);

  it('has FAQs for every locality except the known-empty list', () => {
    const missing = slugs
      .filter((s) => !(KNOWN_EMPTY as readonly string[]).includes(s))
      .filter((s) => faqsForArea(s, s).length === 0);

    expect(missing).toEqual([]);
  });

  it('gives every covered locality at least four questions', () => {
    const thin = slugs
      .filter((s) => faqsForArea(s, s).length > 0)
      .filter((s) => faqsForArea(s, s).length < MIN_QUESTIONS)
      .map((s) => `${s} (${faqsForArea(s, s).length})`);

    expect(thin).toEqual([]);
  });

  it('has no empty question or answer text', () => {
    const broken: string[] = [];
    for (const [slug, items] of Object.entries(LOCALITY_FAQS)) {
      items.forEach((item, i) => {
        if (!item.q?.trim()) broken.push(`${slug}[${i}].q`);
        if (!item.a?.trim()) broken.push(`${slug}[${i}].a`);
      });
    }
    expect(broken).toEqual([]);
  });

  it('does not repeat the same question across two localities', () => {
    // Identical questions on fifty pages is the doorway signal the gallery
    // rewrite removed; it should not come back through the FAQ block.
    const seen = new Map<string, string>();
    const dupes: string[] = [];
    for (const [slug, items] of Object.entries(LOCALITY_FAQS)) {
      for (const item of items) {
        const key = item.q.trim().toLowerCase();
        const prior = seen.get(key);
        if (prior) dupes.push(`${prior} / ${slug}: ${item.q.slice(0, 48)}`);
        else seen.set(key, slug);
      }
    }
    expect(dupes).toEqual([]);
  });

  it('keeps KNOWN_EMPTY honest — no slug listed that already has FAQs', () => {
    const stale = (KNOWN_EMPTY as readonly string[]).filter((s) => faqsForArea(s, s).length > 0);
    expect(stale).toEqual([]);
  });

  it('lists only real areas in KNOWN_EMPTY', () => {
    const unknown = (KNOWN_EMPTY as readonly string[]).filter((s) => !slugs.includes(s));
    expect(unknown).toEqual([]);
  });
});
