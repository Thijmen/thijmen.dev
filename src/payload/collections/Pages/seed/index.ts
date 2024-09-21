import type { Payload } from 'payload'

export const PageSeeder = async (payload: Payload) => {
	const pages = await payload.find({
		collection: 'pages',
		limit: 1,
	})

	if (pages.docs.length === 0) {
		const pages = ['Home', 'Projects', 'Blogs', 'Playground']

		pages.forEach(async (page) => {
			await payload.create({
				collection: 'pages',
				data: {
					title: page,
					slug: page.toLowerCase(),
				},
			})
		})
	}
}
