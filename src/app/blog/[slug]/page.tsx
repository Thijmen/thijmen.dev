import { Metadata } from 'next'
import { generateSiteTitle } from '@/core/metadata'
import BlogItemHeader from '@/app/blog/[slug]/components/BlogItemHeader'
import { BlogItemContent } from '@/app/blog/[slug]/components/BlogItemContent'
import { getBlogItem } from '@/common/services/graphql.service'

export const revalidate = 300

const BlogPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const blog = await getBlogItem(slug)

  // @TODO: Redirects
  if (!blog) return null

  return (
    <>
      <BlogItemHeader blog={blog} />
      <BlogItemContent blog={blog} />
    </>
  )
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const blog = await getBlogItem(slug)

  const title = blog?.title ?? ''

  // @TODO: Add proper metadata
  return {
    title: generateSiteTitle({ title }),
    description: blog?.description ?? '',
  }
}

export default BlogPage
