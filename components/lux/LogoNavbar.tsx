import Link from 'next/link';
import { BRAND } from '@/lib/design/tokens';

type Props = { asLink?: boolean };

/** Navbar luxury lockup — typography only */
export default function LogoNavbar({ asLink = true }: Props) {
  const inner = (
    <>
      <span
        className="flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center font-display text-[1.4rem] md:text-[1.55rem] tracking-brand text-lux-gold border border-lux-gold/20 rounded-sm"
        aria-hidden
      >
        {BRAND.monogram}
      </span>
      <span className="min-w-0 border-l border-lux-border pl-4 md:pl-5">
        <span className="block font-display text-[1.1rem] md:text-[1.22rem] font-normal uppercase tracking-brand text-lux-ivory leading-none">
          {BRAND.name}
        </span>
        <span className="mt-2 block text-[8px] md:text-[9px] font-sans font-extralight uppercase tracking-tagline text-lux-secondary/90 leading-tight">
          {BRAND.taglineDisplay}
        </span>
      </span>
    </>
  );

  const className = 'hidden lg:flex items-center gap-0 shrink-0';

  if (asLink) {
    return (
      <Link href="/" className={className} aria-label="We Decor — home">
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}
