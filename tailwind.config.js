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
      },
      gridTemplateColumns: {
        '1/3': '1fr 2fr'
      },
      gridAutoColumns: {
        '1/2': '50%',
        '1/3': '31%',
        '1/4': '22%',
        '1/6': '15%',
        '2/5': '40%',
      }
    },
  },
  plugins: [],
}