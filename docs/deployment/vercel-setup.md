# Vercel Git Integration Setup

## One-Time Configuration

### 1. Production Branch
- **Production Branch**: `main`
- **Automatic Production Deployments**: ✅ Enabled

### 2. Build Settings
- **Install Command**: `npm ci`
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)

### 3. Node.js Version
- **Node Version**: `20.x` (set in package.json engines)
- **Alternative**: Set in Project Settings → General → Node.js Version

### 4. Environment Variables
```bash
NEXT_PUBLIC_SITE_URL=https://www.wedecorevents.com
SITE_URL=https://www.wedecorevents.com
CLOUDINARY_CLOUD=dux3m2saz
```

### 5. Domain Configuration
- **Primary Domain**: `www.wedecorevents.com`
- **Secondary Domain**: `wedecorevents.com` (for 308 redirects)
- **Vercel Domains**: Keep attached for preview deployments

## Deployment Flow

### PR Creation
1. Create feature branch: `feat/gsc-canonical-sitemap`
2. Push changes
3. Create PR on GitHub
4. CI runs (skips prod checks on PR)
5. Ensure all checks pass

### Merge to Main
1. Merge PR to `main` branch
2. Vercel automatically deploys to production
3. New canonical sitemap/robots go live
4. CI workflow runs on main push:
   - Waits for prod robots to update
   - Verifies live sitemap
   - Checks legacy redirects
   - Uploads verification reports

## Verification Commands

### Local (Before PR)
```bash
npm run verify:local
```

### Production (After Deploy)
```bash
# Check cache headers
curl -I https://www.wedecorevents.com/sitemap.xml

# Check robots.txt
curl -s https://www.wedecorevents.com/robots.txt

# Verify sitemap
BASE_URL=https://www.wedecorevents.com npm run verify:sitemap
```

## Troubleshooting

### Build Failures
- Check Node.js version (must be 20.x)
- Verify all dependencies install correctly
- Check for conflicting routing (Pages vs App Router)

### Deployment Issues
- Ensure environment variables are set
- Check domain DNS configuration
- Verify Vercel project settings

### CI Failures
- PR checks: Local verification only
- Main checks: Production verification required
- Check workflow logs for specific errors 