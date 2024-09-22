import type { Block } from 'payload'

export const MyHomepageIntroduction: Block = {
	slug: 'homepageIntroductionBlock',
	labels: {
		plural: 'Homepage Introduction',
		singular: 'Homepage Introduction',
	},
	fields: [
		{
			name: 'heading',
			type: 'text',
			required: true,
		},
		{
			name: 'subheading',
			type: 'text',
			required: true,
		},
		{
			name: 'content',
			type: 'code',
			required: true,
			admin: {
				language: 'markdown',
			},
		},
	],
	interfaceName: 'MyHomepageIntroductionBlock',
}
