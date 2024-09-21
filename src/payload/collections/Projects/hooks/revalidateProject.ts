import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook } from 'payload'

import type { Project } from '@/payload/payload-types'

export const revalidateProject: CollectionAfterChangeHook<Project> = ({
	doc,
	previousDoc,
	req: { payload },
}) => {
	if (doc._status === 'published') {
		const path = `/projects/${doc.slug}`

		payload.logger.info(`Revalidating project at path: ${path}`)

		revalidatePath(path)
	}

	// If the post was previously published, we need to revalidate the old path
	if (previousDoc._status === 'published' && doc._status !== 'published') {
		const oldPath = `/projects/${previousDoc.slug}`

		payload.logger.info(`Revalidating old project at path: ${oldPath}`)

		revalidatePath(oldPath)
	}

	return doc
}
