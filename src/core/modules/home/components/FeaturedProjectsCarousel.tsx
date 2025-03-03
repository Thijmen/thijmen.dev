'use client'
import { FeaturedProjectItem } from '@/core/modules/home/components/FeaturedProjectItem'
import { motion } from 'framer-motion'
import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
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
	const [isPaused, setIsPaused] = useState(false)
	const [scrollPosition, setScrollPosition] = useState(0)

	// Create a duplicated array of projects for demo purposes
	const duplicatedProjects = [
		...projects,
		...projects,
		...projects,
		...projects,
	]

	// Auto-scroll function
	const autoScroll = useCallback(() => {
		if (ref.current && !isPaused) {
			// Calculate new scroll position with smooth looping
			const containerWidth = ref.current.scrollWidth
			const viewportWidth = ref.current.offsetWidth
			const maxScroll = containerWidth - viewportWidth

			// Increment scroll position
			let newPosition = scrollPosition + 1

			// Reset scroll position when reaching the end for smooth infinite loop
			if (newPosition >= maxScroll) {
				newPosition = 0
			}

			// Apply the scroll
			ref.current.scrollLeft = newPosition
			setScrollPosition(newPosition)
		}
	}, [isPaused, scrollPosition, ref])

	// Set up the animation interval
	useEffect(() => {
		const scrollInterval = setInterval(autoScroll, 30) // Adjust speed by changing interval
		return () => clearInterval(scrollInterval)
	}, [autoScroll])

	// Handle manual scroll interaction
	const handleScroll = () => {
		if (ref.current) {
			setScrollPosition(ref.current.scrollLeft)
		}
	}

	return (
		<div className='overflow-hidden'>
			<div
				ref={ref}
				{...events}
				className='flex gap-8 overflow-x-auto pt-4 pb-4 no-scrollbar'
				style={{
					scrollbarWidth: 'none',
					msOverflowStyle: 'none',
				}}
				onMouseEnter={() => setIsPaused(true)}
				onMouseLeave={() => setIsPaused(false)}
				onTouchStart={() => setIsPaused(true)}
				onTouchEnd={() => setIsPaused(false)}
				onScroll={handleScroll}
			>
				{duplicatedProjects.map((item, index) => (
					<div
						key={`${item.id}-${index}`}
						className='min-w-[calc(50%-16px)] w-[calc(50%-16px)] flex-shrink-0'
					>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<FeaturedProjectItem project={item} />
						</motion.div>
					</div>
				))}
			</div>
		</div>
	)
}

export default FeaturedProjectsCarousel
