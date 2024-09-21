import type { Page } from '@/payload/payload-types'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import { cache } from 'react'

export const queryPageBySlug = cache(
	async (slug: string): Promise<Page | null> => {
		const { isEnabled: draft } = draftMode()
		const payload = await getPayloadHMR({ config: configPromise })

		const data = await payload.find({
			collection: 'pages',
			draft,
			where: {
				slug: {
					equals: slug,
				},
			},
			limit: 1,
		})

		return data.docs?.[0] || null
	},
)
