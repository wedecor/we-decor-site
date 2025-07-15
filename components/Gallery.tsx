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
    <section className="py-12 px-6 max-w-screen-lg mx-auto font-sans">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 text-gray-800">Gallery</h2>
      {/* Responsive grid of images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {images.map((img, i) => (
          <div key={img.src} className="relative group cursor-pointer">
            {/* 🎨 UI Upgrade: Use next/image, rounded, shadow, hover overlay */}
            <Image
              src={img.src}
              alt={img.caption || ""}
              width={400}
              height={300}
              className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:scale-105 group-hover:shadow-xl transition-transform duration-200"
              style={{ objectFit: "cover" }}
              onClick={() => setLightbox(i)}
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition duration-200" />
            {/* Optional caption overlay */}
            {img.caption && (
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-3 py-1 rounded-full shadow">
                {img.caption}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Lightbox overlay for enlarged image preview */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-3xl w-full flex flex-col items-center">
            <Image
              src={images[lightbox].src}
              alt={images[lightbox].caption || ""}
              width={900}
              height={700}
              className="max-h-[80vh] max-w-full rounded-xl shadow-2xl border-4 border-white"
              style={{ objectFit: "contain" }}
            />
            {images[lightbox].caption && (
              <div className="mt-4 text-white text-lg bg-black bg-opacity-60 px-4 py-2 rounded-full">
                {images[lightbox].caption}
              </div>
            )}
            <button
              className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 rounded-full p-2 shadow-md transition"
              onClick={() => setLightbox(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
