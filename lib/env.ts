// Centralized environment configuration
// Public values only — server secrets must use process.env.* without NEXT_PUBLIC_

import { assertValidEnv, validateAllEnv } from '../env/validation';

export const env = {
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.wedecorevents.com',
  GA_ID: process.env.NEXT_PUBLIC_GA_ID ?? '',
  SENTRY_DSN_PUBLIC: process.env.NEXT_PUBLIC_SENTRY_DSN ?? '',
  CLOUDINARY_CLOUD: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD ?? 'dux3m2saz',
  GOOGLE_PLACE_ID: process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID ?? '',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  VERCEL_ENV: process.env.VERCEL_ENV ?? 'development',
} as const;

/** Re-export validation for tooling */
export { assertValidEnv, validateAllEnv };

export const validateEnv = () => {
  const issues = validateAllEnv();
  return {
    isValid: issues.filter((i) => i.level === 'error').length === 0,
    issues: issues.map((i) => i.message),
  };
};

export const isProduction = env.NODE_ENV === 'production';
export const isDevelopment = env.NODE_ENV === 'development';
export const isPreview = env.VERCEL_ENV === 'preview';
