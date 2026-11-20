import { getAreaBySlug } from '@/app/(site)/_data/locations';
import { workUrl, type WorkImage } from '@/app/(site)/_data/work-images';

export type WorkTile = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Plain caption: occasion only, or "Haldi décor in Jayanagar". */
  caption: string;
  /** Present when the tile has a verified locality — never the page's area for nearby tiles. */
  href?: string;
};

/**
 * Interleave multi-shot event shoots (e.g. `haldi-ulsoor-2025-08-16-1..4`) so
 * four consecutive angles of the same setup never sit side-by-side in a row.
 * Pass 0 takes the lead shot (`-1`) of every shoot in order, Pass 1 takes `-2`, etc.
 */
export function diversifyWorkImages(images: WorkImage[]): WorkImage[] {
  const groups = new Map<string, WorkImage[]>();
  for (const w of images) {
    const shootKey = w.file.replace(/-\d+(\.[a-z0-9]+)$/i, '$1');
    const bucket = groups.get(shootKey);
    if (bucket) {
      bucket.push(w);
    } else {
      groups.set(shootKey, [w]);
    }
  }

  const buckets = Array.from(groups.values());
  const maxDepth = buckets.reduce((max, b) => Math.max(max, b.length), 0);
  const out: WorkImage[] = [];

  for (let pass = 0; pass < maxDepth; pass += 1) {
    for (const bucket of buckets) {
      if (pass < bucket.length) {
        out.push(bucket[pass]);
      }
    }
  }

  return out;
}

/** Caption and optional locality link for a work photograph. */
export function workTile(w: WorkImage): WorkTile {
  const areaName = w.areaSlug ? getAreaBySlug(w.areaSlug)?.name : undefined;
  const caption = areaName ? `${w.occasion} décor in ${areaName}` : w.occasion;
  return {
    src: workUrl(w),
    width: w.width,
    height: w.height,
    alt: w.alt,
    caption,
    href: w.areaSlug && areaName ? `/locations/${w.areaSlug}` : undefined,
  };
}

export function workTiles(images: WorkImage[]): WorkTile[] {
  return images.map(workTile);
}
