import type { Post } from '@/payload/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'

export const getNewBlog = async (slug: string): Promise<Post | null> => {
	const { isEnabled: draft } = await draftMode()

	const payload = await getPayload({ config: configPromise })

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
