import Link from "next/link";
import type { Metadata } from "next";
import { AREAS } from "@/app/(site)/_data/locations";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Areas | We Decor",
  description: "Browse all neighborhoods and localities We Decor serves for birthdays, engagements, baby showers and more.",
  alternates: { canonical: "/areas" }
};

export default function AreasIndexPage() {
  const base = SITE_URL.replace(/\/+$/, "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
      { "@type": "ListItem", position: 2, name: "Areas", item: `${base}/areas` }
    ]
  };

  // Simple A→Z
  const areas = [...AREAS].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <main className="prose max-w-3xl mx-auto px-4 py-12">
        <h1 className="mb-2">Service Areas</h1>
        <p className="mb-6">Explore all neighborhoods we cover in and around Bengaluru.</p>
        <ul className="grid sm:grid-cols-2 gap-2 list-none pl-0">
          {areas.map((a) => (
            <li key={a.slug}>
              <Link className="underline" href={`/areas/${a.slug}`}>{a.name}</Link>
            </li>
          ))}
        </ul>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
    </>
  );
}
