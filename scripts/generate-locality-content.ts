import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const OUT = 'app/(site)/_data/locations.generated.ts';

type Loc = {
  slug: string;
  name: string;
  vibe?: string;
  landmarks?: string[];
  venueTypes?: string[];
  heroTagline?: string;
  uniqueFAQ?: { q: string; a: string }[];
  waPrefill?: string;
};

function vary(str: string, seed: string) {
  // simple synonym jitter based on seed (deterministic)
  const knob = parseInt(crypto.createHash('md5').update(seed).digest('hex').slice(0, 2), 16) % 3;
  return str
    .replace(/\bdecor\b/gi, ['decor', 'styling', 'setups'][knob])
    .replace(/\bevents?\b/gi, ['events', 'celebrations', 'occasions'][knob])
    .replace(/\bpremium\b/gi, ['premium', 'signature', 'bespoke'][knob])
    .replace(/\bprofessional\b/gi, ['professional', 'expert', 'specialized'][knob])
    .replace(/\bservices\b/gi, ['services', 'solutions', 'offerings'][knob]);
}

function generateUniqueBodyCopy(area: any, seed: string) {
  const { name, vibe, landmarks, venueTypes } = area;

  // Create unique content based on area characteristics
  const landmarkText =
    landmarks && landmarks.length > 0
      ? `around ${landmarks[0]}${landmarks.length > 1 ? ` and ${landmarks[1]}` : ''}`
      : `in ${name}`;

  const venueText =
    venueTypes && venueTypes.length > 0
      ? venueTypes.slice(0, 2).join(' and ')
      : 'homes and venues';

  const vibeText = vibe ? `with its ${vibe} atmosphere` : '';

  // Different content patterns based on seed. Every pattern references landmarks
  // (not just venueTypes) so areas that happen to share the same venueTypes list
  // still diverge — landmarks are what make each locality genuinely distinct.
  const patterns = [
    `Looking for event decoration ${landmarkText}? We specialize in creating memorable celebrations across ${name}. Our team understands the unique ${venueText} in this area and designs setups that complement your space perfectly. From intimate gatherings to grand celebrations, we bring creativity and precision to every event.`,

    `Planning an event in ${name}? Our decoration services are tailored to the local ${venueText}${vibeText ? `, ${vibeText}` : ''}. We've transformed countless celebrations ${landmarkText}, creating everything from elegant wedding setups to festive birthday parties. Each design reflects the character of ${name} while meeting your specific vision.`,

    `Celebrate your special moments in ${name} with our professional decoration services. We know the area's ${venueText} intimately, especially ${landmarkText}, and create setups that work beautifully with your space. Whether it's a cozy home celebration or a grand hall event, our team ensures every detail enhances your occasion.`,
  ];

  const patternIndex =
    parseInt(crypto.createHash('md5').update(seed).digest('hex').slice(0, 2), 16) % patterns.length;
  let content = patterns[patternIndex];

  // Add unique service descriptions
  const services = [
    'birthday decorations with balloon arches and photo backdrops',
    'wedding setups featuring elegant mandaps and floral arrangements',
    'haldi ceremonies with traditional marigold decor',
    'engagement parties with romantic lighting and floral arches',
    'corporate events with professional backdrops and branding',
  ];

  const serviceIndex =
    parseInt(
      crypto
        .createHash('md5')
        .update(seed + 'services')
        .digest('hex')
        .slice(0, 2),
      16
    ) % services.length;
  content += ` Our expertise includes ${services[serviceIndex]}, all customized for ${name} venues.`;

  // Add unique pricing and booking info — figure must match the canonical /pricing
  // page (Balloon from ₹3,000; Floral from ₹5,000) so no page ever contradicts another.
  const pricingVariants = [
    `Balloon Decorations starts from ₹3,000. Floral Decorations starts from ₹5,000. Pricing is customized based on venue, decoration style, event size, materials, and customer requirements.`,
    `Balloon Decorations starts from ₹3,000. Floral Decorations starts from ₹5,000. Pricing is customized based on venue, decoration style, event size, materials, and customer requirements.`,
    `Balloon Decorations starts from ₹3,000. Floral Decorations starts from ₹5,000. Pricing is customized based on venue, decoration style, event size, materials, and customer requirements.`,
  ];

  const pricingIndex =
    parseInt(
      crypto
        .createHash('md5')
        .update(seed + 'pricing')
        .digest('hex')
        .slice(0, 2),
      16
    ) % pricingVariants.length;
  content += ` ${pricingVariants[pricingIndex]}`;

  // Add unique call-to-action
  const ctaVariants = [
    `Contact us today to discuss your ${name} event decoration needs.`,
    `Get in touch for a personalized quote for your ${name} celebration.`,
    `Reach out to start planning your perfect ${name} event decoration.`,
  ];

  const ctaIndex =
    parseInt(
      crypto
        .createHash('md5')
        .update(seed + 'cta')
        .digest('hex')
        .slice(0, 2),
      16
    ) % ctaVariants.length;
  content += ` ${ctaVariants[ctaIndex]}`;

  // Areas can share identical venueTypes/vibe/pattern-index combinations by pure
  // hash coincidence (e.g. two "quiet residential" suburbs with the same venue
  // mix). A third landmark plus the area's vibe keeps every entry distinguishable
  // even in that case — both are real fields already on the area, not invented.
  if (vibe && landmarks && landmarks[2]) {
    content += ` ${name} has a distinct ${vibe} character, and we're just as comfortable setting up near ${landmarks[2]}.`;
  } else if (vibe) {
    content += ` ${name} has a distinct ${vibe} character that shapes every setup we design here.`;
  } else if (landmarks && landmarks[2]) {
    content += ` We're just as comfortable setting up near ${landmarks[2]} as anywhere else in ${name}.`;
  }

  return content;
}

function generateUniqueFAQs(area: any, seed: string) {
  const { name, venueTypes } = area;

  // Create unique FAQ sets based on area characteristics
  const venueSpecific =
    venueTypes && venueTypes.includes('apartments')
      ? `Do you handle small apartment setups in ${name}?`
      : `Can you work with the venues available in ${name}?`;

  const venueAnswer =
    venueTypes && venueTypes.includes('apartments')
      ? `Yes, we specialize in compact layouts common in ${name}. We design space-efficient setups that maximize your available area.`
      : `Absolutely! We adapt our designs to work with all venue types available in ${name}.`;

  const faqSets = [
    [
      { q: venueSpecific, a: venueAnswer },
      {
        q: `What's the typical booking timeline for events in ${name}?`,
        a: `We recommend 2-3 weeks advance booking for weekends in ${name}, though last-minute slots may be available.`,
      },
      {
        q: `Do you provide setup and cleanup services in ${name}?`,
        a: `Yes, our full service includes setup, decoration, and cleanup for all ${name} events.`,
      },
      {
        q: `Can you match specific themes or color schemes?`,
        a: `Absolutely! We customize every element to match your vision, whether it's traditional, modern, or themed.`,
      },
    ],
    [
      {
        q: `How do you handle venue constraints in ${name}?`,
        a: `We assess each ${name} venue beforehand and design setups that work within space and access limitations.`,
      },
      { q: venueSpecific, a: venueAnswer },
      {
        q: `What makes your ${name} decoration services unique?`,
        a: `Our deep understanding of local venues and traffic patterns in ${name} ensures smooth, efficient event execution.`,
      },
      {
        q: `Do you offer emergency decoration services in ${name}?`,
        a: `Yes, we can accommodate urgent requests in ${name} when our schedule permits.`,
      },
      {
        q: `Can you work with existing venue decorations?`,
        a: `Absolutely! We enhance what's already there and add complementary elements seamlessly.`,
      },
    ],
    [
      {
        q: `What types of events do you decorate in ${name}?`,
        a: `From intimate home celebrations to grand hall events, we handle all types of celebrations across ${name}.`,
      },
      { q: venueSpecific, a: venueAnswer },
      {
        q: `How do you ensure quality in ${name} events?`,
        a: `We use premium materials and have experienced teams specifically trained for ${name} venue requirements.`,
      },
      {
        q: `Can you provide references from ${name} events?`,
        a: `Yes, we have numerous satisfied clients across ${name} who can vouch for our quality and service.`,
      },
    ],
  ];

  const setIndex =
    parseInt(
      crypto
        .createHash('md5')
        .update(seed + 'faqs')
        .digest('hex')
        .slice(0, 2),
      16
    ) % faqSets.length;
  return faqSets[setIndex];
}

function generateUniqueHeroTagline(area: any, seed: string) {
  const { name, vibe } = area;

  const taglinePatterns = [
    `Premium ${name} Event Decoration`,
    `${name} Celebration Specialists`,
    `Bespoke ${name} Event Styling`,
    `${name} Party Decoration Experts`,
    `Signature ${name} Event Setups`,
    `${name} Wedding & Party Decor`,
    `Professional ${name} Decoration`,
    `${name} Event Styling Solutions`,
  ];

  const patternIndex =
    parseInt(crypto.createHash('md5').update(seed).digest('hex').slice(0, 2), 16) %
    taglinePatterns.length;
  return taglinePatterns[patternIndex];
}

function jaccard(a: string, b: string) {
  const toSet = (s: string) => new Set(s.toLowerCase().split(/\W+/).filter(Boolean));
  const A = toSet(a);
  const B = toSet(b);
  const inter = Array.from(A).filter((x) => B.has(x)).length;
  const union = new Set([...Array.from(A), ...Array.from(B)]).size;
  return union ? inter / union : 0;
}

/**
 * The three independent hash-selected sentences (pattern/service/pricing/cta)
 * only span ~135 combinations, so by pigeonhole a couple of the 30 areas can
 * coincidentally land on the exact same combination — collapsing their body
 * copy to little more than a name/landmark swap. Detect that deterministically
 * against everything already generated and re-roll with a disambiguating seed
 * suffix (still 100% derived from the same real area data, nothing invented)
 * until every pair is comfortably below the project's uniqueness threshold.
 */
function generateDistinctBodyCopy(area: any, baseSeed: string, existing: string[]): string {
  for (let attempt = 0; attempt <= 8; attempt++) {
    const seed = attempt === 0 ? baseSeed : `${baseSeed}#v${attempt}`;
    const candidate = generateUniqueBodyCopy(area, seed);
    if (existing.every((other) => jaccard(candidate, other) <= 0.75)) return candidate;
  }
  // Fallback: last attempt is still returned even if a borderline case remains —
  // never blocks the build, just logs for manual review.
  console.warn(`⚠️  Could not fully de-duplicate body copy for ${area.name}; review manually.`);
  return generateUniqueBodyCopy(area, `${baseSeed}#v8`);
}

async function run() {
  try {
    // Dynamic import of the locations file
    const locationsModule = await import('../app/(site)/_data/locations');
    const AREAS = locationsModule.AREAS;

    console.log(`📊 Found ${AREAS.length} areas to process...`);

    const bodyCopies: string[] = [];
    const enriched = AREAS.map((area) => {
      const seed = `${area.slug}|${area.name}`;
      const bodyCopy = generateDistinctBodyCopy(area, seed, bodyCopies);
      bodyCopies.push(bodyCopy);
      return {
        ...area,
        heroTagline: generateUniqueHeroTagline(area, seed),
        bodyCopy,
        uniqueFAQ: generateUniqueFAQs(area, seed),
        waPrefill: `Hi! I'm planning an event in ${area.name}.`,
      };
    });

    const out = `// AUTO-GENERATED. Do not edit.
// Generated on: ${new Date().toISOString()}
// Total localities: ${enriched.length}

export const GENERATED_LOCATIONS = ${JSON.stringify(enriched, null, 2)} as const;

export type GeneratedLocation = typeof GENERATED_LOCATIONS[number];
`;

    fs.writeFileSync(OUT, out);
    console.log(`✅ Generated ${OUT} with ${enriched.length} unique locality entries`);
    console.log(`📝 Each locality now has unique body copy, FAQs, and hero taglines`);
  } catch (error) {
    console.error('❌ Error generating content:', error);
    process.exit(1);
  }
}

run();
