import React from 'react'

import PageHeading from '@/core/common/components/elements/PageHeading'
import BlogCardNew from '@/core/modules/blog/components/BlogCardNew'
import { Page, Post } from '@/payload/payload-types'

interface Props {
  blogs: Post[]
  page: Page
}

const BlogListNew = (props: Props) => {
  const { page } = props

  return (
    <>
      <PageHeading title={page.title ?? ''} md={page.title} />

      <div className='grid gap-4 md:grid-cols-2'>
        {props.blogs.map((item) => (
          <BlogCardNew key={item.slug} blogItem={item} />
        ))}
      </div>
    </>
  )
}

export default BlogListNew
