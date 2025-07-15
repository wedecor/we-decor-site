import Link from "next/link";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
}

// ServiceCard displays a preview for a single service, used on the homepage and listings
export default function ServiceCard({ title, description, image, href }: ServiceCardProps) {
  return (
    // Card links to the full service landing page
    <Link
      href={href}
      className="block bg-white rounded-lg shadow-xl hover:scale-105 transition-transform duration-200 overflow-hidden font-sans"
    >
      {/* Use next/image for optimized, lazy-loaded service images */}
      <Image
        src={image}
        alt={title}
        width={400}
        height={160}
        className="w-full h-40 object-cover rounded-t-lg"
        style={{ objectFit: "cover" }}
      />
      <div className="p-6 flex flex-col gap-2">
        {/* Service title and description for quick scan */}
        <h3 className="font-bold text-xl mb-1 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-base font-medium">{description}</p>
      </div>
    </Link>
  );
}
