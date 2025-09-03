import Link from 'next/link';
import type { Metadata } from 'next';
import { AREAS } from '@/app/(site)/_data/locations';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Service Areas | We Decor',
  description:
    'Browse all neighborhoods and localities We Decor serves for birthdays, engagements, baby showers and more.',
  alternates: { canonical: '/areas' },
};

export default function AreasIndexPage() {
  // Force rebuild for Vercel deployment
  const base = SITE_URL.replace(/\/+$/, '');
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/` },
      { '@type': 'ListItem', position: 2, name: 'Areas', item: `${base}/areas` },
    ],
  };

  // Simple A→Z
  const areas = [...AREAS].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Service Areas</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Explore all neighborhoods we cover in and around Bengaluru.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {areas.map((a) => (
              <Link
                key={a.slug}
                href={`/areas/${a.slug}`}
                className="block p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group"
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {a.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
