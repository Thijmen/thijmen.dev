import { PayloadRedirects } from '@/core/common/components/PayloadRedirects'
import Container from '@/core/common/components/elements/Container'
import Layout from '@/core/common/components/layouts'
import PostDetails from '@/core/common/components/layouts/partials/PostDetails'
import { RichText } from '@/core/common/components/shared-content'
import { getMenuItems } from '@/core/services/menu'
import type { Post } from '@/payload/payload-types'
import { generateMeta } from '@/payload/utilities/generateMeta'
import configPromise from '@payload-config'
import { formatDistanceToNow } from 'date-fns'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import { getPayload } from 'payload'
import { cache } from 'react'

// Mock data for development and fallback
const mockPost: Post = {
	id: 1,
	title: 'Building a Modern Web Application with Next.js and TypeScript',
	description:
		'Learn how to create a fast, SEO-friendly web application using Next.js 14 and TypeScript with best practices for performance and developer experience.',
	slug: 'building-modern-web-app-nextjs-typescript',
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
	tags: [
		{ id: 1, name: 'Next.js', slug: 'nextjs', createdAt: '', updatedAt: '' },
		{
			id: 2,
			name: 'TypeScript',
			slug: 'typescript',
			createdAt: '',
			updatedAt: '',
		},
		{
			id: 3,
			name: 'Web Development',
			slug: 'web-development',
			createdAt: '',
			updatedAt: '',
		},
	],
	image: {
		id: 1,
		url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
		createdAt: '',
		updatedAt: '',
	},
	dynamiccontent: {
		root: {
			type: 'root',
			children: [
				{
					type: 'paragraph',
					children: [
						{
							text: 'Next.js is a powerful React framework that enables you to build server-rendered applications with ease. Combined with TypeScript, it provides a robust development experience with static typing and improved tooling.',
							type: 'text',
						},
					],
					direction: 'ltr',
					format: '',
					indent: 0,
					version: 1,
				},
				{
					type: 'heading',
					tag: 'h2',
					children: [
						{
							text: 'Getting Started',
							type: 'text',
						},
					],
					direction: 'ltr',
					format: '',
					indent: 0,
					version: 1,
				},
				{
					type: 'paragraph',
					children: [
						{
							text: 'To get started with Next.js and TypeScript, you can use the create-next-app CLI tool which sets up everything automatically for you:',
							type: 'text',
						},
					],
					direction: 'ltr',
					format: '',
					indent: 0,
					version: 1,
				},
				{
					type: 'paragraph',
					children: [
						{
							text: 'npx create-next-app@latest my-app --typescript',
							type: 'text',
						},
					],
					direction: 'ltr',
					format: '',
					indent: 0,
					version: 1,
				},
				{
					type: 'heading',
					tag: 'h2',
					children: [
						{
							text: 'Key Features',
							type: 'text',
						},
					],
					direction: 'ltr',
					format: '',
					indent: 0,
					version: 1,
				},
				{
					type: 'paragraph',
					children: [
						{
							text: 'Next.js provides several key features that make it an excellent choice for modern web development:',
							type: 'text',
						},
					],
					direction: 'ltr',
					format: '',
					indent: 0,
					version: 1,
				},
				{
					type: 'paragraph',
					children: [
						{
							text: '• Server-side rendering (SSR) for improved SEO and initial load performance',
							type: 'text',
						},
					],
					direction: 'ltr',
					format: '',
					indent: 0,
					version: 1,
				},
				{
					type: 'paragraph',
					children: [
						{
							text: '• Static site generation (SSG) for blazing-fast page loads',
							type: 'text',
						},
					],
					direction: 'ltr',
					format: '',
					indent: 0,
					version: 1,
				},
				{
					type: 'paragraph',
					children: [
						{
							text: '• Incremental Static Regeneration (ISR) for updating static content',
							type: 'text',
						},
					],
					direction: 'ltr',
					format: '',
					indent: 0,
					version: 1,
				},
				{
					type: 'paragraph',
					children: [
						{
							text: '• API routes for building backend functionality',
							type: 'text',
						},
					],
					direction: 'ltr',
					format: '',
					indent: 0,
					version: 1,
				},
			],
			direction: 'ltr',
			format: '',
			indent: 0,
			version: 1,
		},
	},
}

type Args = {
	params: Promise<{
		slug: string
	}>
}

export default async function Page({ params: paramsPromise }: Args) {
	const { slug } = await paramsPromise

	const post: Post | null = await queryPostBySlug({
		slug,
	})

	// Use mock data if no post is found (for development or preview)
	const postData = post

	if (!post) {
		// In production, redirect if no post is found
		if (process.env.NODE_ENV === 'production') {
			return <PayloadRedirects url={slug} />
		}
		// In development, show a note that we're using mock data
		console.log('Using mock data for post:', slug)
	}

	const nav = await getMenuItems()
	const adjacentPosts = await getAdjacentPosts(postData)

	return (
		<Layout
			navGlobal={nav}
			sidebarContent={
				<PostDetails
					post={postData}
					prevPost={adjacentPosts.prev}
					nextPost={adjacentPosts.next}
				/>
			}
		>
			<div
				style={{ zIndex: 1, position: 'relative' }}
				className='mt-[80px] md:mt-0'
			>
				<Container data-aos={'fade-up'}>
					<article className='max-w-3xl mx-auto'>
						{/* Featured Image */}
						{postData.image && (
							<div className='relative w-full mb-10 overflow-hidden'>
								<div className='relative w-full h-[500px] rounded-xl overflow-hidden shadow-xl'>
									{/* Purple-ish gradient overlay - lower z-index and pointer-events none */}
									<div
										className='absolute inset-0 bg-gradient-to-br from-purple-900/70 via-indigo-800/60 to-transparent pointer-events-none'
										style={{ zIndex: 1 }}
									/>

									{/* Purple duotone effect container - lower z-index and pointer-events none */}
									<div
										className='absolute inset-0 mix-blend-multiply bg-purple-400/30 pointer-events-none'
										style={{ zIndex: 2 }}
									/>

									<Image
										src={
											typeof postData.image === 'object' && postData.image?.url
												? postData.image.url
												: '/images/placeholder.jpg'
										}
										alt={postData.title}
										fill
										className='object-cover transition-transform duration-700 hover:scale-105 filter contrast-[1.05] saturate-[1.1]'
										priority
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
										quality={90}
									/>

									{/* Optional: Title overlay on the image - lower z-index and pointer-events none */}
									<div
										className='absolute inset-0 pointer-events-none'
										style={{ zIndex: 3 }}
									>
										<div className='absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-purple-900/90 to-transparent'>
											<div className='flex items-center gap-2 text-sm text-neutral-200 mb-2'>
												<time dateTime={postData.createdAt}>
													{formatDistanceToNow(new Date(postData.createdAt), {
														addSuffix: true,
													})}
												</time>
												<span>•</span>
												<span>5 min read</span>
											</div>
											<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 font-sora'>
												{postData.title}
											</h1>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Post Content */}
						<div className='prose prose-lg dark:prose-invert prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-img:rounded-lg prose-img:shadow-md max-w-none'>
							<RichText data={postData.dynamiccontent} />
						</div>

						{/* Mobile Post Details - only shown on mobile */}
						<div className='md:hidden mt-10'>
							<PostDetails
								post={postData}
								prevPost={adjacentPosts.prev}
								nextPost={adjacentPosts.next}
							/>
						</div>

						{/* Post Footer */}
						<footer className='mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800'>
							<div className='flex flex-col md:flex-row-reverse md:items-center md:justify-between gap-4'>
								<div className='md:text-right'>
									<a
										href='/posts'
										className='inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors'
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='16'
											height='16'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
											className='mr-2'
										>
											<path d='M19 12H5M12 19l-7-7 7-7' />
										</svg>
										Back to all posts
									</a>
								</div>
							</div>
						</footer>
					</article>
				</Container>
			</div>
		</Layout>
	)
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
	const { isEnabled: draft } = await draftMode()

	const payload = await getPayload({ config: configPromise })

	const result = await payload.find({
		collection: 'posts',
		draft,
		limit: 1,
		overrideAccess: true,
		where: {
			slug: {
				equals: slug,
			},
		},
	})

	return result.docs?.[0] || null
})

async function getAdjacentPosts(
	currentPost: Post | null,
): Promise<{ prev: Post | null; next: Post | null }> {
	if (!currentPost) {
		return { prev: null, next: null }
	}

	try {
		// Get posts with IDs lower than the current post (for "previous" post)
		const prevPostsResponse = await queryPostById({
			id: currentPost.id,
			limit: 1,
			sort: 'desc',
		})

		// Get posts with IDs higher than the current post (for "next" post)
		const nextPostsResponse = await queryPostById({
			id: currentPost.id,
			limit: 1,
			sort: 'asc',
		})

		const prevPost =
			prevPostsResponse.docs && prevPostsResponse.docs.length > 0
				? prevPostsResponse.docs[0]
				: null
		const nextPost =
			nextPostsResponse.docs && nextPostsResponse.docs.length > 0
				? nextPostsResponse.docs[0]
				: null

		return { prev: prevPost, next: nextPost }
	} catch (error) {
		console.error('Error fetching adjacent posts:', error)
		return { prev: null, next: null }
	}
}

async function queryPostById({
	id,
	limit,
	sort,
}: {
	id: number
	limit: number
	sort: 'asc' | 'desc'
}): Promise<{ docs: Post[] }> {
	const { isEnabled: draft } = await draftMode()

	const payload = await getPayload({ config: configPromise })

	const result = await payload.find({
		collection: 'posts',
		draft,
		limit,
		overrideAccess: true,
		sort: `id:${sort}`,
		where: {
			id: {
				[sort === 'asc' ? 'greater_than' : 'less_than']: id,
			},
		},
	})

	return result
}

export async function generateMetadata({
	params: paramsPromise,
}: Args): Promise<Metadata> {
	const { slug } = await paramsPromise
	const post = await queryPostBySlug({ slug })

	return generateMeta({ doc: post })
}

export async function generateStaticParams() {
	const payload = await getPayload({ config: configPromise })
	const posts = await payload.find({
		collection: 'posts',
		draft: false,
		limit: 1000,
		overrideAccess: false,
	})

	return posts.docs?.map(({ slug }) => {
		return { slug }
	})
}
