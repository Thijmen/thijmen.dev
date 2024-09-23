import type { Block } from 'payload'

export const MyGithubStars: Block = {
	slug: 'githubStarsBlock',
	labels: {
		plural: 'Github Stars',
		singular: 'Github Stars',
	},
	fields: [
		{
			name: 'ignoredRepositories',
			label: 'Ignored Repositories',
			type: 'array',
			fields: [
				{
					name: 'name',
					label: 'Repository Name',
					type: 'text',
				},
			],
		},
	],
	interfaceName: 'MyGithubStarsBlock',
}
