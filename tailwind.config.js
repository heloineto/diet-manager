const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ebfee7',
          100: '#d4fccb',
          200: '#aef99d',
          300: '#7ef264',
          400: '#55e635',
          500: '#32cc0f',
          600: '#28a30d',
          700: '#237c0f',
          800: '#216212',
          900: '#205314',
        },
      },
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
