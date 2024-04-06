'use client'
import { BlogOverviewEntryFragmentFragment } from '@/__generated__/graphql'
import SectionHeading from '@/common/components/elements/SectionHeading'
import { motion } from 'framer-motion'
import { BlogItemHomepage } from '@/modules/home/components/BlogItemHomepage'

export const LatestBlogs = ({
  posts,
}: {
  posts: BlogOverviewEntryFragmentFragment[]
}) => {
  return (
    <section className='space-y-5'>
      <div className='space-y-3'>
        <SectionHeading title={'Latest Blog Posts'} />
        <p className='leading-[1.8] text-neutral-800 dark:text-neutral-300 md:leading-loose'>
          Take a look at my latest blog posts. They usually go about{' '}
          <em>techy</em> stuff, but bear in mind; I'm not the best writer, so
          keep that in mind 😁.
        </p>
      </div>

      <motion.div
        className='mt-12 grid gap-4 md:grid-cols-2'
        initial={{
          y: 40,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        {posts.map((post) => (
          <BlogItemHomepage post={post} key={post.slug} />
        ))}
      </motion.div>
    </section>
  )
}
