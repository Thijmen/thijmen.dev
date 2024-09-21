import Image from '@/core/common/components/elements/Image'
import Tooltip from '@/core/common/components/elements/Tooltip'
import Mdx from '@/core/common/components/elements/mdx/Mdx'
import { getStackIcon } from '@/core/common/constant/stacks'

import type { Project, R2Media, Stack } from '../../../../payload/payload-types'
import ProjectLink from './ProjectLink'

const ProjectDetail = ({ project }: { project: Project }) => {
	const image: string =
		project.headerImage != null
			? (project.headerImage as R2Media).url || ''
			: ''

	const stacks = (project.stacks ?? []) as Stack[]

	return (
		<div className='space-y-8'>
			<div className='flex flex-col items-start justify-between gap-5 sm:flex-row lg:flex-row lg:items-center'>
				<div className='flex flex-wrap items-center gap-2'>
					<span className='mb-1 text-[15px] text-neutral-700 dark:text-neutral-300'>
						Tech Stack :
					</span>
					<div className='flex flex-wrap items-center gap-3'>
						{stacks.map((stack) => {
							return (
								<div key={stack.id}>
									<Tooltip title={stack.title}>
										{getStackIcon(stack.stackHandle)}
									</Tooltip>
								</div>
							)
						})}
					</div>
				</div>
				<ProjectLink
					title={project.title}
					link_demo={project.liveLink}
					link_github={project.githubLink}
				/>
			</div>
			{image.length > 0 && (
				<Image
					src={image}
					width={800}
					height={400}
					alt={project.title}
					className='hover:scale-105'
				/>
			)}
			{project.description && (
				<div className='mt-5 space-y-6 leading-[1.8] dark:text-neutral-300'>
					<Mdx content={project.description} />
				</div>
			)}
		</div>
	)
}

export default ProjectDetail
