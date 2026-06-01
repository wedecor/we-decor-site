/** Canonical optimized image paths (WebP) — keep in sync with scripts/optimize-images.mjs */

export const LOGO_SRC = '/logo.png';
export const LOGO_PNG_FALLBACK = '/logo.png';
/** Social / JSON-LD — may include branded headline text; do not use as full-bleed hero background */
export const HERO_BANNER_SRC = '/og-banner.webp';
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
