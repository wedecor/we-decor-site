# We Decor

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```

2. Start the development server:
   ```sh
   npm run dev
   ```

## Formatting & Linting

- Format code: `npm run format`
- Lint code: `npm run lint`
- Type check: `npm run type-check`

## Pre-commit Hooks

- Husky and lint-staged will automatically format and lint staged files before commit.

## Testing

Add your testing instructions here if you add a test framework.

## Vercel CLI: Setup → Deploy → Verify

### Quick Start
```bash
npm run vercel:setup
npm run vercel:deploy
npm run vercel:verify
```

### Setup Process
1. **`npm run vercel:setup`** - Configures environment variables and domains
   - Sets `NEXT_PUBLIC_SITE_URL` to `https://www.wedecorevents.com` for Production and Preview
   - Adds domains: `wedecorevents.com` and `www.wedecorevents.com`
   - Provides DNS configuration guidance

### DNS Configuration Options

#### Option 1: Using Vercel DNS (Recommended)
```bash
# Add A record for apex domain
vercel dns add wedecorevents.com A 76.76.21.21

# Add CNAME record for www subdomain
vercel dns add wedecorevents.com CNAME www cname.vercel-dns.com
```

#### Option 2: Using Your Registrar's DNS
Add these records to your domain registrar's DNS settings:

- **Record Type:** A
  - **Name:** @ (or leave empty for apex)
  - **Value:** 76.76.21.21
  - **TTL:** 3600 (or default)

- **Record Type:** CNAME
  - **Name:** www
  - **Value:** cname.vercel-dns.com
  - **TTL:** 3600 (or default)

### Deployment
2. **`npm run vercel:deploy`** - Builds and deploys to production
   - Runs production build
   - Deploys to Vercel with `--prod` flag

### Verification
3. **`npm run vercel:verify`** - Tests the deployment
   - Verifies apex domain redirects to www (301)
   - Confirms www homepage returns 200 OK
   - Tests trailing slash normalization
   - Exits with error if homepage is not accessible

### Environment Variables
- **`NEXT_PUBLIC_SITE_URL`** must be set to `https://www.wedecorevents.com` for both Production and Preview environments on Vercel
- This ensures proper canonical URLs and redirects across all environments

## Production Readiness Smoke Checklist

### Pre-Deployment Checks
- [ ] **TypeScript**: `npx tsc --noEmit` passes with no errors
- [ ] **Environment**: `npm run audit:env` passes all checks
- [ ] **SEO**: `npm run audit:seo` - review and fix any issues
- [ ] **Links**: `npm run audit:links` - ensure no broken links
- [ ] **Robots & Sitemap**: `npm run audit:robots` - verify SEO files
- [ ] **Structured Data**: `npm run audit:structured-data` - check JSON-LD
- [ ] **Production Build**: `npm run build` completes successfully
- [ ] **Lighthouse**: `npm run audit:performance` - review performance scores

### Domain & SEO Verification
- [ ] **Domain Canonicalization**: All URLs use `wedecorevents.com`
- [ ] **Phone Numbers**: WhatsApp uses `+91 8880544452`, display shows both numbers
- [ ] **Contact Centralization**: All components use `lib/contact.ts`
- [ ] **Image Optimization**: Cloudinary transformations applied
- [ ] **Area Pages**: All 29 area pages have locality-specific content
- [ ] **Routing**: App Router and Pages Router properly configured

### Manual Testing Checklist
- [ ] **Homepage**: Loads correctly with proper metadata
- [ ] **Area Pages**: Each area page displays locality-specific content
- [ ] **Contact Forms**: WhatsApp and phone links work correctly
- [ ] **Gallery**: Images load with Cloudinary optimization
- [ ] **Navigation**: All menu items work and redirect properly
- [ ] **Mobile Responsive**: Site works on mobile devices
- [ ] **Dark Mode**: Theme switching works correctly
- [ ] **Performance**: Pages load within 3 seconds

### Post-Deployment Verification
- [ ] **Live Site**: `https://www.wedecorevents.com` loads correctly
- [ ] **SSL Certificate**: HTTPS works without warnings
- [ ] **Redirects**: Apex domain redirects to www
- [ ] **Analytics**: Google Analytics tracking working
- [ ] **Search Console**: Submit sitemap and verify indexing
- [ ] **Social Media**: OpenGraph and Twitter cards display correctly

### Monitoring & Maintenance
- [ ] **Error Tracking**: Sentry integration working
- [ ] **Performance Monitoring**: Lighthouse scores tracked
- [ ] **SEO Monitoring**: Regular audit reports generated
- [ ] **Content Updates**: Area-specific content maintained
- [ ] **Security**: Dependencies updated regularly

### Emergency Contacts
- **Primary Phone**: +91 8880544452
- **Secondary Phone**: +91 9591232166
- **WhatsApp**: +91 8880544452
- **Domain**: wedecorevents.com
 