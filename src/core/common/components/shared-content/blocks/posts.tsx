import { getPosts } from '@/core/common/services/blogs.service'
import BlogCardNew from '@/core/modules/blog/components/BlogCardNew'
import type { MyPostsBlock } from '@/payload/payload-types'

export const PostsBlock = async ({ block }: { block: MyPostsBlock }) => {
	const posts = await getPosts()
	return (
		<>
			<div className='grid gap-4 md:grid-cols-2'>
				{posts.map((item) => (
					<BlogCardNew key={item.slug} blogItem={item} />
				))}
			</div>
		</>
	)
}
