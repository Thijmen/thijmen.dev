'use client'
import { Card } from '@/core/common/components/elements/ContentCard'
import Link from 'next/link'
import type { Post } from '../../../../payload/payload-types'

interface PostCardProps {
  post: Post
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const variant = 'post'
  const tags = ['typescript', 'design patterns', 'enterprise'] // Example tags

  return (
    <Card href={`/posts/${post.slug}`} variant={variant}>
      <Card.Header variant={variant}>
        {/* Icon is already included in the Card.Header component */}
      </Card.Header>

      <Card.Content>
        <div>
          <Card.Label variant={variant}>LATEST POST</Card.Label>
          <Card.Title variant={variant}>{post.title}</Card.Title>
          <Card.Description>{post.description}</Card.Description>
        </div>

        <Card.Tags
          variant={variant}
          tags={tags}
        />

        <Card.Footer>
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
        </Card.Footer>
      </Card.Content>
    </Card>
  )
}

export default PostCard
