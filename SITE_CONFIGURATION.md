# Site Configuration Setup

This document explains how to configure the centralized site configuration for the We Decor website.

## 🌐 Environment Variables

### Required Environment Variable

Create a `.env.local` file in your project root with:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://www.wedecorevents.com
```

### Production Environment

For production deployment, ensure your environment has:

```bash
# .env.production (or Vercel environment variables)
NEXT_PUBLIC_SITE_URL=https://www.wedecorevents.com
```

## 🏗️ Centralized Configuration

### File: `lib/site.ts`

This file provides a single source of truth for:

- **Site URL**: `SITE_URL` - Base URL for all canonical links
- **Contact Info**: Phone numbers, WhatsApp, email
- **Site Metadata**: Title templates, descriptions, social links
- **Helper Functions**: URL builders, validation functions

### Key Exports

```typescript
// Base URL (from environment or fallback)
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.wedecorevents.com';

// Contact Information
export const SITE_PHONE = '+91 9591232166';
export const SITE_WHATSAPP = '+91 9591232166';

// Helper Functions
export const buildUrl = (path: string) => `${SITE_URL}${path}`;
export const buildCanonicalUrl = (path: string) => buildUrl(path);
export const buildWhatsAppUrl = (message: string) => `https://wa.me/...`;
export const buildPhoneUrl = () => `tel:${SITE_PHONE}`;
```

## 🔄 Usage Examples

### In Components

```typescript
import { SITE_URL, buildLocationServiceUrl, SITE_PHONE } from '../lib/site';

// Build canonical URLs
const canonicalUrl = buildLocationServiceUrl('whitefield', 'wedding-setup');

// Use contact info
const phoneLink = `tel:${SITE_PHONE}`;
```

### In Pages

```typescript
import { SITE_URL, SITE_PHONE } from '../../lib/site';

// JSON-LD Schema
const schemaMarkup = {
  "@type": "LocalBusiness",
  "url": SITE_URL,
  "telephone": SITE_PHONE,
  // ... other properties
};
```

### In Sitemap

```typescript
import { SITE_URL } from '../lib/site';

export const getServerSideProps = async ({ res }) => {
  const baseUrl = SITE_URL; // Uses environment variable
  // ... sitemap generation
};
```

## 🚀 Benefits

1. **Single Source of Truth**: All URLs and contact info in one place
2. **Environment Flexibility**: Easy to switch between dev/staging/prod
3. **Consistency**: Ensures all canonical tags use the same base URL
4. **Maintainability**: Update once, changes everywhere
5. **SEO Optimization**: Proper canonical URLs across all pages

## 🔧 Configuration Options

### Development vs Production

```typescript
// Development
NEXT_PUBLIC_SITE_URL=https://dev.wedecorevents.com

// Staging
NEXT_PUBLIC_SITE_URL=https://staging.wedecorevents.com

// Production
NEXT_PUBLIC_SITE_URL=https://www.wedecorevents.com
```

### Validation

The configuration includes validation to ensure:

- HTTPS protocol is used
- WWW subdomain is present
- URL is properly formatted

```typescript
export const validateSiteUrl = (): boolean => {
  try {
    const url = new URL(SITE_URL);
    return url.protocol === 'https:' && url.hostname.startsWith('www.');
  } catch {
    return false;
  }
};
```

## 📝 Migration Notes

### Before (Hardcoded)
```typescript
const pageUrl = 'https://www.wedecorevents.com/locations/whitefield';
const phone = '+91 9591232166';
```

### After (Centralized)
```typescript
import { buildLocationUrl, SITE_PHONE } from '../lib/site';

const pageUrl = buildLocationUrl('whitefield');
const phone = SITE_PHONE;
```

## 🚨 Important Notes

1. **Environment Variable**: Must be `NEXT_PUBLIC_` prefixed for client-side access
2. **Fallback URL**: Hardcoded fallback ensures the site works even without environment variables
3. **Build Time**: Environment variables are embedded at build time
4. **Validation**: Use `validateSiteUrl()` in development to catch configuration issues

## 🔍 Troubleshooting

### Common Issues

1. **Environment Variable Not Found**: Check `.env.local` file exists and has correct format
2. **Build Errors**: Ensure `NEXT_PUBLIC_SITE_URL` is set before building
3. **URL Mismatches**: Verify all components import from `lib/site.ts`

### Debug Mode

In development, the configuration logs to console:

```typescript
if (isDevelopment) {
  console.log('🌐 Site Configuration:', {
    SITE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL
  });
}
```

Check your browser console for this information during development.
