'use client'

import type { Post, Tag } from '@/payload/payload-types'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import PostsGrid from './PostsGrid'

interface PostsListProps {
	initialPosts: Post[]
	allTags: Tag[]
}

// Create a client component that uses useSearchParams
const PostsListClient: React.FC<PostsListProps> = ({
	initialPosts,
	allTags,
}) => {
	const router = useRouter()
	const searchParams = useSearchParams()

	// Initialize selected tags from URL
	const [selectedTags, setSelectedTags] = useState<string[]>(() => {
		const tagsParam = searchParams.get('tags')
		return tagsParam ? tagsParam.split(',') : []
	})

	const [filteredPosts, setFilteredPosts] = useState<Post[]>(initialPosts)

	// Filter posts when selected tags change
	useEffect(() => {
		if (selectedTags.length === 0) {
			setFilteredPosts(initialPosts)
			return
		}

		const filtered = initialPosts.filter((post) => {
			if (!post.tags || post.tags.length === 0) return false

			// Check if post has at least one of the selected tags
			return post.tags.some((tag) => {
				const tagObj = tag as Tag
				return selectedTags.includes(tagObj.slug || '')
			})
		})

		setFilteredPosts(filtered)
	}, [selectedTags, initialPosts])

	// Update URL when selected tags change
	useEffect(() => {
		const params = new URLSearchParams(searchParams.toString())

		if (selectedTags.length === 0) {
			params.delete('tags')
		} else {
			params.set('tags', selectedTags.join(','))
		}

		// Update the URL without refreshing the page
		const newUrl = params.toString() ? `?${params.toString()}` : ''
		router.push(`/posts${newUrl}`, { scroll: false })
	}, [selectedTags, router, searchParams])

	// Toggle tag selection
	const toggleTag = (tagSlug: string) => {
		setSelectedTags((prev) =>
			prev.includes(tagSlug)
				? prev.filter((t) => t !== tagSlug)
				: [...prev, tagSlug],
		)
	}

	// Clear all selected tags
	const clearTags = () => {
		setSelectedTags([])
	}

	return (
		<div className='space-y-6'>
			{/* Tags filter */}
			<div className='mb-8'>
				<div className='flex items-center justify-between mb-3'>
					<h3 className='text-lg font-medium text-gray-800 dark:text-neutral-200'>
						Filter by tags
					</h3>
					{selectedTags.length > 0 && (
						<button
							type='button'
							onClick={clearTags}
							className='text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors'
						>
							Clear all filters
						</button>
					)}
				</div>
				<div className='flex flex-wrap gap-2'>
					{allTags.map((tag) => (
						<button
							type='button'
							key={tag.id}
							onClick={() => toggleTag(tag.slug || '')}
							className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
								selectedTags.includes(tag.slug || '')
									? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
									: 'bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-700 border border-transparent'
							}`}
						>
							{tag.name}
						</button>
					))}
				</div>
			</div>

			{/* Results count */}
			<div className='text-sm text-gray-600 dark:text-neutral-400 mb-4'>
				{filteredPosts.length === 0 ? (
					<p>
						No posts match your selected filters. Try selecting different tags.
					</p>
				) : (
					<p>
						Showing {filteredPosts.length}{' '}
						{filteredPosts.length === 1 ? 'post' : 'posts'}
					</p>
				)}
			</div>

			{/* Posts grid with animation */}
			<AnimatePresence mode='wait'>
				<motion.div
					key={selectedTags.join(',')}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
				>
					{filteredPosts.length > 0 ? (
						<PostsGrid posts={filteredPosts} />
					) : (
						<div className='py-12 text-center'>
							<p className='text-gray-500 dark:text-neutral-400'>
								No posts found with the selected tags.
							</p>
							<button
								type='button'
								onClick={clearTags}
								className='mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors'
							>
								Clear filters
							</button>
						</div>
					)}
				</motion.div>
			</AnimatePresence>
		</div>
	)
}

// Create a wrapper component with Suspense
const PostsList: React.FC<PostsListProps> = (props) => {
	return (
		<Suspense fallback={<div>Loading posts...</div>}>
			<PostsListClient {...props} />
		</Suspense>
	)
}

export default PostsList
