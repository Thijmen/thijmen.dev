import Image from 'next/image'
import type { Project, R2Media } from '../../../../payload/payload-types'

interface ProjectHeroProps {
  project: Project
}

const ProjectHero = ({ project }: ProjectHeroProps) => {
  const image: string =
    project.headerImage != null
      ? (project.headerImage as R2Media).url || ''
      : '/images/placeholder.png'

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
          <div className="flex gap-2 mt-4">
            <span className="inline-block px-3 py-1 text-xs font-mono rounded-md bg-teal-900/30 text-teal-400 border border-teal-800/30">
              PROJECT
            </span>
            <span className="inline-block px-3 py-1 text-xs font-mono rounded-md bg-neutral-800/50 text-neutral-300 border border-neutral-700/30">
              {new Date(project.createdAt).getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectHero
