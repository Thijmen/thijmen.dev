import type { MyPostsBlock } from '@/payload/payload-types'
import Link from 'next/link'

// Demo data
const demoData = [
	{
		id: '1',
		title: 'Getting Started with React',
		slug: 'getting-started-with-react',
		excerpt: 'Learn the basics of React and start building your first app.',
		featuredImage: {
			url: 'https://example.com/react-image.jpg',
			alt: 'React logo',
		},
		publishedAt: '2023-06-01T12:00:00Z',
	},
	{
		id: '2',
		title: 'Advanced TypeScript Techniques',
		slug: 'advanced-typescript-techniques',
		excerpt: 'Dive deep into TypeScript and learn advanced concepts.',
		featuredImage: {
			url: 'https://example.com/typescript-image.jpg',
			alt: 'TypeScript logo',
		},
		publishedAt: '2023-06-15T14:30:00Z',
	},
	{
		id: '3',
		title: 'Building Scalable Node.js Applications',
		slug: 'building-scalable-nodejs-applications',
		excerpt:
			'Learn how to build and scale Node.js applications for production.',
		featuredImage: {
			url: 'https://example.com/nodejs-image.jpg',
			alt: 'Node.js logo',
		},
		publishedAt: '2023-07-01T09:15:00Z',
	},
]

export const PostsBlock = ({ block }: { block: MyPostsBlock }) => {
	const posts = demoData

	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
			{posts.map((post) => (
				<div
					key={post.id}
					className='bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row'
				>
					{/* {post.featuredImage && (
						<div className='md:w-1/3'>
							<Image
								src={post.featuredImage.url}
								alt={post.featuredImage.alt || post.title}
								width={300}
								height={200}
								className='w-full h-48 md:h-full object-cover'
							/>
						</div>
					)} */}
					<div className='p-4 md:w-2/3'>
						<h3 className='text-xl font-semibold mb-2'>
							<Link
								href={`/blog/${post.slug}`}
								className='text-blue-600 dark:text-blue-400 hover:underline'
							>
								{post.title}
							</Link>
						</h3>
						<p className='text-gray-600 dark:text-gray-300 mb-4'>
							{post.excerpt}
						</p>
						<div className='flex justify-between items-center text-sm text-gray-500 dark:text-gray-400'>
							<span>{new Date(post.publishedAt).toLocaleDateString()}</span>
							<Link
								href={`/blog/${post.slug}`}
								className='text-blue-600 dark:text-blue-400 hover:underline'
							>
								Read more
							</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
