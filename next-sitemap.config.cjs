const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.thijmen.dev'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: SITE_URL,
	generateRobotsTxt: true, // (optional)
	exclude: [
		'/posts-sitemap.xml',
		'/projects-sitemap.xml',
		'/pages-sitemap.xml',
		'/*',
		'/posts/*',
		'/projects/*',
	],
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				disallow: '/admin/*',
			},
		],
		additionalSitemaps: [
			`${SITE_URL}/pages-sitemap.xml`,
			`${SITE_URL}/projects-sitemap.xml`,
			`${SITE_URL}/posts-sitemap.xml`,
		],
	},
}
