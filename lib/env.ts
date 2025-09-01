// Centralized environment configuration
// Single source of truth for all environment variables with sensible defaults

export const env = {
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.wedecorevents.com",
  GA_ID: process.env.NEXT_PUBLIC_GA_ID ?? "",
  SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN ?? "",
  CLOUDINARY_CLOUD: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD ?? "dux3m2saz",
  NODE_ENV: process.env.NODE_ENV ?? "development",
  VERCEL_ENV: process.env.VERCEL_ENV ?? "development",
} as const;

// Validation helpers
export const validateEnv = () => {
  const issues: string[] = [];
  
  if (!env.SITE_URL.startsWith('https://')) {
    issues.push('SITE_URL must start with https://');
  }
  
  if (!env.SITE_URL.includes('wedecorevents.com')) {
    issues.push('SITE_URL should contain wedecorevents.com');
  }
  
  return {
    isValid: issues.length === 0,
    issues,
  };
};

// Environment type helpers
export const isProduction = env.NODE_ENV === "production";
export const isDevelopment = env.NODE_ENV === "development";
export const isPreview = env.VERCEL_ENV === "preview";

// Log configuration in development
if (isDevelopment) {
  console.log("🔧 Environment Configuration:", {
    SITE_URL: env.SITE_URL,
    NODE_ENV: env.NODE_ENV,
    VERCEL_ENV: env.VERCEL_ENV,
    CLOUDINARY_CLOUD: env.CLOUDINARY_CLOUD,
  });
} 