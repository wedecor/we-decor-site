// Server-only helpers to inject parsed content into MDX without turning page client-side
import { parseContent } from "../_lib/parseContent";

export function CaseStudy() {
  const { caseStudy } = parseContent("east_bangalore.txt");
  return <article className="prose max-w-none whitespace-pre-wrap">{caseStudy}</article>;
}

export function CTA() {
  const { cta } = parseContent("east_bangalore.txt");
  return <article className="prose max-w-none whitespace-pre-wrap">{cta}</article>;
}