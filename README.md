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
 