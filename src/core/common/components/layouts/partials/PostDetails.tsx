import type { Post, Tag } from '@/payload/payload-types'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

interface PostDetailsProps {
	post: Post | null
}

const PostDetails = ({ post }: PostDetailsProps) => {
	if (!post) return null

	return (
		<div className='mt-4 px-3 py-2 text-sm'>
			<h3 className='font-medium text-neutral-800 dark:text-neutral-300 mb-2'>
				Post Details
			</h3>

			{/* Created Date */}
			<div className='mb-3'>
				<p className='text-xs text-neutral-500 dark:text-neutral-400'>
					Published
				</p>
				<p className='text-neutral-700 dark:text-neutral-300'>
					{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
				</p>
			</div>

			{/* Tags */}
			{post.tags && post.tags.length > 0 && (
				<div className='mb-3'>
					<p className='text-xs text-neutral-500 dark:text-neutral-400 mb-1'>
						Tags
					</p>
					<div className='flex flex-wrap gap-1'>
						{(post.tags as Tag[]).map((tag) => (
							<Link
								key={tag.slug ?? tag.id}
								href={`/tags/${tag.slug}`}
								className='inline-block px-2 py-0.5 text-xs bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded transition-colors'
							>
								{tag.name}
							</Link>
						))}
					</div>
				</div>
			)}

			{/* Reading Time - This is a placeholder, you might want to calculate this based on content length */}
			<div className='mb-3'>
				<p className='text-xs text-neutral-500 dark:text-neutral-400'>
					Reading time
				</p>
				<p className='text-neutral-700 dark:text-neutral-300'>5 min read</p>
			</div>
		</div>
	)
}

export default PostDetails
