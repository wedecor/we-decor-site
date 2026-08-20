/** Canonical optimized image paths (WebP) — keep in sync with scripts/optimize-images.mjs */

/**
 * Brand logo — gold, matching the site palette (--lux-gold).
 * The original teal `/logo.png` is retained only as an archive of the source art.
 */
export const LOGO_SRC = '/brand/logo-gold-full.png';
export const LOGO_PNG_FALLBACK = '/brand/logo-gold-full.png';
/** Mark only (no wordmark) — icons, avatars, watermarks. */
export const LOGO_MARK_SRC = '/brand/logo-gold-mark.png';
/** Horizontal lockup with tagline — footers and wide placements. */
export const LOGO_HORIZONTAL_SRC = '/brand/logo-gold-horizontal.png';
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
  /** Circular floral arch with fairy lights against gold drapes. */
  arch: '/hero/arch-wide.webp',
  engagement: '/hero/engagement-wide.webp',
  proposal: '/hero/proposal-wide.webp',
  haldi: '/hero/haldi-wide.webp',
} as const;

/** Portrait crops of the same frames, for narrow viewports. */
export const HERO_IMAGES_PORTRAIT = {
  arch: '/hero/arch-portrait.webp',
  engagement: '/hero/engagement-portrait.webp',
  proposal: '/hero/proposal-portrait.webp',
} as const;

/** Homepage hero background. */
export const HERO_BACKGROUND_SRC = HERO_IMAGES.arch;

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
