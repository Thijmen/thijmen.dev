import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

import type { Page } from '@/payload/payload-types'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
	doc,
	previousDoc,
	req: { payload },
}) => {
	const slug = doc.slug === 'home' ? '' : doc.slug

	if (doc._status === 'published') {
		const path = `/${slug}`

		payload.logger.info(`Revalidating page at path: ${path}`)

		revalidatePath(path)
	}

	// If the post was previously published, we need to revalidate the old path
	if (previousDoc._status === 'published' && doc._status !== 'published') {
		const oldPath = `/${previousDoc.slug}`

		payload.logger.info(`Revalidating old page at path: ${oldPath}`)

		revalidatePath(oldPath)
	}

	return doc
}
