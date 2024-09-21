import type { Payload } from 'payload'

export const PageSeeder = async (payload: Payload) => {
	const pages = await payload.find({
		collection: 'pages',
		limit: 1,
	})

	if (pages.docs.length === 0) {
		await payload.create({
			collection: 'pages',
			data: {
				title: 'Projects',
				slug: 'projects',
				//content: 'This is the Projects page',
			},
		})

		await payload.create({
			collection: 'pages',
			data: {
				title: 'Blogs',
				slug: 'blogs',
				//  content: 'This is the Blogs page',
			},
		})
	}
}
