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
    <div className="w-full mb-8 overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-900/90 to-black/80 border border-purple-500/30 shadow-lg shadow-purple-500/10 backdrop-blur-md group hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-500">
      {/* Hero Image Section */}
      <div className="relative w-full h-72 md:h-96 lg:h-[450px] overflow-hidden rounded-t-2xl">
        {/* Background Image with Gradient Overlay */}
        <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-700 ease-in-out">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-indigo-800/70 to-teal-900/60 mix-blend-multiply" />

          {/* Animated grid pattern */}
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-30 group-hover:opacity-40 transition-opacity duration-700" />

          {/* Decorative elements */}
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-600/20 rounded-full filter blur-[100px] group-hover:bg-purple-500/30 transition-colors duration-700" />
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-teal-600/10 rounded-full filter blur-[100px] group-hover:bg-teal-500/20 transition-colors duration-700" />

          {/* Accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-indigo-500 to-teal-500 opacity-80" />

          <Image
            src={image}
            alt={project.title}
            fill
            className="object-cover object-center transition-all duration-700 group-hover:saturate-[1.1]"
            priority
          />
        </div>

        {/* Floating title overlay for larger screens */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent">
          <h1 className="font-sora text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-teal-200 bg-clip-text text-transparent mb-2 transform transition-all duration-500 group-hover:translate-y-[-5px]">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-8 border-t border-purple-500/30 bg-gradient-to-b from-black/40 to-neutral-900/40">
        <p className="text-neutral-200 text-lg md:text-xl max-w-3xl leading-relaxed mb-8">
          {project.introduction}
        </p>

        {/* Project tags/stacks with improved styling */}
        {stacks.length > 0 && (
          <div className="mt-6 pt-6 border-t border-purple-800/20">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-medium uppercase text-purple-300 tracking-wider">
                TECH STACK
              </span>
              <div className="flex flex-wrap gap-3">
                {stacks.map((stack) => (
                  <div
                    key={stack.id}
                    className="transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  >
                    <Tooltip title={stack.title}>
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800/70 p-2 border border-purple-500/30 backdrop-blur-sm shadow-md shadow-purple-900/20 hover:shadow-purple-700/30 hover:border-purple-400/50 transition-all duration-300">
                        {getStackIcon(stack.stackHandle)}
                      </div>
                    </Tooltip>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between mt-8 pt-6 border-t border-purple-800/20">
          <div className="flex gap-3">
            <span className="inline-block px-4 py-2 text-xs font-mono rounded-lg bg-purple-900/40 text-purple-300 border border-purple-700/40 shadow-sm shadow-purple-900/20">
              PROJECT
            </span>
            <span className="inline-block px-4 py-2 text-xs font-mono rounded-lg bg-neutral-800/70 text-neutral-300 border border-neutral-700/40 shadow-sm shadow-black/20">
              {new Date(project.createdAt).getFullYear()}
            </span>
          </div>

          {/* Project links with enhanced styling */}
          {(project.githubLink || project.liveLink) && (
            <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
              {project.githubLink && (
                <Link
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-lg transition-all duration-300 border border-purple-500/50 shadow-md shadow-purple-900/20 hover:shadow-lg hover:shadow-purple-700/30 hover:translate-y-[-2px]"
                >
                  <FiGithub size={18} />
                  <span>GitHub</span>
                </Link>
              )}
              {project.liveLink && (
                <Link
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 rounded-lg transition-all duration-300 border border-teal-500/50 shadow-md shadow-teal-900/20 hover:shadow-lg hover:shadow-teal-700/30 hover:translate-y-[-2px]"
                >
                  <FiExternalLink size={18} />
                  <span>Live Preview</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectHero
