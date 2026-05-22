import Link from 'next/link';

type Props = {
  title: string;
  slugs: { slug: string; name: string }[];
};

export default function NearbyChips({ title, slugs }: Props) {
  if (!slugs?.length) return null;
  return (
    <section className="mb-14">
      <h2 className="lux-heading-sm mb-6">{title}</h2>
      <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
        {slugs.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/locations/${a.slug}`}
              className="inline-block rounded-full border border-lux-gold/15 px-4 py-2 text-sm text-lux-muted hover:text-lux-gold hover:border-lux-gold/35 transition-all duration-300"
            >
              {a.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
