const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.thijmen.dev', 'thijmen.dev', 'dev-assets.thijmen.dev'],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
