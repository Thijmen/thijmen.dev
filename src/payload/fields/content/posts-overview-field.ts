import type { Block } from 'payload'

export const MyPosts: Block = {
	slug: 'postsBlock',
	labels: {
		plural: 'Posts Block',
		singular: 'Posts Block',
	},
	fields: [
		{
			name: 'filterFeatured',
			type: 'checkbox',
			label: 'Only featured posts',
			required: true,
		},
	],
	interfaceName: 'MyPostsBlock',
}
