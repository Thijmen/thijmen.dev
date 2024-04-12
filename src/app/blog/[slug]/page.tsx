import { Metadata } from 'next'
import { generateSiteTitle } from '@/core/metadata'
import BlogItemHeader from '@/app/blog/[slug]/components/BlogItemHeader'
import { BlogItemContent } from '@/app/blog/[slug]/components/BlogItemContent'
import { getBlogItem } from '@/common/services/graphql.service'
import { redirect } from 'next/navigation'
import Layout from '@/common/components/layouts'

export const revalidate = 300

const BlogPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const blog = await getBlogItem(slug)

  // @TODO: Redirects
  if (!blog) return null

  return (
    <Layout isFullPageHeader title={blog.title ?? ''}>
      <BlogItemHeader blog={blog} />
      <BlogItemContent blog={blog} />
    </Layout>
  )
}

export const generateStaticParams = () => {
  return []
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const blog = await getBlogItem(slug)

  if (!blog) {
    redirect('/404')
  }

  const title = blog?.title ?? ''

  // @TODO: Add proper metadata
  return {
    title: generateSiteTitle({ title }),
    description: blog?.description ?? '',
  }
}

export default BlogPage
