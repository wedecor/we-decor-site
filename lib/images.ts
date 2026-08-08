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
/** Photo-only background for homepage hero — replace engagement.webp with watermark-free asset when ready */
export const HERO_BACKGROUND_SRC = '/services/engagement.webp';

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
