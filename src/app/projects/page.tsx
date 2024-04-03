import ProjectsClientsComponent from '@/app/projects/client-component'
import { getProjectsDocument } from '@/services/graphql/documents.projects'
import { getClient } from '@/services/graphql/graphql'

const ProjectsPage = async () => {
  const projectsResponse = await getClient().query({
    query: getProjectsDocument,
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  })
  const projects = projectsResponse.data.projectsEntries

  return (
    <>
      <ProjectsClientsComponent projects={projects} />
    </>
  )
}

export default ProjectsPage
