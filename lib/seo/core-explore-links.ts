/**
 * Sitewide crawl graph helpers for Phase 1.5 indexation recovery.
 * Anchors vary by context to avoid repetitive link equity signals.
 */

export type ExploreLink = { href: string; label: string };

/** Plan-your-event column — vary labels per page context. */
export function planYourEventLinks(
  context: 'service' | 'partner' | 'locality' | 'hub' | 'content'
): ExploreLink[] {
  const maps: Record<typeof context, ExploreLink[]> = {
    service: [
      { href: '/pricing', label: 'Decoration pricing guidance' },
      { href: '/gallery', label: 'Browse celebration photos' },
      { href: '/reviews', label: 'What clients say' },
      { href: '/contact', label: 'Request a quote' },
      { href: '/about', label: 'About We Decor' },
      { href: '/services', label: 'All event services' },
    ],
    partner: [
      { href: '/pricing', label: 'See starting prices' },
      { href: '/gallery', label: 'Event decoration gallery' },
      { href: '/reviews', label: 'Client testimonials' },
      { href: '/contact', label: 'Enquire online' },
      { href: '/about', label: 'Our studio approach' },
      { href: '/services', label: 'Explore services' },
      { href: '/locations', label: 'Areas we decorate' },
    ],
    locality: [
      { href: '/pricing', label: 'View pricing' },
      { href: '/gallery', label: 'Browse gallery' },
      { href: '/reviews', label: 'Customer reviews' },
      { href: '/contact', label: 'Contact us' },
      { href: '/about', label: 'About the studio' },
      { href: '/services', label: 'All services' },
      { href: '/locations', label: 'All Bangalore areas' },
    ],
    hub: [
      { href: '/pricing', label: 'Transparent pricing' },
      { href: '/gallery', label: 'Photo gallery' },
      { href: '/reviews', label: 'Reviews from Bengaluru clients' },
      { href: '/contact', label: 'Start a consultation' },
      { href: '/about', label: 'Why families choose us' },
      { href: '/locations', label: 'Localities we serve' },
      { href: '/faq', label: 'Common questions' },
    ],
    content: [
      { href: '/services', label: 'Event decoration services' },
      { href: '/pricing', label: 'Balloon from ₹3,000 · Floral from ₹5,000' },
      { href: '/gallery', label: 'See our setups' },
      { href: '/reviews', label: 'Read reviews' },
      { href: '/locations', label: 'Bangalore localities' },
      { href: '/contact', label: 'Get in touch' },
    ],
  };
  return maps[context];
}
