/** Canonical optimized image paths (WebP) — keep in sync with scripts/optimize-images.mjs */

/**
 * Organisation logo for structured data (`NAP.logo` → Organization / LocalBusiness).
 *
 * Deliberately the INK lockup on solid cream, not the gold-on-transparent art:
 * Google composites org logos onto light surfaces in the Knowledge Panel and
 * rich results, where gold on white is close to unreadable and a transparent
 * PNG has no background of its own to save it.
 *
 * On-page lockups are the gold artwork and live in `components/lux/BrandLockup`.
 */
export const LOGO_SRC = '/brand/logo-schema.png';
/** Social / JSON-LD — may include branded headline text; do not use as full-bleed hero background */
export const HERO_BANNER_SRC = '/og-banner.jpg';
export const HERO_BANNER_JPEG = '/og-banner.jpg';
/**
 * Full-bleed hero backgrounds — exported at 2400px from the camera originals.
 * Kept separate from SERVICE_IMAGES because heroes are cropped 16:9 while
 * service cards are cropped 4:5; sharing one file meant one of them was always
 * being centre-cropped badly by object-cover.
 */
export const HERO_IMAGES = {
  /**
   * Banquet floral canopy — the homepage hero.
   *
   * Mirrored from the source frame on purpose. In the original the floral
   * canopy runs across the entire top edge, so no crop leaves a quiet area
   * under the left-aligned headline; flipping puts the gold textured wall
   * there instead and sweeps the canopy in from the right. It also takes the
   * couple's "A&R" monogram out of frame, which had no business being the
   * permanent brand image. There is no text or handedness in the photograph,
   * so the flip costs nothing.
   */
  banquet: '/hero/banquet-wide.webp',
  /** Circular floral arch with fairy lights against gold drapes. */
  arch: '/hero/arch-wide.webp',
  engagement: '/hero/engagement-wide.webp',
  proposal: '/hero/proposal-wide.webp',
  haldi: '/hero/haldi-wide.webp',
} as const;

/*
 * Portrait hero crops are gone. They existed for the art-directed full-bleed
 * hero, which served a 3:4 crop on phones and a 16:9 crop on desktop. The
 * split hero stacks instead — the image keeps its native 16:9 at every width —
 * so the second crop had no consumer. `/hero/*-portrait.webp` are now unused
 * on disk; left in place in case the full-bleed treatment returns.
 */

export const SERVICE_IMAGES = {
  birthday: '/services/birthday.webp',
  haldi: '/services/haldi.webp',
  engagement: '/services/engagement.webp',
  corporate: '/services/corporate.webp',
  tentBalloon: '/services/tent-balloon.webp',
  roomDecor: '/services/room-decor.webp',
} as const;

/** Homepage “Recent atmospheres” — run `node scripts/sync-desktop-images.mjs` after updating ~/Desktop/Images */
export const HOME_PREVIEW_IMAGES = {
  haldi: '/home-preview/haldi.webp',
  birthday: '/home-preview/birthday.webp',
  reception: '/home-preview/reception.webp',
  outdoor: '/home-preview/outdoor.webp',
} as const;
