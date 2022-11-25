/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        'cabin': ['Cabin', 'sans-serif'],
      }
    }
  },
  plugins: [],
};
