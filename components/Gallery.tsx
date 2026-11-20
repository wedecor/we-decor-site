'use client';

import { useMemo, useState } from 'react';
import LocationGallery from '@/components/LocationGallery';
import { OCCASIONS, WORK, type WorkImage } from '@/app/(site)/_data/work-images';
import { diversifyWorkImages, workTiles } from '@/lib/work-tiles';

const PAGE = 15;
const FIRST_ROW = 3;

export default function Gallery() {
  const [occasion, setOccasion] = useState<string | null>(null);
  const [visible, setVisible] = useState(PAGE);

  const occasionCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const w of WORK) {
      counts.set(w.occasion, (counts.get(w.occasion) ?? 0) + 1);
    }
    return counts;
  }, []);

  const filtered: WorkImage[] = useMemo(() => {
    const raw = occasion ? WORK.filter((w) => w.occasion === occasion) : WORK;
    return diversifyWorkImages(raw);
  }, [occasion]);

  const shown = filtered.slice(0, visible);
  const items = workTiles(shown);
  const remaining = filtered.length - shown.length;

  const setFilter = (next: string | null) => {
    setOccasion(next);
    setVisible(PAGE);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-5">
        <nav
          aria-label="Filter gallery by occasion"
          className="flex flex-nowrap gap-2.5 overflow-x-auto overscroll-x-contain -mx-6 px-6 pb-1 text-sm text-lux-secondary md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0"
        >
          <button
            type="button"
            onClick={() => setFilter(null)}
            aria-pressed={occasion === null}
            className={
              occasion === null
                ? 'shrink-0 min-h-11 rounded-[4px] border border-lux-gold bg-lux-gold/15 px-4 py-2 text-lux-ivory font-medium transition-colors'
                : 'shrink-0 min-h-11 rounded-[4px] border border-white/[0.1] bg-lux-elevated/60 px-4 py-2 text-lux-secondary hover:border-lux-gold/40 hover:text-lux-ivory transition-colors'
            }
          >
            All <span className="ml-1 text-xs text-lux-gold">({WORK.length})</span>
          </button>
          {OCCASIONS.map((label) => {
            const count = occasionCounts.get(label) ?? 0;
            const active = occasion === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setFilter(label)}
                aria-pressed={active}
                className={
                  active
                    ? 'shrink-0 min-h-11 rounded-[4px] border border-lux-gold bg-lux-gold/15 px-4 py-2 text-lux-ivory font-medium transition-colors'
                    : 'shrink-0 min-h-11 rounded-[4px] border border-white/[0.1] bg-lux-elevated/60 px-4 py-2 text-lux-secondary hover:border-lux-gold/40 hover:text-lux-ivory transition-colors'
                }
              >
                {label} <span className="ml-1 text-xs text-lux-gold/80">({count})</span>
              </button>
            );
          })}
        </nav>

        <p className="text-xs text-lux-muted">
          Showing <span className="text-lux-ivory font-medium">{shown.length}</span> of{' '}
          <span className="text-lux-ivory font-medium">{filtered.length}</span> real event
          photographs{occasion ? ` in ${occasion}` : ' across Bengaluru'} — tap any photo to expand
          or ask for its price on WhatsApp.
        </p>
      </div>

      <LocationGallery items={items} source="site_gallery" priorityCount={FIRST_ROW} />

      {remaining > 0 ? (
        <div className="pt-4 text-center">
          <button
            type="button"
            onClick={() => setVisible((n) => n + PAGE)}
            className="lux-btn-secondary"
          >
            Load more setups ({remaining} remaining)
          </button>
        </div>
      ) : null}
    </div>
  );
}
