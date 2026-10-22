import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/lib/design/tokens';

/**
 * Primary brand lockup — the real We Decor logo in gold.
 *
 * Replaces the previous split of a bare "WD" monogram on mobile and a
 * typographic lockup on desktop: mobile visitors never saw the company name.
 * One asset everywhere keeps the site consistent with the logo used on
 * Instagram, Google Business Profile and the app icons.
 *
 * Artwork comes from the official brand kit (charcoal/cream/slate/gold system,
 * Marcellus wordmark). The gold mark sits beside a CREAM wordmark — setting the
 * wordmark in gold too, as the previous art did, collapsed both into one blob
 * at nav sizes.
 *
 * `nav`    — mark + "WE DECOR" only. The kit's horizontal lockup carries an
 *            "EVENTS · DECOR · CELEBRATIONS" descriptor whose caps are ~23px in
 *            a 270px-tall asset; at a 34px render that is under 3px and turns
 *            to mush, so the nav art is composited without it.
 * `footer` — the kit horizontal lockup intact, descriptor included, where 52px+
 *            of height makes it legible.
 *
 * Explicit width/height at every breakpoint means no layout shift.
 */
const ASSETS = {
  nav: { src: '/brand/logo-gold-navbar.png', ratio: 1026 / 204 },
  footer: { src: '/brand/logo-gold-horizontal.png', ratio: 1191 / 270 },
} as const;

const HEIGHTS = {
  nav: { mobile: 34, desktop: 46 },
  footer: { mobile: 52, desktop: 62 },
} as const;

type Props = {
  variant?: keyof typeof ASSETS;
  asLink?: boolean;
  /** Set on the one lockup that is above the fold (the navbar). */
  priority?: boolean;
};

export default function BrandLockup({
  variant = 'nav',
  asLink = true,
  // Default off — homepage LCP is the hero photo; only pass priority when
  // this lockup itself is the intentional LCP (rare).
  priority = false,
}: Props) {
  const { src, ratio } = ASSETS[variant];
  const { mobile, desktop } = HEIGHTS[variant];
  const label = `${BRAND.name} — ${BRAND.tagline}`;
  // Linked lockups are named by the parent <Link>; both marks stay decorative.
  // Standalone lockups keep a real alt — CSS-hidden twins drop out of the tree.
  const alt = asLink ? '' : label;

  const inner = (
    <>
      <Image
        src={src}
        alt={alt}
        aria-hidden={asLink || undefined}
        width={Math.round(mobile * ratio)}
        height={mobile}
        priority={priority}
        className="md:hidden w-auto"
        style={{ height: mobile }}
      />
      <Image
        src={src}
        alt={alt}
        aria-hidden={asLink || undefined}
        width={Math.round(desktop * ratio)}
        height={desktop}
        priority={priority}
        className="hidden md:block w-auto"
        style={{ height: desktop }}
      />
    </>
  );

  if (!asLink) return <div className="flex items-center shrink-0">{inner}</div>;

  return (
    // min-h-[44px] on the link, not on the lockup. The mark stays 34px on
    // mobile by design (its caps turn to mush any smaller); this only grows
    // the tappable box around it to the touch minimum.
    <Link
      href="/"
      className="flex min-h-[44px] items-center shrink-0"
      aria-label={`${BRAND.name} — home`}
    >
      {inner}
    </Link>
  );
}
