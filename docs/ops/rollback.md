# Rollback Procedures

**Release**: v2025.09.01  
**Site**: wedecorevents.com

## Emergency Rollback

### Quick Rollback (Recommended)

```bash
# Rollback to previous release
git checkout v2025.09.01
git push origin main --force

# Redeploy on Vercel
vercel --prod
```

### Safe Rollback (Recommended)

```bash
# Create rollback branch
git checkout -b rollback-emergency
git reset --hard v2025.09.01
git push origin rollback-emergency

# Deploy rollback branch
vercel --prod
```

### Revert Specific Commit

```bash
# Find the problematic commit
git log --oneline -10

# Revert the specific commit
git revert <commit-sha>
git push origin main
```

## Pre-Rollback Checklist

### Verify Issue

- [ ] **Confirm Problem**: Is rollback necessary?
- [ ] **Document Issue**: Record what went wrong
- [ ] **Assess Impact**: How many users affected?
- [ ] **Check Monitoring**: Review error logs

### Backup Current State

- [ ] **Database**: Backup any data changes
- [ ] **Environment**: Note current env variables
- [ ] **DNS Settings**: Document current DNS
- [ ] **Analytics**: Export current data

### Communication

- [ ] **Team Alert**: Notify development team
- [ ] **Stakeholder Update**: Inform business team
- [ ] **User Communication**: Plan user notification
- [ ] **Status Page**: Update status page if available

## Rollback Steps

### Step 1: Stop Current Deployment

```bash
# If using Vercel, you can stop deployment
# Or simply deploy the rollback version
```

### Step 2: Deploy Previous Version

```bash
# Method 1: Checkout previous tag
git checkout v2025.09.01
git push origin main --force

# Method 2: Revert specific commits
git revert <commit-sha>
git push origin main
```

### Step 3: Verify Rollback

- [ ] **Site Accessibility**: Confirm site loads
- [ ] **Core Functionality**: Test main features
- [ ] **Contact Forms**: Verify contact forms work
- [ ] **Area Pages**: Test area page functionality

### Step 4: Monitor Post-Rollback

- [ ] **Error Monitoring**: Check Sentry for errors
- [ ] **Performance**: Monitor page load times
- [ ] **Analytics**: Verify tracking works
- [ ] **User Feedback**: Monitor user reports

## Post-Rollback Actions

### Immediate Actions (0-1 hour)

- [ ] **Issue Investigation**: Determine root cause
- [ ] **Fix Development**: Fix the issue in development
- [ ] **Testing**: Thoroughly test the fix
- [ ] **Documentation**: Update rollback procedures

### Short-term Actions (1-24 hours)

- [ ] **Communication**: Update stakeholders
- [ ] **Monitoring**: Enhanced monitoring
- [ ] **Backup**: Ensure proper backups
- [ ] **Recovery Plan**: Plan for re-deployment

### Long-term Actions (1-7 days)

- [ ] **Root Cause Analysis**: Complete investigation
- [ ] **Process Improvement**: Update deployment process
- [ ] **Testing Enhancement**: Improve testing procedures
- [ ] **Documentation**: Update all documentation

## Rollback Scenarios

### Scenario 1: Site Down

```bash
# Emergency rollback
git checkout v2025.09.01
git push origin main --force
vercel --prod
```

### Scenario 2: Performance Issues

```bash
# Revert performance changes
git revert <performance-commit-sha>
git push origin main
```

### Scenario 3: SEO Issues

```bash
# Revert SEO changes
git revert <seo-commit-sha>
git push origin main
```

### Scenario 4: Contact Form Issues

```bash
# Revert contact changes
git revert <contact-commit-sha>
git push origin main
```

## Environment Variables

### Keep Intact

- [ ] **NEXT_PUBLIC_SITE_URL**: https://www.wedecorevents.com
- [ ] **NEXT_PUBLIC_GA_ID**: Google Analytics ID
- [ ] **NEXT_PUBLIC_SENTRY_DSN**: Sentry DSN
- [ ] **NEXT_PUBLIC_CLOUDINARY_CLOUD**: Cloudinary cloud name

### May Need Adjustment

- [ ] **NODE_ENV**: Should remain "production"
- [ ] **VERCEL_ENV**: Should remain "production"

## DNS and Domain

### Keep Unchanged

- [ ] **Domain**: wedecorevents.com
- [ ] **DNS Records**: All DNS settings
- [ ] **SSL Certificate**: HTTPS configuration
- [ ] **Redirects**: Domain redirects

## Monitoring During Rollback

### Real-time Monitoring

- [ ] **Uptime**: Monitor site availability
- [ ] **Performance**: Watch page load times
- [ ] **Errors**: Monitor error rates
- [ ] **User Traffic**: Track user activity

### Post-Rollback Verification

- [ ] **Homepage**: Test homepage functionality
- [ ] **Area Pages**: Test area page functionality
- [ ] **Contact Forms**: Verify contact forms
- [ ] **WhatsApp Links**: Test WhatsApp integration
- [ ] **Phone Numbers**: Verify phone number display

## Communication Templates

### Internal Alert

```
URGENT: Site rollback required
Issue: [Describe the issue]
Impact: [Number of users affected]
Action: Rolling back to v2025.09.01
ETA: [Estimated time to resolution]
```

### User Communication

```
We're experiencing technical difficulties and are working to resolve them quickly.
The site may be temporarily unavailable. We apologize for the inconvenience.
```

### Stakeholder Update

```
Rollback completed successfully. Site is now stable.
Root cause identified and fix in development.
Next deployment will include additional testing.
```

## Emergency Contacts

### Technical Team

- **Primary Phone**: +91 8880544452
- **Secondary Phone**: +91 95912 32166
- **WhatsApp**: +91 8880544452

### Hosting Provider

- **Vercel**: Check Vercel dashboard
- **Domain**: Contact domain registrar if needed

### Recovery Checklist

- [ ] **Site Up**: ✅ Site loads correctly
- [ ] **Core Features**: ✅ Main functionality works
- [ ] **Contact Forms**: ✅ Contact forms functional
- [ ] **Performance**: ✅ Page load times acceptable
- [ ] **Monitoring**: ✅ Error rates normal
- [ ] **Communication**: ✅ Stakeholders informed
