import Mdx from '@/common/components/elements/mdx/Mdx'
import Layout from '@/common/components/layouts'
import { getNewPage } from '@/common/services/pages.service'

const TestPage = async () => {
  const data = await getNewPage('blog')

  const dataMdx =
    '```js title="lib/test.tsx"\n' +
    "console.log('hi hallo tester')\n" +
    '```\n\n# Hello, world!'
  return (
    <Layout>
      <h1>{new Date().toISOString()}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Mdx content={dataMdx} />
    </Layout>
  )
}

export default TestPage

export const dynamic = 'force-dynamic'
