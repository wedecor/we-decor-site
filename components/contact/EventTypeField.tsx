'use client';

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { filterEventTypes } from '@/lib/services/leads/eventTypeFilter';
import type { EventTypeOption } from '@/lib/services/leads/eventTypeOptions';

type EventTypeFieldProps = {
  options: EventTypeOption[];
  error?: string;
};

export default function EventTypeField({ options, error }: EventTypeFieldProps) {
  const listId = useId();
  const inputId = 'eventType-search';
  const [query, setQuery] = useState('');
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => filterEventTypes(options, query), [options, query]);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  function pick(option: EventTypeOption) {
    setValue(option.value);
    setQuery(option.label);
    setOpen(false);
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setOpen(true);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      if (open && filtered[active]) {
        e.preventDefault();
        pick(filtered[active]);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div ref={wrapRef} className="relative">
      <label htmlFor={inputId} className="lux-label">
        Event type <span className="text-lux-gold/70">*</span>
      </label>
      <input type="hidden" name="eventType" value={value} />
      <input
        id={inputId}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-invalid={!!error}
        // The label shows an asterisk and the value lands in a hidden input, so
        // assistive tech had no way to know this was required — it read as an
        // optional free-text box. aria-required, not required: the visible
        // control is a combobox whose real value lives in the hidden field.
        aria-required="true"
        aria-activedescendant={open && filtered.length > 0 ? `${listId}-opt-${active}` : undefined}
        autoComplete="off"
        value={query}
        placeholder="Start typing, e.g. Haldi"
        className="lux-input"
        onFocus={() => {
          setOpen(true);
          setActive(0);
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setValue('');
          setOpen(true);
          setActive(0);
        }}
        onBlur={() => {
          const typed = query.trim().toLowerCase();
          const match = options.find(
            (o) => o.label.toLowerCase() === typed || o.value.toLowerCase() === typed
          );
          if (match) {
            setValue(match.value);
            setQuery(match.label);
            return;
          }
          if (selected && query !== selected.label) setQuery(selected.label);
        }}
        onKeyDown={onKeyDown}
      />
      {open && filtered.length > 0 ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 w-full max-h-60 overflow-auto border border-white/[0.08] bg-lux-bg rounded-[4px]"
        >
          {filtered.map((option, i) => (
            <li
              key={option.value}
              // aria-activedescendant on the input points here, so these ids
              // must exist or the reference dangles and the announcement is
              // worse than none at all.
              id={`${listId}-opt-${i}`}
              role="option"
              aria-selected={option.value === value}
              className={`px-3 py-2.5 text-base md:text-[0.9375rem] font-light cursor-pointer ${
                i === active ? 'bg-white/[0.06] text-lux-ivory' : 'text-lux-secondary'
              }`}
              onMouseDown={(e) => {
                e.preventDefault();
                pick(option);
              }}
              onMouseEnter={() => setActive(i)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      ) : null}
      {error ? (
        <p className="text-lux-gold-deep text-xs mt-1" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
