import Link from 'next/link';

type Props = { locality: string };

export default function Breadcrumbs({ locality }: Props) {
  return (
    <nav className="mb-8 text-sm font-light text-lux-text-muted" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-lux-gold transition-colors">
        Home
      </Link>
      <span className="mx-2 opacity-50">/</span>
      <Link href="/locations" className="hover:text-lux-gold transition-colors">
        Locations
      </Link>
      <span className="mx-2 opacity-50">/</span>
      <span className="text-lux-ivory">{locality}</span>
    </nav>
  );
}
