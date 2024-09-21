import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { r2Adapter } from '@/payload/adapters/r2adapter'
import { Media } from '@/payload/collections/Media'
import { Index } from '@/payload/collections/Stacks'
import type { Page, Post } from '@/payload/payload-types'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { seoPlugin } from '@payloadcms/plugin-seo'
import type { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { en } from 'payload/i18n/en'
import sharp from 'sharp'

import { Pages } from '@/payload/collections/Pages'
import { Posts } from '@/payload/collections/Posts'
import { Projects } from '@/payload/collections/Projects'
import { StackSeeder } from '@/payload/collections/Stacks/seed'
import { Users } from '@/payload/collections/Users'
import { UserSeeder } from '@/payload/collections/Users/seed'
import { Nav, NavSeeder } from '@/payload/globals/nav'
import { revalidateRedirects } from '@/payload/hooks/revalidateRedirects'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { PageSeeder } from './collections/Pages/seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle: GenerateTitle<Page | Post> = ({ doc }) => {
	return doc?.title
		? `${doc.title} | Payload Website Template`
		: 'Payload Website Template'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
	return doc?.slug
		? `${process.env.NEXT_PUBLIC_SERVER_URL}/${doc.slug}`
		: process.env.NEXT_PUBLIC_SERVER_URL
}

export default buildConfig({
	editor: lexicalEditor(),
	collections: [Users, Projects, Index, Posts, Pages, Media],
	globals: [Nav],
	secret: process.env.PAYLOAD_SECRET || '',
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.POSTGRES_URI || '',
		},
	}),
	plugins: [
		cloudStoragePlugin({
			collections: {
				'r2-media': {
					adapter: r2Adapter, // see docs for the adapter you want to use
				},
			},
		}),
		redirectsPlugin({
			collections: ['pages', 'posts'],
			overrides: {
				// @ts-expect-error
				fields: ({ defaultFields }) => {
					return defaultFields.map((field) => {
						if ('name' in field && field.name === 'from') {
							return {
								...field,
								admin: {
									description:
										'You will need to rebuild the website when changing this field.',
								},
							}
						}
						return field
					})
				},
				hooks: {
					afterChange: [revalidateRedirects],
				},
			},
		}),
		seoPlugin({
			generateTitle,
			generateURL,
		}),
	],
	/**
	 * Payload can now accept specific translations from 'payload/i18n/en'
	 * This is completely optional and will default to English if not provided
	 */
	i18n: {
		supportedLanguages: { en },
	},

	admin: {
		user: 'users',
		meta: {
			titleSuffix: '| 🚧 Thijmen.dev',
		},
		livePreview: {
			breakpoints: [
				{
					label: 'Mobile',
					name: 'mobile',
					width: 375,
					height: 667,
				},
				{
					label: 'Tablet',
					name: 'tablet',
					width: 768,
					height: 1024,
				},
				{
					label: 'Desktop',
					name: 'desktop',
					width: 1440,
					height: 900,
				},
			],
		},
	},
	async onInit(payload) {
		await UserSeeder(payload)
		await PageSeeder(payload)
		await NavSeeder(payload)
		await StackSeeder(payload)
	},
	sharp,
})
