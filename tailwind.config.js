module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#1e3a5f', // navy – elegant, trustworthy for events
          dark: '#162544',
          light: '#2c4a7a',
        },
        accent: {
          DEFAULT: '#b76e7a', // rose
          dark: '#a85c68',
          light: '#c98a94',
        },
      },
      gradientColorStops: {
        'brand-start': '#a78bfa',
        'brand-end': '#6d28d9',
      },
      // High contrast text colors for better accessibility
      textColor: {
        'high-contrast': '#1f2937', // gray-800
        'high-contrast-light': '#f9fafb', // gray-50
      },
    },
  },
  plugins: [],
};
