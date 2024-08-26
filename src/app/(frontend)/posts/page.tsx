import Container from '@/core/common/components/elements/Container'
import BlogListNew from '@/core/modules/blog'
import { Metadata } from 'next'
import { generateSiteTitle } from '@/core/metadata'
import Layout from '@/core/common/components/layouts'
import { queryPageBySlug } from '@/core/common/services/pages.service'
import { getPosts } from '@/core/common/services/blogs.service'
import { redirect } from 'next/navigation'

const slug = 'posts'

const PostsPage = async () => {
  const page = await queryPageBySlug(slug)

  if (page === null) {
    redirect('/404')
  }

  const posts = await getPosts(10)

  return (
    <Layout>
      <Container data-aos='fade-up'>
        <BlogListNew page={page} blogs={posts} />
      </Container>
    </Layout>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryPageBySlug(slug)

  return {
    title: generateSiteTitle({
      title: page?.title ?? 'unknown',
    }),
  }
}

export default PostsPage
export const revalidate = 60
export const dynamic = 'force-static'
