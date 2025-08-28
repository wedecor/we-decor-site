"use client";
import Link from "next/link";
type Nearby = { name: string; slug: string };
export default function NearbyChips({ nearby }: { nearby: Nearby[] }) {
  if (!nearby?.length) return null;
  return (
    <section className="mb-10">
      <h2 className="text-xl sm:text-2xl font-semibold">Nearby Areas We Also Serve</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {nearby.map(n => (
          <Link key={n.slug} href={`/areas/${n.slug}`} className="rounded-full border border-white/10 px-3 py-1 text-sm hover:bg-white/5">
            {n.name}
          </Link>
        ))}
      </div>
    </section>
  );
} 