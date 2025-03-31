import type { Block } from 'payload'

export const MyImage: Block = {
	slug: 'image',
	labels: {
		plural: 'Images',
		singular: 'Image',
	},
	fields: [
		{
			name: 'image',
			type: 'upload',
			relationTo: 'r2-media',
			required: true,
		},
		{
			name: 'caption',
			type: 'text',
			label: 'Image Caption',
			required: false,
		},
		{
			name: 'altText',
			type: 'text',
			label: 'Alt Text',
			required: true,
			admin: {
				description: 'Important for accessibility and SEO',
			},
		},
	],
	interfaceName: 'MyImageBlock',
}
