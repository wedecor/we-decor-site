"use client";

import Image from "next/image";
import { useState } from "react";
import gallery from "../utils/gallery";

function toTitleCase(str: string) {
  return str
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: any[];
  category: string;
}

function ImageModal({ isOpen, onClose, images, category }: ImageModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-green-700 dark:text-green-200">
            {toTitleCase(category)}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Images Grid */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div
                key={img.src}
                className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 group"
              >
                <Image
                  src={img.src}
                  alt={img.alt || img.src.split('/').pop()?.replace(/[-_]/g, ' ').split('.')[0] || 'Gallery Image'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  placeholder="empty"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<any[]>([]);

  const handleCategoryClick = (category: string, images: any[]) => {
    setSelectedCategory(category);
    setSelectedImages(images);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setSelectedImages([]);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(gallery).map(([folder, images]) => {
          const imageArray = images as any[];
          const thumbnailImage = imageArray[0]; // Use first image as thumbnail
          
          return (
            <div
              key={folder}
              className="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => handleCategoryClick(folder, imageArray)}
            >
              {/* Thumbnail Image */}
              <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                {thumbnailImage && (
                  <Image
                    src={thumbnailImage.src}
                    alt={thumbnailImage.alt || toTitleCase(folder)}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    placeholder="empty"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    draggable={false}
                  />
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-bold mb-2">{toTitleCase(folder)}</h3>
                    <p className="text-sm opacity-90">
                      {imageArray.length} image{imageArray.length !== 1 ? "s" : ""}
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

      {/* Modal */}
      <ImageModal
        isOpen={selectedCategory !== null}
        onClose={closeModal}
        images={selectedImages}
        category={selectedCategory || ""}
      />
    </div>
  );
}
