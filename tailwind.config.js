/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lux: {
          bg: '#0F0A12',
          surface: '#1A141F',
          elevated: '#262030',
          muted: '#2E2638',
          gold: '#C8A96B',
          'gold-deep': '#B8924A',
          'gold-soft': '#E8D9B8',
          ivory: '#F5F0E6',
          champagne: '#EDE6D6',
          emerald: '#00B89C',
          'emerald-light': '#00C2A8',
          secondary: '#C9C2B8',
          muted: '#C9C2B8',
          'text-muted': '#9E968E',
          border: 'rgba(200, 169, 107, 0.18)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      boxShadow: {
        lux: '0 24px 48px -20px rgba(0, 0, 0, 0.65)',
        'lux-nav': '0 8px 32px -12px rgba(0, 0, 0, 0.5)',
        'lux-card': '0 16px 40px -18px rgba(0, 0, 0, 0.55)',
        'lux-glow': '0 0 32px -12px rgba(200, 169, 107, 0.12)',
        'lux-spotlight': '0 0 48px -16px rgba(200, 169, 107, 0.16)',
      },
      letterSpacing: {
        lux: '0.18em',
        brand: '0.2em',
        tagline: '0.26em',
      },
      borderRadius: {
        lux: '24px',
      },
    },
  },
  plugins: [],
};
