import Container from '@/common/components/elements/Container'
import PageHeading from '@/common/components/elements/PageHeading'
import Projects from '@/modules/projects'
import { Page, Project } from '../../../../payload-types'

const ProjectsClientsComponent = ({
  projects,
  page,
}: {
  projects: Project[]
  page: Page
}) => {
  return (
    <>
      <Container data-aos='fade-up'>
        <PageHeading title={'Projects'} md={page.content} />
        <Projects projects={projects} />
      </Container>
    </>
  )
}

export default ProjectsClientsComponent
