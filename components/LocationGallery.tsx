"use client";

import Image from "next/image";
import { useState } from "react";

interface GalleryItem {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

interface LocationGalleryProps {
  items: GalleryItem[];
}

export default function LocationGallery({ items }: LocationGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const openModal = (item: GalleryItem) => {
    setSelectedImage(item);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="space-y-6">
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="group cursor-pointer bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => openModal(item)}
            tabIndex={0}
            role="button"
            aria-label={`View ${item.alt}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(item);
              }
            }}
          >
            <div className="relative aspect-[4/3] bg-gray-100">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
                draggable={false}
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 font-medium">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-gray-300 z-10"
              aria-label="Close modal"
            >
              ×
            </button>
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="relative">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={selectedImage.width}
                  height={selectedImage.height}
                  className="w-full h-auto"
                  priority
                />
              </div>
              <div className="p-4">
                <p className="text-lg font-medium text-gray-800">{selectedImage.caption}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
