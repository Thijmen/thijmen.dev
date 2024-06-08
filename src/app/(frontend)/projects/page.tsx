import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import ProjectsClientsComponent from '@/app/projects/client-component'
import Layout from '@/common/components/layouts'
import { getPage, getProjects } from '@/common/services/graphql.service'
import { generateSiteTitle } from '@/core/metadata'

const ProjectsPage = async () => {
  const pageData = await getPage('projects')

  if (!pageData) {
    redirect('/404')
  }

  const projects = await getProjects()

  return (
    <Layout>
      <ProjectsClientsComponent page={pageData} projects={projects} />
    </Layout>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('projects')

  return {
    title: generateSiteTitle({
      title: page?.title ?? 'unknown',
    }),
  }
}

export default ProjectsPage