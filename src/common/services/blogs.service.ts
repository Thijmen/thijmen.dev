import { Blog } from '../../../payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const getNewBlogs = async (limit: number): Promise<Blog[]> => {
  const payload = await getPayload({ config: configPromise })

  const data = await payload.find({
    collection: 'blogs',
    limit,
  })

  return data.docs
}
