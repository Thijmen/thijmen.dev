import env from 'env'
import type { Payload, PayloadRequest } from 'payload'
import type { Post } from '../payload-types'

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
		await seedPosts(payload)

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

/**
 * Seeds the posts collection if empty
 */
const seedPosts = async (payload: Payload): Promise<void> => {
	const existingPosts = await payload.find({
		collection: 'posts',
		limit: 1,
		overrideAccess: true,
	})

	if (existingPosts.docs.length === 0) {
		payload.logger.info('Seeding posts...')

		// Create seed tags first
		payload.logger.info('Seeding tags...')
		const tagData = [
			{
				name: 'Microservices',
				slug: 'microservices',
				description:
					'Topics related to microservices architecture and implementation',
			},
			{
				name: 'TypeScript',
				slug: 'typescript',
				description:
					'TypeScript language features, patterns and best practices',
			},
			{
				name: 'Architecture',
				slug: 'architecture',
				description: 'Software architecture concepts and principles',
			},
			{
				name: 'Leadership',
				slug: 'leadership',
				description: 'Technical leadership and team management',
			},
			{
				name: 'Backend',
				slug: 'backend',
				description: 'Backend development topics',
			},
		]

		const createdTags = {}

		// Create the tags
		for (const tag of tagData) {
			const createdTag = await payload.create({
				collection: 'tags',
				data: {
					...tag,
					_status: 'published',
				},
				overrideAccess: true,
			})
			createdTags[tag.name] = createdTag.id
		}

		const demoData: Post[] = [
			{
				id: 1,
				title: 'Building Scalable Microservices Architecture',
				slug: 'building-scalable-microservices',
				description:
					'An in-depth exploration of designing and implementing microservices at scale, featuring real-world examples and best practices.',
				createdAt: '2024-02-15T12:00:00Z',
				updatedAt: '2024-02-15T12:00:00Z',
				tags: [
					createdTags['Microservices'],
					createdTags['Architecture'],
					createdTags['Backend'],
				],
				dynamiccontent: {
					root: {
						type: 'root',
						format: '',
						indent: 0,
						version: 1,
						children: [
							{
								type: 'paragraph',
								children: [
									{
										text: 'Microservices architecture has become the standard approach for building scalable, resilient applications in modern software development. This post explores key strategies for designing and implementing microservices that can scale effectively with your business needs.',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'heading',
								tag: 'h2',
								children: [
									{
										text: 'Core Principles of Scalable Microservices',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: "Before diving into implementation details, it's crucial to understand the foundational principles that make microservices scalable:",
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: '• Single Responsibility: Each service should focus on one specific business capability',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: '• Autonomy: Services should be able to function independently with minimal dependencies',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: '• Resilience: Services should be designed to handle failures gracefully',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: '• Observability: Comprehensive monitoring and logging are essential',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'heading',
								tag: 'h2',
								children: [
									{
										text: 'Communication Patterns',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: 'The way your microservices communicate has a significant impact on scalability. Consider these patterns:',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: 'Synchronous communication (REST, gRPC) is straightforward but can create tight coupling. Asynchronous communication (message queues, event streaming) offers better scalability by decoupling services and providing natural load leveling.',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'heading',
								tag: 'h2',
								children: [
									{
										text: 'Data Management Strategies',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: 'One of the most challenging aspects of microservices is data management. The "Database per Service" pattern promotes service autonomy but introduces complexity for transactions that span multiple services.',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: 'Implementing the Saga pattern or using event sourcing can help maintain data consistency across services without tight coupling.',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
						],
						direction: 'ltr',
					},
				},
				_status: 'published',
			},
			{
				id: 2,
				title: 'Advanced TypeScript Design Patterns',
				slug: 'advanced-typescript-patterns',
				description:
					'Deep dive into enterprise-level TypeScript patterns, focusing on maintainability and type safety in large applications.',
				createdAt: '2024-02-15T12:00:00Z',
				updatedAt: '2024-02-15T12:00:00Z',
				tags: [createdTags['TypeScript'], createdTags['Architecture']],
				dynamiccontent: {
					root: {
						type: 'root',
						format: '',
						indent: 0,
						version: 1,
						children: [
							{
								type: 'paragraph',
								children: [
									{
										text: "TypeScript has revolutionized JavaScript development by providing strong typing and advanced object-oriented features. In this post, we'll explore sophisticated design patterns that can help you build more maintainable and robust TypeScript applications.",
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'heading',
								tag: 'h2',
								children: [
									{
										text: 'The Power of Discriminated Unions',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: "Discriminated unions (also known as tagged unions) are one of TypeScript's most powerful features for modeling complex state:",
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: 'type NetworkState = \n| { state: "loading" } \n| { state: "success", data: ResponseData } \n| { state: "error", error: Error };',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: 'This pattern allows the compiler to narrow types based on the discriminant property ("state" in this example), providing excellent type safety.',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'heading',
								tag: 'h2',
								children: [
									{
										text: 'Builder Pattern with Method Chaining',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: 'The Builder pattern is particularly elegant in TypeScript, allowing for fluent interfaces with full type safety:',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: 'class QueryBuilder {\n  private query: Query = {};\n\n  where(condition: Condition): this {\n    this.query.where = condition;\n    return this;\n  }\n\n  orderBy(field: string, direction: "asc" | "desc"): this {\n    this.query.orderBy = { field, direction };\n    return this;\n  }\n\n  build(): Query {\n    return { ...this.query };\n  }\n}',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'heading',
								tag: 'h2',
								children: [
									{
										text: 'Factory Pattern with Generic Types',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: "TypeScript's generics make the Factory pattern even more powerful, allowing for type-safe creation of objects:",
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: 'interface Repository<T> {\n  find(id: string): Promise<T>;\n  save(entity: T): Promise<void>;\n}\n\nfunction createRepository<T>(entityType: string): Repository<T> {\n  // Implementation details\n  return {\n    find: async (id) => { /* ... */ } as T,\n    save: async (entity) => { /* ... */ }\n  };\n}',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
						],
						direction: 'ltr',
					},
				},
				_status: 'published',
			},
			{
				id: 3,
				title: 'Leading Technical Teams Through Digital Transformation',
				slug: 'leading-technical-teams',
				description:
					'Insights and strategies for technical leadership in modern software development teams.',
				createdAt: '2024-01-05T09:15:00Z',
				updatedAt: '2024-01-05T09:15:00Z',
				tags: [createdTags['Leadership']],
				dynamiccontent: {
					root: {
						type: 'root',
						format: '',
						indent: 0,
						version: 1,
						children: [
							{
								type: 'paragraph',
								children: [
									{
										text: 'Digital transformation is reshaping how organizations operate, and technical leaders play a crucial role in guiding their teams through this evolution. This post shares practical strategies for effective technical leadership during periods of significant change.',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'heading',
								tag: 'h2',
								children: [
									{
										text: 'Balancing Technical Excellence with Business Value',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: 'As a technical leader, one of your primary challenges is striking the right balance between technical excellence and business outcomes. While engineers often focus on elegant solutions and clean code, stakeholders care about business impact and time-to-market.',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: 'Effective leaders create a shared understanding of how technical decisions align with business goals. This means developing the skill to translate between technical concepts and business value, and making trade-offs transparent to both your team and stakeholders.',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'heading',
								tag: 'h2',
								children: [
									{
										text: 'Building a Learning Culture',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: 'Digital transformation requires continuous learning and adaptation. Great technical leaders foster a culture where:',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: '• Experimentation is encouraged and failure is viewed as a learning opportunity',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: '• Knowledge sharing is systematic through code reviews, pair programming, and tech talks',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: '• Team members have dedicated time for professional development',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'heading',
								tag: 'h2',
								children: [
									{
										text: 'Managing Change and Uncertainty',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: 'Digital transformation inherently involves uncertainty. Technical leaders need to help their teams navigate this uncertainty by:',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: 'Providing clear direction while acknowledging unknowns, breaking large changes into smaller, manageable steps, and celebrating progress to maintain momentum and morale.',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'heading',
								tag: 'h2',
								children: [
									{
										text: 'Developing Future Leaders',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
							{
								type: 'paragraph',
								children: [
									{
										text: 'A key responsibility of technical leadership is developing the next generation of leaders. This involves identifying team members with leadership potential, providing opportunities for them to lead initiatives, and offering mentorship and feedback to help them grow.',
										type: 'text',
									},
								],
								direction: 'ltr',
								format: '',
								indent: 0,
								version: 1,
							},
						],
						direction: 'ltr',
					},
				},
				_status: 'published',
			},
		]

		// create the posts
		for (const post of demoData) {
			await payload.create({
				collection: 'posts',
				data: post,
				overrideAccess: true,
			})
		}
	}
}
