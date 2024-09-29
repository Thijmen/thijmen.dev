import type { Block } from 'payload'

export const MyPosts: Block = {
	slug: 'postsBlock',
	labels: {
		plural: 'Posts Block',
		singular: 'Posts Block',
	},
	fields: [
		{
			name: 'heading',
			type: 'text',
			label: 'Heading',
			defaultValue: 'Latest Blog Posts',
		},
		{
			name: 'subheading',
			type: 'text',
			label: 'Subheading',
			defaultValue: 'Take a look at my latest blog posts.',
		},
		// {
		// 	name: 'posts',
		// 	type: 'relationship',
		// 	relationTo: 'posts',
		// 	hasMany: true,
		// },
	],
	interfaceName: 'MyPostsBlock',
}
