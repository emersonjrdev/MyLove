/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "rose-cream": "var(--rose-cream)",
        "rose-blush": "var(--rose-blush)",
        "rose-soft": "var(--rose-soft)",
        "rose-main": "var(--rose-main)",
        "rose-wine": "var(--wine-main)",
        "wine-dark": "var(--wine-dark)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        romantic: ['"Playfair Display"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}