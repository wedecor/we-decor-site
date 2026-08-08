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
          .lux-hero-root {
            position: relative; isolation: isolate; min-height: 88vh;
            display: flex; align-items: flex-end; overflow: hidden;
            padding-top: var(--nav-height); background: var(--lux-bg);
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
