const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: false,
  },
  images: {
    domains: [
      'www.thijmen.dev',
      'thijmen.dev',
      'media.thijmen.dev',
      'dev-assets.thijmen.dev',
    ],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
