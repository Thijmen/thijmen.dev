import Card from '@/core/common/components/elements/Card'
import Image from '@/core/common/components/elements/Image'
import Tooltip from '@/core/common/components/elements/Tooltip'
import { getStackIcon } from '@/core/common/constant/stacks'
import Link from 'next/link'
import { AiFillPushpin as PinIcon } from 'react-icons/ai'
import { HiOutlineArrowSmRight as ViewIcon } from 'react-icons/hi'
import { VscCode as CodeIcon } from 'react-icons/vsc'
import { FiGithub as GithubIcon } from 'react-icons/fi'
import type { Project, R2Media, Stack } from '../../../../payload/payload-types'

const ProjectCard = ({ project }: { project: Project }) => {
  const defaultImage = '/images/placeholder.png'
  const stacks: Stack[] = (project.stacks || []) as Stack[]

  const image =
    project.headerImage != null
      ? (project.headerImage as R2Media).sizes?.projectCardProjectsPage?.url || defaultImage
      : defaultImage

  return (
    <Link href={`/projects/${project.slug}`}>
      <Card className="group relative cursor-pointer overflow-hidden border border-neutral-200 bg-gradient-to-br from-neutral-50 to-neutral-100 transition-all duration-300 dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-950 lg:hover:scale-[102%] lg:hover:shadow-lg lg:hover:shadow-teal-500/10">
        {project.isFeatured && (
          <div className="absolute right-0 top-0 z-[2] flex items-center gap-1 rounded-bl-xl bg-gradient-to-r from-teal-400 to-teal-500 px-3 py-1.5 text-[13px] font-medium text-white">
            <PinIcon size={15} />
            <span>Featured</span>
          </div>
        )}
        <div className="relative">
          <Image
            src={image}
            width={400}
            height={200}
            alt={project.title}
            className="h-48 w-full object-cover object-left"
          />
          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-3 bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex items-center gap-2 rounded-full bg-teal-500 px-4 py-2 transition-transform duration-300 group-hover:scale-105">
              <span>View Project</span>
              <ViewIcon size={18} />
            </div>
            {project.githubLink && (
              <div className="flex items-center gap-2 rounded-full bg-neutral-700 px-4 py-2 text-xs transition-transform duration-300 group-hover:scale-105">
                <span>Source Code</span>
                <GithubIcon size={16} />
              </div>
            )}
          </div>
        </div>
        <div className="space-y-3 p-5">
          <div className="flex items-center justify-between">
            <div className="font-sora text-lg font-medium text-neutral-800 transition-all duration-300 dark:text-neutral-200 dark:group-hover:text-teal-400 lg:group-hover:text-teal-600">
              {project.title}
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
              <CodeIcon size={16} />
            </div>
          </div>
          <div className="relative rounded-md bg-neutral-200 p-3 dark:bg-neutral-800">
            <div className="absolute -top-2 left-2 rounded-sm bg-teal-500 px-1.5 py-0.5 text-[10px] font-medium text-white">
              PROJECT
            </div>
            <p className="text-[14px] leading-relaxed text-neutral-700 dark:text-neutral-300">
              {project.introduction}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <div className="mr-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              TECH:
            </div>
            {stacks.map((stack: Stack) => (
              <div key={stack.id} className="transition-transform duration-200 hover:scale-110">
                <Tooltip title={stack.title}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-200 p-1.5 dark:bg-neutral-800">
                    {getStackIcon(stack.stackHandle)}
                  </div>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default ProjectCard
