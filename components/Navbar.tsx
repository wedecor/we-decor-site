import Link from "next/link";
import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";

// Navbar provides site-wide navigation with mobile and desktop layouts
export default function Navbar() {
  // State to control mobile menu open/close
  const [open, setOpen] = useState(false);
  return (
    // 🎨 UI Upgrade: Brand gradient, shadow, font, spacing
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-500 to-blue-500 shadow-lg z-40 font-sans">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo/brand link to homepage */}
        <Link href="/" className="font-bold text-2xl text-white tracking-wide">
          We Decor
        </Link>
        
        {/* Desktop navigation and dark mode toggle */}
        <div className="hidden md:flex items-center gap-6">
          {/* Main navigation links */}
          <Link href="/about" className="px-4 py-2 text-white font-medium hover:underline hover:decoration-2 transition">About</Link>
          <Link href="/services/birthday-decoration" className="px-4 py-2 text-white font-medium hover:underline hover:decoration-2 transition">Services</Link>
          <Link href="/gallery" className="px-4 py-2 text-white font-medium hover:underline hover:decoration-2 transition">Gallery</Link>
          <Link href="/pricing" className="px-4 py-2 text-white font-medium hover:underline hover:decoration-2 transition">Pricing</Link>
          <Link href="/contact" className="px-4 py-2 text-white font-medium hover:underline hover:decoration-2 transition">Contact</Link>
          
          {/* Dark mode toggle */}
          <DarkModeToggle />
        </div>

        {/* Mobile menu button and dark mode toggle */}
        <div className="md:hidden flex items-center gap-3">
          <DarkModeToggle />
          <button className="text-white" onClick={() => setOpen(!open)}>
            <span className="sr-only">Open menu</span>
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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
          className={`flex-col md:hidden gap-4 ${open ? "flex" : "hidden"} bg-white dark:bg-gray-800 absolute top-16 left-0 w-full shadow-lg transition-all duration-300 rounded-b-xl border border-gray-200 dark:border-gray-700`}
        >
          {/* Mobile navigation links */}
          <Link href="/about" className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">About</Link>
          <Link href="/services/birthday-decoration" className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">Services</Link>
          <Link href="/gallery" className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">Gallery</Link>
          <Link href="/pricing" className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">Pricing</Link>
          <Link href="/contact" className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
