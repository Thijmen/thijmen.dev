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
      <div className="relative w-full h-[260px] md:h-[300px] overflow-hidden">
        {/* Background image with gradient overlay */}
        <div className="absolute inset-0">
          {/* Darker gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/90 via-[#1a1a2e]/80 to-[#1a1a2e] z-10" />
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-30 z-20" />
          <Image
            src={image}
            alt={project.title}
            fill
            className="object-cover object-center opacity-80"
            priority
          />
        </div>
        
        {/* Accent line */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 via-indigo-500 to-teal-500 opacity-80 z-30" />
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full filter blur-[60px] z-20" />
        <div className="absolute top-0 left-0 w-48 h-48 bg-purple-600/20 rounded-full filter blur-[60px] z-20" />
        
        {/* Content overlay - added text shadow and improved contrast */}
        <div className="absolute inset-0 z-30 p-5 md:p-6 flex flex-col justify-end">
          {/* Featured project tag */}
          <div className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-teal-300 bg-teal-500/30 rounded-full w-fit border border-teal-500/40 mb-2.5 shadow-sm">
            FEATURED PROJECT
          </div>
          
          {/* Title and project name */}
          <div className="mb-3">
            <h1 className="font-sora text-3xl md:text-4xl font-bold text-white mb-1.5 text-shadow-sm">
              {project.title}
            </h1>
            <p className="text-white text-base max-w-3xl line-clamp-2 text-shadow-xs bg-[#1a1a2e]/40 backdrop-blur-sm py-1 px-1.5 rounded-md inline-block">
              {project.introduction}
            </p>
          </div>
          
          {/* Project meta info */}
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex gap-2 mb-2 sm:mb-0">
              <span className="inline-block px-2.5 py-1 text-xs font-mono rounded-md bg-[#2d2b55]/80 text-white border border-[#4a4873]/60 shadow-sm">
                PROJECT
              </span>
              <span className="inline-block px-2.5 py-1 text-xs font-mono rounded-md bg-[#2d2b55]/80 text-white border border-[#4a4873]/60 shadow-sm">
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
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#2d2b55]/90 hover:bg-[#3c3a75] rounded-lg transition-colors duration-300 border border-[#4a4873]/70 shadow-sm"
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
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-teal-600/90 hover:bg-teal-700 rounded-lg transition-colors duration-300 border border-teal-500/70 shadow-sm"
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
        <div className="p-4 md:p-5 border-t border-[#2d2b55]/70 bg-[#1a1a2e]/95">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-medium uppercase text-neutral-300 tracking-wide">// TECH STACK</span>
            <div className="flex flex-wrap gap-2">
              {stacks.map((stack) => (
                <div key={stack.id} className="transition-transform duration-200 hover:scale-105">
                  <Tooltip title={stack.title}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#2d2b55]/80 p-1.5 border border-[#4a4873]/60 shadow-sm">
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

// Add global styles for text shadows
const styles = `
  .text-shadow-sm {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }
  .text-shadow-xs {
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  }
`;

// Add the styles to the document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}

export default ProjectHero
