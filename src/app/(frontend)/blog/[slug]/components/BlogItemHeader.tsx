'use client'

import * as React from 'react'
import Link from 'next/link'
import ImageZoom from '@/core/common/components/elements/ImageZoom'
import { BlurImage } from '@/core/common/components/elements/BlurImage'
import { Blog, R2Media } from '../../../../../payload/payload-types'

type HeaderProps = {
  blog: Blog
}

const Header = (props: HeaderProps) => {
  const { blog } = props
  const formattedDate = blog.createdAt

  const image = blog.image != null ? (blog.image as R2Media).url || '' : ''

  return (
    <div className='space-y-16 py-16'>
      <div className='space-y-16 sm:px-8'>
        <h1 className='font-title bg-gradient-to-b from-black via-black/90 to-black/70 to-90% bg-clip-text text-center text-4xl font-bold text-transparent dark:from-white dark:via-white/90 dark:to-white/70 md:text-5xl md:leading-[64px]'>
          {blog.title}
        </h1>
        <div className='grid grid-cols-2 text-sm max-md:gap-4 md:grid-cols-4'>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-muted-foreground'>Written by</div>
            <Link
              href='https://github.com/tszhong0411'
              className='flex items-center gap-2'
            >
              Hong
            </Link>
          </div>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-muted-foreground'>Published on</div>
            <div>{formattedDate}</div>
          </div>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-muted-foreground'>Views</div>
            -150 views
          </div>
          <div className='space-y-1 md:mx-auto'>
            <div className='text-muted-foreground'>Comments</div>
            -1 comments
          </div>
        </div>
      </div>
      <ImageZoom
        zoomImg={{
          src: image,
          alt: blog.title,
        }}
      >
        <BlurImage
          src={image}
          className='rounded-lg'
          width={1200}
          height={630}
          lazy={false}
          alt={blog.title ?? ''}
        />
      </ImageZoom>
    </div>
  )
}

export default Header
