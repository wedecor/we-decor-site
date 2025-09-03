# Git → Vercel Auto-Deploy Workflow: Canonical Sitemap/Robots

**Branch**: `feat/gsc-canonical-sitemap`  
**Status**: ✅ Ready for PR → Merge → Auto-Deploy

## 🎯 What We've Implemented

### 1. **Canonical Files (SEO-Optimized)**

- ✅ `app/robots.ts`: Single canonical sitemap reference with host
- ✅ `app/sitemap.ts`: Deterministic URLs with `https://www.wedecorevents.com/`
- ✅ `next.config.js`: Cache headers for sitemap/robots + apex → www redirect

### 2. **CI Guardrails (GitHub Actions)**

- ✅ **Workflow**: `.github/workflows/verify-sitemap.yml`
- ✅ **Triggers**: PR checks, main branch pushes, daily cron (09:00 IST)
- ✅ **Safety**: Waits for production to update before verification
- ✅ **Verification**: Sitemap status, XML validation, URL accessibility

### 3. **Verification Script**

- ✅ **Configurable**: `BASE_URL` and `SITEMAP_CHECK_LIMIT` env vars
- ✅ **Comprehensive**: Checks status, content-type, XML structure, URL validity
- ✅ **Reports**: Outputs to `reports/sitemap-diagnosis.txt`

## 🚀 Deployment Flow

### **Step 1: Create PR**

```bash
# Already done ✅
git push -u origin feat/gsc-canonical-sitemap
# Visit: https://github.com/wedecor/we-decor-site/pull/new/feat/gsc-canonical-sitemap
```

### **Step 2: CI Verification**

The workflow will:

1. ✅ Build and install dependencies
2. ⏳ **Wait for production update** (polls robots.txt for canonical sitemap)
3. ✅ Verify live sitemap (status, XML, URL heads)
4. ✅ Check legacy redirect safety (`/api/sitemap.xml` → `/sitemap.xml`)
5. 📊 Upload verification reports as artifacts

### **Step 3: Merge to Main**

```bash
# After CI passes ✅
git checkout main
git merge feat/gsc-canonical-sitemap
git push origin main
```

### **Step 4: Vercel Auto-Deploy**

- Vercel automatically deploys from main branch
- New canonical sitemap/robots with cache headers go live
- Apex → www redirects ensure canonical domain usage

### **Step 5: Post-Deploy Verification**

The same CI workflow runs on main push:

- ⏳ Waits for production to update (robots.txt changes)
- ✅ Verifies live sitemap and robots
- 📊 Reports success/failure

## 🔧 Configuration Details

### **Cache Headers**

```javascript
// next.config.js
{
  source: '/sitemap.xml',
  headers: [
    { key: 'Cache-Control', value: 'public, max-age=300, s-maxage=300, stale-while-revalidate=86400' }
  ],
}
```

### **Robots.txt Format**

```typescript
// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  const base = SITE_URL.replace(/\/+$/, '');
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: [`${base}/sitemap.xml`],
    host: base,
  };
}
```

### **Sitemap Generation**

```typescript
// app/sitemap.ts
const base = SITE_URL.replace(/\/+$/, '');
// Generates: https://www.wedecorevents.com/...
```

## 📋 GSC Post-Launch Checklist

### **Once Production is Verified:**

1. ✅ **Remove Old Sitemap**: `https://www.wedecorevents.com/api/sitemap.xml`
2. ✅ **Submit Canonical**: `https://www.wedecorevents.com/sitemap.xml`
3. ✅ **URL Inspection**: Request indexing for:
   - `/` (homepage)
   - `/areas` (areas overview)
   - `/areas/koramangala` (top locality)
   - `/areas/whitefield` (popular area)
4. ✅ **Monitor**: Indexing → Pages and Core Web Vitals (mobile)

## 🛡️ Safety Features

### **Branch Protection**

- Enable branch protection on main
- Require CI workflow to pass before merge
- Block direct pushes to main

### **Rollback Safety**

- All changes are atomic commits
- Easy to revert: `git revert <commit-sha>`
- Vercel auto-redeploys on revert

### **Verification**

- CI waits for production update before checking
- Comprehensive sitemap validation
- Legacy redirect safety maintained

## 📊 Expected Results

### **Before Deployment:**

- ❌ Robots.txt: Multiple sitemaps, no www
- ❌ Sitemap URLs: Apex domain (redirects to www)
- ❌ Cache: No optimization headers

### **After Deployment:**

- ✅ Robots.txt: Single canonical sitemap with www
- ✅ Sitemap URLs: Direct canonical (no redirects)
- ✅ Cache: Aggressive caching for GSC
- ✅ CI: Automated verification and monitoring

## 🔍 Monitoring & Maintenance

### **Daily Checks**

- Cron job runs at 09:00 IST
- Verifies production sitemap health
- Reports uploaded as GitHub artifacts

### **Manual Triggers**

- `workflow_dispatch` for on-demand verification
- PR checks for all changes
- Main branch verification on every push

---

**Next Step**: Create PR on GitHub and ensure CI passes before merging to main! 🚀
