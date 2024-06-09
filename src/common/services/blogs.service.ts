import configPromise from '@payload-config'
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
  const payload = await getPayload({ config: configPromise })

  const data = await payload.find({
    collection: 'blogs',
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
