import { redirect } from 'next/navigation'
import Container from '@/core/common/components/elements/Container'
import BackButton from '@/core/common/components/elements/BackButton'
import PageHeading from '@/core/common/components/elements/PageHeading'
import React from 'react'
import ProjectDetail from '@/core/modules/projects/components/ProjectDetail'
import { Metadata } from 'next'
import { generateSiteTitle } from '@/core/metadata'
import Layout from '@/core/common/components/layouts'
import {
  getNewProject,
  getNewProjects,
} from '@/core/common/services/projects.service'

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

export async function generateStaticParams() {
  const projects = await getNewProjects()

  return projects.map((project) => ({
    params: {
      slug: project.slug,
    },
  }))
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
export const revalidate = 60
