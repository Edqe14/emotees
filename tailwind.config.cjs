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
      },
      colors: {
        monotone: {
          50: '#f4f4f4',
          100: '#c8c8c9',
          200: '#9d9d9e',
          300: '#717274',
          400: '#464649',
          500: '#1a1b1e',
          600: '#151618',
          700: '#101113',
          800: '#0b0c0d',
          900: '#060607'
        }
      }
    }
  },
  plugins: [],
};
