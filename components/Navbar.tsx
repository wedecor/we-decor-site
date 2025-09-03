'use client';

import Link from 'next/link';
import { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';
import Image from 'next/image';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 shadow-lg z-40 font-sans backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo/brand link to homepage */}
        <Link
          href="/"
          className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
        >
          <Image
            src="/logo.png"
            alt="We Decor Logo - Event Decoration Services in Bangalore"
            width={36}
            height={36}
            className="rounded-full shadow"
            priority
          />
          <span className="font-bold text-2xl text-green-700 dark:text-green-200 tracking-wide group-hover:text-pink-500 dark:group-hover:text-pink-300 transition">
            We Decor
          </span>
        </Link>
        {/* Desktop navigation and dark mode toggle */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/about"
            className="px-4 py-2 text-green-700 dark:text-green-200 font-medium rounded hover:bg-green-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            About
          </Link>
          <Link
            href="/services"
            className="px-4 py-2 text-green-700 dark:text-green-200 font-medium rounded hover:bg-green-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            Services
          </Link>
          <Link
            href="/gallery"
            className="px-4 py-2 text-green-700 dark:text-green-200 font-medium rounded hover:bg-green-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            Gallery
          </Link>
          <Link
            href="/areas"
            className="px-4 py-2 text-green-700 dark:text-green-200 font-medium rounded hover:bg-green-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            Areas
          </Link>
          <Link
            href="/locations"
            className="px-4 py-2 text-green-700 dark:text-green-200 font-medium rounded hover:bg-green-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            Locations
          </Link>
          <Link
            href="/pricing"
            className="px-4 py-2 text-green-700 dark:text-green-200 font-medium rounded hover:bg-green-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            Pricing
          </Link>
          <Link
            href="/faq"
            className="px-4 py-2 text-green-700 dark:text-green-200 font-medium rounded hover:bg-green-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 text-green-700 dark:text-green-200 font-medium rounded hover:bg-green-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            Contact
          </Link>
          <DarkModeToggle />
        </div>
        {/* Mobile menu button and dark mode toggle */}
        <div className="md:hidden flex items-center gap-3">
          <DarkModeToggle />
          <button
            className="text-green-700 dark:text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
            onClick={() => setOpen(!open)}
          >
            <span className="sr-only">Open menu</span>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        <div
          className={`flex-col md:hidden gap-4 ${open ? 'flex' : 'hidden'} bg-white/95 dark:bg-gray-900/95 absolute top-16 left-0 w-full shadow-lg transition-all duration-300 rounded-b-xl border border-gray-200 dark:border-gray-700`}
        >
          <Link
            href="/about"
            className="px-4 py-2 text-green-700 dark:text-green-200 font-medium hover:bg-green-50 dark:hover:bg-gray-800 rounded transition"
          >
            About
          </Link>
          <Link
            href="/services"
            className="px-4 py-2 text-green-700 dark:text-green-200 font-medium hover:bg-green-50 dark:hover:bg-gray-800 rounded transition"
          >
            Services
          </Link>
          <Link
            href="/gallery"
            className="px-4 py-2 text-green-700 dark:text-green-200 font-medium hover:bg-green-50 dark:hover:bg-gray-800 rounded transition"
          >
            Gallery
          </Link>
          <Link
            href="/areas"
            className="px-4 py-2 text-green-700 dark:text-green-200 font-medium hover:bg-green-50 dark:hover:bg-gray-800 rounded transition"
          >
            Areas
          </Link>
          <Link
            href="/locations"
            className="px-4 py-2 text-green-700 dark:text-green-200 font-medium hover:bg-green-50 dark:hover:bg-gray-800 rounded transition"
          >
            Locations
          </Link>
          <Link
            href="/pricing"
            className="px-4 py-2 text-green-700 dark:text-green-200 font-medium hover:bg-green-50 dark:hover:bg-gray-800 rounded transition"
          >
            Pricing
          </Link>
          <Link
            href="/faq"
            className="px-4 py-2 text-green-700 dark:text-green-200 font-medium hover:bg-green-50 dark:hover:bg-gray-800 rounded transition"
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 text-green-700 dark:text-green-200 font-medium hover:bg-green-50 dark:hover:bg-gray-800 rounded transition"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
