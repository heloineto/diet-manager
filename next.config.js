/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    swSrc: 'serviceWorker.js',
    disable: process.env.NODE_ENV === 'development',
  },
});
