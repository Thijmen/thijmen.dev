import { getProjectDetailDocument } from '@/services/graphql/documents.projects'
import { redirect } from 'next/navigation'
import Container from '@/common/components/elements/Container'
import BackButton from '@/common/components/elements/BackButton'
import PageHeading from '@/common/components/elements/PageHeading'
import React from 'react'
import ProjectDetail from '@/modules/projects/components/ProjectDetail'
import { getClient } from '@/services/graphql/graphql'
import { REVALIDATE } from '@/common/constants'

const ProjectDetailPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params

  const data = await getClient().query({
    query: getProjectDetailDocument,
    variables: {
      slug,
    },
    context: {
      fetchOptions: {
        next: { revalidate: REVALIDATE },
      },
    },
  })

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

export default ProjectDetailPage
