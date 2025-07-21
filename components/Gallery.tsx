"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import gallery from "../utils/gallery";
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
  const [visibleCount, setVisibleCount] = useState(12);
  const [imgLoading, setImgLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [ariaMessage, setAriaMessage] = useState('');
  const [zoomed, setZoomed] = useState(false);
  const focusTrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(12);
    setImgLoading(true);
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [category, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
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
      if (e.key === '?') setShowShortcuts((v) => !v);
      if (e.key.toLowerCase() === 's') handleShare();
      if (e.key.toLowerCase() === 'd') handleDownload();
      if (e.key === 'Enter' && view === 'fullsize') setZoomed((z) => !z);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, view, selectedImageIndex, images.length, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const focusableEls = focusTrapRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableEls || focusableEls.length === 0) return;
    const first = focusableEls[0];
    const last = focusableEls[focusableEls.length - 1];
    const handleTrap = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    focusTrapRef.current?.addEventListener('keydown', handleTrap);
    return () => focusTrapRef.current?.removeEventListener('keydown', handleTrap);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setAriaMessage('Gallery modal opened');
    else setAriaMessage('Gallery modal closed');
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === '?') setShowShortcuts((v) => !v);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  const closeModal = () => {
    setView('grid');
    setSelectedImageIndex(0);
    onClose();
    setTimeout(() => {
      document.getElementById('gallery-root')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleShare = () => {
    const url = images[selectedImageIndex]?.src;
    if (navigator.share) {
      navigator.share({ url });
    } else {
      navigator.clipboard.writeText(url);
      alert('Image link copied!');
    }
  };
  const handleDownload = () => {
    const url = images[selectedImageIndex]?.src;
    const a = document.createElement('a');
    a.href = url;
    a.download = url.split('/').pop() || 'image.jpg';
    a.click();
  };

  useEffect(() => {
    if (isOpen) {
      console.log('Opened gallery modal for category:', category);
    }
  }, [isOpen, category]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
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

  // Emoji badges for categories
  const categoryBadges: Record<string, string> = {
    'birthday': '🎂',
    'wedding': '💍',
    'haldi': '🌼',
    'corporate event': '🏢',
    'engagement': '💑',
    'home decor': '🏠',
    'baby shower': '👶',
    'room decor': '🛏️',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-black/80 via-green-900/80 to-black/80"
        onClick={handleBackdropClick}
        tabIndex={-1}
        aria-modal="true"
        role="dialog"
        aria-labelledby="gallery-modal-title"
        aria-describedby="gallery-modal-desc"
        ref={modalRef}
      >
        <div ref={focusTrapRef} className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-lg overflow-hidden outline-none focus:ring-4 focus:ring-green-400">
          {/* ARIA live region */}
          <div className="sr-only" aria-live="polite">{ariaMessage}</div>
          {/* Keyboard shortcuts overlay */}
          {showShortcuts && (
            <div className="absolute top-4 right-4 z-50 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-4 text-sm">
              <div className="font-bold mb-2">Keyboard Shortcuts</div>
              <ul className="space-y-1">
                <li><b>←/→</b>: Prev/Next image</li>
                <li><b>Esc</b>: Close/Back</li>
                <li><b>?</b>: Toggle this help</li>
                <li><b>Enter</b>: Zoom image</li>
                <li><b>S</b>: Share</li>
                <li><b>D</b>: Download</li>
              </ul>
            </div>
          )}
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{categoryBadges[category?.toLowerCase() || ''] || '📷'}</span>
              <h2 id="gallery-modal-title" className="text-xl font-bold text-green-700 dark:text-green-200">
                {toTitleCase(category)}
              </h2>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{images.length} images</span>
            </div>
            <button
              onClick={closeModal}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
              aria-label="Close gallery modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Back to Gallery (mobile) */}
          <div className="block sm:hidden px-4 pt-2">
            <button
              onClick={() => setView('grid')}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-semibold shadow hover:scale-105 transition"
              aria-label="Back to gallery grid"
            >
              Back to Gallery
            </button>
          </div>
          {/* Content */}
          <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
            {view === 'grid' ? (
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {images.slice(0, visibleCount).map((img, i) => (
                    <div
                      key={img.src}
                      className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400"
                      onClick={() => openFullSize(i)}
                      tabIndex={0}
                      aria-label={`View image ${i + 1} of ${images.length}`}
                    >
                      {imgLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-400 opacity-40" />
                        </div>
                      )}
                      <Image
                        src={img.src}
                        alt={img.alt || img.src.split('/').pop()?.replace(/[-_]/g, ' ').split('.')[0] || 'Gallery Image'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        placeholder={img.blurDataURL ? 'blur' : 'empty'}
                        blurDataURL={img.blurDataURL || undefined}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                        loading="lazy"
                        draggable={false}
                        onLoad={() => setImgLoading(false)}
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
                {visibleCount < images.length && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => setVisibleCount((c) => c + 12)}
                      className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-semibold shadow hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-green-400"
                      aria-label="Load more images"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Full Size View
              <div className="relative h-full">
                {/* Back to Grid Button */}
                <button
                  onClick={() => setView('grid')}
                  className="absolute top-2 left-2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
                  aria-label="Back to gallery grid"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                {/* Navigation Buttons */}
                {selectedImageIndex > 0 && (
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
                {selectedImageIndex < images.length - 1 && (
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                    aria-label="Next image"
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
                    placeholder={images[selectedImageIndex].blurDataURL ? 'blur' : 'empty'}
                    blurDataURL={images[selectedImageIndex].blurDataURL || undefined}
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
                {/* Share/Download Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 z-20">
                  <button onClick={handleShare} className="p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow hover:bg-green-100 dark:hover:bg-green-900 transition" aria-label="Share image">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v.01M12 4v.01M20 12v.01M12 20v.01M7.05 7.05l.01.01M16.95 7.05l.01.01M16.95 16.95l.01.01M7.05 16.95l.01.01" /></svg>
                  </button>
                  <button onClick={handleDownload} className="p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow hover:bg-blue-100 dark:hover:bg-blue-900 transition" aria-label="Download image">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

const LAYOUTS = ["masonry", "grid", "justified"] as const;
type LayoutType = typeof LAYOUTS[number];

export default function Gallery() {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<any>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [layout, setLayout] = useState<LayoutType>("masonry");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setImages(gallery);
      setLoading(false);
    }, 500);
  }, []);

  const allCategories = Object.keys(gallery);
  const filteredCategories = allCategories.filter(cat =>
    cat.toLowerCase().includes(filter.toLowerCase())
  );

  // Use Record<string, any[]> for dynamic access
  const galleryRecord = gallery as Record<string, any[]>;

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
    'birthday': '🎂',
    'wedding': '💍',
    'haldi': '🌼',
    'corporate event': '🏢',
    'engagement': '💑',
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
          onChange={e => setFilter(e.target.value)}
          className="px-4 py-2 border rounded focus:ring-2 focus:ring-green-400"
          aria-label="Search categories"
        />
        <div className="flex gap-2 ml-auto">
          {LAYOUTS.map(l => (
            <button
              key={l}
              onClick={() => setLayout(l)}
              className={`px-3 py-1 rounded-full font-semibold border transition ${layout === l ? 'bg-green-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700'}`}
              aria-pressed={layout === l}
              aria-label={`Switch to ${l} layout`}
            >
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </button>
          ))}
        </div>
      </div>
      {/* Gallery Layouts */}
      {layout === "masonry" && (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredCategories.map(folder => {
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
                  {thumbnailImage && (
                    <Image
                      src={thumbnailImage.src}
                      alt={thumbnailImage.alt || folder}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      placeholder="empty"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      draggable={false}
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
                        <span>{categoryBadges[folder.toLowerCase()] || '📷'}</span>
                        {folder}
                      </h3>
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
      )}
      {layout === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map(folder => {
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
                  {thumbnailImage && (
                    <Image
                      src={thumbnailImage.src}
                      alt={thumbnailImage.alt || folder}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      placeholder="empty"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      draggable={false}
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
                        <span>{categoryBadges[folder.toLowerCase()] || '📷'}</span>
                        {folder}
                      </h3>
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
      )}
      {layout === "justified" && (
        <div className="flex flex-wrap gap-4 justify-center">
          {filteredCategories.map(folder => {
            const imageArray = galleryRecord[folder];
            const thumbnailImage = imageArray[0];
            return (
              <div
                key={folder}
                className="w-full sm:w-1/2 lg:w-1/3 max-w-xs group cursor-pointer bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => handleCategoryClick(folder, imageArray)}
                tabIndex={0}
                aria-label={`View ${folder} gallery`}
              >
                <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                  {thumbnailImage && (
                    <Image
                      src={thumbnailImage.src}
                      alt={thumbnailImage.alt || folder}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      placeholder="empty"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      draggable={false}
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
                        <span>{categoryBadges[folder.toLowerCase()] || '📷'}</span>
                        {folder}
                      </h3>
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
      )}
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
