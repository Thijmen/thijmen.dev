import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from '@payloadcms/plugin-seo/fields'
import type { Tab } from 'payload'

export const defaultVersions = {
	drafts: {
		autosave: {
			interval: 100,
		},
	},
	maxPerDoc: 50,
}

export const defaultMetaTab: Tab = {
	name: 'meta',
	label: 'SEO',
	fields: [
		OverviewField({
			titlePath: 'meta.title',
			descriptionPath: 'meta.description',
			imagePath: 'meta.image',
		}),
		MetaTitleField({
			hasGenerateFn: true,
		}),
		MetaImageField({
			relationTo: 'r2-media',
		}),
		MetaDescriptionField({}),
		PreviewField({
			hasGenerateFn: true,
			titlePath: 'meta.title',
			descriptionPath: 'meta.description',
		}),
	],
}
