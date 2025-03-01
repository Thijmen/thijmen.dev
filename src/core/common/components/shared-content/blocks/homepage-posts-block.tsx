'use client'
import type { MyHomepagePostsBlock, Post } from '@/payload/payload-types'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../../elements/SectionHeading'
import SectionSubHeading from '../../elements/SectionSubHeading'
import { BsArrowRightShort as ViewAllIcon } from 'react-icons/bs'
import Card from '@/core/common/components/elements/Card'
import { VscBook as BookIcon } from 'react-icons/vsc'

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
      <div className="grid pt-4 grid-cols-1 lg:grid-cols-2 gap-8">
        {thePosts.map((post, index) => (
          <motion.div
            key={post.slug}
            {...fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Link href={`/posts/${post.slug}`}>
              <Card className="group relative flex h-[400px] w-full flex-col rounded-lg border transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-indigo-500/20 dark:border-neutral-800 overflow-hidden">
                {/* Header section with gradient background */}
                <div
                  className="relative rounded-t-lg duration-500"
                  style={{
                    height: '200px',
                    overflow: 'hidden',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-90 transition-opacity duration-300" />
                  
                  {/* Decorative pattern overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.svg')] bg-repeat bg-center" />
                  
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800/80 backdrop-blur-sm text-indigo-400 transition-transform duration-300 group-hover:scale-110">
                      <BookIcon size={18} />
                    </div>
                  </div>
                </div>

                {/* Content section */}
                <div className="flex flex-col justify-between p-5 flex-grow bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
                  <div>
                    <div className="mb-2 inline-block rounded-sm bg-indigo-500 px-2 py-0.5 text-[10px] font-medium text-white">
                      LATEST POST
                    </div>
                    <h3 className="font-sora text-xl font-semibold text-neutral-800 dark:text-neutral-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 line-clamp-3">
                      {post.description}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="mb-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 font-mono">
                      // TOPICS
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tags.map((tag) => (
                        <div
                          key={tag}
                          className="rounded-md bg-neutral-200 dark:bg-neutral-800 px-2.5 py-1 font-mono text-xs text-neutral-700 dark:text-neutral-300 border-l-2 border-indigo-500 transition-transform duration-200 hover:scale-105"
                        >
                          {tag.toLowerCase()}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 border-t border-neutral-200 dark:border-neutral-800">
                      <time className="text-xs tracking-wide text-neutral-500 dark:text-neutral-500 font-mono">
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                      <span className="inline-flex items-center text-xs tracking-wide text-indigo-600 dark:text-indigo-400 font-medium group/link">
                        Read article
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
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -left-6 top-20 h-12 w-12 rounded-full bg-gradient-to-r from-indigo-400 to-blue-500 opacity-40 blur-xl"></div>
                <div className="absolute -right-6 bottom-20 h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 opacity-40 blur-xl"></div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
