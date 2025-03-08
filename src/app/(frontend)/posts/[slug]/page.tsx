import { PayloadRedirects } from '@/core/common/components/PayloadRedirects'
import Container from '@/core/common/components/elements/Container'
import Layout from '@/core/common/components/layouts'
import { RichText } from '@/core/common/components/shared-content'
import { getMenuItems } from '@/core/services/menu'
import type { Post, Tag } from '@/payload/payload-types'
import configPromise from '@payload-config'
import { formatDistanceToNow } from 'date-fns'
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
		alt: 'Code on a laptop screen',
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
	const postData = mockPost

	if (!post) {
		// In production, redirect if no post is found
		if (process.env.NODE_ENV === 'production') {
			return <PayloadRedirects url={slug} />
		}
		// In development, show a note that we're using mock data
		console.log('Using mock data for post:', slug)
	}

	const nav = await getMenuItems()

	return (
		<Layout navGlobal={nav}>
			<Container data-aos={'fade-up'}>
				<article className='max-w-3xl mx-auto'>
					{/* Post Header */}
					<header className='mb-8'>
						{!postData.image && (
							<>
								<div className='flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-3'>
									<time dateTime={postData.createdAt}>
										{formatDistanceToNow(new Date(postData.createdAt), {
											addSuffix: true,
										})}
									</time>
									<span>•</span>
									<span>5 min read</span>
								</div>

								<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 font-sora'>
									{postData.title}
								</h1>

								{postData.description && (
									<p className='text-lg text-neutral-700 dark:text-neutral-300 mb-6'>
										{postData.description}
									</p>
								)}

								{postData.tags && postData.tags.length > 0 && (
									<div className='flex flex-wrap gap-2 mb-6'>
										{postData.tags.map((tag) => {
											const tagData =
												typeof tag === 'object'
													? tag
													: ({ id: 0, name: 'Tag', slug: 'tag' } as Tag)
											return (
												<span
													key={tagData.id}
													className='px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300'
												>
													{tagData.name}
												</span>
											)
										})}
									</div>
								)}
							</>
						)}

						{postData.image && postData.description && (
							<p className='text-lg text-neutral-700 dark:text-neutral-300 mt-6 mb-6'>
								{postData.description}
							</p>
						)}
					</header>

					{/* Featured Image */}
					{postData.image && (
						<div className='relative w-full mb-10 overflow-hidden'>
							<div className='relative w-full h-[500px] rounded-xl overflow-hidden shadow-xl'>
								{/* Gradient overlay */}
								<div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10' />

								<Image
									src={
										typeof postData.image === 'object' && postData.image?.url
											? postData.image.url
											: '/images/placeholder.jpg'
									}
									alt={postData.title}
									fill
									className='object-cover transition-transform duration-700 hover:scale-105'
									priority
									sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
									quality={90}
								/>

								{/* Optional: Title overlay on the image */}
								<div className='absolute bottom-0 left-0 right-0 p-6 z-20'>
									<div className='max-w-3xl mx-auto'>
										<div className='flex items-center gap-2 text-sm text-neutral-200 mb-2'>
											<time dateTime={postData.createdAt}>
												{formatDistanceToNow(new Date(postData.createdAt), {
													addSuffix: true,
												})}
											</time>
											<span>•</span>
											<span>5 min read</span>
										</div>
										<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-sora'>
											{postData.title}
										</h1>
										{postData.tags && postData.tags.length > 0 && (
											<div className='flex flex-wrap gap-2'>
												{postData.tags.map((tag) => {
													const tagData =
														typeof tag === 'object'
															? tag
															: ({ id: 0, name: 'Tag', slug: 'tag' } as Tag)
													return (
														<span
															key={tagData.id}
															className='px-3 py-1 text-xs font-medium rounded-full bg-indigo-100/90 text-indigo-800 dark:bg-indigo-900/90 dark:text-indigo-300'
														>
															{tagData.name}
														</span>
													)
												})}
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Post Content */}
					<div className='prose dark:prose-invert prose-lg prose-neutral max-w-none'>
						<RichText data={postData.dynamiccontent} />
					</div>

					{/* Post Footer */}
					<footer className='mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800'>
						<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
							<div>
								<h3 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100'>
									Share this post
								</h3>
								<div className='flex gap-4 mt-2'>
									<button
										type='button'
										className='text-neutral-700 dark:text-neutral-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors'
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='20'
											height='20'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										>
											<path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
										</svg>
									</button>
									<button
										type='button'
										className='text-neutral-700 dark:text-neutral-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors'
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='20'
											height='20'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										>
											<path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' />
										</svg>
									</button>
									<button
										type='button'
										className='text-neutral-700 dark:text-neutral-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors'
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='20'
											height='20'
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'
										>
											<path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
											<rect x='2' y='9' width='4' height='12' />
											<circle cx='4' cy='4' r='2' />
										</svg>
									</button>
								</div>
							</div>
							<div>
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
