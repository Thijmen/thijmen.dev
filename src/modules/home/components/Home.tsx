import Breakline from '@/common/components/elements/Breakline'
import FeaturedProjectsPreview from './FeaturedProjectsPreview'
import Introduction from './Introduction'
import {
  getBlogPosts,
  getFeaturedProjects,
} from '@/common/services/graphql.service'
import { LatestBlogs } from '@/modules/home/components/LatestBlogs'

const Home = async () => {
  const featuredProjects = await getFeaturedProjects()
  const latestPosts = await getBlogPosts(2)
  return (
    <>
      <Introduction />
      <Breakline className='mb-7 mt-8' />
      <FeaturedProjectsPreview projects={featuredProjects} />
      <Breakline className='my-8' />
      <LatestBlogs posts={latestPosts} />
    </>
  )
}

export default Home
