import { Page } from '../../../payload/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const getNewPage = async (slug: string): Promise<Page | null> => {
  const payload = await getPayload({ config: configPromise })

  const data = await payload.find({
    collection: 'pages',
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
