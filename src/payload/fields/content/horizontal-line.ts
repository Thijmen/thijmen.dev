import type { Block } from 'payload'

export const MyHorizontalLine: Block = {
	slug: 'horizontalLineBlock',
	labels: {
		plural: 'Horizontal Line',
		singular: 'Horizontal Line',
	},
	fields: [
		{
			name: 'variant',
			type: 'select',
			options: ['dashed', 'solid'],
			defaultValue: 'dashed',
		},
		{
			name: 'additionalClassName',
			type: 'text',
			label: 'Additional Class Name',
			required: false,
		},
	],
	interfaceName: 'MyHorizontalLineBlock',
}
