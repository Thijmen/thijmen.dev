'use client'
import {
  PagesDocumentEntryFragment,
  ProjectEntryFragmentFragment,
} from '@/__generated__/graphql'
import Container from '@/common/components/elements/Container'
import PageHeading from '@/common/components/elements/PageHeading'
import Projects from '@/modules/projects'

const ProjectsClientsComponent = ({
  projects,
  page,
}: {
  projects: ProjectEntryFragmentFragment[]
  page: PagesDocumentEntryFragment
}) => {
  return (
    <>
      <Container data-aos='fade-up'>
        <PageHeading title={'Projects'} md={page.doxterContent} />
        <Projects projects={projects} />
      </Container>
    </>
  )
}

export default ProjectsClientsComponent
