const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	output: 'standalone',
	experimental: {
		reactCompiler: false,
		turbo: {},
	},
	images: {
		remotePatterns: [
			{
				hostname: 'www.thijmen.dev',
			},
			{
				hostname: 'thijmen.dev',
			},
			{
				hostname: 'media.thijmen.dev',
			},
			{
				hostname: 'dev-assets.thijmen.dev',
			},
		],
	},
}

module.exports = withBundleAnalyzer(nextConfig)
