import Image from 'next/image'
import type { Project, R2Media, Stack } from '../../../../payload/payload-types'
import Tooltip from '@/core/common/components/elements/Tooltip'
import { getStackIcon } from '@/core/common/constant/stacks'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import Link from 'next/link'

interface ProjectHeroProps {
  project: Project
}

const ProjectHero = ({ project }: ProjectHeroProps) => {
  const image: string =
    project.headerImage != null
      ? (project.headerImage as R2Media).url || ''
      : '/images/placeholder.png'

  const stacks = (project.stacks ?? []) as Stack[]

  return (
    <div className="w-full mb-8 overflow-hidden rounded-xl bg-[#1a1a2e]/90 border border-[#2d2b55]/50 backdrop-blur-md">
      {/* Hero section with image and overlaid content */}
      <div className="relative w-full h-[280px] md:h-[320px] overflow-hidden">
        {/* Background image with gradient overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/80 via-[#1a1a2e]/60 to-[#1a1a2e] z-10" />
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-30 z-20" />
          <Image
            src={image}
            alt={project.title}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        
        {/* Accent line */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 via-indigo-500 to-teal-500 opacity-80 z-30" />
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full filter blur-[60px] z-20" />
        <div className="absolute top-0 left-0 w-48 h-48 bg-purple-600/20 rounded-full filter blur-[60px] z-20" />
        
        {/* Content overlay */}
        <div className="absolute inset-0 z-30 p-5 md:p-6 flex flex-col justify-end">
          {/* Title section */}
          <div className="flex flex-col gap-1.5 mb-4">
            <div className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-teal-300 bg-teal-500/20 rounded-full w-fit border border-teal-500/30">
              FEATURED PROJECT
            </div>
            <h1 className="font-sora text-3xl md:text-4xl font-bold text-purple-300 mb-1">
              {project.title}
            </h1>
            <p className="text-neutral-300 text-base max-w-3xl line-clamp-2">{project.introduction}</p>
          </div>
          
          {/* Project meta info */}
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex gap-2 mb-2 sm:mb-0">
              <span className="inline-block px-2 py-0.5 text-xs font-mono rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/30">
                PROJECT
              </span>
              <span className="inline-block px-2 py-0.5 text-xs font-mono rounded-md bg-[#2d2b55]/70 text-neutral-300 border border-[#4a4873]/50">
                {new Date(project.createdAt).getFullYear()}
              </span>
            </div>
            
            {/* Project links */}
            {(project.githubLink || project.liveLink) && (
              <div className="flex flex-wrap gap-2">
                {project.githubLink && (
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#2d2b55] hover:bg-[#3c3a75] rounded-lg transition-colors duration-300 border border-[#4a4873]"
                  >
                    <FiGithub size={14} />
                    <span>View Source</span>
                  </Link>
                )}
                {project.liveLink && (
                  <Link
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors duration-300 border border-teal-500"
                  >
                    <FiExternalLink size={14} />
                    <span>View Project</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Tech stack section */}
      {stacks.length > 0 && (
        <div className="p-4 md:p-6 border-t border-[#2d2b55]/70">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-medium uppercase text-neutral-400">// TECH STACK</span>
            <div className="flex flex-wrap gap-2">
              {stacks.map((stack) => (
                <div key={stack.id} className="transition-transform duration-200 hover:scale-105">
                  <Tooltip title={stack.title}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#2d2b55]/70 p-1.5 border border-[#4a4873]/50">
                      {getStackIcon(stack.stackHandle)}
                    </div>
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectHero
