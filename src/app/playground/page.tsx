import React from 'react'

import Container from '@/common/components/elements/Container'
import Layout from '@/common/components/layouts'
import Playground from '@/modules/playground'

const PlaygroundPage = () => {
  return (
    <Layout>
      <Container className='!mt-0 pt-20 md:pt-0' data-aos='fade-up'>
        <Playground id='playground' isHeading />
      </Container>
    </Layout>
  )
}

export default PlaygroundPage
