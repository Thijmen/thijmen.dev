import ProjectsClientsComponent from '@/app/projects/client-component'
import { getProjects } from '@/common/services/graphql.service'

const ProjectsPage = async () => {
  const projects = await getProjects()

  return (
    <>
      <ProjectsClientsComponent projects={projects} />
    </>
  )
}

export default ProjectsPage
