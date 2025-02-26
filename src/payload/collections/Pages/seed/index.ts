import type { Payload } from 'payload'

export const PageSeeder = async (payload: Payload) => {
	const pages = await payload.find({
		collection: 'pages',
		limit: 1,
		overrideAccess: true,
	})

	if (pages.docs.length === 0) {
		const pages = ['Projects', 'Blogs', 'Playground']

		// Create home page with content blocks
		await payload.create({
			collection: 'pages',
			data: {
				title: 'Home',
				slug: 'home',
				showBackButton: false,
				showPageHeading: false,
				dynamiccontent: {"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "block", "fields": {"id": "67bf73c5860c3baf289f462a", "content": "Welcome to my website, where I try to share my knowledge and experiences from my day to day life. I am a software engineer with a passion for tech; backend, frontend and mobile! The sourcecode of this website is completely open source, so feel free to check it out on <Link variant=\"article\" href=\"https://www.github.com/Thijmen/thijmen.dev\">Github</Link>!", "heading": "Hi, I'm Thijmen", "blockName": "", "blockType": "homepageIntroductionBlock", "subheading": "Based in Enschede, The Netherlands"}, "format": "", "version": 2}, {"type": "block", "fields": {"id": "67bf7d2c78f803fc2d55c43d", "variant": "solid", "blockName": "", "blockType": "horizontalLineBlock"}, "format": "", "version": 2}, {"type": "block", "fields": {"id": "67bf7da578f803fc2d55c43e", "linkHref": "projects", "blockName": "", "blockType": "homepageProjectsBlock", "linkTitle": "View all Projects", "headingTitle": "Featured Projects", "onlyFeatured": true}, "format": "", "version": 2}, {"type": "block", "fields": {"id": "67bf7f8e78f803fc2d55c43f", "variant": "solid", "blockName": "", "blockType": "horizontalLineBlock"}, "format": "", "version": 2}, {"type": "block", "fields": {"id": "67bf7f9878f803fc2d55c440", "heading": "Latest Blog Posts", "blockName": "", "blockType": "homepagePostsBlock", "subheading": "Take a look at my latest blog posts."}, "format": "", "version": 2}], "direction": null}}
			
			},
			overrideAccess: true,
		})

		await payload.create({
			collection: 'pages',
			data: {
				title: 'About',
				slug: 'About',
				showBackButton: false,
				showPageHeading: false,
				dynamiccontent: {"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "block", "fields": {"id": "67bf8228253daf11fc8e83c8", "blockName": "", "blockType": "wakaContributionsBlock"}, "format": "", "version": 2}, {"type": "block", "fields": {"id": "67bf82c6253daf11fc8e83c9", "variant": "dashed", "blockName": "", "blockType": "horizontalLineBlock"}, "format": "", "version": 2}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "block", "fields": {"id": "67bf82d5253daf11fc8e83ca", "blockName": "", "blockType": "githubStarsBlock", "ignoredRepositories": 0}, "format": "", "version": 2}], "direction": null}}
			}
		})

		// Create other pages
		pages.forEach(async (page) => {
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
								}
							],
							direction: 'ltr',
							format: '',
							indent: 0,
							type: 'root',
							version: 1,
						}
					}
				},
				overrideAccess: true,
			})
		})
	}
}
