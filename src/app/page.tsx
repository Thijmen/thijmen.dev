import Container from '@/common/components/elements/Container'
import Home from '@/modules/home'
import type { Metadata } from 'next'
import { generateSiteTitle } from '@/core/metadata'

export const metadata: Metadata = {
  title: generateSiteTitle({ title: 'Home' }),
}
const Homepage = () => {
  return (
    <>
      <Container data-aos='fade-up'>
        <Home />
      </Container>
    </>
  )
}

export default Homepage
