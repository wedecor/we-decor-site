"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
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

type ModalView = 'grid' | 'fullsize';

function ImageModal({ isOpen, onClose, images, category }: ImageModalProps) {
  const [view, setView] = useState<ModalView>('grid');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (view === 'fullsize') {
        setView('grid');
      } else {
        onClose();
      }
    } else if (view === 'fullsize') {
      if (e.key === 'ArrowLeft' && selectedImageIndex > 0) {
        setSelectedImageIndex(selectedImageIndex - 1);
      } else if (e.key === 'ArrowRight' && selectedImageIndex < images.length - 1) {
        setSelectedImageIndex(selectedImageIndex + 1);
      }
    }
  };

  const openFullSize = (index: number) => {
    setSelectedImageIndex(index);
    setView('fullsize');
  };

  const goToPrevious = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const closeModal = () => {
    setView('grid');
    setSelectedImageIndex(0);
    onClose();
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
            onClick={closeModal}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
          {view === 'grid' ? (
            // Grid View
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((img, i) => (
                <div
                  key={img.src}
                  className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 group cursor-pointer"
                  onClick={() => openFullSize(i)}
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
                  {/* Click indicator */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Full Size View
            <div className="relative h-full">
              {/* Back to Grid Button */}
              <button
                onClick={() => setView('grid')}
                className="absolute top-2 left-2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>

              {/* Navigation Buttons */}
              {selectedImageIndex > 0 && (
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {selectedImageIndex < images.length - 1 && (
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              {/* Full Size Image */}
              <div className="flex items-center justify-center h-full">
                <Image
                  src={images[selectedImageIndex].src}
                  alt={images[selectedImageIndex].alt || images[selectedImageIndex].src.split('/').pop()?.replace(/[-_]/g, ' ').split('.')[0] || 'Gallery Image'}
                  width={1920}
                  height={1080}
                  className="max-w-full max-h-full object-contain"
                  placeholder="empty"
                  priority
                  draggable={false}
                />
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center bg-black bg-opacity-50 px-3 py-1 rounded-full">
                <p className="text-sm">
                  {selectedImageIndex + 1} of {images.length}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



export default function Gallery() {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<any>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<any[]>([]);

  useEffect(() => {
    // Simulate async loading for demonstration
    setTimeout(() => {
      setImages(gallery);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        <span className="ml-4 text-lg text-gray-600">Loading gallery...</span>
      </div>
    );
  }

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
