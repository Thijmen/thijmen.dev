'use client'
import { useState } from 'react'
import { calculateReadingTime } from '@/core/common/helpers'
import { BlurImage } from '@/core/common/components/elements/BlurImage'
import { Post, R2Media } from '../../../../payload/payload-types'

const BlogCardNew = ({ blogItem }: { blogItem: Post }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const readingTimeMinutes = calculateReadingTime('@TODO: fixme') ?? 0
  const tagList = []

  const defaultImage = '/images/placeholder.png'

  const image =
    blogItem.image != null
      ? (blogItem.image as R2Media).url || defaultImage
      : defaultImage
  const slideDownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <a
      href={`/blog/${blogItem.slug}`}
      className='shadow-feature-card dark:shadow-feature-card-dark group relative rounded-xl border-2 border-neutral-200 p-2 dark:border-neutral-500'
    >
      <BlurImage
        src={image}
        className='rounded-lg'
        width={1200}
        height={630}
        imageClassName='transition-transform group-hover:scale-105'
        alt={blogItem.title}
      />
      <div className='flex items-center justify-between gap-2 px-2 pt-4 text-sm text-zinc-500'>
        TODO Date
        <div className='flex gap-2'>
          5 likes TODO
          <div>&middot;</div>5 Views TODO
        </div>
      </div>
      <div className='flex flex-col px-2 py-4'>
        <h3 className='font-title text-2xl font-bold'>{blogItem.title}</h3>
        <p className='mt-2 text-muted-foreground'>{blogItem.description}</p>
      </div>
    </a>
  )
}

export default BlogCardNew
