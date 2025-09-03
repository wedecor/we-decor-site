# Rollback Procedures

## Overview
This document outlines the rollback procedures for the We Decor website deployed on Vercel.

## Rollback Strategies

### 1. Vercel Git Rollback (Recommended)

#### For Production Deployments
```bash
# 1. Identify the last known good commit
git log --oneline -10

# 2. Create a rollback branch
git checkout -b rollback-$(date +%Y%m%d-%H%M%S)

# 3. Reset to the last known good commit
git reset --hard <commit-hash>

# 4. Force push to trigger new deployment
git push origin rollback-$(date +%Y%m%d-%H%M%S) --force

# 5. Merge rollback branch to main
git checkout main
git merge rollback-$(date +%Y%m%d-%H%M%S)
git push origin main
```

#### For Preview Deployments
```bash
# 1. Go to Vercel dashboard
# 2. Navigate to the project
# 3. Go to Deployments tab
# 4. Find the last known good deployment
# 5. Click "Promote to Production"
```

### 2. Vercel CLI Rollback

```bash
# 1. Install Vercel CLI (if not already installed)
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. List recent deployments
vercel ls

# 4. Rollback to specific deployment
vercel rollback <deployment-url>
```

### 3. Database Rollback (if applicable)

```bash
# If using a database with migrations
# 1. Connect to production database
# 2. Run rollback migration
npm run db:rollback

# 3. Verify data integrity
npm run db:verify
```

## Rollback Decision Matrix

| Issue Type | Rollback Method | Time to Rollback | Risk Level |
|------------|----------------|------------------|------------|
| Complete outage | Vercel Git | 2-5 minutes | Low |
| Security vulnerability | Vercel Git | 2-5 minutes | Low |
| Performance degradation | Vercel Git | 2-5 minutes | Low |
| Data corruption | Database + Git | 10-30 minutes | Medium |
| Feature regression | Vercel CLI | 1-2 minutes | Low |

## Pre-Rollback Checklist

- [ ] Confirm the issue is deployment-related
- [ ] Identify the last known good deployment
- [ ] Notify stakeholders of rollback plan
- [ ] Document the issue for post-mortem
- [ ] Ensure rollback won't cause data loss
- [ ] Verify rollback target is stable

## Rollback Execution Steps

### Step 1: Immediate Response
1. **Acknowledge** the issue
2. **Assess** severity and impact
3. **Decide** on rollback necessity
4. **Notify** team and stakeholders

### Step 2: Rollback Execution
1. **Stop** any ongoing deployments
2. **Execute** rollback procedure
3. **Monitor** rollback deployment
4. **Verify** site functionality

### Step 3: Post-Rollback
1. **Confirm** issue is resolved
2. **Monitor** for 30 minutes
3. **Document** rollback details
4. **Schedule** post-mortem

## Rollback Verification

### Automated Checks
```bash
# Run production readiness checks
npm run build:guarded

# Verify key functionality
curl -I https://www.wedecorevents.com
curl -I https://www.wedecorevents.com/sitemap.xml
curl -I https://www.wedecorevents.com/robots.txt
```

### Manual Verification
- [ ] Homepage loads correctly
- [ ] Key pages are accessible
- [ ] Forms are working
- [ ] Images are loading
- [ ] No console errors
- [ ] Performance is acceptable

## Rollback Communication

### Internal Communication
```
Subject: [URGENT] Production Rollback - We Decor Website

Team,

We are executing a rollback due to [issue description].

Rollback Details:
- From: [current deployment]
- To: [rollback target]
- Reason: [issue description]
- ETA: [expected resolution time]

We will provide updates every 15 minutes.

[Your Name]
```

### External Communication (if needed)
```
Subject: Temporary Service Interruption - We Decor

Dear Customers,

We are currently experiencing technical difficulties and are working to resolve them quickly. We expect normal service to resume within [timeframe].

We apologize for any inconvenience.

The We Decor Team
```

## Rollback Recovery

### After Successful Rollback
1. **Monitor** site stability for 1 hour
2. **Investigate** root cause of original issue
3. **Plan** fix for original issue
4. **Test** fix in staging environment
5. **Schedule** re-deployment

### If Rollback Fails
1. **Escalate** to senior engineer
2. **Consider** alternative rollback methods
3. **Implement** emergency fixes
4. **Communicate** extended downtime
5. **Engage** external support if needed

## Prevention Measures

### Pre-Deployment
- [ ] Run full test suite
- [ ] Verify production readiness checks
- [ ] Test in staging environment
- [ ] Review deployment checklist
- [ ] Ensure rollback plan is ready

### Post-Deployment
- [ ] Monitor key metrics
- [ ] Verify critical functionality
- [ ] Watch error rates
- [ ] Check performance metrics
- [ ] Be ready to rollback quickly

## Emergency Contacts

- **Engineering Lead**: [Contact Info]
- **CTO**: [Contact Info]
- **Vercel Support**: support@vercel.com
- **Emergency Hotline**: [Contact Info]

## Rollback History

| Date | Issue | Rollback Method | Resolution Time | Lessons Learned |
|------|-------|----------------|-----------------|-----------------|
| [Date] | [Issue] | [Method] | [Time] | [Learnings] |