import { getPosts } from '@/core/common/services/blogs.service'
import type { MyPostsBlock } from '@/payload/payload-types'

export const PostsBlock = async ({ block }: { block: MyPostsBlock }) => {
	const posts = await getPosts()
	return (
		<div className='w-full overflow-x-auto pb-4'>
			<div className='flex flex-col space-y-4 w-full'>
				{posts.map((post) => (
					<div
						key={post.slug}
						className='flex items-center space-x-4 w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-all'
					>
						<div className='w-24 h-24 flex-shrink-0'>
							<img
								src={'/images/placeholder.png'}
								alt={post.title}
								className='w-full h-full object-cover'
							/>
						</div>
						<div className='flex-grow p-4'>
							<h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								{post.title}
							</h2>
							<p className='text-sm text-gray-600 dark:text-gray-300 line-clamp-2'>
								{post.description}
							</p>
						</div>
					</div>
				))}
				{posts.map((post) => (
					<div
						key={post.slug}
						className='flex items-center space-x-4 w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden transition-all'
					>
						<div className='w-24 h-24 flex-shrink-0'>
							<img
								src={'/images/placeholder.png'}
								alt={post.title}
								className='w-full h-full object-cover'
							/>
						</div>
						<div className='flex-grow p-4'>
							<h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
								{post.title}
							</h2>
							<p className='text-sm text-gray-600 dark:text-gray-300 line-clamp-2'>
								{post.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
