'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

// Extend Window interface for eapps
declare global {
  interface Window {
    eapps?: {
      init: () => void;
    };
  }
}

interface GoogleReviewsWidgetProps {
  placeId: string;
  className?: string;
}

export default function GoogleReviewsWidget({ placeId, className = '' }: GoogleReviewsWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScriptLoad = () => {
    // Initialize the widget after script loads
    if (window.eapps && containerRef.current) {
      window.eapps.init();
    }
  };

  return (
    <div className={`google-reviews-widget ${className}`}>
      <Script
        src="https://static.elfsight.com/platform/platform.js"
        data-use-service-core=""
        strategy="lazyOnload"
        onLoad={handleScriptLoad}
      />
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Google Reviews</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          See what our customers are saying on Google
        </p>
      </div>

      <div ref={containerRef} className="elfsight-app" data-elfsight-app-id="your-app-id-here">
        {/* 
          Alternative: Direct Google Reviews embed
          You can also use Google's official embed code here
        */}
        <div className="google-reviews-placeholder">
          <p className="text-gray-500 text-center py-8">
            Google Reviews will load here.
            <br />
            <a
              href={`https://www.google.com/maps/place/?q=place_id:${placeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 underline"
            >
              View on Google Maps →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// Alternative: Simple Google Reviews embed
export function SimpleGoogleReviewsEmbed({ placeId }: { placeId: string }) {
  return (
    <div className="google-reviews-simple">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Google Reviews</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          See what our customers are saying on Google
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <svg className="w-8 h-8 text-blue-500 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Google Reviews
            </span>
          </div>
          <div className="flex items-center">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">5.0 (50+ reviews)</span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Read authentic reviews from our customers on Google. We're proud of our 5-star rating!
        </p>

        <a
          href={`https://www.google.com/maps/place/?q=place_id:${placeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          View All Reviews on Google
        </a>
      </div>
    </div>
  );
}
