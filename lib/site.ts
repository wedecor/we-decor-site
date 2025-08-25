// Centralized site configuration
// Single source of truth for site URL and related constants

// Site configuration constants
export const SITE_URL = 
  (process.env.NEXT_PUBLIC_SITE_URL || "https://www.wedecorevents.com").replace(/\/+$/, "");

export const SITE_NAME = "We Decor";
export const SITE_DESCRIPTION = "Professional event decoration services in Bangalore";
export const SITE_PHONE = "+91 98860 12345";
export const SITE_WHATSAPP = "+91 98860 12345";
export const SITE_EMAIL = "info@wedecorevents.com";

// Canonical URL helpers
export const getCanonicalUrl = (path: string = "") => {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
};

// URL building helpers
export const buildWhatsAppUrl = (message: string = "") => {
  const encodedMessage = encodeURIComponent(message || "Hi! I'm interested in your decoration services.");
  return `https://wa.me/${SITE_WHATSAPP.replace(/\D/g, "")}?text=${encodedMessage}`;
};

export const buildPhoneUrl = (phone: string = SITE_PHONE) => {
  return `tel:${phone.replace(/\D/g, "")}`;
};

export const buildLocationServiceUrl = (location: string, service: string) => {
  const cleanLocation = location.toLowerCase().replace(/\s+/g, "-");
  const cleanService = service.toLowerCase().replace(/\s+/g, "-");
  return `${SITE_URL}/locations/${cleanLocation}/${cleanService}`;
};

// Environment helpers
export const isProduction = process.env.NODE_ENV === "production";
export const isDevelopment = process.env.NODE_ENV === "development";
export const isPreview = process.env.VERCEL_ENV === "preview";

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

// Log site configuration in development
if (isDevelopment) {
  console.log("🌐 Site Configuration:", {
    SITE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  });
}
