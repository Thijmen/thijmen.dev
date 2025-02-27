'use client'
import type { MyHomepagePostsBlock, Post } from '@/payload/payload-types'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

// Demo data
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
    //tags: ['TypeScript', 'Design Patterns', 'Enterprise'],
    createdAt: '2024-02-15T12:00:00Z',
    updatedAt: '2024-02-15T12:00:00Z',
  },
  {
    id: 3,
    title: 'Leading Technical Teams Through Digital Transformation',
    slug: 'leading-technical-teams',
    description:
      'Insights and strategies for technical leadership in modern software development teams.',
    // tags: ['Leadership', 'Team Management', 'Digital Transformation'],
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
  heading = 'Technical Leadership & Insights',
  subheading = 'Sharing knowledge and experiences in software architecture, team leadership, and engineering excellence',
  posts,
}) => {
  const cmsPosts = posts as Post[]

  const thePosts = [...cmsPosts, ...demoData]

  const tags = ['TypeScript', 'Design Patterns', 'Enterprise']
  return (
    <section className="py-12 space-y-8">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{heading}</h2>
        {subheading && (
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{subheading}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {thePosts.map((post, index) => (
          <motion.div
            key={post.slug}
            {...fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6 space-y-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                <Link
                  href={`/posts/${post.slug}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">{post.description}</p>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <time className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <Link
                  href={`/posts/${post.slug}`}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Read article
                  <svg
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
