'use client'
import { motion } from 'framer-motion'

import SectionHeading from '@/core/common/components/elements/SectionHeading'
import { BlogItemHomepage } from '@/core/modules/home/components/BlogItemHomepage'
import type { Post } from '@/payload/payload-types'

export const LatestBlogs = ({ posts }: { posts: Post[] }) => {
	return (
		<section className='space-y-5'>
			<div className='space-y-3'>
				<SectionHeading title='Latest Blog Posts' />
				<p className='leading-[1.8] text-neutral-800 dark:text-neutral-300 md:leading-loose'>
					Take a look at my latest blog posts. They usually go about{' '}
					<em>techy</em> stuff, but bear in mind; I'm not the best writer, so
					keep that in mind 😁.
				</p>
			</div>

			<motion.div
				// @ts-ignore
				className='mt-12 grid gap-4 md:grid-cols-2'
				initial={{
					y: 40,
					opacity: 0,
				}}
				animate={{
					y: 0,
					opacity: 1,
				}}
				transition={{
					duration: 0.3,
				}}
			>
				{posts.map((post) => (
					<BlogItemHomepage post={post} key={post.slug} />
				))}
			</motion.div>
		</section>
	)
}
