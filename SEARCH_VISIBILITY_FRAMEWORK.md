# Search Visibility Framework

## Overview

This document outlines our comprehensive approach to search visibility beyond traditional blue links, focusing on Google Business Profile, Rich Results, Image Search, and measurement strategies.

## 1. Local Pack & Google Business Profile (GBP)

### Weekly Photo Updates

- **Frequency**: Upload 2-3 new photos weekly
- **Content**: Recent event setups, seasonal decorations, team photos
- **Optimization**: Include location names in photo descriptions

### Regular Posts for Offers

- **Format**: "Birthday decor Whitefield from ₹3,999"
- **Frequency**: 2-3 posts per week
- **Content Types**:
  - Service offers with pricing
  - Seasonal promotions
  - Customer testimonials
  - Event highlights

### Category Optimization

- **Primary**: "Party equipment and decoration"
- **Secondary**: "Wedding service", "Event planner", "Balloon decoration"
- **Update**: Review and update categories monthly

### UTM Tracking on GBP Website

- **URL**: `https://www.wedecorevents.com?utm_source=google&utm_medium=gbp&utm_campaign=maps`
- **Measure**: Traffic from Google Maps vs. organic search

## 2. Rich Results Implementation

### ✅ Already Implemented

- **FAQPage Schema**: Complete with 8+ questions per area
- **LocalBusiness Schema**: Enhanced with areaServed and hasOfferCatalog
- **BreadcrumbList Schema**: Added to all location pages

### Schema Coverage

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "We Decor",
  "areaServed": "Whitefield, Bengaluru",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "itemListElement": [
      { "@type": "Offer", "name": "Birthday Decoration" },
      { "@type": "Offer", "name": "Wedding Decoration" }
    ]
  }
}
```

## 3. Images & Google Images

### ✅ Implemented

- **SEO-Friendly Filenames**: `haldi-marigold-stage.webp`, `birthday-balloon-arch-fairylights.webp`
- **Alt Text**: Auto-localized with area names
- **Captions**: Descriptive with service tags
- **Next.js Image**: Optimized with sizes, lazy loading
- **Image Sitemap**: `/image-sitemap` with all gallery images

### Image Optimization Checklist

- [x] Human-readable filenames
- [x] Descriptive alt text
- [x] Rich captions
- [x] Responsive sizing
- [x] Lazy loading
- [x] WebP format
- [x] Image sitemap

## 4. Ads Safety Net (Optional)

### Campaign Structure

```
Campaign: "Local Service Ads"
├── Ad Group: "Whitefield Birthday"
│   ├── Keywords: "birthday decorators whitefield", "birthday decoration whitefield"
│   └── Bid: Competitive for peak weekends
├── Ad Group: "Koramangala Wedding"
│   ├── Keywords: "wedding decoration koramangala", "wedding decorators"
│   └── Bid: Strategic for wedding season
```

### Budget Allocation

- **Peak Periods**: Increase bids 20-30%
- **Off-Peak**: Maintain minimum bids
- **Geographic**: Focus on high-value areas

## 5. Measurement & Analytics

### Key Metrics to Track

#### Location Page Performance

- **Impressions**: Per location page
- **Clicks**: Organic vs. paid
- **CTR**: Click-through rate
- **Position**: Average ranking

#### Google Business Profile

- **Calls**: Phone call volume
- **Direction Requests**: Map navigation
- **Photo Views**: Gallery engagement
- **Review Responses**: Response rate

#### Image Search Performance

- **Image Impressions**: Google Images visibility
- **Image Clicks**: Gallery traffic from images
- **Image CTR**: Image engagement rate

### Tools & Implementation

#### Google Analytics 4

```javascript
// Track location page performance
gtag('event', 'page_view', {
  page_title: 'Event Decoration in Whitefield',
  page_location: '/locations/whitefield',
  custom_parameter: 'whitefield',
});
```

#### Google Search Console

- **Performance**: Monitor impressions and clicks
- **Enhancements**: Track rich results performance
- **Indexing**: Ensure all pages are indexed

#### Google Business Profile Insights

- **Weekly Reports**: Download and analyze
- **Photo Performance**: Track engagement
- **Customer Actions**: Monitor call and direction requests

## 6. QA & Monitoring

### Automated Checks

```bash
# Run SEO QA analysis
npm run qa:seo

# Check specific metrics
npm run qa:seo:check
```

### Weekly Monitoring Schedule

- **Monday**: Run QA scripts, check for regressions
- **Wednesday**: Review GBP insights, update photos/posts
- **Friday**: Analyze performance metrics, plan optimizations

### Lighthouse SEO Monitoring

- **Frequency**: Weekly automated runs
- **Threshold**: Minimum 90 score
- **Action**: Investigate any drops below threshold

## 7. Implementation Checklist

### Immediate Actions

- [x] Implement FAQPage + LocalBusiness schemas
- [x] Add BreadcrumbList schema
- [x] Create image sitemap
- [x] Standardize gallery filenames
- [x] Set up QA monitoring scripts

### Next 30 Days

- [ ] Weekly GBP photo updates
- [ ] Regular GBP posts with offers
- [ ] Monitor rich results performance
- [ ] Track image search metrics
- [ ] Implement UTM tracking

### Next 90 Days

- [ ] Evaluate ads safety net need
- [ ] Optimize based on performance data
- [ ] Expand schema coverage
- [ ] A/B test content variations
- [ ] Scale successful strategies

## 8. Success Metrics

### Primary KPIs

- **Rich Results**: 80%+ of location pages showing rich snippets
- **Image Search**: 20%+ increase in image impressions
- **Local Pack**: Maintain top 3 positions in target areas
- **GBP Engagement**: 15%+ increase in customer actions

### Secondary Metrics

- **Page Speed**: Maintain 90+ Lighthouse score
- **Core Web Vitals**: All metrics in "Good" range
- **Mobile Experience**: 95%+ mobile usability score
- **Accessibility**: WCAG 2.1 AA compliance

## 9. Resources & Tools

### Google Tools

- [Google Business Profile](https://business.google.com/)
- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com/)
- [Google Ads](https://ads.google.com/)

### SEO Tools

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)

### Monitoring Tools

- [GitHub Actions](https://github.com/features/actions) - Automated QA
- [Custom QA Scripts](./scripts/qa-seo-monitoring.ts) - SEO monitoring
- [Performance Monitoring](./scripts/lighthouse-audit.ts) - Core Web Vitals

---

**Last Updated**: January 2025
**Next Review**: Monthly
**Owner**: SEO Team
