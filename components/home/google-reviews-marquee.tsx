'use client';

import { useEffect, useState } from 'react';
import type { GoogleReviewItem } from '@/lib/google-reviews-client';
import { SOCIAL_PROFILES } from '@/lib/local-seo/constants';

const STAR_COLOR = '#C9A84C';

function truncate(text: string, max = 120): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}

function ReviewCard({ review }: { review: GoogleReviewItem }) {
  return (
    <div className="google-review-marquee-card shrink-0 w-[280px] md:w-[320px] mx-3 p-5 rounded-2xl border border-white/[0.08] bg-lux-elevated">
      <div className="flex items-center justify-between gap-2 mb-3">
        <p className="font-medium text-sm text-lux-ivory truncate">{review.author_name}</p>
        <span
          className="shrink-0 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
          style={{ background: '#4285F4' }}
          title="Google review"
          aria-label="Google review"
        >
          G
        </span>
      </div>
      <div className="flex gap-0.5 mb-3" aria-hidden>
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-3.5 h-3.5"
            style={{ color: i < review.rating ? STAR_COLOR : 'rgba(201, 168, 76, 0.25)' }}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-sm text-lux-muted leading-relaxed">{truncate(review.text)}</p>
    </div>
  );
}

function MarqueeRow({
  reviews,
  direction,
}: {
  reviews: GoogleReviewItem[];
  direction: 'left' | 'right';
}) {
  if (!reviews.length) return null;

  const track = [...reviews, ...reviews];

  return (
    <div className="google-marquee-row overflow-hidden py-2">
      <div
        className={`google-marquee-track flex w-max ${direction === 'left' ? 'google-marquee-left' : 'google-marquee-right'}`}
      >
        {track.map((review, i) => (
          <ReviewCard key={`${review.author_name}-${review.relative_time_description}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}

export default function GoogleReviewsMarquee() {
  const [reviews, setReviews] = useState<GoogleReviewItem[]>([]);
  const [placeMeta, setPlaceMeta] = useState<{ rating: number; total: number } | null>(null);

  useEffect(() => {
    const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;
    if (!placeId) return;

    fetch(`/api/google-reviews?placeId=${encodeURIComponent(placeId)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.reviews?.length) {
          setReviews(data.reviews);
          if (data.place) {
            setPlaceMeta({
              rating: data.place.rating,
              total: data.place.user_ratings_total,
            });
          }
        }
      })
      .catch(() => undefined);
  }, []);

  if (!reviews.length) return null;

  const midpoint = Math.ceil(reviews.length / 2);
  const row1 = reviews.slice(0, midpoint);
  const row2 = reviews.slice(midpoint);

  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;
  const gmbUrl = SOCIAL_PROFILES.googleMaps(placeId) ?? 'https://www.google.com/maps';
  const ratingLabel = placeMeta?.rating?.toFixed(1) ?? '5.0';
  const totalLabel = placeMeta?.total ?? '75';

  return (
    <section className="lux-section-tight bg-lux-bg border-y border-white/[0.06] overflow-hidden">
      <div className="google-marquee-shell space-y-4">
        <MarqueeRow reviews={row1.length ? row1 : reviews} direction="left" />
        <MarqueeRow reviews={row2.length ? row2 : reviews} direction="right" />
      </div>
      <p className="text-center mt-10 px-6">
        <a
          href={gmbUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lux-gold text-sm font-medium hover:underline underline-offset-4"
        >
          Rated {ratingLabel} ★ across {totalLabel}+ Google reviews →
        </a>
      </p>

      <style jsx global>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .google-marquee-left {
          animation: marquee-left 40s linear infinite;
        }

        .google-marquee-right {
          animation: marquee-right 45s linear infinite;
        }

        .google-marquee-shell:hover .google-marquee-track {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
