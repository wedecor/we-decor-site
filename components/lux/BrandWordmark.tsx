import Link from 'next/link';
import { BRAND } from '@/lib/design/tokens';

type Props = {
  asLink?: boolean;
  showTagline?: boolean;
  compact?: boolean;
};

/** Typography-only brand lockup — footer and subtle placements */
export default function BrandWordmark({
  asLink = false,
  showTagline = false,
  compact = false,
}: Props) {
  const content = (
    <div className={compact ? 'space-y-1' : 'space-y-2'}>
      <span
        className={`font-display tracking-brand text-lux-gold block ${
          compact ? 'text-lg' : 'text-xl'
        }`}
      >
        {BRAND.monogram}
      </span>
      <span
        className={`font-display uppercase tracking-brand text-lux-ivory block leading-none ${
          compact ? 'text-base' : 'text-lg'
        }`}
      >
        {BRAND.name}
      </span>
      {showTagline ? (
        <span className="text-[9px] font-sans font-extralight uppercase tracking-tagline text-lux-text-muted/80 block pt-1">
          {BRAND.taglineDisplay}
        </span>
      ) : null}
    </div>
  );

  if (asLink) {
    return (
      <Link
        href="/"
        className="inline-block hover:opacity-90 transition-opacity"
        aria-label="We Decor — home"
      >
        {content}
      </Link>
    );
  }

  return content;
}
