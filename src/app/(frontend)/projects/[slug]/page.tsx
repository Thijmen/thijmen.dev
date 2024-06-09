import { redirect } from 'next/navigation'
import Container from '@/common/components/elements/Container'
import BackButton from '@/common/components/elements/BackButton'
import PageHeading from '@/common/components/elements/PageHeading'
import React from 'react'
import ProjectDetail from '@/modules/projects/components/ProjectDetail'
import { Metadata } from 'next'
import { generateSiteTitle } from '@/core/metadata'
import Layout from '@/common/components/layouts'
import { getNewProject } from '@/common/services/projects.service'

const ProjectDetailPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params

  const project = await getNewProject(slug)

  if (!project) {
    redirect('/404')
  }

  return (
    <Layout>
      <Container data-aos={'fade-up'}>
        <BackButton url={'/projects'} />
        <PageHeading title={project.title} description={project.introduction} />
        <ProjectDetail project={project} />
      </Container>
    </Layout>
  )
}
export const generateStaticParams = () => {
  return []
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const projectData = await getNewProject(slug)

  if (!projectData) {
    redirect('/404')
  }

  const projectTitle = projectData.title

  const title = `Project: ${projectTitle}`
  // @TODO: Add proper metadata
  return {
    title: generateSiteTitle({ title }),
    description: projectData.description,
  }
}

export default ProjectDetailPage
