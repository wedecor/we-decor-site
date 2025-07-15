module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: '#22d3ee', // teal-400
          dark: '#2563eb',    // blue-600
        },
      },
      gradientColorStops: {
        'brand-start': '#22d3ee', // teal-400
        'brand-end': '#2563eb',   // blue-600
      },
    },
  },
  plugins: [],
};
