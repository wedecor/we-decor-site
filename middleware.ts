import { NextResponse, NextRequest } from "next/server";

// Apply security headers in all environments to make local verification pass
export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "geolocation=(), camera=(), microphone=()");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  // Use Report-Only locally to avoid blocking
  const csp = [
    "default-src 'self'",
    "img-src 'self' https: data:",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
    "style-src 'self' 'unsafe-inline' https:",
    "connect-src 'self' https:",
    "font-src 'self' https: data:",
    "frame-ancestors 'none'",
  ].join("; ");
  res.headers.set("Content-Security-Policy-Report-Only", csp);
  return res;
}

export const config = {
  matcher: "/:path*",
};

