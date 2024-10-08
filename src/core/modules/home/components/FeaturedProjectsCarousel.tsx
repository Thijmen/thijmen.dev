'use client'
import { FeaturedProjectItem } from '@/core/modules/home/components/FeaturedProjectItem'
import { motion } from 'framer-motion'
import type React from 'react'
import { useRef } from 'react'
import { useDraggable } from 'react-use-draggable-scroll'
import type { Project } from '../../../../payload/payload-types'

interface Props {
	projects: Project[]
}

const FeaturedProjectsCarousel = (props: Props) => {
	const { projects } = props

	const ref = useRef<HTMLDivElement>(
		null,
	) as React.MutableRefObject<HTMLInputElement>

	const { events } = useDraggable(ref)

	const renderBlogCards = () => {
		return projects.map((item, index) => (
			<motion.div
				key={item.id}
				initial={{ opacity: 0, x: 100 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: -100 }}
				transition={{ duration: 0.5 }}
				// @ts-ignore
				className={'min-w-[326px] gap-x-5'}
			>
				<FeaturedProjectItem project={item} />
			</motion.div>
		))
	}

	return (
		<div
			className='scrollbar-hide flex gap-4 overflow-x-scroll p-1'
			{...events}
			ref={ref}
		>
			{renderBlogCards()}
		</div>
	)
}

export default FeaturedProjectsCarousel
