const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // mode: 'jit',
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
      boxShadow: {
        'primary-500':
          '0px 3px 1px -2px rgb(50 204 15 / 30%), 0px 2px 2px 0px rgb(50 204 15 / 24%), 0px 1px 5px 0px rgb(50 204 15 / 22%)',
        'xl-primary-500':
          '0px 2px 4px -1px rgb(50 204 15 / 40%), 0px 4px 5px 0px rgb(50 204 15 / 34%), 0px 1px 10px 0px rgb(50 204 15 / 32%)',
        'blue-500':
          '0px 3px 1px -2px rgb(59 130 246 / 30%), 0px 2px 2px 0px rgb(59 130 246 / 24%), 0px 1px 5px 0px rgb(59 130 246 / 22%)',
        'xl-blue-500':
          '0px 2px 4px -1px rgb(59 130 246 / 40%), 0px 4px 5px 0px rgb(59 130 246 / 34%), 0px 1px 10px 0px rgb(59 130 246 / 32%)',
        'gray-800':
          '0px 3px 1px -2px rgb(31 41 55 / 30%), 0px 2px 2px 0px rgb(31 41 55 / 24%), 0px 1px 5px 0px rgb(31 41 55 / 22%)',
        'xl-gray-800':
          '0px 2px 4px -1px rgb(31 41 55 / 40%), 0px 4px 5px 0px rgb(31 41 55 / 34%), 0px 1px 10px 0px rgb(31 41 55 / 32%)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
