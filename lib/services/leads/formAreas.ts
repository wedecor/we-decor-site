import { CLUSTERS } from '@/app/(site)/_data/clusters';
import { AREAS } from '@/app/(site)/_data/locations';

export type FormArea = { slug: string; name: string };

function mentionSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Enquiry-form suggestions: every locality page, plus the smaller
 * neighbourhoods listed as cluster mentions (Hoodi, KR Puram, and the rest).
 * Those have no page, but people type them. The city-wide "Bangalore"
 * catch-all is left out — it says nothing about where the event is.
 */
export const AREAS_FOR_FORM: FormArea[] = (() => {
  const pages = AREAS.filter((a) => a.slug !== 'bangalore').map((a) => ({
    slug: a.slug,
    name: a.name,
  }));
  const slugs = new Set(pages.map((a) => a.slug));
  const names = new Set(pages.map((a) => a.name.toLowerCase()));
  const mentions: FormArea[] = [];
  for (const cluster of CLUSTERS) {
    for (const name of cluster.mentions) {
      if (names.has(name.toLowerCase())) continue;
      const slug = mentionSlug(name);
      if (!slug || slugs.has(slug)) continue;
      slugs.add(slug);
      names.add(name.toLowerCase());
      mentions.push({ slug, name });
    }
  }
  return [...pages, ...mentions].sort((a, b) => a.name.localeCompare(b.name));
})();

/**
 * Same ranking as event-type search: prefix first, then contains.
 * Empty query returns the full list so the field can open instantly.
 */
export function filterFormAreas(areas: readonly FormArea[], rawQuery: string): FormArea[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return [...areas];

  const prefix: FormArea[] = [];
  const contains: FormArea[] = [];
  for (const area of areas) {
    const name = area.name.toLowerCase();
    if (name.startsWith(query)) prefix.push(area);
    else if (name.includes(query)) contains.push(area);
  }
  return [...prefix, ...contains];
}
