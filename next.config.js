// next.config.js
const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  reactStrictMode: false,
  experimental: {
    serverActions: {
      allowedOrigins: ['xxx.com'],
    },
    //指定分配cpu 防止 build cpu 占用过高
    workerThreads: false,
    cpus: 1,
    webpackBuildWorker: true,
  },
  // build 阶段禁止 ts 类型检查
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // build 阶段禁止 eslint
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '116.198.244.73',
        port: '9000',
      },
      {
        protocol: 'https',
        hostname: 'lsky.lostyouth.cc',
        port: '',
        pathname: '/i/**'
      }
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
