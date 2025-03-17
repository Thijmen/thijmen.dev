'use client'
import { Card } from '@/core/common/components/elements/ContentCard'
import { motion } from 'framer-motion'
import type { Post } from '../../../../payload/payload-types'

interface PostsVerticalListProps {
	posts: Post[]
}

const fadeInUp = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
}

const PostsVerticalList: React.FC<PostsVerticalListProps> = ({ posts }) => {
	return (
		<div className='space-y-8'>
			{posts.map((post) => (
				<motion.div
					key={post.slug}
					{...fadeInUp}
					initial='initial'
					whileInView='animate'
					viewport={{ once: true }}
					className='w-full'
				>
					<Card href={`/posts/${post.slug}`} variant='post' className='!h-auto'>
						<Card.Header variant='post'>
							{/* Icon is already included in the Card.Header component */}
						</Card.Header>

						<Card.Content>
							<div>
								<Card.Label variant='post'>POST</Card.Label>
								<Card.Title variant='post'>{post.title}</Card.Title>
								<Card.Description>{post.description}</Card.Description>
							</div>

							{post.tags && post.tags.length > 0 && (
								<Card.Tags
									variant='post'
									tags={post.tags.map((tag) => {
										if (typeof tag === 'object' && tag !== null) {
											return {
												slug: tag.slug || '',
												name: tag.name || '',
											}
										}
										return {
											slug: String(tag),
											name: String(tag),
										}
									})}
								/>
							)}

							<Card.Footer>
								<time className='text-xs tracking-wide text-neutral-500 dark:text-neutral-500 font-mono'>
									{new Date(post.createdAt).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'short',
										day: 'numeric',
									})}
								</time>
								<span className='inline-flex items-center text-xs tracking-wide text-indigo-600 dark:text-indigo-400 font-medium group/link'>
									Read article
									<svg
										className='w-3.5 h-3.5 ml-1.5 transform transition-transform duration-300 group-hover/link:translate-x-1 opacity-80'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={1.5}
											d='M14 5l7 7m0 0l-7 7m7-7H3'
										/>
									</svg>
								</span>
							</Card.Footer>
						</Card.Content>
					</Card>
				</motion.div>
			))}
		</div>
	)
}

export default PostsVerticalList
