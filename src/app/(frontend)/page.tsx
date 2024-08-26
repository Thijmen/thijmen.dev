import Container from '@/core/common/components/elements/Container'
import Home from '@/core/modules/home'
import type { Metadata } from 'next'
import { generateSiteTitle } from '@/core/metadata'
import Layout from '@/core/common/components/layouts'

export const metadata: Metadata = {
  title: generateSiteTitle({ title: 'Home' }),
  description:
    'Welcome to my personal website. I write about web development, programming, and technology.',
}
const Homepage = () => {
  return (
    <Layout>
      <Container data-aos='fade-up'>
        <Home />
      </Container>
    </Layout>
  )
}

export default Homepage
export const revalidate = 60
