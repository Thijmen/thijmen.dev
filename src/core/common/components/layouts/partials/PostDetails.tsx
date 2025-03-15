import type { Post, Tag } from '@/payload/payload-types'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

interface PostDetailsProps {
	post: Post | null
	prevPost?: Post | null
	nextPost?: Post | null
}

const PostDetails = ({ post, prevPost, nextPost }: PostDetailsProps) => {
	if (!post) return null

	return (
		<div className='mt-6 px-4 py-3 text-sm bg-white dark:bg-neutral-900/80 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-purple-800/30 shadow-sm'>
			<h3 className='font-medium text-gray-800 dark:text-neutral-300 mb-3 text-base'>
				Post Details
			</h3>

			{/* Published Date */}
			<div className='mb-3'>
				<p className='text-xs text-gray-500 dark:text-neutral-400 mb-1'>
					PUBLISHED
				</p>
				<p className='text-gray-700 dark:text-neutral-300'>
					{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
				</p>
			</div>

			{/* Reading Time */}
			<div className='mb-3'>
				<p className='text-xs text-gray-500 dark:text-neutral-400 mb-1'>
					READING TIME
				</p>
				<p className='text-gray-700 dark:text-neutral-300'>5 min read</p>
			</div>

			{/* Tags */}
			{post.tags && post.tags.length > 0 && (
				<div className='mb-3'>
					<p className='text-xs text-gray-500 dark:text-neutral-400 mb-2'>
						TAGS
					</p>
					<div className='flex flex-wrap gap-2'>
						{(post.tags as Tag[]).map((tag) => (
							<Link
								key={tag.slug ?? tag.id}
								href={`/tags/${tag.slug}`}
								className='inline-flex items-center px-2.5 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-gray-700 dark:text-neutral-300 rounded transition-colors'
							>
								{tag.name}
							</Link>
						))}
					</div>
				</div>
			)}

			{/* Post Navigation */}
			<div>
				<p className='text-xs text-gray-500 dark:text-neutral-400 mb-2'>
					NAVIGATION
				</p>
				<div className='space-y-2'>
					{prevPost ? (
						<Link
							href={`/posts/${prevPost.slug}`}
							className='group flex items-center py-2 px-3 bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-gray-700 dark:text-neutral-300 rounded transition-colors'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-4 w-4 text-gray-500 dark:text-neutral-400 mr-2 flex-shrink-0'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={1.5}
									d='M15 19l-7-7 7-7'
								/>
							</svg>
							<div className='overflow-hidden'>
								<p className='text-sm truncate'>{prevPost.title}</p>
							</div>
						</Link>
					) : (
						<div className='flex items-center py-2 px-3 bg-gray-50 dark:bg-neutral-800/50 text-gray-400 dark:text-neutral-500 rounded'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-4 w-4 mr-2 opacity-50 flex-shrink-0'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={1.5}
									d='M15 19l-7-7 7-7'
								/>
							</svg>
							<div>
								<p className='text-sm'>No earlier posts</p>
							</div>
						</div>
					)}

					{nextPost ? (
						<Link
							href={`/posts/${nextPost.slug}`}
							className='group flex items-center justify-between py-2 px-3 bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-gray-700 dark:text-neutral-300 rounded transition-colors'
						>
							<div className='overflow-hidden'>
								<p className='text-sm truncate'>{nextPost.title}</p>
							</div>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-4 w-4 text-gray-500 dark:text-neutral-400 ml-2 flex-shrink-0'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={1.5}
									d='M9 5l7 7-7 7'
								/>
							</svg>
						</Link>
					) : (
						<div className='flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-neutral-800/50 text-gray-400 dark:text-neutral-500 rounded'>
							<div>
								<p className='text-sm'>No newer posts</p>
							</div>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-4 w-4 ml-2 opacity-50 flex-shrink-0'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={1.5}
									d='M9 5l7 7-7 7'
								/>
							</svg>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default PostDetails
