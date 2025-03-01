/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'poke-blue': '#0077ff',
        'poke-red': '#f41d36',
      },
      backgroundImage: {
        'poke-gradient': 'linear-gradient(to right, #0077ff, #f41d36)',
      },
    },
  },
  plugins: [],
}