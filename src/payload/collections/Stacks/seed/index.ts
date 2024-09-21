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
				description:
					'### This is something\n' +
					'\n' +
					'```php\n' +
					'<?php\n' +
					'\techo "Hi";\n' +
					'```\n' +
					'\n' +
					'Zo, dat was wat code!\n' +
					'\n' +
					'En nu wat mooi spul:\n' +
					'\n' +
					'```js title="lib/mdx.js"\n' +
					"export const formatSlug = (slug) => slug.replace(/\\.mdx$/, '')\n" +
					'/**\n' +
					" * Example: formatSlug('markdown.mdx')\n" +
					" * Output: 'markdown'\n" +
					' */\n' +
					'```\n' +
					'\n' +
					'```js title="test/thijmen.dev.tsx"\n' +
					'  const frontMatter = {\n' +
					'    ...data,\n' +
					'    slug\n' +
					'  }\n' +
					'```\n',
				githubLink: 'https://github.com/thijmen/thijmen.dev',
				liveLink: 'https://www.thijmen.dev/',
				slug: 'thijmen-dev',
				stacks: [reactNativeStack.id, nextJsStack.id],
			},
			overrideAccess: true,
		})
	}
}
