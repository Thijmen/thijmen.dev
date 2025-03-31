import { validateMDX } from '@/payload/validation/mdx'
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
			validate: async (val) => {
				try {
					await validateMDX(val)
					return true
				} catch (err) {
					console.error(err)
					return 'Error compiling MDX'
				}
			},
		},
	],
	interfaceName: 'MyHomepageIntroductionBlock',
}
