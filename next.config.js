/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: true,
  // productionBrowserSourceMaps: true,
};

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA(nextConfig);
