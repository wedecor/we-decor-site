"use client";
import Link from "next/link";
export default function Breadcrumbs({ locality }: { locality: string }) {
  return (
    <nav className="mb-6 text-sm opacity-80">
      <Link href="/areas" className="underline">Areas</Link>
      <span className="mx-2">/</span>
      <span>{locality}</span>
    </nav>
  );
} 