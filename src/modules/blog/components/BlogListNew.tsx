import {
  BlogOverviewEntryFragmentFragment,
  PagesDocumentEntryFragment,
} from '@/__generated__/graphql'
import React from 'react'
import BlogCardNew from '@/modules/blog/components/BlogCardNew'
import PageHeading from '@/common/components/elements/PageHeading'

interface Props {
  blogs: BlogOverviewEntryFragmentFragment[]
  page: PagesDocumentEntryFragment
}

const BlogListNew = (props: Props) => {
  const { page } = props

  return (
    <>
      <PageHeading title={page.title ?? ''} md={page.doxterContent ?? ''} />

      <div className='grid gap-4 md:grid-cols-2'>
        {props.blogs.map((item: BlogOverviewEntryFragmentFragment) => (
          <BlogCardNew key={item.slug} blogItem={item} />
        ))}
      </div>
    </>
  )
}

export default BlogListNew
