import type { Post } from '@/payload/payload-types'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

export const getNewBlog = async (slug: string): Promise<Post | null> => {
	const { isEnabled: draft } = draftMode()

	const payload = await getPayloadHMR({ config: configPromise })

	const data = await payload.find({
		collection: 'posts',
		draft,
		overrideAccess: true,
		where: {
			slug: {
				equals: slug,
			},
		},
		limit: 1,
	})

	return data.docs?.[0] || null
}

export const getPosts = async (): Promise<Post[]> => {
	const payload = await getPayload({ config: configPromise })

	const data = await payload.find({
		collection: 'posts',
	})

	return data.docs
}
