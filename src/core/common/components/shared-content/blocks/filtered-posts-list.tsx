import PageHeading from '@/core/common/components/elements/PageHeading'
import PostsList from '@/core/modules/posts/components/PostsList'
import type {
	MyFilteredPostsListBlock,
	Post,
	Tag,
} from '@/payload/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

interface FilteredPostsListBlockProps {
	block: MyFilteredPostsListBlock
}

type TagLike = { id: string } | Tag

const fetchPosts = async (limit = 100) => {
	const payload = await getPayload({ config: configPromise })

	const postsResult = await payload.find({
		collection: 'posts',
		limit,
		sort: '-createdAt',
		depth: 1,
		where: {
			_status: {
				equals: 'published',
			},
		},
	})

	return postsResult.docs as Post[]
}

const fetchTags = async (tagIds: string[] = []) => {
	const payload = await getPayload({ config: configPromise })

	const tagsResult = await payload.find({
		collection: 'tags',
		limit: 100,
		sort: 'name',
		...(tagIds.length > 0
			? {
					where: {
						_status: {
							equals: 'published',
						},
						id: {
							in: tagIds,
						},
					},
				}
			: {
					where: {
						_status: {
							equals: 'published',
						},
					},
				}),
	})

	return tagsResult.docs as Tag[]
}

export async function FilteredPostsListBlock({
	block,
}: FilteredPostsListBlockProps) {
	// Extract tag IDs from block.specificTags
	const tagIds: string[] = []
	if (
		!block.showAllTags &&
		block.specificTags &&
		block.specificTags.length > 0
	) {
		block.specificTags.forEach((tag) => {
			if (typeof tag === 'string') {
				tagIds.push(tag)
			} else if (typeof tag === 'number') {
				tagIds.push(String(tag))
			} else if (typeof tag === 'object' && 'id' in tag) {
				tagIds.push(String(tag.id))
			}
		})
	}

	// Fetch data in parallel
	const [posts, tags] = await Promise.all([
		fetchPosts(block.limit),
		fetchTags(tagIds),
	])

	return (
		<div className='py-4'>
			<PageHeading
				title={block.heading || 'Blog Posts'}
				description={block.description || ''}
			/>
			<div className='mt-6'>
				<PostsList initialPosts={posts} allTags={tags} />
			</div>
		</div>
	)
}

export default FilteredPostsListBlock
