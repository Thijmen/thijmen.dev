'use client'
import { Card } from '@/core/common/components/elements/ContentCard'
import type { MyHomepagePostsBlock, Post } from '@/payload/payload-types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import type React from 'react'
import { BsArrowRightShort as ViewAllIcon } from 'react-icons/bs'
import SectionHeading from '../../elements/SectionHeading'
import SectionSubHeading from '../../elements/SectionSubHeading'

const fadeInUp = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
}

export const HomepagePostsBlock: React.FC<MyHomepagePostsBlock> = ({
	heading,
	linkHref,
	linkTitle,
	subheading,
	posts,
}) => {
	const cmsPosts = (posts ?? []) as Post[]
	const tags = ['typescript', 'design patterns', 'enterprise']

	return (
		<section className='py-2 space-y-6'>
			<div className='flex items-center justify-between'>
				<SectionHeading title={heading} className='ml-1' />
				<SectionSubHeading>
					<Link href={linkHref || '/'}>
						<div className='mt-1 flex cursor-pointer gap-1 text-sm text-neutral-700 transition-all duration-300 hover:gap-3 hover:text-neutral-700 dark:text-neutral-400 hover:dark:text-neutral-300'>
							<div className='flex'>
								{/* biome-ignore lint/security/noDangerouslySetInnerHtml: is my own input, can be trusted */}
								<p dangerouslySetInnerHTML={{ __html: linkTitle || '' }} />
							</div>
							<ViewAllIcon size={22} />
						</div>
					</Link>
				</SectionSubHeading>
			</div>
			<div className='grid pt-4 grid-cols-1 sm:grid-cols-2 gap-8'>
				{cmsPosts.map((post) => (
					<motion.div
						key={post.slug}
						{...fadeInUp}
						initial='initial'
						whileInView='animate'
						viewport={{ once: true }}
					>
						<Card href={`/posts/${post.slug}`} variant='post'>
							<Card.Header variant='post'>
								{/* Icon is already included in the Card.Header component */}
							</Card.Header>

							<Card.Content>
								<div>
									<Card.Label variant='post'>LATEST POST</Card.Label>
									<Card.Title variant='post'>{post.title}</Card.Title>
									<Card.Description>{post.description}</Card.Description>
								</div>

								<Card.Tags variant='post' tags={tags} />

								<Card.Footer>
									<time className='text-xs tracking-wide text-neutral-500 dark:text-neutral-500 font-mono'>
										{new Date(post.createdAt).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'short',
											day: 'numeric',
										})}
									</time>
									<div className='inline-flex items-center text-xs tracking-wide text-indigo-600 dark:text-indigo-400 font-medium group/link'>
										Read article here
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
									</div>
								</Card.Footer>
							</Card.Content>
						</Card>
					</motion.div>
				))}
			</div>
		</section>
	)
}
