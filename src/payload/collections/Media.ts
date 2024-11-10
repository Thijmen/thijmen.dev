import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
export const Media: CollectionConfig = {
	slug: 'r2-media',
	labels: {
		singular: 'Media R2',
		plural: 'Media R2',
	},
	upload: {
		imageSizes: [
			{
				name: 'projectCardHomepage',
				width: 326,
				height: 400,
				generateImageName: ({ height, originalName, sizeName, extension, width }) => {
					return `projectCardHomepage-${originalName}-${sizeName}-${height}-${width}.${extension}`
				},
			},
			{
				name: 'projectCardProjectsPage',
				width: 400,
				height: 200,
				generateImageName: ({ height, originalName, sizeName, extension, width }) => {
					return `projectCardProjectsPage-${originalName}-${sizeName}-${height}-${width}.${extension}`
				},
			},
			{
				name: 'postThumbnail',
				width: 96,
				height: 96,
				generateImageName: ({ height, originalName, sizeName, extension, width }) => {
					return `postThumbnail-${originalName}-${sizeName}-${height}-${width}.${extension}`
				},
			},
		],
	},
	fields: [
		{
			name: 'title',
			type: 'text',
		},
	],
	access: {
		create: authenticated,
		delete: authenticated,
		read: () => true,
		update: authenticated,
	},
}
