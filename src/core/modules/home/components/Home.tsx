import Breakline from '@/core/common/components/elements/Breakline'
import FeaturedProjectsPreview from './FeaturedProjectsPreview'
import Introduction from './Introduction'
import { LatestBlogs } from '@/core/modules/home/components/LatestBlogs'
import { getNewFeaturedProjects } from '@/core/common/services/projects.service'
import { getPosts } from '@/core/common/services/blogs.service'

const Home = async () => {
  const featuredProjects = await getNewFeaturedProjects()
  const latestPosts = await getPosts(2)

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
