// Centralized site configuration
// Single source of truth for site URL and related constants

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') ||
  'https://www.wedecorevents.com';

export const SITE_NAME = 'We Decor';
export const SITE_DESCRIPTION = 'Bangalore\'s trusted decor experts for weddings, birthdays, haldi, and more. Professional event decoration services starting from ₹2999.';
export const SITE_PHONE = '+91 9591232166';
export const SITE_WHATSAPP = '+91 9591232166';

// Site metadata for SEO
export const SITE_METADATA = {
  title: {
    default: 'We Decor - Event Decoration Services Bangalore',
    template: '%s | We Decor Bangalore'
  },
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  siteName: SITE_NAME,
  phone: SITE_PHONE,
  whatsapp: SITE_WHATSAPP,
  locale: 'en_IN',
  type: 'website',
  images: [
    {
      url: `${SITE_URL}/og-banner.jpg`,
      width: 1200,
      height: 630,
      alt: 'We Decor - Event Decoration Services Bangalore'
    }
  ],
  contact: {
    phone: SITE_PHONE,
    whatsapp: SITE_WHATSAPP,
    email: 'info@wedecorevents.com'
  },
  social: {
    facebook: 'https://facebook.com/wedecorevents',
    instagram: 'https://instagram.com/wedecorevents',
    twitter: 'https://twitter.com/wedecorevents'
  }
};

// Helper function to build full URLs
export const buildUrl = (path: string = ''): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
};

// Helper function to build canonical URLs
export const buildCanonicalUrl = (path: string = ''): string => {
  return buildUrl(path);
};

// Helper function to build WhatsApp URLs
export const buildWhatsAppUrl = (message: string = ''): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${SITE_WHATSAPP.replace('+', '')}?text=${encodedMessage}`;
};

// Helper function to build phone URLs
export const buildPhoneUrl = (): string => {
  return `tel:${SITE_PHONE}`;
};

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
  robots: '/robots.txt'
} as const;

// Service paths for dynamic generation
export const SERVICE_PATHS = {
  'birthday-decoration': '/services/birthday-decoration',
  'wedding-setup': '/services/wedding-setup',
  'haldi-decoration': '/services/haldi-decoration',
  'tent-balloon-setup': '/services/tent-balloon-setup',
  'birthday-home-decoration': '/services/birthday-home-decoration',
  'haldi-backdrop-decor': '/services/haldi-backdrop-decor',
  'wedding-stage-decor': '/services/wedding-stage-decor',
  'decoration': '/services/decoration',
  'catering': '/services/catering',
  'hair-stylists': '/services/hair-stylists',
  'makeup-artists': '/services/makeup-artists',
  'mehndi-artists': '/services/mehndi-artists',
  'photographers': '/services/photographers',
  'videographers': '/services/videographers'
} as const;

// Helper function to get service path
export const getServicePath = (serviceSlug: string): string => {
  return SERVICE_PATHS[serviceSlug as keyof typeof SERVICE_PATHS] || `/services/${serviceSlug}`;
};

// Helper function to build location service URL
export const buildLocationServiceUrl = (locationSlug: string, serviceSlug: string): string => {
  return buildUrl(`locations/${locationSlug}/${serviceSlug}`);
};

// Helper function to build location URL
export const buildLocationUrl = (locationSlug: string): string => {
  return buildUrl(`locations/${locationSlug}`);
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

// Development vs Production helpers
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

// Log site configuration in development
if (isDevelopment) {
  console.log('🌐 Site Configuration:', {
    SITE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL
  });
}
