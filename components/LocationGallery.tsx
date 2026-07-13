'use client';

import Image from 'next/image';
import { useState } from 'react';
import { trackPortfolioImageClick } from '@/lib/analytics/events';

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

  const openModal = (item: GalleryItem, index: number) => {
    setSelectedImage(item);
    trackPortfolioImageClick('location_gallery', index, {
      action: 'view_fullsize',
      caption: item.caption,
    });
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="lux-card-image group cursor-pointer"
            onClick={() => openModal(item, index)}
            tabIndex={0}
            role="button"
            aria-label={`View ${item.alt}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(item, index);
              }
            }}
          >
            <div className="relative aspect-[4/3] bg-lux-muted overflow-hidden rounded-t-[28px]">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover lux-image-cinematic transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
                draggable={false}
              />
              <div className="absolute inset-0 lux-overlay-cinematic opacity-80 group-hover:opacity-90 transition-opacity" />
            </div>
            <div className="p-5">
              <p className="text-sm text-lux-muted font-light">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage ? (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ background: 'rgba(5, 1, 13, 0.88)' }}
          onClick={closeModal}
          role="dialog"
          aria-modal
        >
          <div
            className="relative max-w-4xl max-h-full lux-panel p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="lux-icon-btn absolute top-4 right-4 min-w-0 min-h-0 text-lux-ivory text-2xl z-10 hover:text-lux-gold"
              aria-label="Close"
            >
              ×
            </button>
            <div className="relative overflow-hidden rounded-[20px]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={selectedImage.width}
                height={selectedImage.height}
                className="w-full h-auto lux-image-cinematic"
                priority
              />
            </div>
            <p className="p-5 font-display text-lg text-lux-ivory">{selectedImage.caption}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
