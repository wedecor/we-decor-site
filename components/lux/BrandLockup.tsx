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
 * `nav`    — mark + "WE DECOR", no tagline. At 34-46px the tagline renders
 *            sub-pixel and turns to mush.
 * `footer` — full horizontal lockup including the tagline, where there is room.
 *
 * Explicit width/height at every breakpoint means no layout shift.
 */
const ASSETS = {
  nav: { src: '/brand/logo-gold-navbar.png', ratio: 987 / 346 },
  footer: { src: '/brand/logo-gold-horizontal.png', ratio: 961 / 358 },
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
    <Link href="/" className="flex items-center shrink-0" aria-label={`${BRAND.name} — home`}>
      {inner}
    </Link>
  );
}
