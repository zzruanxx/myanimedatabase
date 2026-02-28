/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'anime-dark': '#0f0f1a',
        'anime-purple': '#6c5ce7',
        'anime-pink': '#fd79a8',
        'anime-green': '#00b894',
        'anime-card': '#1a1a2e',
        'anime-border': '#2d2d44',
      },
    },
  },
  plugins: [],
}
