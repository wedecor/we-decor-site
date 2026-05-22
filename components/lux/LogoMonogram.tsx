import Link from 'next/link';
import { BRAND } from '@/lib/design/tokens';

/** Mobile navbar — centered WD monogram (typography only) */
export default function LogoMonogram() {
  return (
    <Link
      href="/"
      className="lux-monogram lg:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl tracking-brand"
      aria-label="We Decor — home"
    >
      {BRAND.monogram}
    </Link>
  );
}
