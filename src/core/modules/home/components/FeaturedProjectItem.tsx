'use client'
import { Card, type TagProps } from '@/core/common/components/elements/ContentCard'
import Image from '@/core/common/components/elements/Image'
import { VscCode as CodeIcon } from 'react-icons/vsc'
import slugify from 'slugify'
import type { Project, R2Media, Stack } from '../../../../payload/payload-types'

export const FeaturedProjectItem = ({ project }: { project: Project }) => {
  const defaultImage = '/images/placeholder.png'

  const stacks = (project.stacks || []) as Stack[]

  const projectImage =
    project.headerImage != null
      ? (project.headerImage as R2Media).sizes?.projectCardHomepage?.url || defaultImage
      : defaultImage

  const variant = 'project'

  return (
    <Card href={`/projects/${project.slug}`} variant={variant}>
      <Card.Header variant={variant}>
        <Image
          src={projectImage}
          alt={project.title || ''}
          fill={true}
          sizes="100vw, 100vh"
          className="h-full w-full transform object-cover object-left transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 opacity-80 transition-opacity duration-300" />

        <div className="absolute top-3 right-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800/80 backdrop-blur-sm text-teal-400 transition-transform duration-300 group-hover:scale-110">
            <CodeIcon size={18} />
          </div>
        </div>
      </Card.Header>

      <Card.Content>
        <div>
          <Card.Label variant={variant}>FEATURED PROJECT</Card.Label>
          <Card.Title variant={variant}>{project.title}</Card.Title>
          <Card.Description>{project.introduction}</Card.Description>
        </div>

        <Card.Tags
          variant={variant}
          tags={stacks.map<TagProps>((tag) => ({
            slug: slugify(tag.title || '').toLowerCase(),
            name: tag.title || '',
          }))}
          label="TECH STACK"
        />
      </Card.Content>

      {/* Code-inspired decorative element */}
      <div className="absolute -left-6 top-20 h-12 w-12 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 opacity-40 blur-xl" />
      <div className="absolute -right-6 bottom-20 h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-teal-500 opacity-40 blur-xl" />
    </Card>
  )
}
