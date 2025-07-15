import Link from "next/link";
import Image from "next/image";

// ServiceCard displays a preview for a single service, used on the homepage and listings
export default function ServiceCard({ title, description, image, href }) {
  return (
    // Card links to the full service landing page
    <Link
      href={href}
      className="block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
    >
      {/* 🔄 Newly Added: Use next/image for optimized, lazy-loaded service images */}
      <Image
        src={image}
        alt={title}
        width={400}
        height={160}
        className="w-full h-40 object-cover"
        style={{ objectFit: "cover" }}
      />
      <div className="p-4">
        {/* Service title and description for quick scan */}
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </Link>
  );
}
