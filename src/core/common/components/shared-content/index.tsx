import type {
	MyCodeBlock,
	MyFilteredPostsListBlock,
	MyGithubContributionsBlock,
	MyGithubStarsBlock,
	MyHomepageIntroductionBlock,
	MyHomepagePostsBlock,
	MyHomepageProjectsBlock,
	MyHorizontalLineBlock,
	MyImageBlock,
	MyImageSlideshowBlock,
	MyJavascriptPlaygroundBlock,
	MyPostsBlock,
	MyProjectsBlock,
	MyWakaContributionsBlock,
} from '@/payload/payload-types'
import type {
	DefaultNodeTypes,
	SerializedBlockNode,
	SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
	type JSXConvertersFunction,
	LinkJSXConverter,
	RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'
import Mdx from '../elements/mdx/Mdx'
import { EnhancedIntroductionBlock } from './blocks/enhancedIntroduction'
import { FilteredPostsListBlock } from './blocks/filtered-posts-list'
import { GithubBlock } from './blocks/github'
import { GithubStarsBlock } from './blocks/github-stars'
import { HomepagePostsBlock } from './blocks/homepage-posts-block'
import { HomepageProjectsBlock } from './blocks/homepage-projects'
import { HorizontalLineBlock } from './blocks/horizontal-line'
import { ImageBlock } from './blocks/image'
import { ImageSlideshowBlock } from './blocks/image-slideshow'
import { JavascriptPlaygroundBlock } from './blocks/javascript-playground'
import { ProjectsBlock } from './blocks/projects'
import { WakaBlock } from './blocks/waka'

type Props = {
	data: SerializedEditorState
	enableGutter?: boolean
	enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

type NodeTypes =
	| DefaultNodeTypes
	| SerializedBlockNode<
			| MyCodeBlock
			| MyProjectsBlock
			| MyHorizontalLineBlock
			| MyWakaContributionsBlock
			| MyGithubContributionsBlock
			| MyJavascriptPlaygroundBlock
			| MyHomepageProjectsBlock
			| MyHomepageIntroductionBlock
			| MyGithubStarsBlock
			| MyHomepagePostsBlock
			| MyPostsBlock
			| MyImageSlideshowBlock
			| MyImageBlock
			| MyFilteredPostsListBlock
	  >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
	const { value, relationTo } = linkNode.fields.doc
	if (typeof value !== 'object') {
		throw new Error('Expected value to be an object')
	}
	const slug = value.slug
	return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}
const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
	defaultConverters,
}) => ({
	...defaultConverters,
	...LinkJSXConverter({ internalDocToHref }),
	blocks: {
		code: ({ node }) => <Mdx {...node.fields} />,
		projectsBlock: ({ node }) => <ProjectsBlock {...node.fields} />,
		githubStarsBlock: ({ node }) => <GithubStarsBlock />,
		homepageProjectsBlock: ({ node }) => (
			<HomepageProjectsBlock {...node.fields} />
		),
		horizontalLineBlock: ({ node }) => <HorizontalLineBlock {...node.fields} />,
		githubContributionsBlock: ({ node }) => <GithubBlock />,
		wakaContributionsBlock: ({ node }) => <WakaBlock />,
		javascriptPlaygroundBlock: ({ node }) => <JavascriptPlaygroundBlock />,
		homepageIntroductionBlock: ({ node }) => (
			<EnhancedIntroductionBlock {...node.fields} />
		),
		homepagePostsBlock: ({ node }) => <HomepagePostsBlock {...node.fields} />,
		filteredPostsListBlock: ({ node }) => (
			<FilteredPostsListBlock block={node.fields} />
		),
		imageSlideshow: ({ node }) => <ImageSlideshowBlock {...node.fields} />,
		image: ({ node }) => <ImageBlock {...node.fields} />,
	},
})

export const RichText = (props: Props) => {
	const { className, enableProse = true, enableGutter = true, ...rest } = props
	return <RichTextWithoutBlocks converters={jsxConverters} {...rest} />
}
