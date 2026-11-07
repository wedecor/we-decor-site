import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getNearbyLocalitySlugs, getRelatedServiceHrefsFor } from '@/lib/seo/internal-links';
import { AREAS } from '@/app/(site)/_data/locations';
import { DECORATION_SERVICE_SLUGS } from '@/lib/services/decoration-service-pages';
import { BLOG_POSTS } from '@/lib/content/blog-posts';
import { ALL_ROUTES, HANDLER_ROUTES, REDIRECT_ONLY_PATHS } from './_routes';

/**
 * Static internal-link audit.
 *
 * Walks every source file under app/, components/ and lib/, pulls out each
 * site-relative path literal (`href="/x"`, `href: '/x'`, `path: '/x'`,
 * `destination: '/x'`), and checks it resolves to a real route. A Playwright
 * crawl does the same against a running server; this runs in 50 ms on every
 * `vitest run`, so a renamed slug cannot ship a 404 or a 301 hop.
 */

const ROOT = process.cwd();
const SCAN_DIRS = ['app', 'components', 'lib'];
const SOURCE_RE = /\.(tsx?|mjs|js)$/;

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (entry === 'node_modules' || entry.startsWith('.')) continue;
      walk(full, out);
    } else if (SOURCE_RE.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

const KNOWN_PATHS = new Set<string>([
  ...ALL_ROUTES.map((r) => r.path),
  ...HANDLER_ROUTES,
  // Service pages that render as `/services/${slug}` in template literals
  // are checked through DECORATION_SERVICE_SLUGS below.
]);

/** Paths that are intentionally not routes (static files). */
const STATIC_FILE_RE = /\.(png|jpe?g|webp|avif|svg|ico|json|xml|txt|pdf|mp4|webm)$/i;

const LINK_RE = /(?:href|path|destination|url)\s*[:=]\s*["'`](\/[^"'`\s$]*)["'`]/g;

function extractPaths(source: string): string[] {
  const found: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = LINK_RE.exec(source)) !== null) {
    const raw = m[1].split('#')[0].split('?')[0];
    if (!raw || raw === '/') {
      if (raw === '/') found.push('/');
      continue;
    }
    found.push(raw.replace(/\/+$/, ''));
  }
  return found;
}

describe('internal links (static)', () => {
  const files = SCAN_DIRS.flatMap((d) => walk(join(ROOT, d)));
  const occurrences = new Map<string, Set<string>>();
  for (const file of files) {
    const src = readFileSync(file, 'utf8');
    for (const p of extractPaths(src)) {
      if (!occurrences.has(p)) occurrences.set(p, new Set());
      occurrences.get(p)!.add(relative(ROOT, file));
    }
  }

  const isResolvable = (p: string): boolean => {
    if (KNOWN_PATHS.has(p)) return true;
    if (STATIC_FILE_RE.test(p)) return true;
    if (p.startsWith('/_next/')) return true;
    if (p.startsWith('/api/')) return true;
    return false;
  };

  it('scanned a meaningful number of source files and links', () => {
    expect(files.length).toBeGreaterThan(50);
    expect(occurrences.size).toBeGreaterThan(20);
  });

  it('every hard-coded internal path resolves to a real route or asset', () => {
    const broken = Array.from(occurrences.entries())
      .filter(([p]) => !isResolvable(p))
      // next.config.js redirect *sources* are not links; they are listed in
      // REDIRECT_ONLY_PATHS and asserted separately below.
      .filter(([p]) => !REDIRECT_ONLY_PATHS.includes(p))
      .map(([p, where]) => `${p} ← ${Array.from(where).join(', ')}`);
    expect(broken).toEqual([]);
  });

  it('no page or component links to a redirect-only URL (301 hops waste crawl budget)', () => {
    const offenders = Array.from(occurrences.entries())
      .filter(([p]) => REDIRECT_ONLY_PATHS.includes(p))
      .map(([p, where]) => ({ p, where: Array.from(where) }))
      // The redirect table itself and the dynamic route's legacy-slug map are
      // the places those paths are supposed to appear.
      .map(({ p, where }) => ({
        p,
        where: where.filter(
          (w) => !/next\.config\.js$|app\/services\/\[slug\]\/page\.tsx$/.test(w)
        ),
      }))
      .filter(({ where }) => where.length > 0)
      .map(({ p, where }) => `${p} ← ${where.join(', ')}`);
    expect(offenders).toEqual([]);
  });
});

describe('internal links (data-driven)', () => {
  const servicePaths = new Set([
    ...DECORATION_SERVICE_SLUGS.map((s) => `/services/${s}`),
    '/services/birthday-decoration',
    '/services/decoration',
  ]);
  const areaSlugs = new Set(AREAS.map((a) => a.slug));

  it('related-service links from every service page point at live service pages', () => {
    const bad: string[] = [];
    for (const slug of DECORATION_SERVICE_SLUGS) {
      const related = getRelatedServiceHrefsFor(`/services/${slug}`);
      if (related.length < 3) bad.push(`${slug}: only ${related.length} related links`);
      for (const href of related) {
        if (!servicePaths.has(href)) bad.push(`${slug} → ${href}`);
        if (href === `/services/${slug}`) bad.push(`${slug} → itself`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('every locality has nearby links, all to real localities and never to itself', () => {
    const bad: string[] = [];
    for (const a of AREAS) {
      const nearby = getNearbyLocalitySlugs(a.slug);
      if (nearby.length === 0) bad.push(`${a.slug}: no nearby links`);
      for (const n of nearby) {
        if (!areaSlugs.has(n)) bad.push(`${a.slug} → ${n} (unknown)`);
        if (n === a.slug) bad.push(`${a.slug} → itself`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('every locality is linked from at least one other locality (no orphan localities)', () => {
    const inbound = new Map<string, number>();
    for (const a of AREAS) {
      for (const n of getNearbyLocalitySlugs(a.slug)) inbound.set(n, (inbound.get(n) ?? 0) + 1);
    }
    const orphans = AREAS.map((a) => a.slug).filter((s) => !inbound.has(s));
    expect(orphans).toEqual([]);
  });

  it('every blog post links to a live route (service page or hub)', () => {
    const bad = BLOG_POSTS.filter(
      (p) => !servicePaths.has(p.relatedServiceHref) && !KNOWN_PATHS.has(p.relatedServiceHref)
    ).map((p) => `${p.slug} → ${p.relatedServiceHref}`);
    expect(bad).toEqual([]);
  });
});
