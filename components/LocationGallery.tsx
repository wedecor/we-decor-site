'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { trackPortfolioImageClick } from '@/lib/analytics/events';
import TrackedWhatsAppLink from '@/components/analytics/TrackedWhatsAppLink';
import { CONTACT } from '@/lib/contact';

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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const selectedImage =
    selectedIndex !== null && selectedIndex >= 0 && selectedIndex < items.length
      ? items[selectedIndex]
      : null;

  const openModal = (index: number, trigger: HTMLElement) => {
    const item = items[index];
    if (!item) return;
    lastTriggerRef.current = trigger;
    setSelectedIndex(index);
    trackPortfolioImageClick(source, index, {
      action: 'view_fullsize',
      caption: item.caption,
    });
  };

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
    lastTriggerRef.current?.focus();
  }, []);

  const showPrev = useCallback(() => {
    if (items.length <= 1) return;
    setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + items.length) % items.length));
  }, [items.length]);

  const showNext = useCallback(() => {
    if (items.length <= 1) return;
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % items.length));
  }, [items.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNext();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [selectedIndex, closeModal, showPrev, showNext]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 md:gap-5">
        {items.map((item, index) => {
          const eager = index < priorityCount;
          return (
            <figure key={`${item.src}-${index}`} className="group min-w-0 flex flex-col">
              <div
                className="relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-[4px] border border-white/[0.08] bg-lux-elevated transition-colors duration-300 group-hover:border-lux-gold/40"
                onClick={(e) => openModal(index, e.currentTarget)}
                tabIndex={0}
                role="button"
                aria-label={`View ${item.alt}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(index, e.currentTarget);
                  }
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="h-full w-full object-cover object-center lux-image-cinematic transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  priority={eager}
                  loading={eager ? undefined : 'lazy'}
                  draggable={false}
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-lux-bg/80 via-lux-bg/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />
                <span className="pointer-events-none absolute bottom-2.5 right-2.5 rounded-[4px] border border-lux-gold/30 bg-lux-bg/85 px-2.5 py-1 text-[11px] font-medium tracking-wide text-lux-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  View setup
                </span>
              </div>
              <figcaption className="mt-2.5 flex items-center justify-between gap-2 text-xs md:text-sm font-light text-lux-secondary">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="truncate text-lux-gold hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.caption}
                  </Link>
                ) : (
                  <span className="truncate">{item.caption}</span>
                )}
              </figcaption>
            </figure>
          );
        })}
      </div>

      {selectedImage && selectedIndex !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6"
          style={{ background: 'rgba(15, 10, 18, 0.92)' }}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <div
            className="relative flex w-full max-w-4xl max-h-[92vh] flex-col overflow-hidden lux-panel p-3 md:p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between gap-4 border-b border-white/[0.08] pb-2.5">
              <span className="text-xs tracking-lux uppercase text-lux-gold">
                Setup {selectedIndex + 1} of {items.length}
              </span>
              <div className="flex items-center gap-2">
                {items.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={showPrev}
                      className="lux-icon-btn inline-flex h-9 w-9 items-center justify-center rounded-[4px] border border-white/[0.12] bg-lux-surface text-lg text-lux-ivory hover:border-lux-gold hover:text-lux-gold"
                      aria-label="Previous photo"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      className="lux-icon-btn inline-flex h-9 w-9 items-center justify-center rounded-[4px] border border-white/[0.12] bg-lux-surface text-lg text-lux-ivory hover:border-lux-gold hover:text-lux-gold"
                      aria-label="Next photo"
                    >
                      ›
                    </button>
                  </>
                ) : null}
                <button
                  ref={closeRef}
                  type="button"
                  onClick={closeModal}
                  className="lux-icon-btn inline-flex h-9 w-9 items-center justify-center rounded-[4px] border border-white/[0.12] bg-lux-surface text-xl text-lux-ivory hover:border-lux-gold hover:text-lux-gold"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[4px] bg-lux-bg">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={selectedImage.width}
                height={selectedImage.height}
                className="max-h-[66vh] w-auto max-w-full object-contain"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-white/[0.08] pt-3.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="font-display text-lg md:text-xl text-lux-ivory truncate">
                  {selectedImage.caption}
                </p>
                <p className="text-xs text-lux-muted truncate">{selectedImage.alt}</p>
              </div>
              <TrackedWhatsAppLink
                href={CONTACT.waUrl(
                  `Hi We Decor! I saw "${selectedImage.caption}" (${selectedImage.alt}) in your gallery and want to check pricing and availability. Event date: _____. Venue/Area: _____.`
                )}
                source={`${source}_lightbox`}
                target="_blank"
                rel="noopener noreferrer"
                className="lux-btn-primary shrink-0 text-xs md:text-sm px-5 py-2.5"
              >
                Ask price for this setup
              </TrackedWhatsAppLink>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
