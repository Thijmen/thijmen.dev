import Container from '@/common/components/elements/Container'
import BlogListNew from '@/modules/blog'
import { Metadata } from 'next'
import { generateSiteTitle } from '@/core/metadata'
import Layout from '@/common/components/layouts'
import { getNewPage } from '@/common/services/pages.service'
import { getNewBlogs } from '@/common/services/blogs.service'

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
