import slugify from 'slugify'

import Heading from '@/common/components/elements/mdx/elements/Heading'
import Mdx from '@/common/components/elements/mdx/Mdx'
import { TOC } from '@/common/components/elements/mdx/types'

import { Blog } from '../../../../../../payload-types'
import TableOfContents from '@/app/(frontend)/blog/[slug]/components/BlogToc'
import { BlogProgress } from '@/app/(frontend)/blog/[slug]/components/BlogProgress'

type Props = {
  blog: Blog
}

// TODO: Move to file
export const BlogItemContent = (props: Props) => {
  const { blog } = props

  const createSlug = (title: string) => {
    return slugify(title, { lower: true })
  }

  const toc: TOC[] = blog.layout.map((block) => {
    return {
      title: block.header ?? '',
      url: createSlug(block.header ?? ''),
      depth: 0,
    }
  })
  return (
    <>
      <div className='mt-8 flex flex-col justify-between lg:flex-row'>
        <article className='prose w-full lg:w-[670px]'>
          {blog.layout.map((block, index) => {
            return (
              <>
                <Heading id={createSlug(block.header ?? '')} as='h2'>
                  {block.header}
                </Heading>

                <Mdx key={index} content={block.content ?? ''} />
              </>
            )
          })}
        </article>
        <aside className='lg:min-w-[270px] lg:max-w-[270px]'>
          <div className='sticky top-24 will-change-[transform,opacity]'>
            {toc && toc.length > 0 && <TableOfContents toc={toc} />}
            {/*<LikeButton slug={slug} />*/}
          </div>
        </aside>
      </div>
      <BlogProgress />
    </>
  )
}
