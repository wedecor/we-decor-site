import { describe, expect, it } from 'vitest';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import { SITE_URL } from '@/lib/site';
import { INDEXABLE_ROUTES, REDIRECT_ONLY_PATHS, ALL_ROUTES } from './_routes';

/**
 * The sitemap is generated from the same data as the pages, so the risk is not
 * a stale list but a drift between what is *indexable* and what is *listed*.
 * These checks hold the two together.
 */

const entries = sitemap();
const urls = entries.map((e) => e.url);
const base = SITE_URL.replace(/\/+$/, '');
const toPath = (url: string) => {
  const p = url.slice(base.length);
  return p === '' ? '/' : p;
};

describe('sitemap.xml', () => {
  it('has no duplicate URLs', () => {
    const dupes = urls.filter((u, i) => urls.indexOf(u) !== i);
    expect(dupes).toEqual([]);
  });

  it('only lists https URLs on the canonical www host', () => {
    const offHost = urls.filter((u) => !u.startsWith(`${base}/`) && u !== `${base}/`);
    expect(offHost).toEqual([]);
    expect(base).toMatch(/^https:\/\/www\./);
  });

  it('uses no trailing slashes (except the homepage) and no query strings', () => {
    const bad = urls.filter((u) => (u !== `${base}/` && u.endsWith('/')) || u.includes('?'));
    expect(bad).toEqual([]);
  });

  it('lists every indexable route exactly once', () => {
    const listed = new Set(urls.map(toPath));
    const missing = INDEXABLE_ROUTES.map((r) => r.path).filter((p) => !listed.has(p));
    expect(missing).toEqual([]);
  });

  it('lists nothing that is not a known indexable HTML route', () => {
    // Catches noindex pages, redirect sources, API routes and plain-text feeds
    // (the llms.txt pair sat here until Nov 2026) creeping into the sitemap.
    const known = new Set(INDEXABLE_ROUTES.map((r) => r.path));
    const unknown = urls.map(toPath).filter((p) => !known.has(p));
    expect(unknown).toEqual([]);
  });

  it('excludes noindex pages and redirect-only paths', () => {
    const noindex = ALL_ROUTES.filter((r) => r.noindex).map((r) => r.path);
    const paths = urls.map(toPath);
    expect(paths.filter((p) => noindex.includes(p))).toEqual([]);
    expect(paths.filter((p) => REDIRECT_ONLY_PATHS.includes(p))).toEqual([]);
    expect(paths.filter((p) => p.startsWith('/api/'))).toEqual([]);
  });

  it('never fabricates lastModified — when present it is a valid, non-future date', () => {
    const now = Date.now();
    const bad = entries
      .filter((e) => e.lastModified !== undefined)
      .filter((e) => {
        const d = new Date(e.lastModified as string | Date);
        return Number.isNaN(d.getTime()) || d.getTime() > now;
      })
      .map((e) => `${e.url}: ${String(e.lastModified)}`);
    expect(bad).toEqual([]);
  });

  it('is advertised by robots.txt', () => {
    const declared = ([] as string[]).concat(robots().sitemap ?? []);
    expect(declared).toContain(`${base}/sitemap.xml`);
  });
});

describe('robots.txt', () => {
  const result = robots();
  const rules = ([] as NonNullable<typeof result.rules>[]).concat(result.rules ?? []).flat();

  it('allows OAI-SearchBot (ChatGPT search) to read every public page', () => {
    // ChatGPT search discovery and GPTBot training are different crawlers.
    // The business wants to be findable in ChatGPT search, so OAI-SearchBot
    // must get `Allow: /` with only the private-path disallows.
    const rule = rules.find((r) => r.userAgent === 'OAI-SearchBot');
    expect(rule).toBeTruthy();
    expect(([] as string[]).concat(rule!.allow ?? [])).toContain('/');
    const disallow = ([] as string[]).concat(rule!.disallow ?? []);
    expect(disallow).not.toContain('/');
    expect(disallow.every((d) => /^\/(api|admin|private)\//.test(d))).toBe(true);
  });

  it('never disallows a path that is in the sitemap', () => {
    const disallows = rules.flatMap((r) => ([] as string[]).concat(r.disallow ?? []));
    const blocked = urls.map(toPath).filter((p) => disallows.some((d) => p.startsWith(d)));
    expect(blocked).toEqual([]);
  });

  it('blocks the API, never the image optimiser', () => {
    const star = rules.find((r) => r.userAgent === '*');
    const disallow = ([] as string[]).concat(star?.disallow ?? []);
    expect(disallow).toContain('/api/');
    expect(disallow.some((d) => '/_next/image'.startsWith(d))).toBe(false);
  });
});
