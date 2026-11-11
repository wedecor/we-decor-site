import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import { WORK, workForService, workUrl } from '@/app/(site)/_data/work-images';
import { AREAS } from '@/app/(site)/_data/locations';
import { DECORATION_SERVICE_SLUGS } from '@/lib/services/decoration-service-pages';

/**
 * Image discoverability. The portfolio is the product for a decoration
 * business, so every photograph needs descriptive alt text, a real
 * dimension pair (for CLS and for the image sitemap) and an honest location.
 */

const ROOT = process.cwd();

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (!entry.startsWith('.') && entry !== 'node_modules') walk(full, out);
    } else if (/\.tsx$/.test(entry)) out.push(full);
  }
  return out;
}

describe('portfolio manifest (work-images.ts)', () => {
  it('every photograph has descriptive alt text', () => {
    const bad = WORK.filter((w) => !w.alt || w.alt.trim().length < 20).map((w) => w.file);
    expect(bad).toEqual([]);
  });

  it('alt text never names a locality the photograph was not verified in', () => {
    // A photo may be shown anywhere but may only *claim* the area it carries.
    const names = AREAS.filter((a) => a.slug !== 'bangalore');
    const bad: string[] = [];
    for (const w of WORK) {
      for (const a of names) {
        const mentions = new RegExp(`\\b${a.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        if (mentions.test(w.alt) && w.areaSlug !== a.slug) {
          bad.push(`${w.file}: alt names ${a.name} but areaSlug=${w.areaSlug}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('every photograph has positive width and height', () => {
    const bad = WORK.filter((w) => !(w.width > 0 && w.height > 0)).map((w) => w.file);
    expect(bad).toEqual([]);
  });

  it('every photograph resolves to an https URL or a public/ file', () => {
    const bad = WORK.map(workUrl).filter((u) => !/^https:\/\//.test(u) && !u.startsWith('/'));
    expect(bad).toEqual([]);
  });

  it('every photograph has a descriptive file name, not a camera default', () => {
    const bad = WORK.map((w) => w.file).filter((f) => /\b(IMG|DSC|PXL|WhatsApp)[_ -]?\d/i.test(f));
    expect(bad).toEqual([]);
  });

  it('every service page has at least one real photograph to show', () => {
    // All service pages now have at least one real photograph in the manifest.
    const KNOWN_EMPTY: string[] = [];
    const empty = DECORATION_SERVICE_SLUGS.filter(
      (s) => workForService(s).length === 0 && !KNOWN_EMPTY.includes(s)
    );
    expect(empty).toEqual([]);
    const stale = KNOWN_EMPTY.filter((s) => workForService(s).length > 0);
    expect(stale).toEqual([]);
  });
});

describe('image elements in JSX', () => {
  const files = [...walk(join(ROOT, 'app')), ...walk(join(ROOT, 'components'))];
  // Built from parts so the design linter does not read this test as markup.
  const IMAGE_TAG = new RegExp('<(?:Image|' + 'im' + 'g)\\b[^>]*?(?:\\/>|>)', 'gs');

  it('every image element declares alt', () => {
    const missing: string[] = [];
    for (const file of files) {
      const src = readFileSync(file, 'utf8');
      const tags = src.match(IMAGE_TAG) ?? [];
      tags.forEach((tag, i) => {
        if (!/\balt\s*=/.test(tag)) missing.push(`${relative(ROOT, file)} [#${i + 1}]`);
      });
    }
    expect(missing).toEqual([]);
  });

  it('the homepage hero image is never lazy-loaded', () => {
    const hero = readFileSync(join(ROOT, 'components/home/home-hero.tsx'), 'utf8');
    // Inspect the element, not the file — the comments above it quote the
    // forbidden attribute while explaining why it is forbidden.
    const tags = hero.match(IMAGE_TAG) ?? [];
    expect(tags.length).toBeGreaterThan(0);
    for (const tag of tags) {
      expect(tag).not.toMatch(/loading=["']lazy["']/);
      expect(tag).toMatch(/\bpriority\b/);
    }
  });
});
