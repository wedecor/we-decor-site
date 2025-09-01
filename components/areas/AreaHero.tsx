"use client";
import { AREAS } from "@/app/(site)/_data/locations";

type Props = {
  title: string;
  intro: string;
  locality: string;
};

export default function AreaHero({ title, intro, locality }: Props) {
  // Find the area data to get locality-specific content
  const areaData = AREAS.find(area => area.name.toLowerCase() === locality.toLowerCase());
  const heroTagline = areaData?.heroTagline;
  
  return (
    <header className="mb-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight text-gray-900 dark:text-white">
        {heroTagline || title}
      </h1>
      <p className="mt-4 text-base sm:text-lg opacity-90 text-gray-700 dark:text-gray-300">{intro}</p>
    </header>
  );
} 