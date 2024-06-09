import Breakline from '@/common/components/elements/Breakline'
import FeaturedProjectsPreview from './FeaturedProjectsPreview'
import Introduction from './Introduction'
import { LatestBlogs } from '@/modules/home/components/LatestBlogs'
import { getNewFeaturedProjects } from '@/common/services/projects.service'
import { getNewBlogs } from '@/common/services/blogs.service'

const Home = async () => {
  const featuredProjects = await getNewFeaturedProjects()
  const latestPosts = await getNewBlogs(2)

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
