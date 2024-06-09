import { Metadata } from 'next'
import { generateSiteTitle } from '@/core/metadata'
import { redirect } from 'next/navigation'
import Layout from '@/common/components/layouts'
import { getNewBlog } from '@/common/services/blogs.service'
import BlogItemHeader from '@/app/(frontend)/blog/[slug]/components/BlogItemHeader'
import { BlogItemContent } from '@/app/(frontend)/blog/[slug]/components/BlogItemContent'

export const revalidate = 300

const BlogPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const blog = await getNewBlog(slug)

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

export const generateStaticParams = () => {
  return []
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const blog = await getNewBlog(slug)

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
