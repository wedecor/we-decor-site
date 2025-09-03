'use client';

import Image from 'next/image';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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
type Layout = typeof LAYOUTS[number];

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
    return categories.filter((category) =>
      category.toLowerCase().includes(filter.toLowerCase())
    );
  }, [galleryRecord, filter]);

  const handleCategoryClick = (category: string, images: any[]) => {
    setSelectedCategory(category);
    setSelectedImages(images);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setSelectedImages([]);
  };

  // Emoji badges for categories
  const categoryBadges: Record<string, string> = {
    birthday: '🎂',
    wedding: '💍',
    haldi: '🌼',
    'corporate event': '🏢',
    engagement: '💑',
    'home decor': '🏠',
    'baby shower': '👶',
    'room decor': '🛏️',
  };

  return (
    <div className="space-y-8" id="gallery-root">
      {/* Filter and Layout Toggle Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search categories..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded focus:ring-2 focus:ring-green-400 text-gray-800 placeholder-gray-700"
          aria-label="Search categories"
        />
        <div className="flex gap-2 ml-auto">
          {LAYOUTS.map((l) => (
            <button
              key={l}
              onClick={() => setLayout(l)}
              className={`px-3 py-1 rounded-full font-semibold border transition ${
                layout === l
                  ? 'bg-green-700 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-400 dark:border-gray-600'
              }`}
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
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredCategories.map((folder) => {
            const imageArray = galleryRecord[folder];
            const thumbnailImage = imageArray[0];
            return (
              <div
                key={folder}
                className="mb-6 break-inside-avoid group cursor-pointer bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => handleCategoryClick(folder, imageArray)}
                tabIndex={0}
                aria-label={`View ${folder} gallery`}
              >
                <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                  {thumbnailImage ? (
                    <Image
                      src={thumbnailImage.src}
                      alt={`${folder} decoration showcase - We Decor Bangalore`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      placeholder="empty"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      draggable={false}
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
                        <span>{categoryBadges[folder.toLowerCase()] || '📷'}</span>
                        {folder}
                      </h3>
                      <p className="text-sm opacity-90">
                        {imageArray.length} image{imageArray.length !== 1 ? 's' : ''}
                      </p>
                      <div className="mt-3 px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                        Click to View All
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {layout === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((folder) => {
            const imageArray = galleryRecord[folder];
            const thumbnailImage = imageArray[0];
            return (
              <div
                key={folder}
                className="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => handleCategoryClick(folder, imageArray)}
                tabIndex={0}
                aria-label={`View ${folder} gallery`}
              >
                <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                  {thumbnailImage ? (
                    <Image
                      src={thumbnailImage.src}
                      alt={`${folder} decoration showcase - We Decor Bangalore`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      placeholder="empty"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      draggable={false}
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
                        <span>{categoryBadges[folder.toLowerCase()] || '📷'}</span>
                        {folder}
                      </h3>
                      <p className="text-sm opacity-90">
                        {imageArray.length} image{imageArray.length !== 1 ? 's' : ''}
                      </p>
                      <div className="mt-3 px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                        Click to View All
                      </div>
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
                className="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                onClick={() => handleCategoryClick(folder, imageArray)}
                tabIndex={0}
                aria-label={`View ${folder} gallery`}
              >
                <div className="flex items-center p-4">
                  <div className="relative w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                    {thumbnailImage ? (
                      <Image
                        src={thumbnailImage.src}
                        alt={`${folder} decoration showcase - We Decor Bangalore`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        placeholder="empty"
                        sizes="80px"
                        loading="lazy"
                        draggable={false}
                      />
                    ) : null}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                      <span>{categoryBadges[folder.toLowerCase()] || '📷'}</span>
                      {folder}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {imageArray.length} image{imageArray.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {selectedCategory && (
        <ImageModal
          isOpen={!!selectedCategory}
          onClose={closeModal}
          images={selectedImages}
          category={selectedCategory}
        />
      )}
    </div>
  );
}