import type { Block } from 'payload'

export const MyFilteredPostsList: Block = {
	slug: 'filteredPostsListBlock',
	labels: {
		plural: 'Filtered Posts List Block',
		singular: 'Filtered Posts List Block',
	},
	fields: [
		{
			name: 'heading',
			type: 'text',
			label: 'Heading',
			required: true,
			defaultValue: 'Blog Posts',
		},
		{
			name: 'description',
			type: 'text',
			label: 'Description',
			required: false,
			defaultValue:
				'Browse all my articles and filter by topics that interest you',
		},
		{
			name: 'showAllTags',
			type: 'checkbox',
			label: 'Show all tags',
			defaultValue: true,
		},
		{
			name: 'specificTags',
			type: 'relationship',
			label: 'Specific Tags (only used if "Show all tags" is unchecked)',
			relationTo: 'tags',
			hasMany: true,
			required: false,
			admin: {
				condition: (data) => !data.showAllTags,
			},
		},
		{
			name: 'limit',
			type: 'number',
			label: 'Maximum number of posts to show',
			defaultValue: 100,
			min: 1,
			max: 100,
			required: true,
		},
	],
	interfaceName: 'MyFilteredPostsListBlock',
}
