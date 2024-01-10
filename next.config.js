/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: true,
  // productionBrowserSourceMaps: true,
};

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  sw: 'pushcode_sw.js'
  // runtimeCaching: [
  //   {
  //     urlPattern: /^https:\/\/jarinko\-notifications\.vercel\.app\/.*/,
  //     handler: 'NetworkFirst',
  //     options: {
  //       cacheName: 'api-cache',
  //       expiration: {
  //         maxEntries: 10,
  //         maxAgeSeconds: 24 * 60 * 60, // 24 hours
  //       },
  //       networkTimeoutSeconds: 10,
  //     },
  //   },
  // ],
});

module.exports = withPWA(nextConfig);
