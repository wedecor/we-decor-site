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
          DEFAULT: '#22d3ee', // teal-400
          dark: '#2563eb', // blue-600
        },
      },
      gradientColorStops: {
        'brand-start': '#22d3ee', // teal-400
        'brand-end': '#2563eb', // blue-600
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
