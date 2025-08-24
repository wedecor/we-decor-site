import Image from "next/image";

interface LocationGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    category?: string;
  }>;
}

export default function LocationGallery({ images }: LocationGalleryProps) {
  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No images available for this location yet.</p>
        <p className="text-gray-400 text-sm mt-2">Check back soon for updates!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, index) => (
        <div
          key={index}
          className="group cursor-pointer bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <div className="relative aspect-[4/3] bg-gray-100">
            <Image
              src={image.src}
              alt={image.alt || `Decoration image ${index + 1}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              placeholder="empty"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              draggable={false}
            />
          </div>
          {image.category && (
            <div className="p-3">
              <p className="text-sm text-gray-600 capitalize">{image.category}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
