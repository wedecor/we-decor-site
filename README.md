# We Decor

Professional event decoration services website built with Next.js 15, React 19, and modern web technologies.

## Requirements

- **Node.js**: >=20.0.0 (LTS recommended)
- **Package Manager**: npm (included with Node.js)

## Setup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Set up environment variables:

   ```sh
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

## Architecture

This project uses **Next.js App Router** with the following structure:

- `app/` - App Router pages and layouts
- `components/` - Reusable UI components
- `lib/` - Utility functions and configurations
- `public/` - Static assets

### Key Features

- **Static Site Generation (SSG)** for optimal performance
- **Dynamic imports** for code splitting
- **Image optimization** with Next.js Image component
- **SEO optimization** with metadata API
- **Accessibility** with ARIA labels and semantic HTML
- **Security** with Content Security Policy and security headers

## Formatting & Linting

- Format code: `npm run format`
- Lint code: `npm run lint`
- Type check: `npm run type-check`

## Pre-commit Hooks

- Husky and lint-staged will automatically format and lint staged files before commit.

## Adding a New Locality Landing Page

To add a new locality page for SEO:

1. **Create the page**: Add `app/areas/[slug]/page.tsx`
2. **Add to sitemap**: Update `app/sitemap.ts` with the new route
3. **SEO checklist**:
   - ✅ Unique title with locality name
   - ✅ Meta description with local keywords
   - ✅ Canonical URL set correctly
   - ✅ Open Graph and Twitter cards
   - ✅ Structured data (LocalBusiness)
   - ✅ Breadcrumb navigation
   - ✅ Local phone numbers and addresses
   - ✅ Service area specification

Example:
```tsx
export const metadata: Metadata = {
  title: 'Event Decoration in [Locality] | We Decor Bangalore',
  description: 'Professional event decoration services in [Locality], Bangalore. Birthday, wedding, haldi decoration. Call +91 8880544452.',
  alternates: { canonical: `/areas/${slug}` },
};
```

## Testing

- **Unit tests**: `npm run test:unit`
- **E2E tests**: `npm run test:e2e`
- **Accessibility tests**: `npm run test` (includes a11y checks)
- **Smoke tests**: `npm run test:smoke`

## Development Scripts

- **Preflight check**: `npm run preflight` - Runs lint, typecheck, build, and smoke tests
- **Bundle size check**: `npm run check:bundle` - Ensures bundle stays under 1MB
- **SEO audit**: `npm run audit:seo` - Validates SEO implementation
- **Performance audit**: `npm run audit:performance` - Lighthouse performance check

## Known Issues & Future Improvements

### Tailwind CSS v4 Migration
- **Current**: Tailwind CSS v3.4.1
- **Target**: Tailwind CSS v4.x
- **Status**: Planned for future release
- **Issue**: [Tailwind v4 Migration Plan](https://tailwindcss.com/docs/v4-beta) - Follow official migration guide
- **Impact**: Breaking changes require careful testing

### Internationalization (i18n)
- **Current**: Single language (English)
- **Target**: Multi-language support
- **Recommendation**: Use `next-intl` for locale management
- **Implementation**: Route groups, metadata per locale, content translation

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

## Production Readiness

This project includes comprehensive production readiness checks to ensure code quality, security, accessibility, performance, and compliance standards are met before deployment.

### Quick Start

Run the complete production readiness verification:

```bash
npm run build:guarded
```

This will execute all checks and generate a comprehensive report in `artifacts/production_readiness_report.md`.

### Individual Checks

#### Code Quality
```bash
npm run typecheck    # TypeScript type checking
npm run lint         # ESLint with zero warnings
npm run test:unit    # Unit tests with coverage
npm run test:e2e     # End-to-end tests
```

#### Security & Compliance
```bash
npm run verify:headers   # Security headers validation
npm run verify:secrets   # Secrets scanning
npm run verify:licenses  # License compliance
```

#### Performance & Accessibility
```bash
npm run verify:lighthouse  # Lighthouse performance audit
npm run verify:a11y        # Accessibility testing with axe
npm run verify:bundle      # Bundle size analysis
```

### Production Readiness Gates

The following thresholds must be met for production deployment:

#### Hard Thresholds (CI will fail)
- **TypeScript**: No type errors
- **ESLint**: Zero errors, warnings allowed
- **Tests**: All unit and e2e tests passing
- **Accessibility**: Zero serious/critical violations
- **Security Headers**: All required headers present
- **Bundle Size**: Main bundle ≤ 1.5MB, Pages ≤ 1.2MB
- **Lighthouse Performance**: ≥ 85 on mobile/desktop
- **Lighthouse SEO**: ≥ 90 on mobile/desktop
- **Lighthouse Best Practices**: ≥ 90 on mobile/desktop

#### Soft Thresholds (Warnings)
- **License Compliance**: No copyleft licenses
- **Secrets**: No exposed secrets
- **Bundle Warnings**: Main bundle > 1.2MB

### CI/CD Integration

The production readiness checks are automatically run in CI/CD:

- **GitHub Actions**: Runs on every PR and push to main
- **Artifacts**: All reports are uploaded as workflow artifacts
- **PR Comments**: Results are automatically commented on PRs
- **Failure Gates**: CI fails if any hard threshold is breached

### Local Development

For local development, you can run individual checks:

```bash
# Start development server
npm run dev

# Run specific checks (in separate terminals)
npm run verify:headers --url=http://localhost:3000
npm run verify:a11y --url=http://localhost:3000
npm run verify:lighthouse --url=http://localhost:3000
```

### Production Deployment

Before deploying to production:

1. **Run Full Verification**:
   ```bash
   npm run build:guarded
   ```

2. **Verify All Checks Pass**:
   - Check `artifacts/production_readiness_report.md`
   - Ensure status is "PASS" for all checks

3. **Deploy with Confidence**:
   ```bash
   npm run vercel:deploy
   ```

### Monitoring & Observability

#### Key Metrics
- **Uptime**: >99.9% target
- **Performance**: <2s page load (95th percentile)
- **Accessibility**: WCAG AA compliance
- **Security**: A+ security headers rating

#### Monitoring Tools
- **Sentry**: Error tracking and performance monitoring
- **Google Analytics**: User behavior and performance
- **Lighthouse CI**: Automated performance monitoring
- **Vercel Analytics**: Real-time performance metrics

### Operational Runbooks

Comprehensive operational documentation is available in `docs/runbooks/`:

- **[On-Call Procedures](docs/runbooks/oncall.md)**: Incident response and escalation
- **[Rollback Procedures](docs/runbooks/rollback.md)**: Quick rollback strategies
- **[Disaster Recovery](docs/runbooks/dr.md)**: RTO/RPO targets and procedures
- **[Cost Management](docs/runbooks/costs.md)**: Cost optimization and monitoring

### Troubleshooting

#### Common Issues

**Build Failures**:
```bash
# Check TypeScript errors
npm run typecheck

# Check ESLint errors
npm run lint

# Check test failures
npm run test:unit
npm run test:e2e
```

**Performance Issues**:
```bash
# Run Lighthouse audit
npm run verify:lighthouse

# Check bundle sizes
npm run verify:bundle

# Analyze performance
npm run analyze:bundle
```

**Accessibility Issues**:
```bash
# Run accessibility tests
npm run verify:a11y

# Check specific pages
npm run verify:a11y --url=http://localhost:3000/gallery
```

#### Getting Help

1. **Check the logs**: Review `artifacts/` directory for detailed reports
2. **Review runbooks**: Check `docs/runbooks/` for operational procedures
3. **Run diagnostics**: Use individual check commands for specific issues
4. **Contact team**: Use emergency contacts for critical issues

### Emergency Contacts

- **Primary Phone**: +91 8880544452
- **Secondary Phone**: +91 9591232166
- **WhatsApp**: +91 8880544452
- **Domain**: wedecorevents.com
