import Container from '@/core/common/components/elements/Container'
import PageHeading from '@/core/common/components/elements/PageHeading'
import Layout from '@/core/common/components/layouts'
import { SharedContent } from '@/core/common/components/shared-content'
import { getMenuItems } from '@/core/services/menu'
import { generateMeta } from '@/payload/utilities/generateMeta'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'

type Args = {
	params: Promise<{
		slug?: string
	}>
}
export async function generateStaticParams() {
	const payload = await getPayloadHMR({ config: configPromise })
	const posts = await payload.find({
		collection: 'posts',
		draft: false,
		limit: 1000,
		overrideAccess: false,
	})

	return posts.docs?.map(({ slug }) => slug)
}

const PostPage = async ({ params: paramsPromise }: Args) => {
	const { slug } = await paramsPromise
	const post = await queryPostBySlug({ slug })

	if (!post) {
		redirect('/404')
	}

	const nav = await getMenuItems()

	return (
		<Layout navGlobal={nav}>
			<Container data-aos={'fade-up'}>
				<PageHeading title={post.title} description={''} />

				<SharedContent content={post.dynamiccontent} />
			</Container>
		</Layout>
	)
}

export async function generateMetadata({
	params: paramsPromise,
}: Args): Promise<Metadata> {
	const { slug } = await paramsPromise
	const post = await queryPostBySlug({ slug })

	return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
	const { isEnabled: draft } = await draftMode()

	const payload = await getPayloadHMR({ config: configPromise })

	const result = await payload.find({
		collection: 'posts',
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

export default PostPage
