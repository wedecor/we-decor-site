'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { pickedLocationText, type LeadPlace } from '@/lib/services/leads/pickedLocation';

type Suggestion = { placeId: string; mainText: string; secondaryText: string };

type LocationOption = { kind: 'place'; suggestion: Suggestion } | { kind: 'typed'; text: string };

type LocationFieldProps = {
  initialValue?: string;
  error?: string;
};

function newSessionToken(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `s_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

export default function LocationField({ initialValue = '', error }: LocationFieldProps) {
  const listId = useId();
  const inputId = 'location';
  const [text, setText] = useState(initialValue);
  const [place, setPlace] = useState<LeadPlace | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [options, setOptions] = useState<LocationOption[]>([]);
  const [loading, setLoading] = useState(false);
  const sessionRef = useRef(newSessionToken());
  const seqRef = useRef(0);
  const pickedTextRef = useRef<string | null>(initialValue || null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!initialValue) return;
    setText(initialValue);
    pickedTextRef.current = initialValue;
  }, [initialValue]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  useEffect(() => {
    const query = text.trim();
    if (query.length < 2 || query === pickedTextRef.current) {
      setOptions([]);
      setLoading(false);
      return;
    }
    const seq = ++seqRef.current;
    setLoading(true);
    const timer = window.setTimeout(async () => {
      try {
        const res = await fetch('/api/places/autocomplete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'same-origin',
          body: JSON.stringify({ input: query, sessionToken: sessionRef.current }),
        });
        const data = (await res.json().catch(() => ({}))) as { suggestions?: Suggestion[] };
        if (seq !== seqRef.current) return;
        const suggestions = Array.isArray(data.suggestions) ? data.suggestions : [];
        const next: LocationOption[] = suggestions.map((s) => ({ kind: 'place', suggestion: s }));
        next.push({ kind: 'typed', text: query });
        setOptions(next);
        setActive(0);
      } catch {
        if (seq !== seqRef.current) return;
        setOptions([{ kind: 'typed', text: query }]);
      } finally {
        if (seq === seqRef.current) setLoading(false);
      }
    }, 350);
    return () => window.clearTimeout(timer);
  }, [text]);

  async function pick(option: LocationOption) {
    seqRef.current += 1;
    setOptions([]);
    setOpen(false);
    if (option.kind === 'typed') {
      pickedTextRef.current = option.text;
      setPlace(null);
      return;
    }
    const suggestion = option.suggestion;
    setLoading(true);
    try {
      const res = await fetch('/api/places/details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ placeId: suggestion.placeId, sessionToken: sessionRef.current }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        place?: {
          placeId?: string;
          address?: string | null;
          lat?: number | null;
          lng?: number | null;
          area?: string | null;
          city?: string | null;
          isArea?: boolean;
        } | null;
      };
      sessionRef.current = newSessionToken();
      const details = data.place;
      if (!details?.placeId) {
        pickedTextRef.current = suggestion.mainText;
        setText(suggestion.mainText);
        setPlace(null);
        return;
      }
      const display = pickedLocationText(
        suggestion.mainText,
        details.area,
        details.isArea === true
      );
      pickedTextRef.current = display;
      setText(display);
      setPlace({
        placeId: details.placeId,
        address: details.address ?? null,
        lat: details.lat ?? null,
        lng: details.lng ?? null,
        area: details.area ?? null,
        city: details.city ?? null,
      });
    } catch {
      pickedTextRef.current = suggestion.mainText;
      setText(suggestion.mainText);
      setPlace(null);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp') && options.length) {
      setOpen(true);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(options.length - 1, 0)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      if (open && options[active]) {
        e.preventDefault();
        void pick(options[active]);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  const showList = open && options.length > 0;

  return (
    <div ref={wrapRef} className="relative">
      <label htmlFor={inputId} className="lux-label">
        Location <span className="text-lux-gold/70">*</span>
      </label>
      <input type="hidden" name="location" value={text} />
      {place ? <input type="hidden" name="place" value={JSON.stringify(place)} /> : null}
      <input
        id={inputId}
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-invalid={!!error}
        autoComplete="off"
        value={text}
        maxLength={200}
        placeholder="Area or venue, e.g. Jayanagar"
        className="lux-input"
        onFocus={() => {
          if (options.length) setOpen(true);
        }}
        onChange={(e) => {
          const next = e.target.value;
          setText(next);
          if (pickedTextRef.current && next.trim() !== pickedTextRef.current) {
            pickedTextRef.current = null;
            setPlace(null);
          }
          setOpen(true);
        }}
        onKeyDown={onKeyDown}
      />
      {showList ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 w-full max-h-60 overflow-auto border border-white/[0.08] bg-lux-bg rounded-[4px]"
        >
          {options.map((option, i) => (
            <li
              key={option.kind === 'place' ? option.suggestion.placeId : `typed-${option.text}`}
              role="option"
              aria-selected={i === active}
              className={`px-3 py-2.5 cursor-pointer ${i === active ? 'bg-white/[0.06]' : ''}`}
              onMouseDown={(e) => {
                e.preventDefault();
                void pick(option);
              }}
              onMouseEnter={() => setActive(i)}
            >
              {option.kind === 'place' ? (
                <>
                  <p className="text-base md:text-[0.9375rem] font-light text-lux-ivory">
                    {option.suggestion.mainText}
                  </p>
                  {option.suggestion.secondaryText ? (
                    <p className="text-xs text-lux-text-muted mt-0.5">
                      {option.suggestion.secondaryText}
                    </p>
                  ) : null}
                </>
              ) : (
                <p className="text-base md:text-[0.9375rem] font-light italic text-lux-secondary">
                  Use “{option.text}” as typed
                </p>
              )}
            </li>
          ))}
          {options.some((o) => o.kind === 'place') ? (
            <li className="px-3 py-2 text-right text-[10px] tracking-wide uppercase text-lux-text-muted">
              Powered by Google
            </li>
          ) : null}
        </ul>
      ) : null}
      {error ? (
        <p className="text-lux-gold-deep text-xs mt-2" role="alert">
          {error}
        </p>
      ) : loading ? (
        <p className="text-lux-text-muted text-xs mt-2">Searching…</p>
      ) : (
        <p className="text-lux-text-muted text-xs mt-2">
          Search an area or venue, or type any location
        </p>
      )}
    </div>
  );
}
