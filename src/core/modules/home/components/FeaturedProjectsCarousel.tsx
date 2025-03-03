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
  const ref = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLInputElement>
  const { events } = useDraggable(ref)

  // Create a duplicated array of projects for demo purposes
  const duplicatedProjects = [...projects, ...projects, ...projects, ...projects]

  return (
    <div className="overflow-hidden">
      <div
        ref={ref}
        {...events}
        className="flex gap-8 overflow-x-auto pt-4 pb-4 no-scrollbar"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {duplicatedProjects.map((item, index) => (
          <div 
            key={`${item.id}-${index}`}
            className="min-w-[calc(50%-16px)] w-[calc(50%-16px)] flex-shrink-0"
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
