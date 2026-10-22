'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import BrandLockup from '@/components/lux/BrandLockup';
import { trackEvent } from '@/lib/analytics/events';

const NAV = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/locations', label: 'Locations' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
] as const;

const FOCUSABLE = 'a[href], button:not([disabled])';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const firstEl = nodes[0];
      const lastEl = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="lux-nav-shell fixed top-0 left-0 right-0 z-[100]">
      <nav className="relative max-w-6xl mx-auto flex items-center justify-between gap-5 py-3.5 md:py-4 px-6 md:px-10 min-h-[var(--nav-height,5.75rem)]">
        <BrandLockup />

        <div className="hidden lg:flex items-center gap-8 xl:gap-9">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? 'lux-nav-link-active' : 'lux-nav-link'}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="lux-btn-primary text-sm py-2.5 px-7 shrink-0 ml-1"
            onClick={() =>
              trackEvent('cta_click', { cta_source: 'navbar_desktop', cta_label: 'Enquire' })
            }
          >
            Enquire
          </Link>
        </div>

        <button
          ref={buttonRef}
          type="button"
          className="lg:hidden lux-icon-btn min-w-0 min-h-0 p-2.5 text-lux-ivory z-10"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {open ? (
        <div
          id={panelId}
          ref={panelRef}
          className="lg:hidden border-t border-white/[0.08] px-6 py-4 flex flex-col bg-lux-surface max-h-[calc(100dvh-var(--nav-height))] overflow-y-auto overscroll-contain"
        >
          {NAV.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-[44px] items-center py-3 text-[15px] font-light transition-colors duration-500 ${active ? 'text-lux-gold' : 'text-lux-secondary'}`}
                aria-current={active ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="lux-btn-primary text-center mt-4 mb-1"
            onClick={() => {
              trackEvent('cta_click', { cta_source: 'navbar_mobile', cta_label: 'Enquire' });
              setOpen(false);
            }}
          >
            Enquire
          </Link>
        </div>
      ) : null}
    </header>
  );
}
