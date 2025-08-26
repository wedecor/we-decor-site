# 🧪 Locations QA Testing Suite

This testing suite validates the locations experience for consistency, SEO, and indexability.

## 🎯 What We Test

### 1. **Link Validation** (`qa:links`)
- Checks all links on `/locations` page
- Ensures no broken links exist
- Validates both internal and external URLs

### 2. **Page Structure & SEO** (`qa:pages`)
- Verifies Navbar/Footer presence on all location pages
- Checks basic SEO elements:
  - Title tags (minimum 20 chars)
  - Meta descriptions (minimum 60 chars)
  - Canonical URLs
  - H1 headings (minimum 5 chars)

### 3. **Sitemap Validation** (`qa:sitemap`)
- Confirms all location URLs are in `sitemap.xml`
- Cross-references with `locations.ts` data
- Ensures complete coverage of service areas

### 4. **Robots.txt Check** (`qa:robots`)
- Validates `robots.txt` accessibility
- Confirms sitemap reference exists
- Checks for overly restrictive blocking rules

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm run qa:all
```

### Run Individual Tests
```bash
npm run qa:links      # Check links on /locations
npm run qa:pages      # Validate page structure & SEO
npm run qa:sitemap    # Verify sitemap coverage
npm run qa:robots     # Check robots.txt configuration
```

## 🔧 Local Development Testing

### 1. Start Development Server
```bash
npm run qa:dev
# or
npm run dev
```

### 2. Run Tests Against Localhost
```bash
# Set environment variable for local testing
export HOST=http://localhost:3000

# Run individual tests
npm run qa:robots
npm run qa:sitemap
npm run qa:pages
npm run qa:links

# Or run everything at once
npm run qa:all
```

### 3. Test Specific Pages
```bash
# Test links on a specific page
PAGE=/locations/koramangala npm run qa:links

# Test against different host
HOST=http://localhost:3001 npm run qa:all
```

## 🌐 Production Testing

### Test Live Site
```bash
HOST=https://www.wedecorevents.com npm run qa:all
```

### Test Staging/Preview
```bash
HOST=https://your-preview-url.vercel.app npm run qa:all
```

## 📊 Test Coverage

### Pages Tested
- `/locations` - Main locations page
- `/locations/koramangala` - Sample area page
- `/locations/whitefield` - Sample area page  
- `/locations/indiranagar` - Sample area page

### What Passes ✅
- All links return 2xx/3xx status codes
- Navbar and Footer present on all pages
- SEO elements meet minimum requirements
- Sitemap contains all location URLs
- Robots.txt references sitemap and doesn't block

### What Fails ❌
- Broken links (4xx/5xx status codes)
- Missing navigation components
- Incomplete SEO metadata
- Missing sitemap URLs
- Overly restrictive robots.txt

## 🐛 Troubleshooting

### Common Issues

#### 1. **Port Already in Use**
```bash
# Kill existing process
lsof -ti:3000 | xargs kill -9
# Or use different port
HOST=http://localhost:3001 npm run qa:all
```

#### 2. **Network Errors**
```bash
# Check if dev server is running
curl http://localhost:3000/locations

# Verify firewall/network settings
```

#### 3. **Permission Issues**
```bash
# Make scripts executable
chmod +x scripts/*.mjs

# Check Node.js version
node --version  # Should be 18+
```

#### 4. **Dependency Issues**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Debug Mode
```bash
# Add debug logging
DEBUG=* npm run qa:all

# Check specific script output
npm run qa:pages 2>&1 | tee qa-pages.log
```

## 📈 Continuous Integration

### GitHub Actions Example
```yaml
name: QA Tests
on: [push, pull_request]
jobs:
  qa:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run start &
      - run: sleep 10
      - run: HOST=http://localhost:3000 npm run qa:all
```

### Pre-commit Hook
```bash
# Add to package.json scripts
"precommit": "npm run qa:all"

# Install husky
npx husky install
npx husky add .husky/pre-commit "npm run precommit"
```

## 🔍 Customization

### Test Different Pages
Edit `scripts/check-pages.mjs`:
```javascript
const PAGES = [
  '/locations', 
  '/locations/koramangala',
  '/locations/whitefield',
  '/locations/indiranagar',
  '/locations/your-custom-area'  // Add more
];
```

### Adjust SEO Thresholds
Edit `scripts/check-pages.mjs`:
```javascript
if (textLen(title) < 25) problems.push('Short <title>');  // Increase from 20
if (textLen(desc) < 80) problems.push('Short <meta description>');  // Increase from 60
```

### Add Custom Checks
```javascript
// Add to check-pages.mjs
const hasSchema = $('script[type="application/ld+json"]').length > 0;
if (!hasSchema) problems.push('Missing structured data');
```

## 📚 Related Documentation

- [Next.js App Router](https://nextjs.org/docs/app)
- [SEO Best Practices](https://nextjs.org/learn/seo/introduction-to-seo)
- [Sitemap Generation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt)

## 🤝 Contributing

### Adding New Tests
1. Create new script in `scripts/` directory
2. Add npm script to `package.json`
3. Update this README
4. Test locally before committing

### Reporting Issues
- Check existing issues first
- Provide error logs and environment details
- Include steps to reproduce

---

**Last Updated**: $(date)
**Version**: 1.0.0
**Maintainer**: We Decor Development Team 