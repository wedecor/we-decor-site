import { parseContent } from "../app/areas/_lib/parseContent";
import { describe, it, expect, vi, beforeEach } from "vitest";
import fs from "node:fs";

// Mock fs module
vi.mock("node:fs");
vi.mock("node:path");

describe("parseContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("parses case study and CTA sections correctly", () => {
    const mockContent = "CASE STUDY:\nThis is a case study content.\n\nCTA:\nThis is a call to action.";
    
    vi.mocked(fs.readFileSync).mockReturnValue(mockContent);
    
    const result = parseContent("test.txt");
    
    expect(result.caseStudy).toBe("This is a case study content.");
    expect(result.cta).toBe("This is a call to action.");
  });

  it("handles missing CTA section", () => {
    const mockContent = "CASE STUDY:\nOnly case study content here.";
    
    vi.mocked(fs.readFileSync).mockReturnValue(mockContent);
    
    const result = parseContent("test.txt");
    
    expect(result.caseStudy).toBe("Only case study content here.");
    expect(result.cta).toBe("");
  });

  it("handles empty content", () => {
    const mockContent = "";
    
    vi.mocked(fs.readFileSync).mockReturnValue(mockContent);
    
    const result = parseContent("test.txt");
    
    expect(result.caseStudy).toBe("");
    expect(result.cta).toBe("");
  });

  it("handles content with only CTA", () => {
    const mockContent = "CTA:\nOnly call to action content.";
    
    vi.mocked(fs.readFileSync).mockReturnValue(mockContent);
    
    const result = parseContent("test.txt");
    
    expect(result.caseStudy).toBe("");
    expect(result.cta).toBe("Only call to action content.");
  });
});