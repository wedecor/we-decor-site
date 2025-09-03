'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: any[];
  category: string;
}

type ModalView = 'grid' | 'fullsize';

export default function ImageModal({ isOpen, onClose, images, category }: ImageModalProps) {
  const [view, setView] = useState<ModalView>('grid');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState(8);
  const [imgLoading, setImgLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [ariaMessage, setAriaMessage] = useState('');
  const [zoomed, setZoomed] = useState(false);
  const focusTrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(8);
    setImgLoading(true);
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
    if (isOpen) {
      setView('grid');
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
      }
      if (e.key === 'ArrowLeft' && view === 'fullsize') {
        setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      }
      if (e.key === 'ArrowRight' && view === 'fullsize') {
        setSelectedImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
      if (e.key === 'Enter' && view === 'fullsize') {
        setZoomed(!zoomed);
      }
      if (e.key === 'h' || e.key === 'H') {
        setShowShortcuts(!showShortcuts);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, view, images.length, onClose, zoomed, showShortcuts]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setView('fullsize');
    setAriaMessage(`Viewing image ${index + 1} of ${images.length}`);
  };

  const loadMoreImages = () => {
    setVisibleCount((prev) => Math.min(prev + 8, images.length));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-modal-title"
        aria-describedby="gallery-modal-desc"
        tabIndex={-1}
      >
        <div className="sr-only" aria-live="polite">
          {ariaMessage}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black bg-opacity-90"
          onClick={onClose}
        />

        <motion.div
          ref={focusTrapRef}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative w-full h-full max-w-7xl max-h-screen p-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 id="gallery-modal-title" className="text-white text-xl font-semibold">
              {category} Gallery
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 transition-colors p-2"
              aria-label="Close gallery modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {view === 'grid' && (
            <div className="h-full overflow-y-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.slice(0, visibleCount).map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="relative aspect-square cursor-pointer group"
                    onClick={() => handleImageClick(i)}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt || `${category} decoration image ${i + 1}`}
                      fill
                      className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  </motion.div>
                ))}
              </div>

              {visibleCount < images.length && (
                <div className="text-center mt-8">
                  <button
                    onClick={loadMoreImages}
                    className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                    aria-label="Load more images"
                  >
                    Load More Images
                  </button>
                </div>
              )}
            </div>
          )}

          {view === 'fullsize' && (
            <div className="h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center relative">
                <button
                  onClick={() => setView('grid')}
                  className="absolute top-4 left-4 text-white hover:text-gray-300 transition-colors p-2"
                  aria-label="Back to gallery grid"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="relative max-w-full max-h-full">
                  <Image
                    src={images[selectedImageIndex]?.src}
                    alt={images[selectedImageIndex]?.alt || `${category} decoration image ${selectedImageIndex + 1}`}
                    width={800}
                    height={600}
                    className={`object-contain max-w-full max-h-full ${zoomed ? 'scale-150' : 'scale-100'} transition-transform duration-300`}
                    priority
                  />
                </div>

                {selectedImageIndex > 0 && (
                  <button
                    onClick={() => setSelectedImageIndex(selectedImageIndex - 1)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2"
                    aria-label="Previous image"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}

                {selectedImageIndex < images.length - 1 && (
                  <button
                    onClick={() => setSelectedImageIndex(selectedImageIndex + 1)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2"
                    aria-label="Next image"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between mt-4 text-white">
                <span>{selectedImageIndex + 1} of {images.length}</span>
                <div className="flex gap-4">
                  <button
                    onClick={() => setZoomed(!zoomed)}
                    className="hover:text-gray-300 transition-colors"
                    aria-label="Toggle zoom"
                  >
                    {zoomed ? 'Zoom Out' : 'Zoom In'}
                  </button>
                  <button
                    onClick={() => setShowShortcuts(!showShortcuts)}
                    className="hover:text-gray-300 transition-colors"
                    aria-label="Show keyboard shortcuts"
                  >
                    Help
                  </button>
                </div>
              </div>
            </div>
          )}

          {showShortcuts && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 right-4 bg-gray-800 text-white p-4 rounded-lg"
            >
              <h3 className="font-semibold mb-2">Keyboard Shortcuts</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>← → Navigate images</div>
                <div>Enter Toggle zoom</div>
                <div>Escape Close/Back</div>
                <div>H Toggle help</div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}