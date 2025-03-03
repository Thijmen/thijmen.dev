import env from 'env'
import type { Payload, PayloadRequest } from 'payload'

export const seed = async ({
	payload,
	req,
}: {
	payload: Payload
	req: PayloadRequest
}): Promise<void> => {
	payload.logger.info('Seeding database...')

	try {
		await seedUsers(payload)
		await seedPages(payload)
		await seedNavigation(payload)
		await seedStacks(payload)

		payload.logger.info('Database seeding completed successfully')
	} catch (error) {
		payload.logger.error('Error seeding database:', error)
		throw error
	}
}

/**
 * Seeds the users collection if empty
 */
const seedUsers = async (payload: Payload): Promise<void> => {
	const existingUsers = await payload.find({
		collection: 'users',
		limit: 1,
	})

	if (existingUsers.docs.length === 0) {
		payload.logger.info('Seeding users...')
		await payload.create({
			collection: 'users',
			data: {
				name: 'Thijmen',
				email: env.CMS_ADMIN_EMAIL,
				password: env.CMS_ADMIN_PASSWORD,
			},
		})
	}
}

/**
 * Seeds the pages collection if empty
 */
const seedPages = async (payload: Payload): Promise<void> => {
	const pages = await payload.find({
		collection: 'pages',
		limit: 1,
		overrideAccess: true,
	})

	if (pages.docs.length === 0) {
		payload.logger.info('Seeding pages...')
		await seedHomePage(payload)
		await seedAboutPage(payload)
		await seedOtherPages(payload)
	}
}

/**
 * Creates the home page with content blocks
 */
const seedHomePage = async (payload: Payload): Promise<void> => {
	await payload.create({
		collection: 'pages',
		data: {
			title: 'Home',
			slug: 'home',
			showBackButton: false,
			showPageHeading: false,
			dynamiccontent: {
				root: {
					type: 'root',
					format: '',
					indent: 0,
					version: 1,
					children: [
						{
							type: 'block',
							fields: {
								id: '67bf73c5860c3baf289f462a',
								content:
									'Welcome to my website, where I try to share my knowledge and experiences from my day to day life. I am a software engineer with a passion for tech; backend, frontend and mobile! The sourcecode of this website is completely open source, so feel free to check it out on <Link variant="article" href="https://www.github.com/Thijmen/thijmen.dev">Github</Link>!',
								heading: "Hi, I'm Thijmen",
								blockName: '',
								blockType: 'homepageIntroductionBlock',
								subheading: 'Based in Enschede, The Netherlands',
							},
							format: '',
							version: 2,
						},
						{
							type: 'block',
							fields: {
								id: '67bf7d2c78f803fc2d55c43d',
								variant: 'solid',
								blockName: '',
								blockType: 'horizontalLineBlock',
							},
							format: '',
							version: 2,
						},
						{
							type: 'block',
							fields: {
								id: '67bf7da578f803fc2d55c43e',
								linkHref: 'projects',
								blockName: '',
								blockType: 'homepageProjectsBlock',
								linkTitle: 'View all Projects',
								headingTitle: 'Featured Projects',
								onlyFeatured: true,
							},
							format: '',
							version: 2,
						},
						{
							type: 'block',
							fields: {
								id: '67bf7f8e78f803fc2d55c43f',
								variant: 'solid',
								blockName: '',
								blockType: 'horizontalLineBlock',
							},
							format: '',
							version: 2,
						},
						{
							type: 'block',
							fields: {
								id: '67bf7f9878f803fc2d55c440',
								heading: 'Latest Blog Posts',
								blockName: '',
								blockType: 'homepagePostsBlock',
								subheading: 'Take a look at my latest blog posts.',
							},
							format: '',
							version: 2,
						},
					],
					direction: null,
				},
			},
		},
		overrideAccess: true,
	})
}

/**
 * Creates the about page with content blocks
 */
const seedAboutPage = async (payload: Payload): Promise<void> => {
	await payload.create({
		collection: 'pages',
		data: {
			title: 'About',
			slug: 'About',
			showBackButton: false,
			showPageHeading: false,
			dynamiccontent: {
				root: {
					type: 'root',
					format: '',
					indent: 0,
					version: 1,
					children: [
						{
							type: 'block',
							fields: {
								id: '67bf8228253daf11fc8e83c8',
								blockName: '',
								blockType: 'wakaContributionsBlock',
							},
							format: '',
							version: 2,
						},
						{
							type: 'block',
							fields: {
								id: '67bf82c6253daf11fc8e83c9',
								variant: 'dashed',
								blockName: '',
								blockType: 'horizontalLineBlock',
							},
							format: '',
							version: 2,
						},
						{
							type: 'paragraph',
							format: '',
							indent: 0,
							version: 1,
							children: [],
							direction: null,
							textStyle: '',
							textFormat: 0,
						},
						{
							type: 'block',
							fields: {
								id: '67bf82d5253daf11fc8e83ca',
								blockName: '',
								blockType: 'githubStarsBlock',
								ignoredRepositories: 0,
							},
							format: '',
							version: 2,
						},
					],
					direction: null,
				},
			},
		},
	})
}

/**
 * Creates additional standard pages
 */
const seedOtherPages = async (payload: Payload): Promise<void> => {
	const pages = ['Projects', 'Blogs', 'Playground']

	// Create other pages
	for (const page of pages) {
		await payload.create({
			collection: 'pages',
			data: {
				title: page,
				slug: page.toLowerCase(),
				dynamiccontent: {
					root: {
						children: [
							{
								children: [
									{
										detail: 0,
										format: 0,
										mode: 'normal',
										style: '',
										text: `Welcome to the ${page} page!`,
										type: 'text',
										version: 1,
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								type: 'heading',
								version: 1,
								tag: 'h1',
							},
							{
								children: [
									{
										detail: 0,
										format: 0,
										mode: 'normal',
										style: '',
										text: 'This page was created during seeding.',
										type: 'text',
										version: 1,
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								type: 'paragraph',
								version: 1,
							},
						],
						direction: 'ltr',
						format: '',
						indent: 0,
						type: 'root',
						version: 1,
					},
				},
			},
			overrideAccess: true,
		})
	}
}

/**
 * Seeds the navigation global if empty
 */
const seedNavigation = async (payload: Payload): Promise<void> => {
	const navs = await payload.findGlobal({
		slug: 'nav',
		overrideAccess: true,
	})

	if (navs?.links?.length === 0) {
		payload.logger.info('Seeding navigation...')
		await payload.updateGlobal({
			slug: 'nav', // required
			data: {
				links: [
					{
						label: 'Home',
						icon: 'home',
						url: '/',
					},
				],
			},
			depth: 2,
			overrideAccess: true,
			showHiddenFields: true,
		})
	}
}

/**
 * Seeds the stacks and projects collections if empty
 */
const seedStacks = async (payload: Payload): Promise<void> => {
	const existingStacks = await payload.find({
		collection: 'stacks',
		limit: 1,
		overrideAccess: true,
	})

	if (existingStacks.docs.length === 0) {
		payload.logger.info('Seeding stacks and projects...')
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
