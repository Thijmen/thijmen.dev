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
    <div className="relative h-64 md:h-80 lg:h-96 w-full mb-8 overflow-hidden rounded-xl">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-800/80 to-teal-900/70 mix-blend-multiply z-10" />

      {/* Decorative pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-30" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full filter blur-3xl" />
        <div className="absolute top-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full filter blur-3xl" />
      </div>

      {/* Project image */}
      <Image
        src={image}
        alt={project.title}
        fill
        className="object-cover object-center z-0"
        priority
      />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 z-20">
        <div className="backdrop-blur-sm bg-black/30 p-6 rounded-lg inline-block max-w-2xl border border-white/10">
          <h1 className="font-sora text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-indigo-200 to-teal-200 bg-clip-text text-transparent mb-3">
            {project.title}
          </h1>
          <p className="text-neutral-200 text-lg max-w-2xl">{project.introduction}</p>
          
          {/* Project tags/stacks */}
          {stacks.length > 0 && (
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium uppercase text-neutral-300">TECH STACK:</span>
                {stacks.map((stack) => (
                  <div key={stack.id} className="transition-transform duration-200 hover:scale-110">
                    <Tooltip title={stack.title}>
                      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-800/70 p-1.5 border border-neutral-700/30 backdrop-blur-sm">
                        {getStackIcon(stack.stackHandle)}
                      </div>
                    </Tooltip>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap items-center justify-between mt-6 pt-4 border-t border-white/10">
            <div className="flex gap-2">
              <span className="inline-block px-3 py-1 text-xs font-mono rounded-md bg-teal-900/30 text-teal-400 border border-teal-800/30">
                PROJECT
              </span>
              <span className="inline-block px-3 py-1 text-xs font-mono rounded-md bg-neutral-800/50 text-neutral-300 border border-neutral-700/30">
                {new Date(project.createdAt).getFullYear()}
              </span>
            </div>
            
            {/* Project links */}
            {(project.githubLink || project.liveLink) && (
              <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                {project.githubLink && (
                  <Link 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all duration-300 border border-indigo-500"
                  >
                    <FiGithub size={16} />
                    <span>GitHub</span>
                  </Link>
                )}
                {project.liveLink && (
                  <Link 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-neutral-700 hover:bg-neutral-800 rounded-lg transition-all duration-300 border border-neutral-600"
                  >
                    <FiExternalLink size={16} />
                    <span>Live Preview</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectHero
