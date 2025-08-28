"use client";
import Link from "next/link";
export default function Breadcrumbs({ locality }: { locality: string }) {
  return (
    <nav className="mb-6 text-sm opacity-80 text-gray-600 dark:text-gray-400">
      <Link href="/areas" className="underline text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">Areas</Link>
      <span className="mx-2">/</span>
      <span className="text-gray-900 dark:text-white">{locality}</span>
    </nav>
  );
} 