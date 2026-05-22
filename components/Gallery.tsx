'use client';

import Image from 'next/image';
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import gallery from '../utils/gallery';

// Dynamically import the heavy ImageModal component
const ImageModal = dynamic(() => import('./ImageModal'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="text-white">Loading gallery...</div>
    </div>
  ),
});

const LAYOUTS = ['masonry', 'grid', 'list'] as const;
type Layout = (typeof LAYOUTS)[number];

export default function Gallery() {
  const [layout, setLayout] = useState<Layout>('masonry');
  const [filter, setFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<any[]>([]);

  // Use Record<string, any[]> for dynamic access
  const galleryRecord = gallery as Record<string, any[]>;

  const filteredCategories = useMemo(() => {
    const categories = Object.keys(galleryRecord);
    if (!filter) return categories;
    return categories.filter((category) => category.toLowerCase().includes(filter.toLowerCase()));
  }, [galleryRecord, filter]);

  const handleCategoryClick = (category: string, images: any[]) => {
    setSelectedCategory(category);
    setSelectedImages(images);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setSelectedImages([]);
  };

  return (
    <div className="space-y-8" id="gallery-root">
      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-6 mb-14 border-b border-white/[0.05] pb-8">
        <input
          type="text"
          placeholder="Search collections"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="lux-input max-w-xs w-full sm:max-w-[14rem] text-sm"
          aria-label="Search categories"
        />
        <div className="flex gap-1 sm:ml-auto">
          {LAYOUTS.map((l) => (
            <button
              key={l}
              onClick={() => setLayout(l)}
              className={`lux-filter-pill ${layout === l ? 'lux-filter-pill-active' : 'lux-filter-pill-inactive'}`}
              aria-pressed={layout === l}
              aria-label={`Switch to ${l} layout`}
            >
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Layouts */}
      {layout === 'masonry' && (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8 space-y-6 md:space-y-8">
          {filteredCategories.map((folder) => {
            const imageArray = galleryRecord[folder];
            const thumbnailImage = imageArray[0];
            return (
              <div
                key={folder}
                className="mb-6 break-inside-avoid lux-card-image cursor-pointer group"
                onClick={() => handleCategoryClick(folder, imageArray)}
                tabIndex={0}
                aria-label={`View ${folder} gallery`}
              >
                <div className="relative aspect-[4/3] bg-lux-muted">
                  {thumbnailImage ? (
                    <Image
                      src={thumbnailImage.src}
                      alt={`${folder} decoration showcase - We Decor Bangalore`}
                      fill
                      className="object-cover lux-image-cinematic transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                      placeholder="empty"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      draggable={false}
                    />
                  ) : null}
                  <div className="absolute inset-0 lux-overlay-cinematic flex items-end justify-center pb-6 md:pb-8">
                    <div className="text-center px-4 w-full">
                      <h3 className="font-display text-2xl md:text-3xl text-lux-ivory capitalize">
                        {folder}
                      </h3>
                      <p className="text-sm text-lux-muted mt-1">
                        {imageArray.length} setup{imageArray.length !== 1 ? 's' : ''}
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
      )}

      {layout === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
              >
                <div className="relative aspect-[4/3] bg-lux-muted">
                  {thumbnailImage ? (
                    <Image
                      src={thumbnailImage.src}
                      alt={`${folder} decoration showcase - We Decor Bangalore`}
                      fill
                      className="object-cover lux-image-cinematic transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                      placeholder="empty"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      draggable={false}
                    />
                  ) : null}
                  <div className="absolute inset-0 lux-overlay-cinematic flex items-end justify-center pb-6 md:pb-8">
                    <div className="text-center px-4 w-full">
                      <h3 className="font-display text-2xl md:text-3xl text-lux-ivory capitalize">
                        {folder}
                      </h3>
                      <p className="text-sm text-lux-muted mt-1">
                        {imageArray.length} setup{imageArray.length !== 1 ? 's' : ''}
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
      )}

      {layout === 'list' && (
        <div className="space-y-4">
          {filteredCategories.map((folder) => {
            const imageArray = galleryRecord[folder];
            const thumbnailImage = imageArray[0];
            return (
              <div
                key={folder}
                className="lux-card-image cursor-pointer flex items-center p-4"
                onClick={() => handleCategoryClick(folder, imageArray)}
                tabIndex={0}
                aria-label={`View ${folder} gallery`}
              >
                <div className="relative w-20 h-20 bg-lux-muted rounded-lg overflow-hidden flex-shrink-0">
                  {thumbnailImage ? (
                    <Image
                      src={thumbnailImage.src}
                      alt={`${folder} decoration showcase - We Decor Bangalore`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      placeholder="empty"
                      sizes="80px"
                      loading="lazy"
                      draggable={false}
                    />
                  ) : null}
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-display text-lg text-lux-ivory capitalize">{folder}</h3>
                  <p className="text-sm text-lux-muted">
                    {imageArray.length} setup{imageArray.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-lux-muted group-hover:text-lux-gold pr-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
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
