'use client'

import { motion, useScroll } from 'framer-motion'

export const BlogProgress = () => {
	const { scrollYProgress } = useScroll()

	return (
		<motion.div
			// @ts-ignore
			className='fixed inset-x-0 top-0 h-1 origin-[0%] bg-foreground'
			style={{
				scaleX: scrollYProgress,
			}}
		/>
	)
}
