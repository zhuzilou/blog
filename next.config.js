// next.config.js
const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '116.198.244.73',
        port: '9000',
      },
    ],
  },
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/archives',
        destination: '/archives/posts',
        permanent: true,
      },
    ]
  },
}

module.exports = withContentlayer(nextConfig)
