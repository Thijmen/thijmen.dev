import ProjectsClientsComponent from '@/app/projects/client-component'
import { getPage, getProjects } from '@/common/services/graphql.service'
import { redirect } from 'next/navigation'

const ProjectsPage = async () => {
  const projects = await getProjects()
  const pageData = await getPage('projects')

  if (!pageData) {
    redirect('/404')
  }

  return (
    <>
      <ProjectsClientsComponent page={pageData} projects={projects} />
    </>
  )
}

export default ProjectsPage
