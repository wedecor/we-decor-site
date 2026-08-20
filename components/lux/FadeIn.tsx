import type { ReactNode } from 'react';

type FadeInProps = {
  children: ReactNode;
  className?: string;
  /** Kept for call-site compatibility; mapped onto CSS delay utilities. */
  delay?: number;
};

/**
 * Lightweight reveal — CSS only (see `.lux-reveal` in globals.css).
 * Replaces the previous framer-motion implementation so homepage / service
 * pages do not ship ~120 KiB of motion runtime in the first load.
 */
export default function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const delayClass = delay >= 0.1 ? 'lux-reveal-delay-2' : delay > 0 ? 'lux-reveal-delay-1' : '';
  return (
    <div className={['lux-reveal', delayClass, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );
}
