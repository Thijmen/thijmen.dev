'use client'
import { motion } from 'framer-motion'
import React, { useRef } from 'react'
import { useDraggable } from 'react-use-draggable-scroll'
import { ProjectEntryFragmentFragment } from '@/__generated__/graphql'
import { FeaturedProjectItem } from '@/modules/home/components/FeaturedProjectItem'

interface Props {
  projects: ProjectEntryFragmentFragment[]
}

const FeaturedProjectsCarousel = (props: Props) => {
  const { projects } = props

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>
  const { events } = useDraggable(ref)

  const renderBlogCards = () => {
    return projects.map((item, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        className='min-w-[326px] gap-x-5'
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
