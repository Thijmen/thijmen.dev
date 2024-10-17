import type { CollectionConfig } from 'payload'

import { authenticated } from '@/payload/access/authenticated'
import { authenticatedOrPublished } from '@/payload/access/authenticatedOrPublished'
import { defaultMetaTab, defaultVersions } from '@/payload/collections/defaults'
import { ThijmenContent } from '@/payload/fields/content'
import { slugField } from '@/payload/fields/slug'
import { generatePreviewPath } from '@/payload/utilities/generatePreviewPath'
import { revalidatePage } from './hooks/revalidatePage'

export const Pages: CollectionConfig = {
	slug: 'pages',
	admin: {
		defaultColumns: ['title', 'slug', 'updatedAt'],
		livePreview: {
			url: ({ data }) => {
				const path = generatePreviewPath({
					path: `/${typeof data?.slug === 'string' ? data.slug : ''}`,
				})
				return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
			},
		},
		preview: (doc) =>
			generatePreviewPath({
				path: `/${typeof doc?.slug === 'string' ? doc.slug : ''}`,
			}),
		useAsTitle: 'title',
	},
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticatedOrPublished,
		update: authenticated,
	},
	versions: defaultVersions,
	hooks: {
		afterChange: [revalidatePage],
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
					label: 'Page Settings',
					fields: [
						{
							name: 'containerClassName',
							type: 'text',
							label: 'Override default container class name',
						},
						{
							name: 'showPageHeading',
							type: 'checkbox',
							label: 'Show page heading',
							defaultValue: true,
						},
						{
							name: 'showBackButton',
							type: 'checkbox',
							label: 'Show back button',
							defaultValue: true,
						},
					],
				},
				defaultMetaTab,
			],
		},
	],
}
