import Link from "next/link";
import { AREAS } from "@/app/(site)/_data/locations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Areas We Serve | We Decor Events",
  description: "We Decor Events — premium decor services across Bangalore neighborhoods.",
  alternates: { canonical: "/areas" },
};

export default function AreasPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          Areas We Serve
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our services across popular neighborhoods in Bangalore.
        </p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {AREAS.map((area) => (
          <Link 
            key={area.slug} 
            href={`/areas/${area.slug}`} 
            className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {area.name}
              </h3>
              {area.vibe && (
                <p className="mt-2 text-sm text-gray-600">
                  {area.vibe}
                </p>
              )}
              {area.landmarks && area.landmarks.length > 0 && (
                <p className="mt-2 text-xs text-gray-500">
                  Near {area.landmarks.slice(0, 2).join(', ')}
                </p>
              )}
              <span className="mt-4 inline-block text-blue-600 group-hover:underline">
                View services →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
