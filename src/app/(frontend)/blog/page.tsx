import Container from '@/common/components/elements/Container'
import BlogListNew from '@/modules/blog'
import { Metadata } from 'next'
import { generateSiteTitle } from '@/core/metadata'
import { getBlogPosts, getPage } from '@/common/services/graphql.service'
import Layout from '@/common/components/layouts'

const BlogPage = async () => {
  const pageInfo = await getPage('blog')

  if (pageInfo === null) return null

  const blogEntries = await getBlogPosts(10)

  return (
    <Layout>
      <Container data-aos='fade-up'>
        <BlogListNew page={pageInfo} blogs={blogEntries} />
      </Container>
    </Layout>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('blog')

  return {
    title: generateSiteTitle({
      title: page?.title ?? 'unknown',
    }),
  }
}

export default BlogPage