'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { trackPortfolioImageClick } from '@/lib/analytics/events';

interface GalleryItem {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  href?: string;
}

interface LocationGalleryProps {
  items: GalleryItem[];
  /** Analytics surface. Defaults to location_gallery. */
  source?: string;
  /** How many leading images may load eagerly. First row only. */
  priorityCount?: number;
}

export default function LocationGallery({
  items,
  source = 'location_gallery',
  priorityCount = 0,
}: LocationGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const openModal = (item: GalleryItem, index: number, trigger: HTMLElement) => {
    lastTriggerRef.current = trigger;
    setSelectedImage(item);
    trackPortfolioImageClick(source, index, {
      action: 'view_fullsize',
      caption: item.caption,
    });
  };

  const closeModal = () => {
    setSelectedImage(null);
    lastTriggerRef.current?.focus();
  };

  useEffect(() => {
    if (!selectedImage) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
        lastTriggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [selectedImage]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
        {items.map((item, index) => {
          const eager = index < priorityCount;
          return (
            <figure key={`${item.src}-${index}`} className="min-w-0">
              <div
                className="cursor-pointer overflow-hidden rounded-[4px] border border-white/[0.08] bg-lux-muted"
                onClick={(e) => openModal(item, index, e.currentTarget)}
                tabIndex={0}
                role="button"
                aria-label={`View ${item.alt}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(item, index, e.currentTarget);
                  }
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="h-auto w-full"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  priority={eager}
                  loading={eager ? undefined : 'lazy'}
                  draggable={false}
                />
              </div>
              <figcaption className="mt-2 text-sm font-light text-lux-muted">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-lux-gold hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.caption}
                  </Link>
                ) : (
                  item.caption
                )}
              </figcaption>
            </figure>
          );
        })}
      </div>

      {selectedImage ? (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ background: 'rgba(5, 1, 13, 0.88)' }}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <div
            className="relative max-w-4xl max-h-full overflow-y-auto lux-panel p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={closeModal}
              className="lux-icon-btn absolute top-4 right-4 min-w-0 min-h-0 text-lux-ivory text-2xl z-10 hover:text-lux-gold"
              aria-label="Close"
            >
              ×
            </button>
            <div className="relative overflow-hidden rounded-[4px]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={selectedImage.width}
                height={selectedImage.height}
                className="w-full h-auto"
                sizes="(max-width: 896px) 100vw, 896px"
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
