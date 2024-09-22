import type { Block } from 'payload'

export const MyHomepageProjects: Block = {
	slug: 'homepageProjectsBlock',
	labels: {
		plural: 'Homepage Projects',
		singular: 'Homepage Projects',
	},
	fields: [
		{
			name: 'onlyFeatured',
			type: 'checkbox',
			label: 'Only featured projects',
			defaultValue: true,
		},
		{
			name: 'linkHref',
			type: 'text',
			label: 'Link href',
			required: false,
		},
		{
			name: 'linkTitle',
			type: 'code',
			label: 'Link title',
			required: false,
			admin: {
				language: 'markdown',
			},
		},
		{
			name: 'headingTitle',
			type: 'text',
			label: 'Heading title',
			required: false,
		},
	],
	interfaceName: 'MyHomepageProjectsBlock',
}
