'use client';

import Image from 'next/image';
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import gallery, { GALLERY_COLLECTION_ORDER, type GalleryImage } from '../utils/gallery';
import { trackPortfolioImageClick } from '@/lib/analytics/events';

const ImageModal = dynamic(() => import('./ImageModal'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="text-white">Loading gallery...</div>
    </div>
  ),
});

function collectionLabel(folder: string, count: number): string {
  if (folder === 'wedding') return 'Coming soon';
  return `${count} setup${count !== 1 ? 's' : ''}`;
}

export default function Gallery() {
  const [filter, setFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<GalleryImage[]>([]);

  const galleryRecord = gallery as Record<string, GalleryImage[]>;

  const filteredCategories = useMemo(() => {
    const ordered = GALLERY_COLLECTION_ORDER.filter((key) => key in galleryRecord);
    if (!filter) return ordered;
    return ordered.filter((category) => category.toLowerCase().includes(filter.toLowerCase()));
  }, [galleryRecord, filter]);

  const handleCategoryClick = (category: string, images: GalleryImage[]) => {
    setSelectedCategory(category);
    setSelectedImages(images);
    trackPortfolioImageClick(category, 0, { action: 'open_collection' });
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setSelectedImages([]);
  };

  return (
    <div className="space-y-8" id="gallery-root">
      <div className="mb-14 border-b border-white/[0.05] pb-8">
        <input
          type="text"
          placeholder="Search collections"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="lux-input max-w-xs w-full sm:max-w-[14rem] text-sm"
          aria-label="Search categories"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((folder) => {
          const imageArray = galleryRecord[folder];
          const thumbnailImage = imageArray[0];
          return (
            <div
              key={folder}
              className="lux-card-image cursor-pointer group"
              onClick={() => handleCategoryClick(folder, imageArray)}
              tabIndex={0}
              aria-label={`View ${folder} gallery`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCategoryClick(folder, imageArray);
                }
              }}
            >
              <div className="relative aspect-[4/3] bg-lux-muted overflow-hidden rounded-t-[28px]">
                {thumbnailImage ? (
                  <Image
                    src={thumbnailImage.src}
                    alt={`${folder} decoration showcase - We Decor Bangalore`}
                    fill
                    className="object-cover lux-image-cinematic transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                    placeholder="empty"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    draggable={false}
                  />
                ) : null}
                <div className="absolute inset-0 lux-overlay-cinematic flex items-end justify-center pb-4 md:pb-5">
                  <div className="text-center px-4 w-full">
                    <h3 className="font-display text-xl text-lux-ivory capitalize">{folder}</h3>
                    <p className="text-sm text-lux-muted mt-1">
                      {collectionLabel(folder, imageArray.length)}
                    </p>
                    <span className="inline-block mt-3 text-xs tracking-lux uppercase text-lux-gold">
                      View collection
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedCategory ? (
        <ImageModal
          isOpen={!!selectedCategory}
          onClose={closeModal}
          images={selectedImages}
          category={selectedCategory}
        />
      ) : null}
    </div>
  );
}
