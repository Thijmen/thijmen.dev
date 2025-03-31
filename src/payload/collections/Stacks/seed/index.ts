import type { Payload } from 'payload'

export const StackSeeder = async (payload: Payload) => {
	const existingStacks = await payload.find({
		collection: 'stacks',
		limit: 1,
		overrideAccess: true,
	})

	if (existingStacks.docs.length === 0) {
		const reactNativeStack = await payload.create({
			collection: 'stacks',
			data: {
				title: 'React Native',
				stackHandle: 'ReactNative',
			},
			overrideAccess: true,
		})

		const nextJsStack = await payload.create({
			collection: 'stacks',
			data: {
				title: 'NextJS',
				stackHandle: 'Next.js',
			},
			overrideAccess: true,
		})

		await payload.create({
			collection: 'projects',
			data: {
				title: 'thijmen.dev',
				isFeatured: true,
				introduction: 'Personal website, still in progress, as you can see.',
				githubLink: 'https://github.com/thijmen/thijmen.dev',
				liveLink: 'https://www.thijmen.dev/',
				slug: 'thijmen-dev',
				stacks: [reactNativeStack.id, nextJsStack.id],
			},
			overrideAccess: true,
		})
	}
}
