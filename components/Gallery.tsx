'use client';

import { useMemo, useState } from 'react';
import LocationGallery from '@/components/LocationGallery';
import { OCCASIONS, WORK, type WorkImage } from '@/app/(site)/_data/work-images';
import { workTiles } from '@/lib/work-tiles';

const PAGE = 12;
const FIRST_ROW = 3;

export default function Gallery() {
  const [occasion, setOccasion] = useState<string | null>(null);
  const [visible, setVisible] = useState(PAGE);

  const filtered: WorkImage[] = useMemo(
    () => (occasion ? WORK.filter((w) => w.occasion === occasion) : WORK),
    [occasion]
  );

  const shown = filtered.slice(0, visible);
  const items = workTiles(shown);
  const remaining = filtered.length - shown.length;

  const setFilter = (next: string | null) => {
    setOccasion(next);
    setVisible(PAGE);
  };

  return (
    <div className="space-y-10">
      <nav
        aria-label="Filter gallery by occasion"
        className="flex flex-nowrap gap-x-6 overflow-x-auto overscroll-x-contain -mx-6 px-6 pb-1 text-sm text-lux-secondary md:mx-0 md:flex-wrap md:gap-y-3 md:overflow-visible md:px-0 md:pb-0"
      >
        <button
          type="button"
          onClick={() => setFilter(null)}
          className={
            occasion === null
              ? 'shrink-0 min-h-11 border-b border-lux-gold pb-0.5 text-lux-ivory'
              : 'shrink-0 min-h-11 border-b border-transparent pb-0.5 hover:text-lux-ivory'
          }
        >
          All
        </button>
        {OCCASIONS.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => setFilter(label)}
            className={
              occasion === label
                ? 'shrink-0 min-h-11 border-b border-lux-gold pb-0.5 text-lux-ivory'
                : 'shrink-0 min-h-11 border-b border-transparent pb-0.5 hover:text-lux-ivory'
            }
          >
            {label}
          </button>
        ))}
      </nav>

      <LocationGallery items={items} source="site_gallery" priorityCount={FIRST_ROW} />

      {remaining > 0 ? (
        <div className="text-center">
          <button
            type="button"
            onClick={() => setVisible((n) => n + PAGE)}
            className="border-b border-lux-gold/40 pb-0.5 text-sm text-lux-gold hover:border-lux-gold"
          >
            Show more ({remaining} remaining)
          </button>
        </div>
      ) : null}
    </div>
  );
}
