import Breakline from '@/common/components/elements/Breakline'
import FeaturedProjectsPreview from './FeaturedProjectsPreview'
import Introduction from './Introduction'
import {
  getBlogPosts,
  getFeaturedProjects,
} from '@/common/services/graphql.service'
import { LatestBlogs } from '@/modules/home/components/LatestBlogs'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

const Home = async () => {
  const featuredProjects = await getFeaturedProjects()
  const latestPosts = await getBlogPosts(2)

  const payload = await getPayloadHMR({ config: configPromise })
  const data = await payload.find({
    collection: 'projects',
  })
  return (
    <>
      <Introduction />
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Breakline className='mb-7 mt-8' />
      <FeaturedProjectsPreview projects={featuredProjects} />
      <Breakline className='my-8' />
      <LatestBlogs posts={latestPosts} />
    </>
  )
}

export default Home
