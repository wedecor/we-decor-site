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
