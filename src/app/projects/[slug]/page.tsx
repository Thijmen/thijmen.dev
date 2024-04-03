import { redirect } from 'next/navigation'
import Container from '@/common/components/elements/Container'
import BackButton from '@/common/components/elements/BackButton'
import PageHeading from '@/common/components/elements/PageHeading'
import React from 'react'
import ProjectDetail from '@/modules/projects/components/ProjectDetail'
import { getProject } from '@/common/services/graphql.service'

const ProjectDetailPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params

  const data = await getProject(slug)

  if (data.data.projectsEntries.length === 0) {
    redirect('/404')
  }

  const project = data.data.projectsEntries[0]

  return (
    <>
      <Container data-aos={'fade-up'}>
        <BackButton url={'/projects'} />
        <PageHeading title={project.title} description={project.description} />
        <ProjectDetail project={project} />
      </Container>
    </>
  )
}
export const generateStaticParams = () => {
  return []
}
export default ProjectDetailPage
