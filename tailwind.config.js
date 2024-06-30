/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'theme-color': '#A072DE',
        'light-theme-color':'#DAB6EF',
      },
    },
  },
  plugins: [],
}
