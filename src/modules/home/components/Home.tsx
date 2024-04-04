import Breakline from '@/common/components/elements/Breakline'

import FeaturedProjectsPreview from './FeaturedProjectsPreview'
import Introduction from './Introduction'
import Services from './Services'
import { getFeaturedProjects } from '@/common/services/graphql.service'

const Home = async () => {
  const featuredProjects = await getFeaturedProjects()
  return (
    <>
      <Introduction />
      <Breakline className='mb-7 mt-8' />
      <FeaturedProjectsPreview projects={featuredProjects} />
      <Breakline className='my-8' />
      <Services />
    </>
  )
}

export default Home
