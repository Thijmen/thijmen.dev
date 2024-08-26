import Container from '@/core/common/components/elements/Container'
import BlogListNew from '@/core/modules/blog'
import { Metadata } from 'next'
import { generateSiteTitle } from '@/core/metadata'
import Layout from '@/core/common/components/layouts'
import { getNewPage } from '@/core/common/services/pages.service'
import { getNewBlogs } from '@/core/common/services/blogs.service'

const BlogPage = async () => {
  const page = await getNewPage('blog')

  if (page === null) return null

  const blogEntries = await getNewBlogs(10)

  return (
    <Layout>
      <Container data-aos='fade-up'>
        <BlogListNew page={page} blogs={blogEntries} />
      </Container>
    </Layout>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getNewPage('blog')

  return {
    title: generateSiteTitle({
      title: page?.title ?? 'unknown',
    }),
  }
}

export default BlogPage
export const revalidate = 60
