// next.config.js
const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 's5nvjgtjr.hd-bkt.clouddn.com',
        port: '',
      },
    ],
  },
}

module.exports = withContentlayer(nextConfig)
