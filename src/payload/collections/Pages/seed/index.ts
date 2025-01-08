import type { Payload } from 'payload'

export const PageSeeder = async (payload: Payload) => {
	const pages = await payload.find({
		collection: 'pages',
		limit: 1,
		overrideAccess: true,
	})

	if (pages.docs.length === 0) {
		const pages = ['Projects', 'Blogs', 'Playground']


		await payload.create({
			collection: 'pages',
			data: {
				title: 'Home',
				slug: 'home',
				showBackButton: false,
				showPageHeading: false
			},
			overrideAccess: true,
		})

		pages.forEach(async (page) => {
			await payload.create({
				collection: 'pages',
				data: {
					title: page,
					slug: page.toLowerCase(),
				},
				overrideAccess: true,
			})
		})
	}
}
