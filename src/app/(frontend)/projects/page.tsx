import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import Layout from '@/common/components/layouts'
import { generateSiteTitle } from '@/core/metadata'
import { getNewPage } from '@/common/services/pages.service'
import ProjectsClientsComponent from '@/app/(frontend)/projects/client-component'
import { getNewProjects } from '@/common/services/projects.service'

const ProjectsPage = async () => {
  const page = await getNewPage('projects')

  if (!page) {
    redirect('/404')
  }

  const projects = await getNewProjects()

  return (
    <Layout>
      <ProjectsClientsComponent page={page} projects={projects} />
    </Layout>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getNewPage('projects')

  return {
    title: generateSiteTitle({
      title: page?.title ?? 'unknown',
    }),
  }
}

export default ProjectsPage
