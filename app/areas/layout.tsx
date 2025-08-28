// app/areas/layout.tsx
import type { ReactNode } from "react";
export default function AreasLayout({ children }: { children: ReactNode }) {
  return <div className="prose prose-invert max-w-none">{children}</div>;
} 