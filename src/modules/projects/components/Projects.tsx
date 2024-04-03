import { motion } from 'framer-motion'
import InfiniteScroll from 'react-infinite-scroll-component'

import { ProjectEntryFragmentFragment } from '@/__generated__/graphql'
import EmptyState from '@/common/components/elements/EmptyState'
import ProjectCard from '@/modules/projects/components/ProjectCard'

interface ProjectsComponentProps {
  projects: ProjectEntryFragmentFragment[]
}

const Projects = ({ projects }: ProjectsComponentProps) => {
  const filteredProjects = projects ?? []

  if (filteredProjects.length === 0) {
    return <EmptyState message='No Data' />
  }

  const handleNext = () => {
    // @TODO: Remove eventually
  }

  return (
    <InfiniteScroll
      hasMore={false}
      next={handleNext}
      dataLength={filteredProjects.length}
      loader={<h4>Loading...</h4>}
      style={{ overflow: 'hidden' }}
    >
      <div className='grid gap-5 px-1 pt-2 sm:grid-cols-2'>
        {filteredProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </InfiniteScroll>
  )
}

export default Projects
