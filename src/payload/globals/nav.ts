import type { GlobalConfig, Payload } from 'payload'

export const Nav: GlobalConfig = {
	slug: 'nav',
	label: 'Navigation',
	fields: [
		{
			name: 'links',
			label: 'Links',
			type: 'array',
			minRows: 1,
			fields: [
				{
					name: 'label',
					label: 'Label',
					type: 'text',
				},
				{
					name: 'icon',
					label: 'Icon',
					type: 'select',
					options: [
						'home',
						'project',
						'dashboard',
						'blog',
						'profile',
						'analytics',
					],
					required: true,
				},
				{
					name: 'page',
					type: 'relationship',
					relationTo: ['pages', 'projects'], // "pages" is the slug of an existing collection
					required: false,
				},
				{
					name: 'url',
					type: 'text',
					label: 'URL',
					required: false,
				},
			],
		},
	],
}

export const NavSeeder = async (payload: Payload) => {
	const navs = await payload.findGlobal({
		slug: 'nav',
		overrideAccess: true,
	})

	if (navs?.links?.length === 0) {
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
