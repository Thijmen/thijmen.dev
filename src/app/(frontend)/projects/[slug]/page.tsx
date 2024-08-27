import { redirect } from 'next/navigation'
import Container from '@/core/common/components/elements/Container'
import BackButton from '@/core/common/components/elements/BackButton'
import PageHeading from '@/core/common/components/elements/PageHeading'
import React, { cache } from 'react'
import ProjectDetail from '@/core/modules/projects/components/ProjectDetail'
import { Metadata } from 'next'
import Layout from '@/core/common/components/layouts'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { generateMeta } from '@/payload/utilities/generateMeta'

const ProjectDetailPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params

  const project = await queryProjectBySlug({ slug })

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
  const payload = await getPayloadHMR({ config: configPromise })

  const projects = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return projects.docs?.map(({ slug }) => slug)
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = await queryProjectBySlug({ slug })

  return generateMeta({ doc: project })
}

const queryProjectBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    draft,
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export default ProjectDetailPage
