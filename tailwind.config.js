/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        "gray": "#4b5563",
        "pink": "#D4145A",
        "orange": {
          100: "#FFAA00",
          200: "#F15A24"
        },
        "yellow": "#FFE600"
      }
    },
  },
  plugins: [],
}