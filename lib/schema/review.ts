import type { JsonLdNode } from './types';

export type AggregateRatingInput = {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
};

export type ReviewInput = {
  authorName: string;
  reviewBody: string;
  ratingValue: number;
  datePublished?: string;
};

/**
 * Build AggregateRating only from verified Places / first-party data.
 * Returns null when inputs are missing — never fabricates ratings.
 */
export function buildAggregateRating(
  input: AggregateRatingInput | null | undefined
): JsonLdNode | null {
  if (!input) return null;
  if (!Number.isFinite(input.ratingValue) || input.ratingValue <= 0) return null;
  if (!Number.isFinite(input.reviewCount) || input.reviewCount <= 0) return null;

  return {
    '@type': 'AggregateRating',
    ratingValue: input.ratingValue,
    reviewCount: input.reviewCount,
    bestRating: input.bestRating ?? 5,
    worstRating: input.worstRating ?? 1,
  };
}

/**
 * Build Review nodes only from verified review objects.
 * Do not pass marketing testimonials or fallback copy.
 */
export function buildReviewNodes(
  reviews: ReadonlyArray<ReviewInput> | null | undefined
): JsonLdNode[] {
  if (!reviews?.length) return [];
  return reviews
    .filter((r) => r.authorName && r.reviewBody && r.ratingValue > 0)
    .map((r) => {
      const node: JsonLdNode = {
        '@type': 'Review',
        author: { '@type': 'Person', name: r.authorName },
        reviewBody: r.reviewBody,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: r.ratingValue,
          bestRating: 5,
          worstRating: 1,
        },
      };
      if (r.datePublished) node.datePublished = r.datePublished;
      return node;
    });
}
