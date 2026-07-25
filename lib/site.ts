// Centralized site configuration
// Single source of truth for site URL and related constants

import { env, isProduction, isDevelopment, isPreview } from './env';
import { CONTACT, PHONE_E164 } from './contact';

// Site configuration constants
/**
 * Canonical site URL, sanitized:
 * - trim() removes stray newlines/spaces from env
 * - replace(/\/+$/, "") removes trailing slashes
 */
export const SITE_URL = (env.SITE_URL ?? 'https://www.wedecorevents.com')
  .trim()
  .replace(/\/+$/, '');

export const SITE_NAME = 'We Decor';
export const SITE_DESCRIPTION = 'Professional event decoration services in Bangalore';

export const SITE_PHONE = CONTACT.primary.display;
export const SITE_WHATSAPP = CONTACT.primary.display;
export const SITE_EMAIL = 'info@wedecorevents.com';

// Canonical URL helpers
export const getCanonicalUrl = (path: string = '') => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
};

// URL building helpers
export const buildWhatsAppUrl = (message: string = '') => {
  const encodedMessage = encodeURIComponent(
    message || "Hi! I'm interested in your decoration services."
  );
  return `https://wa.me/${PHONE_E164.primary}?text=${encodedMessage}`;
};

export const buildPhoneUrl = (phone: string = SITE_PHONE) => {
  return `tel:${phone.replace(/\D/g, '')}`;
};

export const buildLocationServiceUrl = (location: string, service: string) => {
  const cleanLocation = location.toLowerCase().replace(/\s+/g, '-');
  const cleanService = service.toLowerCase().replace(/\s+/g, '-');
  return `${SITE_URL}/locations/${cleanLocation}/${cleanService}`;
};

// Environment helpers
export { isProduction, isDevelopment, isPreview };

// Site metadata for SEO
export const getSiteMetadata = () => ({
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  phone: SITE_PHONE,
  whatsapp: SITE_WHATSAPP,
  email: SITE_EMAIL,
});

// Site structure constants
export const SITE_STRUCTURE = {
  home: '/',
  about: '/about',
  contact: '/contact',
  gallery: '/gallery',
  pricing: '/pricing',
  reviews: '/reviews',
  services: '/services',
  locations: '/locations',
  sitemap: '/sitemap.xml',
  robots: '/robots.txt',
} as const;

// Service paths for dynamic generation
export const SERVICE_PATHS = {
  'birthday-decoration': '/services/birthday-decoration',
  'wedding-setup': '/services/wedding-setup',
  'haldi-decoration': '/services/haldi-decoration',
  'engagement-decoration': '/services/engagement-decoration',
  'corporate-decoration': '/services/corporate-decoration',
  'room-decoration': '/services/room-decoration',
  'tent-balloon-setup': '/services/tent-balloon-setup',
  'nikah-decoration': '/services/nikah-decoration',
  'balloon-decoration': '/services/balloon-decoration',
  'baby-shower-decoration': '/services/baby-shower-decoration',
  'anniversary-decoration': '/services/anniversary-decoration',
  'proposal-decoration': '/services/proposal-decoration',
  'home-decoration': '/services/home-decoration',
  'floral-decoration': '/services/floral-decoration',
  'terrace-decoration': '/services/terrace-decoration',
  'car-decoration': '/services/car-decoration',
  decoration: '/services/decoration',
  catering: '/services/catering',
  'hair-stylists': '/services/hair-stylists',
  'makeup-artists': '/services/makeup-artists',
  'mehndi-artists': '/services/mehndi-artists',
  photographers: '/services/photographers',
  videographers: '/services/videographers',
} as const;

// Helper function to get service path
export const getServicePath = (serviceSlug: string): string => {
  return SERVICE_PATHS[serviceSlug as keyof typeof SERVICE_PATHS] || `/services/${serviceSlug}`;
};

// Helper function to build location URL
export const buildLocationUrl = (locationSlug: string): string => {
  return `${SITE_URL}/locations/${locationSlug}`;
};

// Validation function to ensure SITE_URL is properly formatted
export const validateSiteUrl = (): boolean => {
  try {
    const url = new URL(SITE_URL);
    return url.protocol === 'https:' && url.hostname.startsWith('www.');
  } catch {
    return false;
  }
};

// Avoid logging env values in production (OWASP: sensitive data exposure)
if (isDevelopment) {
  console.log('🌐 Site Configuration:', { SITE_URL, NODE_ENV: process.env.NODE_ENV });
}
