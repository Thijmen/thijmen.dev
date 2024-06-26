import React from 'react'
import BlogCardNew from '@/modules/blog/components/BlogCardNew'
import PageHeading from '@/common/components/elements/PageHeading'
import { Blog, Page } from '../../../../payload-types'

interface Props {
  blogs: Blog[]
  page: Page
}

const BlogListNew = (props: Props) => {
  const { page } = props

  return (
    <>
      <PageHeading title={page.title ?? ''} md={page.content ?? ''} />

      <div className='grid gap-4 md:grid-cols-2'>
        {props.blogs.map((item) => (
          <BlogCardNew key={item.slug} blogItem={item} />
        ))}
      </div>
    </>
  )
}

export default BlogListNew
