import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Project } from '../../../payload/payload-types'

export const getNewProject = async (slug: string): Promise<Project | null> => {
	const payload = await getPayload({ config: configPromise })

	const data = await payload.find({
		collection: 'projects',
		where: {
			slug: {
				equals: slug,
			},
		},
		limit: 1,
	})

	if (data.docs.length === 0) {
		return null
	}

	return data.docs[0]
}

export const getNewFeaturedProjects = async (): Promise<Project[]> => {
	const payload = await getPayload({ config: configPromise })

	const data = await payload.find({
		collection: 'projects',
		where: {
			isFeatured: {
				equals: true,
			},
		},
	})

	return data.docs
}

export const getNewProjects = async (): Promise<Project[]> => {
	const payload = await getPayload({ config: configPromise })

	const data = await payload.find({
		collection: 'projects',
	})

	return data.docs
}

export const getProjects = async (isFeatured?: boolean): Promise<Project[]> => {
	const payload = await getPayload({ config: configPromise })

	const data = await payload.find({
		collection: 'projects',
		...(isFeatured !== undefined
			? {
					where: {
						isFeatured: {
							equals: isFeatured,
						},
					},
				}
			: {}),
	})

	return data.docs
}
