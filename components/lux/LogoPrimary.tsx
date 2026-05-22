import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/lib/design/tokens';

type Props = {
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
  /** Full logo image already includes the tagline */
  showTagline?: boolean;
  className?: string;
  centered?: boolean;
};

/** Display heights — portrait logo ~4:5 aspect */
const sizeMap = {
  sm: { height: 88, width: 70 },
  md: { height: 140, width: 112 },
  lg: { height: 200, width: 160 },
} as const;

/** Primary full logo — footer / about / contact */
export default function LogoPrimary({
  size = 'md',
  asLink = false,
  showTagline = false,
  className = '',
  centered = false,
}: Props) {
  const { height, width } = sizeMap[size];

  const content = (
    <div
      className={`flex flex-col gap-4 ${centered ? 'items-center' : 'items-start'} ${className}`}
    >
      <Image
        src={BRAND.logoPrimary}
        alt="We Decor — Bringing dreams to life"
        width={width}
        height={height}
        className={`object-contain h-auto w-auto max-w-full ${centered ? 'mx-auto' : ''}`}
        style={{ maxHeight: height }}
        sizes={`(max-width: 768px) ${width}px, ${width}px`}
        priority={size === 'lg'}
      />
      {showTagline ? (
        <p className="text-[9px] font-sans font-extralight uppercase tracking-tagline text-lux-text-muted/80">
          {BRAND.taglineDisplay}
        </p>
      ) : null}
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" className="inline-block" aria-label="We Decor — home">
        {content}
      </Link>
    );
  }

  return content;
}
