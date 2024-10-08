import Link from 'next/link'
import type { ReactNode } from 'react'
import { BsGithub as GithubIcon } from 'react-icons/bs'
import { FiExternalLink as LinkIcon } from 'react-icons/fi'

interface LinkComponentProps {
	url: string
	text: string
	icon?: ReactNode
}

interface ProjectLinkProps {
	title?: string | null
	link_github?: string | null
	link_demo?: string | null
}

const ProjectLink = ({ title, link_github, link_demo }: ProjectLinkProps) => {
	const LinkComponent = ({ url, text, icon }: LinkComponentProps) => {
		const eventName = `Click ${text} - Project ${title}`

		return (
			<Link href={url} target='_blank' passHref data-umami-event={eventName}>
				<div className='flex items-center gap-2 font-medium text-neutral-700 dark:text-neutral-300 '>
					{icon}
					<span className='text-[15px] transition-all duration-300 dark:text-teal-500 hover:dark:text-teal-400'>
						{text}
					</span>
				</div>
			</Link>
		)
	}

	return (
		<div className='flex gap-4'>
			{link_github && (
				<LinkComponent
					url={link_github}
					text='Source Code'
					icon={<GithubIcon size={22} />}
				/>
			)}
			{link_github && link_demo && (
				<span className='text-neutral-400 dark:text-neutral-600'>|</span>
			)}
			{link_demo && (
				<LinkComponent
					url={link_demo}
					text='Live Demo'
					icon={<LinkIcon size={22} />}
				/>
			)}
		</div>
	)
}

export default ProjectLink
