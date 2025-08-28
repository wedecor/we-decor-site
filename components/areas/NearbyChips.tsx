"use client";
import Link from "next/link";
type Nearby = { name: string; slug: string };
export default function NearbyChips({ nearby }: { nearby: Nearby[] }) {
  if (!nearby?.length) return null;
  return (
    <section className="mb-10">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">Nearby Areas We Also Serve</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {nearby.map(n => (
          <Link key={n.slug} href={`/areas/${n.slug}`} className="rounded-full border border-gray-200 dark:border-gray-600 px-3 py-1 text-sm hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 transition-colors">
            {n.name}
          </Link>
        ))}
      </div>
    </section>
  );
} 