import Link from 'next/link';
import { planYourEventLinks, type ExploreLink } from '@/lib/seo/core-explore-links';
import { getExploreLocalitiesFor } from '@/lib/seo/internal-links';

type Props = {
  /** Selects varied anchor text for the same core destinations. */
  context: 'service' | 'partner' | 'locality' | 'hub' | 'content';
  /** Optional middle column (e.g. related services). */
  related?: ExploreLink[];
  relatedTitle?: string;
  showLocalities?: boolean;
  /** Stable key for rotating locality sets (balances crawl equity). */
  pageKey?: string;
  heading?: string;
  className?: string;
};

/**
 * Shared internal-link block for crawl depth and indexation signals.
 * Matches existing “Explore more” styling — no new visual language.
 */
export default function CoreExploreLinks({
  context,
  related,
  relatedTitle = 'Related services',
  showLocalities = false,
  pageKey = 'default',
  heading = 'Explore more',
  className = '',
}: Props) {
  const planLinks = planYourEventLinks(context);
  const localityLinks = showLocalities ? getExploreLocalitiesFor(pageKey) : [];
  const cols = 1 + (related?.length ? 1 : 0) + (showLocalities ? 1 : 0);

  return (
    <section
      className={`lux-section-tight lux-section-alt border-t border-white/[0.06] ${className}`.trim()}
      aria-label={heading}
    >
      <div className="lux-container">
        <h2 className="lux-heading-sm mb-10">{heading}</h2>
        <div
          className={`grid gap-10 md:gap-16 ${
            cols >= 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : cols === 2 ? 'sm:grid-cols-2' : ''
          }`}
        >
          {related && related.length > 0 ? (
            <div>
              <h3 className="text-sm uppercase tracking-wide text-lux-muted mb-3">
                {relatedTitle}
              </h3>
              <ul className="list-none p-0 m-0">
                {related.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex min-h-11 items-center text-lux-gold hover:underline font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div>
            <h3 className="text-sm uppercase tracking-wide text-lux-muted mb-3">Plan your event</h3>
            <ul className="list-none p-0 m-0">
              {planLinks.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <Link
                    href={link.href}
                    className="flex min-h-11 items-center text-lux-gold hover:underline font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {showLocalities ? (
            <div>
              <h3 className="text-sm uppercase tracking-wide text-lux-muted mb-3">
                Areas we serve
              </h3>
              <ul className="list-none p-0 m-0">
                {localityLinks.map((area) => (
                  <li key={area.href}>
                    <Link
                      href={area.href}
                      className="flex min-h-11 items-center text-lux-gold hover:underline font-medium"
                    >
                      {area.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/locations"
                    className="flex min-h-11 items-center text-lux-gold hover:underline font-medium"
                  >
                    All localities
                  </Link>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
