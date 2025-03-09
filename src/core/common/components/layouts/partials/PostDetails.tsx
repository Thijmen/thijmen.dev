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
		<div className='mt-6 px-4 py-3 text-sm bg-gradient-to-br from-neutral-900/80 to-indigo-950/80 backdrop-blur-sm rounded-lg border border-indigo-500/20'>
			<h3 className='font-semibold text-neutral-100 mb-4 text-base'>
				Post Details
			</h3>

			{/* Created Date */}
			<div className='mb-4 pl-3 py-1 border-l-2 border-indigo-500'>
				<p className='text-xs uppercase tracking-wider font-medium text-indigo-300 mb-1'>
					Published
				</p>
				<p className='text-neutral-200 font-medium'>
					{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
				</p>
			</div>

			{/* Tags */}
			{post.tags && post.tags.length > 0 && (
				<div className='mb-4 pl-3 py-1 border-l-2 border-teal-500'>
					<p className='text-xs uppercase tracking-wider font-medium text-teal-300 mb-2'>
						Tags
					</p>
					<div className='flex flex-wrap gap-2'>
						{(post.tags as Tag[]).map((tag) => (
							<Link
								key={tag.slug ?? tag.id}
								href={`/tags/${tag.slug}`}
								className='inline-flex items-center px-3 py-1 text-xs font-medium bg-neutral-800/70 hover:bg-neutral-700/70 text-neutral-200 rounded-md transition-colors border border-neutral-700 hover:border-teal-500'
							>
								<span className='w-1.5 h-1.5 rounded-full bg-teal-500 mr-1.5' />
								{tag.name}
							</Link>
						))}
					</div>
				</div>
			)}

			{/* Reading Time */}
			<div className='mb-4 pl-3 py-1 border-l-2 border-amber-500'>
				<p className='text-xs uppercase tracking-wider font-medium text-amber-300 mb-1'>
					Reading time
				</p>
				<div className='flex items-center'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-4 w-4 text-amber-500 mr-1.5'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
					<p className='text-neutral-200 font-medium'>5 min read</p>
				</div>
			</div>

			{/* Post Navigation */}
			<div className='mb-4 pl-3 py-1 border-l-2 border-purple-500'>
				<p className='text-xs uppercase tracking-wider font-medium text-purple-300 mb-2'>
					Navigation
				</p>
				<div className='space-y-2'>
					{prevPost ? (
						<Link
							href={`/posts/${prevPost.slug}`}
							className='group flex items-center py-2 px-3 bg-neutral-800/70 hover:bg-neutral-700/70 text-neutral-200 rounded-md transition-all border border-neutral-700 hover:border-purple-500'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-4 w-4 text-purple-500 mr-2 transition-transform group-hover:-translate-x-1'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M15 19l-7-7 7-7'
								/>
							</svg>
							<div className='overflow-hidden'>
								<p className='text-xs text-purple-300'>Previous</p>
								<p className='text-sm truncate'>{prevPost.title}</p>
							</div>
						</Link>
					) : (
						<div className='flex items-center py-2 px-3 bg-neutral-800/30 text-neutral-500 rounded-md border border-neutral-800'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-4 w-4 mr-2 opacity-50'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M15 19l-7-7 7-7'
								/>
							</svg>
							<div>
								<p className='text-xs'>Previous</p>
								<p className='text-sm'>No earlier posts</p>
							</div>
						</div>
					)}

					{nextPost ? (
						<Link
							href={`/posts/${nextPost.slug}`}
							className='group flex items-center justify-between py-2 px-3 bg-neutral-800/70 hover:bg-neutral-700/70 text-neutral-200 rounded-md transition-all border border-neutral-700 hover:border-purple-500'
						>
							<div className='overflow-hidden'>
								<p className='text-xs text-purple-300'>Next</p>
								<p className='text-sm truncate'>{nextPost.title}</p>
							</div>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-4 w-4 text-purple-500 ml-2 transition-transform group-hover:translate-x-1'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M9 5l7 7-7 7'
								/>
							</svg>
						</Link>
					) : (
						<div className='flex items-center justify-between py-2 px-3 bg-neutral-800/30 text-neutral-500 rounded-md border border-neutral-800'>
							<div>
								<p className='text-xs'>Next</p>
								<p className='text-sm'>No newer posts</p>
							</div>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-4 w-4 ml-2 opacity-50'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M9 5l7 7-7 7'
								/>
							</svg>
						</div>
					)}
				</div>
			</div>

			{/* Share Links */}
			<div className='mt-6 pt-4 border-t border-neutral-700'>
				<p className='text-xs uppercase tracking-wider font-medium text-neutral-400 mb-2'>
					Share
				</p>
				<div className='flex gap-2'>
					<a
						href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://thijmen.dev/posts/${post.slug}`)}`}
						target='_blank'
						rel='noopener noreferrer'
						className='p-2 rounded-md bg-neutral-800/70 hover:bg-neutral-700/70 text-neutral-300 hover:text-neutral-100 transition-colors border border-neutral-700 hover:border-indigo-500'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							fill='currentColor'
							viewBox='0 0 16 16'
						>
							<path d='M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z' />
						</svg>
					</a>
					<a
						href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://thijmen.dev/posts/${post.slug}`)}`}
						target='_blank'
						rel='noopener noreferrer'
						className='p-2 rounded-md bg-neutral-800/70 hover:bg-neutral-700/70 text-neutral-300 hover:text-neutral-100 transition-colors border border-neutral-700 hover:border-indigo-500'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							fill='currentColor'
							viewBox='0 0 16 16'
						>
							<path d='M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z' />
						</svg>
					</a>
					<a
						href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`Check out this article: https://thijmen.dev/posts/${post.slug}`)}`}
						className='p-2 rounded-md bg-neutral-800/70 hover:bg-neutral-700/70 text-neutral-300 hover:text-neutral-100 transition-colors border border-neutral-700 hover:border-indigo-500'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='16'
							height='16'
							fill='currentColor'
							viewBox='0 0 16 16'
						>
							<path d='M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z' />
						</svg>
					</a>
				</div>
			</div>
		</div>
	)
}

export default PostDetails
