/** Canonical optimized image paths (WebP) — keep in sync with scripts/optimize-images.mjs */

export const LOGO_SRC = '/logo.webp';
export const LOGO_PNG_FALLBACK = '/logo.png';
export const HERO_BANNER_SRC = '/og-banner.webp';
export const HERO_BANNER_JPEG = '/og-banner.jpg';

export const SERVICE_IMAGES = {
  birthday: '/services/birthday.webp',
  haldi: '/services/haldi.webp',
  engagement: '/services/engagement.webp',
  corporate: '/services/corporate.webp',
  tentBalloon: '/services/tent-balloon.webp',
  roomDecor: '/services/room-decor.webp',
} as const;
