import type { Page } from '@/payload/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { cache } from 'react'

export const queryPageBySlug = cache(
	async (slug: string): Promise<Page | null> => {
		const { isEnabled: draft } = await draftMode()
		const payload = await getPayload({ config: configPromise })

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
