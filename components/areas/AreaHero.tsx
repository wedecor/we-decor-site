"use client";
type Props = {
  title: string;
  intro: string;
};
export default function AreaHero({ title, intro }: Props) {
  return (
    <header className="mb-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">{title}</h1>
      <p className="mt-4 text-base sm:text-lg opacity-90">{intro}</p>
    </header>
  );
} 