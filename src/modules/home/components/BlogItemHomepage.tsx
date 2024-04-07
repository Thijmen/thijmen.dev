'use client'
import { BlogOverviewEntryFragmentFragment } from '@/__generated__/graphql'
import Link from 'next/link'
import { BlurImage } from '@/common/components/elements/BlurImage'
import { formatDate } from '@/common/helpers'

export const BlogItemHomepage = ({
  post,
}: {
  post: BlogOverviewEntryFragmentFragment
}) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className='shadow-feature-card dark:shadow-feature-card-dark group relative rounded-xl border-2 border-neutral-200 p-2'
    >
      <BlurImage
        width={1200}
        height={630}
        src={post.featuredImage[0]?.url || ''}
        alt={post.title || ''}
        className='rounded-lg'
      />
      <div className='flex items-center justify-between gap-2 px-2 pt-4 text-sm text-zinc-500'>
        {formatDate(post.dateCreated)}
        {/* @TODO: Store likes and views */}
        {/*<div className='flex gap-2'>*/}
        {/*  <div>10 likes</div>*/}
        {/*  <div>&middot;</div>*/}
        {/*  <div>100 views</div>*/}
        {/*</div>*/}
      </div>
      <div className='flex flex-col px-2 py-4 transition-transform ease-out group-hover:translate-x-0.5'>
        <h3 className='font-title text-2xl font-bold'>{post.title}</h3>
        <p className='mt-2 text-muted-foreground'>{post.description}</p>
      </div>
    </Link>
  )
}
