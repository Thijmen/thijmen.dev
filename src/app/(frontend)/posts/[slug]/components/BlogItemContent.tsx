import slugify from 'slugify'

import Mdx from '@/core/common/components/elements/mdx/Mdx'
import Heading from '@/core/common/components/elements/mdx/elements/Heading'
import type { TOC } from '@/core/common/components/elements/mdx/types'

import { BlogProgress } from '@/app/(frontend)/posts/[slug]/components/BlogProgress'
import TableOfContents from '@/app/(frontend)/posts/[slug]/components/BlogToc'
import type { Post } from '@/payload/payload-types'

type Props = {
	blog: Post
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
								<Heading
									key={block.header}
									id={createSlug(block.header ?? '')}
									as='h2'
								>
									{block.header}
								</Heading>

								<Mdx key={block.id} content={block.content ?? ''} />
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
