import fs from "node:fs";
import path from "node:path";

export function parseContent(file: string): { caseStudy: string; cta: string } {
  const text = fs.readFileSync(path.join(process.cwd(), "content", file), "utf8");
  const caseStudyMatch = text.match(/^CASE STUDY:\s*\n([\s\S]*?)^\s*CTA:\s*$/m);
  const ctaMatch = text.match(/^CTA:\s*\n([\s\S]*)$/m);
  const caseStudy = (caseStudyMatch || [])[1]?.trim() ?? "";
  const cta = (ctaMatch || [])[1]?.trim() ?? "";
  return { caseStudy, cta };
}

