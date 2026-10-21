/** Inline critical CSS — layout survives dev Tailwind hiccups */
export default function CriticalStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          :root {
            --lux-bg: #0f0a12;
            --lux-elevated: #262030;
            --lux-ivory: #f5f0e6;
            --lux-secondary: #c9c2b8;
            --lux-gold: #c8a96b;
            --nav-height: 4.25rem;
          }
          @media (min-width: 768px) {
            :root { --nav-height: 5.75rem; }
          }
          html, body { margin: 0; background: var(--lux-bg); color: var(--lux-ivory); }
          /*
           * Desktop gets the aspect ratio, mobile gets a height.
           *
           * Desktop: aspect-ratio, not min-height: 88vh. The hero shows the
           * whole photograph, and an 88vh box on a wide viewport is ~2:1
           * against a 16:9 image, so object-cover sliced the top and bottom off.
           *
           * Mobile: 16/9 at 375px wide is a 211px strip — shorter than the
           * 564px of headline, body and buttons sitting on top of it, so
           * overflow:hidden clipped the lot and the h1 rendered at top:-293px,
           * off-screen. Every phone visitor saw a homepage with no headline.
           * Hence 88svh below 768px. Never give this element a definite height
           * its own content cannot fit inside.
           */
          .lux-hero-root {
            position: relative; isolation: isolate;
            display: flex; align-items: flex-end; overflow: hidden;
            background: var(--lux-bg);
            min-height: 88vh; min-height: 88svh;
          }
          @media (min-width: 768px) {
            .lux-hero-root { aspect-ratio: 16 / 9; min-height: 0; }
          }
          .lux-hero-media { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
          .lux-hero-media img { object-fit: cover !important; width: 100% !important; height: 100% !important; }
          .lux-hero-content {
            position: relative; z-index: 2; width: 100%; max-width: 72rem;
            margin: 0 auto; padding: 1.5rem 1.5rem 3rem;
          }
          @media (min-width: 768px) {
            .lux-hero-content { padding: 3rem 1.5rem 5rem; }
          }
          .lux-nav-shell {
            position: fixed; top: 0; left: 0; right: 0; z-index: 100;
            background: rgba(15, 10, 18, 0.78); backdrop-filter: blur(14px);
            border-bottom: 1px solid rgba(255,255,255,0.04);
          }
        `,
      }}
    />
  );
}
