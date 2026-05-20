/**
 * Central environment validation for We Decor.
 * Safe to import from Next.js server code and run via `npx tsx env/validation.ts`.
 */

export type EnvScope = 'public' | 'server';

/** Browser-exposed variables (NEXT_PUBLIC_* only). */
export const PUBLIC_ENV_SPEC = {
  NEXT_PUBLIC_SITE_URL: {
    requiredInProduction: true,
    description: 'Canonical HTTPS site URL',
    example: 'https://www.wedecorevents.com',
  },
  NEXT_PUBLIC_GA_ID: { requiredInProduction: false, description: 'GA4 measurement ID' },
  NEXT_PUBLIC_SENTRY_DSN: { requiredInProduction: false, description: 'Sentry client DSN' },
  NEXT_PUBLIC_CLOUDINARY_CLOUD: {
    requiredInProduction: false,
    description: 'Cloudinary cloud name (public)',
  },
  NEXT_PUBLIC_GOOGLE_PLACE_ID: {
    requiredInProduction: false,
    description: 'Google Maps Place ID',
  },
} as const;

/** Server-only variables — must NOT use NEXT_PUBLIC_ prefix. */
export const SERVER_ENV_SPEC = {
  SENTRY_DSN: { requiredInProduction: false, description: 'Sentry server DSN' },
  GOOGLE_PLACES_API_KEY: {
    requiredInProduction: false,
    description: 'Google Places API key (server/scripts only)',
  },
  CLOUDINARY_API_KEY: {
    requiredInProduction: false,
    description: 'Cloudinary API key (upload scripts)',
  },
  CLOUDINARY_API_SECRET: {
    requiredInProduction: false,
    description: 'Cloudinary API secret (upload scripts)',
  },
} as const;

const DANGEROUS_PUBLIC_SUFFIXES = ['API_KEY', 'SECRET', 'TOKEN', 'PASSWORD', 'PRIVATE'] as const;

/** Explicitly allowed NEXT_PUBLIC_* keys that may look sensitive but are designed for the client */
const ALLOWED_PUBLIC_KEYS = new Set(['NEXT_PUBLIC_SENTRY_DSN']);

export type ValidationIssue = {
  level: 'error' | 'warn';
  code: string;
  message: string;
};

function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

function read(key: string): string {
  return (process.env[key] ?? '').trim();
}

/** Fail if a secret-looking variable is exposed via NEXT_PUBLIC_. */
export function findDangerousPublicExposure(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  for (const key of Object.keys(process.env)) {
    if (!key.startsWith('NEXT_PUBLIC_')) continue;
    if (ALLOWED_PUBLIC_KEYS.has(key)) continue;
    const upper = key.replace(/^NEXT_PUBLIC_/, '').toUpperCase();
    for (const suffix of DANGEROUS_PUBLIC_SUFFIXES) {
      if (upper.includes(suffix)) {
        issues.push({
          level: 'error',
          code: 'PUBLIC_SECRET_EXPOSURE',
          message: `${key} must not be public. Move to a server-only variable without NEXT_PUBLIC_.`,
        });
        break;
      }
    }
  }
  return issues;
}

export function validatePublicEnv(): ValidationIssue[] {
  const issues: ValidationIssue[] = [...findDangerousPublicExposure()];
  const siteUrl = read('NEXT_PUBLIC_SITE_URL');

  if (isProduction() && !siteUrl) {
    issues.push({
      level: 'error',
      code: 'MISSING_SITE_URL',
      message: 'NEXT_PUBLIC_SITE_URL is required in production.',
    });
  }

  if (siteUrl) {
    try {
      const parsed = new URL(siteUrl);
      if (parsed.protocol !== 'https:') {
        issues.push({
          level: 'error',
          code: 'SITE_URL_NOT_HTTPS',
          message: 'NEXT_PUBLIC_SITE_URL must use https://',
        });
      }
      if (isProduction() && !parsed.hostname.includes('wedecorevents.com')) {
        issues.push({
          level: 'warn',
          code: 'SITE_URL_DOMAIN',
          message: 'NEXT_PUBLIC_SITE_URL should use wedecorevents.com in production.',
        });
      }
    } catch {
      issues.push({
        level: 'error',
        code: 'SITE_URL_INVALID',
        message: 'NEXT_PUBLIC_SITE_URL is not a valid URL.',
      });
    }
  }

  return issues;
}

export function validateServerEnv(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const legacyPublicPlacesKey = read('NEXT_PUBLIC_GOOGLE_PLACES_API_KEY');
  if (legacyPublicPlacesKey) {
    issues.push({
      level: 'error',
      code: 'LEGACY_PUBLIC_GOOGLE_KEY',
      message:
        'Remove NEXT_PUBLIC_GOOGLE_PLACES_API_KEY. Use server-only GOOGLE_PLACES_API_KEY instead.',
    });
  }
  return issues;
}

export function validateAllEnv(): ValidationIssue[] {
  return [...validatePublicEnv(), ...validateServerEnv()];
}

export function assertValidEnv(): void {
  const issues = validateAllEnv();
  const errors = issues.filter((i) => i.level === 'error');
  if (errors.length === 0) return;
  const message = errors.map((e) => `[${e.code}] ${e.message}`).join('\n');
  throw new Error(`Environment validation failed:\n${message}`);
}

/** CLI entry when run directly */
function runCli(): void {
  const issues = validateAllEnv();
  const errors = issues.filter((i) => i.level === 'error');
  const warnings = issues.filter((i) => i.level === 'warn');

  for (const w of warnings) {
    console.warn(`⚠️  [${w.code}] ${w.message}`);
  }
  for (const e of errors) {
    console.error(`❌ [${e.code}] ${e.message}`);
  }

  if (errors.length > 0) {
    process.exit(1);
  }
  console.log('✅ Environment validation passed.');
}

const isMain =
  typeof process !== 'undefined' &&
  process.argv[1] &&
  (process.argv[1].endsWith('env/validation.ts') ||
    process.argv[1].endsWith('validation.ts'));

if (isMain) {
  runCli();
}
