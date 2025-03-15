import { Suspense } from 'react'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'
import configPromise from '@payload-config'

import Layout from '@/core/common/components/layouts'
import Container from '@/core/common/components/elements/Container'
import PageHeading from '@/core/common/components/elements/PageHeading'
import { getMenuItems } from '@/core/services/menu'
import PostsList from '@/core/modules/posts/components/PostsList'
import type { Post, Tag } from '@/payload/payload-types'

export const metadata: Metadata = {
	title: 'Blog Posts | Thijmen.dev',
	description: 'Browse all blog posts and filter by tags',
}

export default async function PostsPage() {
	const { posts, tags } = await fetchPostsAndTags()
	const nav = await getMenuItems()

	return (
		<Layout navGlobal={nav}>
			<Container>
				<div className='mb-8 mt-4'>
					<PageHeading
						title='Blog Posts'
						description='Browse all my articles and filter by topics that interest you'
					/>
					<Suspense fallback={<div>Loading posts...</div>}>
						<PostsList initialPosts={posts} allTags={tags} />
					</Suspense>
				</div>
			</Container>
		</Layout>
	)
}

const fetchPostsAndTags = cache(async () => {
	const { isEnabled: draft } = await draftMode()
	const payload = await getPayload({ config: configPromise })

	// Fetch all posts
	const postsResult = await payload.find({
		collection: 'posts',
		draft,
		limit: 100,
		sort: '-createdAt',
		depth: 1,
		where: {
			_status: {
				equals: 'published',
			},
		},
	})

	// Fetch all tags
	const tagsResult = await payload.find({
		collection: 'tags',
		draft,
		limit: 100,
		sort: 'name',
		where: {
			_status: {
				equals: 'published',
			},
		},
	})

	return {
		posts: postsResult.docs as Post[],
		tags: tagsResult.docs as Tag[],
	}
})
