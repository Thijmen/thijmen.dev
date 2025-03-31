'use client'
import { motion } from 'framer-motion'
import type { Post } from '../../../../payload/payload-types'
import PostCard from './PostCard'

interface PostsGridProps {
	posts: Post[]
}

const fadeInUp = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.5 },
}

const PostsGrid: React.FC<PostsGridProps> = ({ posts }) => {
	return (
		<div className='grid pt-4 grid-cols-1 sm:grid-cols-2 gap-8'>
			{posts.map((post) => (
				<motion.div
					key={post.slug}
					{...fadeInUp}
					initial='initial'
					whileInView='animate'
					viewport={{ once: true }}
				>
					<PostCard post={post} />
				</motion.div>
			))}
		</div>
	)
}

export default PostsGrid
