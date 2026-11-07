import { describe, expect, it } from 'vitest';
import { BALLOON_START_INR, FLORAL_START_INR } from '@/lib/content/pricing-tiers';
import {
  DECORATION_SERVICE_SLUGS,
  getDecorationServicePage,
} from '@/lib/services/decoration-service-pages';
import { buildServiceDetailGraph, type JsonLdNode } from '@/lib/schema';

/**
 * One price per service, everywhere it is stated.
 *
 * The balloon page advertised "from ₹5,000" in its title while the pricing
 * page, homepage and fifty locality pages said ₹3,000, and the Service Offer
 * emitted a third opinion. Conflicting prices are the fastest way to lose a
 * reader — and an AI answer engine quotes whichever it saw last.
 */

const priceIn = (text: string): number | null => {
  const m = text.match(/₹\s?([\d,]+)/);
  return m ? Number(m[1].replace(/,/g, '')) : null;
};

describe('service page pricing consistency', () => {
  it('the Offer lowPrice on each service page equals the floor its title advertises', () => {
    const mismatched: string[] = [];
    for (const slug of DECORATION_SERVICE_SLUGS) {
      const config = getDecorationServicePage(slug)!;
      const advertised = priceIn(config.title);
      if (advertised === null) continue;
      const graph = buildServiceDetailGraph({
        name: config.title,
        description: config.description,
        path: `/services/${slug}`,
        serviceType: config.serviceType,
        serviceId: config.coreServiceId ?? slug,
      });
      const service = graph['@graph'].find((n) => n['@type'] === 'Service') as JsonLdNode;
      const offer = service.offers as JsonLdNode | undefined;
      const spec = (offer?.priceSpecification ?? offer) as JsonLdNode | undefined;
      const low = Number(spec?.minPrice ?? spec?.lowPrice ?? spec?.price ?? NaN);
      if (low !== advertised) mismatched.push(`${slug}: title ₹${advertised}, offer ₹${low}`);
    }
    expect(mismatched).toEqual([]);
  });

  it('title and description of each service page agree with each other', () => {
    const bad: string[] = [];
    for (const slug of DECORATION_SERVICE_SLUGS) {
      const c = getDecorationServicePage(slug)!;
      const t = priceIn(c.title);
      const d = priceIn(c.description);
      if (t !== null && d !== null && t !== d)
        bad.push(`${slug}: title ₹${t} vs description ₹${d}`);
    }
    expect(bad).toEqual([]);
  });

  it('only the published floors are ever advertised', () => {
    // ₹2,500 is the car-decoration doorstep floor; everything else is the
    // balloon or floral floor from pricing-tiers.ts.
    const allowed = new Set([2500, BALLOON_START_INR, FLORAL_START_INR]);
    const bad: string[] = [];
    for (const slug of DECORATION_SERVICE_SLUGS) {
      const c = getDecorationServicePage(slug)!;
      for (const text of [c.title, c.description]) {
        const p = priceIn(text);
        if (p !== null && !allowed.has(p)) bad.push(`${slug}: ₹${p}`);
      }
    }
    expect(bad).toEqual([]);
  });
});
