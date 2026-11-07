import { describe, expect, it } from 'vitest';
import { SITE_URL } from '@/lib/site';
import {
  ALL_ROUTES,
  INDEXABLE_ROUTES,
  canonicalOf,
  robotsIndexable,
  titleText,
  type RouteEntry,
} from './_routes';

/**
 * Metadata audit across every indexable route (Nov 2026).
 *
 * Loads the real `metadata` / `generateMetadata` output of each page rather
 * than re-deriving it from content files, so a regression in `pageMetadata()`
 * or a page that stops calling it shows up here, not in Search Console three
 * weeks later.
 */

type Loaded = { route: RouteEntry; title: string; description: string; canonical: string };

async function loadAll(routes: RouteEntry[]): Promise<Loaded[]> {
  return Promise.all(
    routes.map(async (route) => {
      const meta = await route.load();
      return {
        route,
        title: titleText(meta),
        description: meta.description ?? '',
        canonical: canonicalOf(meta),
      };
    })
  );
}

const expectedCanonical = (path: string) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);

describe('page metadata', () => {
  const pagesPromise = loadAll(INDEXABLE_ROUTES);

  it('every indexable page has a title carrying the brand exactly once', async () => {
    const pages = await pagesPromise;
    const bad = pages
      .filter((p) => (p.title.match(/We Decor/g) ?? []).length !== 1)
      .map((p) => `${p.route.path}: "${p.title}"`);
    expect(bad).toEqual([]);
  });

  it('titles stay under 90 characters (Google renders ~60, but it truncates rather than drops)', async () => {
    const pages = await pagesPromise;
    const long = pages
      .filter((p) => p.title.length > 90)
      .map((p) => `${p.route.path} (${p.title.length})`);
    expect(long).toEqual([]);
  });

  it('every indexable page has a description between 50 and 170 characters', async () => {
    const pages = await pagesPromise;
    const bad = pages
      .filter((p) => p.description.length < 50 || p.description.length > 170)
      .map((p) => `${p.route.path} (${p.description.length})`);
    expect(bad).toEqual([]);
  });

  it('no two indexable pages share a title', async () => {
    const pages = await pagesPromise;
    const seen = new Map<string, string>();
    const dupes: string[] = [];
    for (const p of pages) {
      const prior = seen.get(p.title);
      if (prior) dupes.push(`${prior} / ${p.route.path}: ${p.title}`);
      else seen.set(p.title, p.route.path);
    }
    expect(dupes).toEqual([]);
  });

  it('no two indexable pages share a description', async () => {
    const pages = await pagesPromise;
    const seen = new Map<string, string>();
    const dupes: string[] = [];
    for (const p of pages) {
      const prior = seen.get(p.description);
      if (prior) dupes.push(`${prior} / ${p.route.path}`);
      else seen.set(p.description, p.route.path);
    }
    expect(dupes).toEqual([]);
  });

  it('every page has a self-referencing https www canonical with no trailing slash', async () => {
    const pages = await pagesPromise;
    const bad = pages
      .filter((p) => p.canonical !== expectedCanonical(p.route.path))
      .map((p) => `${p.route.path}: ${p.canonical}`);
    expect(bad).toEqual([]);
  });

  it('indexable pages are not marked noindex, and noindex pages are', async () => {
    const all = await Promise.all(
      ALL_ROUTES.map(async (route) => ({ route, indexable: robotsIndexable(await route.load()) }))
    );
    const wrong = all
      .filter((r) => r.indexable === Boolean(r.route.noindex))
      .map((r) => `${r.route.path} noindex=${r.route.noindex ?? false} indexable=${r.indexable}`);
    expect(wrong).toEqual([]);
  });

  it('Open Graph and Twitter titles match the document title', async () => {
    const mismatched: string[] = [];
    for (const route of INDEXABLE_ROUTES) {
      const meta = await route.load();
      const title = titleText(meta);
      const og = meta.openGraph?.title;
      const tw = meta.twitter?.title;
      if (og !== title || tw !== title) mismatched.push(route.path);
    }
    expect(mismatched).toEqual([]);
  });

  it('every page ships an absolute Open Graph image on the canonical host', async () => {
    const bad: string[] = [];
    for (const route of INDEXABLE_ROUTES) {
      const meta = await route.load();
      const images = meta.openGraph?.images;
      const first = Array.isArray(images) ? images[0] : images;
      const url =
        typeof first === 'string'
          ? first
          : first instanceof URL
            ? first.toString()
            : first && 'url' in first
              ? String(first.url)
              : '';
      if (!/^https:\/\//.test(url)) bad.push(`${route.path}: ${url}`);
    }
    expect(bad).toEqual([]);
  });
});
