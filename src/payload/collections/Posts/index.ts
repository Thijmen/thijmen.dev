import { authenticated } from '@/payload/access/authenticated'
import { authenticatedOrPublished } from '@/payload/access/authenticatedOrPublished'
import { revalidatePost } from '@/payload/collections/Posts/hooks/revalidatePost'
import { defaultMetaTab, defaultVersions } from '@/payload/collections/defaults'
import { ThijmenContent } from '@/payload/fields/content'
import { slugField } from '@/payload/fields/slug'
import { generatePreviewPath } from '@/payload/utilities/generatePreviewPath'
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
	slug: 'posts',
	versions: defaultVersions,
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticatedOrPublished,
		update: authenticated,
	},
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', 'slug', 'isFeatured'],
		livePreview: {
			url: ({ data }) => {
				const path = generatePreviewPath({
					path: `/blog/${typeof data?.slug === 'string' ? data.slug : ''}`,
				})
				return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
			},
		},
		preview: (doc) =>
			generatePreviewPath({
				path: `/blog/${typeof doc?.slug === 'string' ? doc.slug : ''}`,
			}),
	},
	hooks: {
		afterChange: [revalidatePost],
	},
	fields: [
		{
			name: 'title',
			type: 'text',
			required: true,
		},
		...slugField(),

		{
			type: 'tabs',
			tabs: [
				{
					label: 'Content',
					fields: [ThijmenContent],
				},
				{
					label: 'Assets',
					fields: [
						{
							name: 'image',
							type: 'upload',
							label: 'Header Image',
							relationTo: 'r2-media',
							filterOptions: {
								mimeType: { contains: 'image' },
							},
						},
					],
				},
				defaultMetaTab,
			],
		},
	],
}
