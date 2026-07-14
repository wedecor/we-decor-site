/** Canonical optimized image paths (WebP) — keep in sync with scripts/optimize-images.mjs */

export const LOGO_SRC = '/logo.png';
export const LOGO_PNG_FALLBACK = '/logo.png';
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
