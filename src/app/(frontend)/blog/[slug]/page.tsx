import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import configPromise from '@payload-config'
import Layout from '@/core/common/components/layouts'
import BlogItemHeader from '@/app/(frontend)/blog/[slug]/components/BlogItemHeader'
import { BlogItemContent } from '@/app/(frontend)/blog/[slug]/components/BlogItemContent'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React, { cache } from 'react'
import { draftMode } from 'next/headers'
import { generateMeta } from '@/payloadcms/utilities/generateMeta'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const posts = await payload.find({
    collection: 'blogs',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return posts.docs?.map(({ slug }) => slug)
}

const BlogPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const blog = await queryPostBySlug({ slug })

  // @TODO: Redirects
  if (!blog) {
    redirect('/404')
  }

  return (
    <Layout isFullPageHeader title={blog.title}>
      <BlogItemHeader blog={blog} />
      <BlogItemContent blog={blog} />
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
    collection: 'blogs',
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

export default BlogPage
