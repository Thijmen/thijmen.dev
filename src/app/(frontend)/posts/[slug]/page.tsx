
import { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import type { Post } from '@/payload/payload-types'
import { PayloadRedirects } from '@/core/common/components/PayloadRedirects'
import { getMenuItems } from '@/core/services/menu'
import Layout from '@/core/common/components/layouts'
import Container from '@/core/common/components/elements/Container'
import { RichText } from '@/core/common/components/shared-content'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise

  const post: Post | null = await queryPostBySlug({
    slug,
  })

  if (!post) {
    return <PayloadRedirects url={slug} />
  }

  const nav = await getMenuItems()

  return (
    <Layout navGlobal={nav}>
      <Container data-aos={'fade-up'}>
        <RichText data={post.dynamiccontent} />
      </Container>
    </Layout>
  )
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return posts.docs?.map(({ slug }) => {
    return { slug }
  })
}
