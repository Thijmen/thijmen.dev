import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import configPromise from '@payload-config'
import Layout from '@/core/common/components/layouts'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React, { cache } from 'react'
import { draftMode } from 'next/headers'
import { generateMeta } from '@/payload/utilities/generateMeta'
import BlogItemHeader from '@/app/(frontend)/posts/[slug]/components/BlogItemHeader'
import { BlogItemContent } from '@/app/(frontend)/posts/[slug]/components/BlogItemContent'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return posts.docs?.map(({ slug }) => slug)
}

const PostPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post = await queryPostBySlug({ slug })

  if (!post) {
    redirect('/404')
  }

  return (
    <Layout isFullPageHeader title={post.title}>
      <BlogItemHeader blog={post} />
      <BlogItemContent blog={post} />
    </Layout>
  )
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

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

export default PostPage