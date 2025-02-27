'use client'
import type { MyHomepagePostsBlock, Post } from '@/payload/payload-types'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../../elements/SectionHeading'
import SectionSubHeading from '../../elements/SectionSubHeading'
import { BsArrowRightShort as ViewAllIcon } from 'react-icons/bs'

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
  const tags = ['TypeScript', 'Design Patterns', 'Enterprise']

  return (
    <section className="py-2">
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
      <div className="grid pt-4 grid-cols-1 lg:grid-cols-2 gap-8">
        {thePosts.map((post, index) => (
          <motion.article
            key={post.slug}
            {...fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/[0.07] via-purple-500/[0.07] to-pink-500/[0.07] dark:from-violet-400/[0.03] dark:via-purple-400/[0.03] dark:to-pink-400/[0.03] rounded-2xl transform transition-all duration-500 group-hover:scale-[1.02] group-hover:opacity-100 opacity-0 blur-sm" />
            <div
              className="relative bg-gradient-to-b from-white to-gray-50/80 dark:from-gray-900/60 dark:to-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-800/40 overflow-hidden transition-all duration-500 group-hover:border-gray-200 dark:group-hover:border-gray-700/60"
              style={{
                boxShadow: `
                  0 0 0 1px rgb(0 0 0 / 0.02),
                  0 2px 4px rgb(0 0 0 / 0.02),
                  0 4px 8px -2px rgb(0 0 0 / 0.02),
                  0 8px 16px -4px rgb(0 0 0 / 0.02)
                `,
              }}
            >
              <div className="relative p-6 space-y-4 bg-gradient-to-br from-transparent via-transparent to-gray-50/50 dark:from-transparent dark:via-gray-900/20 dark:to-gray-800/40">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[11px] font-medium tracking-wider uppercase bg-white/80 dark:bg-gray-800/80 text-gray-500 dark:text-gray-300 rounded-full ring-1 ring-gray-100 dark:ring-white/5 shadow-sm dark:shadow-none backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-base font-medium tracking-tight text-gray-800 dark:text-gray-100">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="relative inline-block group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors duration-300"
                  >
                    {post.title}
                  </Link>
                </h3>

                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-2">
                  {post.description}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-white/[0.04]">
                  <time className="text-xs tracking-wide text-gray-400 dark:text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="inline-flex items-center text-xs tracking-wide text-indigo-500 dark:text-indigo-300 font-medium group/link hover:text-indigo-600 dark:hover:text-indigo-200 transition-colors duration-300"
                  >
                    <span className="relative">
                      Read article
                      <span className="absolute inset-x-0 -bottom-0.5 h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-indigo-500/0 dark:from-indigo-300/0 dark:via-indigo-300/40 dark:to-indigo-300/0 transform origin-left scale-x-0 transition-transform duration-300 group-hover/link:scale-x-100" />
                    </span>
                    <svg
                      className="w-3.5 h-3.5 ml-1.5 transform transition-transform duration-300 group-hover/link:translate-x-1 opacity-70"
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
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
