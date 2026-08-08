/** Accessible star rating — renders filled/empty stars for a 0–5 value. */
export default function Stars({
  rating,
  className = '',
  size = 'sm',
}: {
  rating: number;
  className?: string;
  size?: 'sm' | 'md';
}) {
  const rounded = Math.round(rating);
  const dimension = size === 'md' ? 'h-4 w-4' : 'h-3.5 w-3.5';

  return (
    <span
      className={`inline-flex items-center gap-0.5 ${className}`}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`${dimension} ${i < rounded ? 'text-lux-gold' : 'text-white/20'}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.78L10 14.77l-5.2 2.73.99-5.78-4.21-4.1 5.82-.85L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}
