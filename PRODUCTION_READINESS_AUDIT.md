# 🚀 Production Readiness Audit System

A comprehensive audit system for ensuring your We Decor website is production-ready before deployment.

## 📋 Overview

This audit system provides automated checks for:
- Environment variables and configuration
- SEO and canonical URL compliance
- Vercel.app reference detection
- Robots.txt and sitemap validation
- Structured data and meta tags
- Internal link formatting
- Sitemap URL validation
- Build process verification
- Performance optimization (optional)

## 🛠️ Installation

All scripts are already included in your project. No additional installation required.

## 📚 Available Audit Commands

### 🔍 Individual Audits

| Command | Description | Exit Code |
|---------|-------------|-----------|
| `npm run audit:env` | Environment variables & site configuration | 0=pass, 1=fail |
| `npm run audit:vercel` | Check for .vercel.app references | 0=pass, 1=fail |
| `npm run audit:seo` | SEO tags & canonical URL compliance | 0=pass, 1=fail |
| `npm run audit:robots` | Robots.txt & sitemap configuration | 0=pass, 1=fail |
| `npm run audit:structured-data` | JSON-LD & meta tags validation | 0=pass, 1=fail |
| `npm run audit:links` | Internal link formatting | 0=pass, 1=fail |
| `npm run predeploy:validate` | Sitemap URL validation | 0=pass, 1=fail |
| `npm run audit:performance` | Lighthouse performance audit | 0=pass, 1=fail |

### 🚀 Comprehensive Audit

| Command | Description | Exit Code |
|---------|-------------|-----------|
| `npm run audit:production` | Run all audits + build test | 0=pass, 1=fail |

## 🎯 Audit Details

### 1. Environment Variables (`audit:env`)
- ✅ `NEXT_PUBLIC_SITE_URL` is set correctly
- ✅ `SITE_URL` from `lib/site.ts` matches expected value
- ✅ URL format is valid (https + www)
- ✅ `NODE_ENV` is properly configured

### 2. Vercel.app References (`audit:vercel`)
- ✅ No `.vercel.app` references in codebase
- ✅ No `vercel.app` references in codebase
- ✅ Codebase is clean and production-ready

### 3. SEO Tags (`audit:seo`)
- ✅ No hardcoded absolute URLs
- ✅ Canonical tags use proper format
- ✅ Open Graph URLs use relative paths
- ✅ Twitter Card URLs use relative paths

### 4. Robots.txt & Sitemap (`audit:robots`)
- ✅ `robots.txt` file exists
- ✅ Sitemap directive is present
- ✅ Sitemap URL is correct
- ✅ User-agent directives are present
- ✅ Sitemap API route exists
- ✅ Sitemap API uses `SITE_URL`
- ✅ Proper content-type headers

### 5. Structured Data (`audit:structured-data`)
- ✅ JSON-LD uses proper React syntax
- ✅ Open Graph tags are present
- ✅ Twitter Card tags are present
- ✅ Image paths use relative URLs

### 6. Internal Links (`audit:links`)
- ✅ No trailing slashes in internal links
- ✅ No uppercase characters in URLs
- ✅ All links use proper formatting

### 7. Sitemap URLs (`predeploy:validate`)
- ✅ All sitemap URLs return 200 OK
- ✅ No 3xx/4xx/5xx status codes
- ✅ URLs are accessible and working

### 8. Build Process (`audit:production`)
- ✅ Next.js build completes successfully
- ✅ All pages generate without errors
- ✅ Static generation works properly

### 9. Performance (Optional) (`audit:performance`)
- ✅ Performance score ≥ 70
- ✅ Accessibility score ≥ 90
- ✅ Best Practices score ≥ 80
- ✅ SEO score ≥ 80

## 🚀 Usage Examples

### Pre-deployment Check
```bash
# Run comprehensive audit before deployment
npm run audit:production
```

### Individual Issue Investigation
```bash
# Check specific area
npm run audit:seo

# Fix issues, then re-run
npm run audit:seo
```

### CI/CD Integration
```bash
# Add to your deployment pipeline
npm run audit:production || exit 1
```

## 🔧 Troubleshooting

### Common Issues

#### Environment Variables
```bash
# Set in .env.local
NEXT_PUBLIC_SITE_URL=https://www.wedecorevents.com
```

#### Vercel.app References
- Remove any hardcoded `.vercel.app` URLs
- Use environment variables or `lib/site.ts` helpers
- Check comments and documentation

#### SEO Tags
- Use `canonicalPath` prop with `SeoHead` component
- Use relative paths for images (`/og-banner.jpg`)
- Import from `lib/site.ts` for dynamic URLs

#### Internal Links
- Remove trailing slashes
- Use lowercase slugs
- Use relative paths (`/about` not `/About/`)

### Exit Codes
- `0` = All checks passed
- `1` = One or more checks failed

## 📊 Audit Results

### Success Example
```
🎉 CONGRATULATIONS! Your website is production-ready!
🚀 You can deploy with confidence.
🔍 Remember to run these audits before each deployment.
```

### Failure Example
```
⚠️  Some checks failed. Please fix the issues before deploying.
🔧 Run individual audit commands for detailed information:
   npm run audit:env          - Environment variables
   npm run audit:vercel       - Vercel.app references
   npm run audit:seo          - SEO tags
   npm run audit:robots       - Robots.txt & sitemap
   npm run audit:structured-data - Structured data
   npm run audit:links        - Internal links
   npm run predeploy:validate - Sitemap URLs
   npm run build              - Build process
```

## 🎯 Best Practices

### Before Each Deployment
1. Run `npm run audit:production`
2. Fix any issues that fail
3. Re-run until all checks pass
4. Deploy with confidence

### Regular Maintenance
- Run individual audits weekly
- Monitor for new issues
- Keep dependencies updated
- Review audit results

### Team Workflow
- Run audits before creating PRs
- Include audit results in PR descriptions
- Set up CI/CD to run audits automatically
- Document any audit failures and fixes

## 🔗 Related Files

- `lib/site.ts` - Centralized site configuration
- `next.config.js` - Redirect and canonical URL configuration
- `pages/api/sitemap.xml.ts` - Dynamic sitemap generation
- `public/robots.txt` - Search engine directives
- `components/SeoHead.tsx` - SEO component with canonical support

## 📞 Support

If you encounter issues with the audit system:
1. Check the individual audit output for specific details
2. Review the troubleshooting section above
3. Ensure all dependencies are installed
4. Verify your environment configuration

---

**Remember**: A clean audit result means your website is ready for production deployment! 🎉
