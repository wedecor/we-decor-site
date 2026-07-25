import { PRICING_SUMMARY } from '@/lib/content/pricing-tiers';
import { GENERATED_LOCATIONS, type GeneratedLocation } from './locations.generated';

const BY_SLUG = new Map<string, GeneratedLocation>(GENERATED_LOCATIONS.map((g) => [g.slug, g]));

/** Unique per-area content (heroTagline, bodyCopy, uniqueFAQ, waPrefill) generated
 * from real area data (landmarks, venueTypes, vibe) — see scripts/generate-locality-content.ts. */
export function getGeneratedArea(slug: string): GeneratedLocation | undefined {
  return BY_SLUG.get(slug);
}

const MAX_META_DESCRIPTION_LENGTH = 158;

/**
 * Builds a unique, area-specific meta description from the same real data used
 * on the page (heroTagline + a landmark), instead of the generic templated
 * fallback that ~25 of 30 locality pages previously shared verbatim.
 */
export function buildLocationMetaDescription(
  areaName: string,
  generated?: GeneratedLocation
): string {
  if (!generated) {
    return `Professional event decoration services in ${areaName}, Bengaluru. Birthday decor, wedding setup, haldi decoration, room decoration.`;
  }
  // heroTagline already contains the area name, so we lead with it (Bengaluru
  // for geography) instead of repeating "in {areaName}" a second time.
  const landmark = generated.landmarks?.[0];
  const near = landmark ? ` near ${landmark}` : '';
  const description = `${generated.heroTagline}, Bengaluru — weddings, birthdays, haldi & engagement decor${near}. ${PRICING_SUMMARY} WhatsApp We Decor for a quote.`;
  return description.length <= MAX_META_DESCRIPTION_LENGTH
    ? description
    : `${generated.heroTagline}, Bengaluru. ${PRICING_SUMMARY}`;
}
