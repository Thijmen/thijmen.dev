'use client'
import type { MyHomepagePostsBlock, Post } from '@/payload/payload-types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import type React from 'react'
import { BsArrowRightShort as ViewAllIcon } from 'react-icons/bs'
import SectionHeading from '../../elements/SectionHeading'
import SectionSubHeading from '../../elements/SectionSubHeading'

const demoData: Post[] = [
  {
    id: 1,
    title: 'Building Scalable Microservices Architecture',
    slug: 'building-scalable-microservices',
    description:
      'An in-depth exploration of designing and implementing microservices at scale, featuring real-world examples and best practices.',
    createdAt: '2024-02-15T12:00:00Z',
    updatedAt: '2024-02-15T12:00:00Z',
  },
  {
    id: 2,
    title: 'Advanced TypeScript Design Patterns',
    slug: 'advanced-typescript-patterns',
    description:
      'Deep dive into enterprise-level TypeScript patterns, focusing on maintainability and type safety in large applications.',
    createdAt: '2024-02-15T12:00:00Z',
    updatedAt: '2024-02-15T12:00:00Z',
  },
  {
    id: 3,
    title: 'Leading Technical Teams Through Digital Transformation',
    slug: 'leading-technical-teams',
    description:
      'Insights and strategies for technical leadership in modern software development teams.',
    createdAt: '2024-01-05T09:15:00Z',
    updatedAt: '2024-01-05T09:15:00Z',
  },
  {
    id: 4,
    title: 'Leading Technical Teams Through Digital Transformation',
    slug: 'leading-technical-teams2',
    description:
      'Insights and strategies for technical leadership in modern software development teams.',
    createdAt: '2024-01-05T09:15:00Z',
    updatedAt: '2024-01-05T09:15:00Z',
  },
  {
    id: 5,
    title: 'Building Scalable Microservices Architecture',
    slug: 'building-scalable-microservices1',
    description:
      'An in-depth exploration of designing and implementing microservices at scale, featuring real-world examples and best practices.',
    createdAt: '2024-02-15T12:00:00Z',
    updatedAt: '2024-02-15T12:00:00Z',
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export const HomepagePostsBlock: React.FC<MyHomepagePostsBlock> = ({
  heading,
  linkHref,
  linkTitle,
  subheading,
  posts,
}) => {
  const cmsPosts = (posts ?? []) as Post[]
  const thePosts = [...cmsPosts, ...demoData]
  const tags = ['typescript', 'design patterns', 'enterprise']

  return (
    <section className="py-2 space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeading title={heading} className="ml-1" />
        <SectionSubHeading>
          <Link href={linkHref || '/'}>
            <div className="mt-1 flex cursor-pointer gap-1 text-sm text-neutral-700 transition-all duration-300 hover:gap-3 hover:text-neutral-700 dark:text-neutral-400 hover:dark:text-neutral-300">
              <div className="flex">
                {/* biome-ignore lint/security/noDangerouslySetInnerHtml: is my own input, can be trusted */}
                <p dangerouslySetInnerHTML={{ __html: linkTitle || '' }} />
              </div>
              <ViewAllIcon size={22} />
            </div>
          </Link>
        </SectionSubHeading>
      </div>
      <div className="grid pt-4 grid-cols-1 sm:grid-cols-2 gap-8">
        {thePosts.map((post) => (
          <motion.div
            key={post.slug}
            {...fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <article className="group flex flex-col h-[380px] overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-md hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300">
              {/* Card Header - REDUCED HEIGHT */}
              <header style={{ height: '60px' }} className="relative overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-90" />
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.svg')] bg-repeat bg-center" />
                {/* Icon */}
                <div className="absolute top-3 right-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800/80 backdrop-blur-sm text-indigo-400 transition-transform duration-300 group-hover:scale-110">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                  </div>
                </div>
              </header>

              {/* Card Content */}
              <div className="flex flex-col justify-between flex-grow p-5 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
                <div>
                  {/* Label */}
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 mb-3">
                    LATEST POST
                  </div>

                  {/* Title with fixed height */}
                  <h3 className="font-sora text-xl font-semibold text-neutral-800 dark:text-neutral-100 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-2 h-[56px]">
                    {post.title}
                  </h3>

                  {/* Description with fixed height */}
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 line-clamp-3 h-[72px]">
                    {post.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3 mb-4">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-mono bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-l-2 border-indigo-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-200 dark:border-neutral-800">
                  <time className="text-xs tracking-wide text-neutral-500 dark:text-neutral-500 font-mono">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="inline-flex items-center text-xs tracking-wide text-indigo-600 dark:text-indigo-400 font-medium group/link"
                  >
                    Read article here
                    <svg
                      className="w-3.5 h-3.5 ml-1.5 transform transition-transform duration-300 group-hover/link:translate-x-1 opacity-80"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Decorative glowing elements */}
              <div className="absolute -left-6 top-20 h-12 w-12 rounded-full bg-gradient-to-r from-indigo-400 to-blue-500 opacity-40 blur-xl" />
              <div className="absolute -right-6 bottom-20 h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 opacity-40 blur-xl" />
            </article>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
