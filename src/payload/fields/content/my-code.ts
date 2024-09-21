import type { Block } from 'payload'

export const MyCode: Block = {
	slug: 'code',
	fields: [
		{
			name: 'code',
			type: 'code',
			admin: {
				language: 'markdown',
			},
			label: false,
			required: true,
		},
	],
	interfaceName: 'MyCodeBlock',
}
