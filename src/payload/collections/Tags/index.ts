import { authenticated } from '@/payload/access/authenticated'
import { authenticatedOrPublished } from '@/payload/access/authenticatedOrPublished'
import { defaultVersions } from '@/payload/collections/defaults'
import { slugField } from '@/payload/fields/slug'
import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
	slug: 'tags',
	versions: defaultVersions,
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticatedOrPublished,
		update: authenticated,
	},
	admin: {
		useAsTitle: 'name',
		defaultColumns: ['name', 'slug'],
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			required: true,
		},
		{
			name: 'description',
			type: 'text',
			required: false,
		},
		...slugField('name'),
	],
}
