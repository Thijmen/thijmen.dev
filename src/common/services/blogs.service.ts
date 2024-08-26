import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

import { Blog } from '../../../payload-types'

export const getNewBlogs = async (limit: number): Promise<Blog[]> => {
  const payload = await getPayload({ config: configPromise })

  const data = await payload.find({
    collection: 'blogs',
    limit,
  })

  return data.docs
}

export const getNewBlog = async (slug: string): Promise<Blog | null> => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const data = await payload.find({
    collection: 'blogs',
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
