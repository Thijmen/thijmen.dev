'use client'
import Card from '@/core/common/components/elements/Card'
import Image from '@/core/common/components/elements/Image'
import Link from 'next/link'
import slugify from 'slugify'
import type { Project, R2Media, Stack } from '../../../../payload/payload-types'
import { VscCode as CodeIcon } from 'react-icons/vsc'
import { FiGithub as GithubIcon } from 'react-icons/fi'

export const FeaturedProjectItem = ({ project }: { project: Project }) => {
	const defaultImage = '/images/placeholder.png'

	const stacks = (project.stacks || []) as Stack[]

	const projectImage =
		project.headerImage != null
			? (project.headerImage as R2Media).sizes?.projectCardHomepage?.url ||
				defaultImage
			: defaultImage
	return (
		<Link href={`/projects/${project.slug}`}>
			<Card className='group relative flex h-[400px] w-full flex-col rounded-lg border transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-teal-500/20 dark:border-neutral-800 overflow-hidden'>
				<div
					className='relative rounded-t-lg duration-500'
					style={{
						height: '200px',
						overflow: 'hidden',
					}}
				>
					<Image
						src={projectImage}
						alt={project.title || ''}
						fill={true}
						sizes='100vw, 100vh'
						className='h-full w-full transform object-cover object-left transition-transform duration-300 group-hover:scale-105'
					/>
					<div className='absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 opacity-80 transition-opacity duration-300' />
					
					<div className='absolute top-3 right-3 flex items-center gap-2'>
						<div className='flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800/80 backdrop-blur-sm text-teal-400 transition-transform duration-300 group-hover:scale-110'>
							<CodeIcon size={18} />
						</div>
					</div>
				</div>

				<div className='flex flex-col justify-between p-5 flex-grow bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950'>
					<div>
						<div className='mb-2 inline-block rounded-sm bg-teal-500 px-2 py-0.5 text-[10px] font-medium text-white'>
							FEATURED PROJECT
						</div>
						<h3 className='font-sora text-xl font-semibold text-neutral-800 dark:text-neutral-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300'>
							{project.title}
						</h3>

						<p className='mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 line-clamp-3'>
							{project.introduction}
						</p>
					</div>

					<div className='mt-auto'>
						<div className='mb-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 font-mono'>
							// TECH STACK
						</div>
						<div className='flex flex-wrap gap-2 mb-3'>
							{stacks.map((tag) => (
								<div
									key={tag.id}
									className='rounded-md bg-neutral-200 dark:bg-neutral-800 px-2.5 py-1 font-mono text-xs text-neutral-700 dark:text-neutral-300 border-l-2 border-teal-500 transition-transform duration-200 hover:scale-105'
								>
									{slugify(tag.title || '').toLowerCase()}
								</div>
							))}
						</div>
					</div>
				</div>
				
				{/* Code-inspired decorative element */}
				<div className='absolute -left-6 top-20 h-12 w-12 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 opacity-40 blur-xl'></div>
				<div className='absolute -right-6 bottom-20 h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-teal-500 opacity-40 blur-xl'></div>
			</Card>
		</Link>
	)
}
