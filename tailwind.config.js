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
          DEFAULT: '#7c3aed', // violet-600
          dark: '#6d28d9', // violet-700
          light: '#a78bfa', // violet-400
        },
        accent: {
          DEFAULT: '#10b981', // emerald-500
          dark: '#059669', // emerald-600
          light: '#34d399', // emerald-400
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
