# On-Call Runbook

## Overview
This document provides essential information for on-call engineers responding to incidents with the We Decor website.

## Escalation Procedures

### Severity Levels

#### P0 - Critical (Response: 15 minutes)
- Complete site outage
- Security breach
- Data loss
- Payment processing failure

**Escalation Path:**
1. Immediate response required
2. Notify team lead within 15 minutes
3. Escalate to CTO if not resolved within 1 hour

#### P1 - High (Response: 1 hour)
- Major functionality broken
- Performance degradation >50%
- SEO issues affecting rankings

**Escalation Path:**
1. Respond within 1 hour
2. Notify team lead within 2 hours
3. Escalate to engineering manager if not resolved within 4 hours

#### P2 - Medium (Response: 4 hours)
- Minor functionality issues
- Non-critical performance issues
- Content updates needed

**Escalation Path:**
1. Respond within 4 hours
2. Notify team lead within 8 hours

#### P3 - Low (Response: 24 hours)
- Cosmetic issues
- Enhancement requests
- Documentation updates

## Key Dashboards & Monitoring

### Primary Monitoring
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Sentry Error Tracking**: https://sentry.io/organizations/we-decor/
- **Google Analytics**: https://analytics.google.com/
- **Search Console**: https://search.google.com/search-console/

### Key Metrics to Monitor
- **Uptime**: Should be >99.9%
- **Response Time**: <2 seconds for 95th percentile
- **Error Rate**: <0.1%
- **Core Web Vitals**: LCP <2.5s, FID <100ms, CLS <0.1

## Common Issues & Solutions

### Site Down
1. Check Vercel dashboard for deployment status
2. Verify DNS settings
3. Check for recent deployments
4. Review error logs in Sentry

### Performance Issues
1. Check Core Web Vitals in Google Analytics
2. Review Lighthouse scores
3. Check for large bundle sizes
4. Verify image optimization

### SEO Issues
1. Check Google Search Console for errors
2. Verify sitemap.xml is accessible
3. Check robots.txt
4. Review structured data

### Security Issues
1. Check Sentry for security-related errors
2. Review access logs
3. Verify security headers
4. Check for exposed secrets

## Contact Information

### Team Contacts
- **Engineering Lead**: [Contact Info]
- **CTO**: [Contact Info]
- **DevOps**: [Contact Info]

### External Services
- **Vercel Support**: support@vercel.com
- **Sentry Support**: support@sentry.io
- **Cloudinary Support**: support@cloudinary.com

## SLOs (Service Level Objectives)

### Availability
- **Target**: 99.9% uptime
- **Measurement**: Monthly
- **Error Budget**: 43.2 minutes/month

### Performance
- **Target**: <2s page load time (95th percentile)
- **Measurement**: Weekly
- **Error Budget**: 5% of requests can exceed target

### Error Rate
- **Target**: <0.1% error rate
- **Measurement**: Daily
- **Error Budget**: 1.44 minutes/day

## Incident Response Process

1. **Acknowledge** the incident
2. **Assess** severity and impact
3. **Communicate** status to stakeholders
4. **Investigate** root cause
5. **Resolve** the issue
6. **Document** lessons learned
7. **Follow up** with post-mortem

## Post-Incident Actions

1. Create incident report within 24 hours
2. Schedule post-mortem within 48 hours
3. Update runbooks based on learnings
4. Implement preventive measures
5. Share learnings with team