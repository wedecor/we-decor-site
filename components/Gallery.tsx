import { useState } from "react";
import Image from "next/image";
import galleryData from "../data/gallery.json";

// Gallery component displays a responsive grid of images with lightbox preview
export default function Gallery() {
  // Use galleryData from JSON, or fallback to static list if empty
  const images = galleryData.length
    ? galleryData
    : [
        { src: "/gallery/birthday1.webp", caption: "Birthday Party" },
        { src: "/gallery/haldi1.webp", caption: "Haldi Event" },
        { src: "/gallery/wedding1.webp", caption: "Wedding Setup" },
        { src: "/gallery/tent1.webp", caption: "Tent & Balloon" },
      ];
  // State for which image is open in the lightbox (null = none)
  const [lightbox, setLightbox] = useState<number | null>(null);
  return (
    <div>
      {/* Responsive grid of images */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {images.map((img, i) => (
          <div key={img.src} className="relative">
            {/* 🔄 Newly Added: Use next/image for optimized, lazy-loaded images */}
            <Image
              src={img.src}
              alt={img.caption || ""}
              width={400}
              height={300}
              className="w-full h-40 object-cover rounded cursor-pointer"
              style={{ objectFit: "cover" }}
              onClick={() => setLightbox(i)} // Open lightbox on click
            />
            {/* Optional caption overlay */}
            {img.caption && (
              <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                {img.caption}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Lightbox overlay for enlarged image preview */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setLightbox(null)}
        >
          {/* 🔄 Newly Added: Use next/image for lightbox image as well */}
          <Image
            src={images[lightbox].src}
            alt={images[lightbox].caption || ""}
            width={900}
            height={700}
            className="max-h-[80vh] max-w-[90vw] rounded"
            style={{ objectFit: "contain" }}
          />
          {/* Optional caption in lightbox */}
          {images[lightbox].caption && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-lg">
              {images[lightbox].caption}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
