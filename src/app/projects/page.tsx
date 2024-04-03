import { client } from '@/services/graphql/graphql'
import { getProjectsDocument } from '@/services/graphql/documents.projects'
import ProjectsClientsComponent from '@/app/projects/client-component'

const ProjectsPage = async () => {
  const projectsResponse = await client.query({ query: getProjectsDocument })
  const projects = projectsResponse.data.projectsEntries

  return (
    <>
      <ProjectsClientsComponent projects={projects} />
    </>
  )
}

export const revalidate = 60

export default ProjectsPage
