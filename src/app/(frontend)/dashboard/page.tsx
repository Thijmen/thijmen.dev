import Container from '@/core/common/components/elements/Container'
import { getGithubUser } from '@/core/services/github'
import PageHeading from '@/core/common/components/elements/PageHeading'
import Dashboard from '@/core/modules/dashboard'
import type { Metadata } from 'next'
import { generateSiteTitle } from '@/core/metadata'
import Layout from '@/core/common/components/layouts'

export const metadata: Metadata = {
  title: generateSiteTitle({ title: 'Dashboard' }),
}

const DashboardPage = async () => {
  const githubData = await getGithubUser('personal')

  return (
    <Layout>
      <Container data-aos='fade-up'>
        <PageHeading
          title={'Dashboard'}
          description={
            'This is my personal dashboard, built with Next.js API routes deployed as serverless functions.'
          }
        />
        <Dashboard />
      </Container>
    </Layout>
  )
}

export default DashboardPage
