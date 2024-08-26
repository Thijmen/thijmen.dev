import configPromise from '@payload-config'
import { cache } from 'react'
import { Page } from '@/payload/payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode } from 'next/headers'

export const queryPageBySlug = cache(
  async (slug: string): Promise<Page | null> => {
    const { isEnabled: draft } = draftMode()
    const payload = await getPayloadHMR({ config: configPromise })

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
