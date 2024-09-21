import Mdx from '@/core/common/components/elements/mdx/Mdx'
import Layout from '@/core/common/components/layouts'
import { queryPageBySlug } from '@/core/common/services/pages.service'
import { getMenuItems } from '@/core/services/menu'

const TestPage = async () => {
	const data = await queryPageBySlug('blog')

	const dataMdx =
		'```js title="lib/test.tsx"\n' +
		"console.log('hi hallo tester')\n" +
		'```\n\n# Hello, world!'

	const nav = await getMenuItems()

	return (
		<Layout navGlobal={nav}>
			<h1>{new Date().toISOString()}</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<Mdx content={dataMdx} />
		</Layout>
	)
}

export default TestPage

export const dynamic = 'force-dynamic'
