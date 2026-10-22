'use client';

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import {
  addDays,
  formatEventDateDisplay,
  monthGrid,
  monthTitle,
  parseIso,
  shiftMonth,
  WEEKDAYS,
} from '@/lib/services/leads/eventDate';
import { todayInIndia } from '@/lib/services/leads/validators';

type EventDateFieldProps = {
  error?: string;
};

function CalendarMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[1.1rem] w-[1.1rem] shrink-0 text-lux-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <rect x="3.5" y="5.5" width="17" height="15" rx="1" />
      <path d="M8 3.5v4M16 3.5v4M3.5 10h17" />
    </svg>
  );
}

function Chevron({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      {dir === 'prev' ? <path d="M15 5 8 12l7 7" /> : <path d="M9 5l7 7-7 7" />}
    </svg>
  );
}

export default function EventDateField({ error }: EventDateFieldProps) {
  const minDate = todayInIndia();
  const gridId = useId();
  const triggerId = 'eventDate-trigger';
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => {
    const { year, month } = parseIso(minDate);
    return { year, month };
  });
  const [cursor, setCursor] = useState(minDate);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLInputElement>(null);

  const cells = useMemo(
    () => monthGrid(view.year, view.month, minDate),
    [view.year, view.month, minDate]
  );

  const minMonth = parseIso(minDate);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const el = wrapRef.current?.querySelector<HTMLButtonElement>('[data-cal-cursor="true"]');
    el?.focus();
  }, [open, cursor, view]);

  function openAt(iso: string) {
    const { year, month } = parseIso(iso);
    setView({ year, month });
    setCursor(iso < minDate ? minDate : iso);
    setOpen(true);
  }

  function pick(iso: string) {
    setValue(iso);
    setCursor(iso);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function moveMonth(delta: number) {
    const next = shiftMonth(view.year, view.month, delta);
    if (
      delta < 0 &&
      (next.year < minMonth.year || (next.year === minMonth.year && next.month < minMonth.month))
    ) {
      return;
    }
    setView(next);
    const nextCursor = `${next.year}-${String(next.month).padStart(2, '0')}-01`;
    setCursor(nextCursor < minDate ? minDate : nextCursor);
  }

  function moveCursor(days: number) {
    const next = addDays(cursor, days);
    if (next < minDate) return;
    const parsed = parseIso(next);
    if (parsed.year !== view.year || parsed.month !== view.month) {
      setView({ year: parsed.year, month: parsed.month });
    }
    setCursor(next);
  }

  function onTriggerKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openAt(value || minDate);
    }
  }

  function onGridKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      moveCursor(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      moveCursor(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      moveCursor(-7);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      moveCursor(7);
    } else if (e.key === 'PageUp') {
      e.preventDefault();
      moveMonth(-1);
    } else if (e.key === 'PageDown') {
      e.preventDefault();
      moveMonth(1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const cell = cells.find((c) => c.iso === cursor);
      if (cell?.iso && !cell.disabled) pick(cell.iso);
    }
  }

  const prevDisabled =
    view.year < minMonth.year || (view.year === minMonth.year && view.month <= minMonth.month);

  return (
    <div ref={wrapRef} className="relative">
      <label htmlFor={triggerId} className="lux-label">
        Event date <span className="text-lux-gold/70">*</span>
      </label>
      <input type="hidden" name="eventDate" value={value} />
      <div className="relative">
        <input
          ref={triggerRef}
          id={triggerId}
          readOnly
          value={value ? formatEventDateDisplay(value) : ''}
          placeholder="Choose a date"
          className="lux-input cursor-pointer pr-10"
          role="combobox"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={gridId}
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={error ? 'eventDate-error' : 'eventDate-hint'}
          autoComplete="off"
          onClick={() => (open ? setOpen(false) : openAt(value || minDate))}
          onKeyDown={onTriggerKey}
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <CalendarMark />
        </span>
      </div>
      {open ? (
        <div
          id={gridId}
          role="dialog"
          aria-label="Choose event date"
          className="absolute z-20 mt-1 w-full border border-lux-gold/20 bg-lux-surface rounded-[4px] p-3"
          onKeyDown={onGridKey}
        >
          <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/[0.08]">
            <button
              type="button"
              className="lux-icon-btn flex h-11 w-11 items-center justify-center text-lux-gold disabled:text-lux-text-muted/40"
              aria-label="Previous month"
              disabled={prevDisabled}
              onClick={() => moveMonth(-1)}
            >
              <Chevron dir="prev" />
            </button>
            <p className="font-display text-xl font-light text-lux-ivory tracking-tight">
              {monthTitle(view.year, view.month)}
            </p>
            <button
              type="button"
              className="lux-icon-btn flex h-11 w-11 items-center justify-center text-lux-gold"
              aria-label="Next month"
              onClick={() => moveMonth(1)}
            >
              <Chevron dir="next" />
            </button>
          </div>
          <div className="grid grid-cols-7 mb-1">
            {WEEKDAYS.map((day) => (
              <p
                key={day}
                className="text-center text-[11px] tracking-[0.1em] uppercase text-lux-text-muted py-1"
              >
                {day}
              </p>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {cells.map((cell, i) => {
              const iso = cell.iso;
              if (!iso || cell.day === null) {
                return <div key={`empty-${i}`} className="h-11" />;
              }
              const selected = iso === value;
              const today = iso === minDate;
              const isCursor = iso === cursor;
              return (
                <button
                  key={iso}
                  type="button"
                  data-cal-cursor={isCursor ? 'true' : undefined}
                  tabIndex={isCursor ? 0 : -1}
                  disabled={cell.disabled}
                  aria-label={formatEventDateDisplay(iso)}
                  aria-pressed={selected}
                  className={`lux-icon-btn h-11 w-full rounded-[4px] text-sm font-light ${
                    selected
                      ? 'bg-lux-gold text-lux-bg'
                      : cell.disabled
                        ? 'text-lux-text-muted/60'
                        : today
                          ? 'text-lux-ivory border border-lux-gold/55'
                          : 'text-lux-secondary'
                  } ${!cell.disabled && !selected ? 'hover:bg-white/[0.06] hover:text-lux-ivory' : ''}`}
                  onClick={() => pick(iso)}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
      {error ? (
        <p id="eventDate-error" className="text-lux-gold-deep text-xs mt-1" role="alert">
          {error}
        </p>
      ) : (
        <p id="eventDate-hint" className="text-lux-text-muted text-xs mt-1">
          An approximate date is fine
        </p>
      )}
    </div>
  );
}
