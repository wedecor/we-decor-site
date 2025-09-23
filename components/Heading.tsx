import { cn } from "@/lib/utils";

export function H1(p: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 {...p} className={cn("text-3xl md:text-4xl font-semibold tracking-tight", p.className)} />;
}

export function H2(p: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 {...p} className={cn("mt-8 text-2xl md:text-3xl font-semibold", p.className)} />;
}

export function H3(p: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 {...p} className={cn("mt-6 text-xl md:text-2xl font-semibold", p.className)} />;
}