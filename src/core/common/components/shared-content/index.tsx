import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'
import type {
	MyCodeBlock,
	MyGithubContributionsBlock,
	MyGithubStarsBlock,
	MyHomepageIntroductionBlock,
	MyHomepagePostsBlock,
	MyHomepageProjectsBlock,
	MyHorizontalLineBlock,
	MyJavascriptPlaygroundBlock,
	MyPostsBlock,
	MyProjectsBlock,
	MyWakaContributionsBlock,
} from '@/payload/payload-types'
import Mdx from '../elements/mdx/Mdx'
import cn from '../../libs/cn'
import { ProjectsBlock } from './blocks/projects'
import { GithubStarsBlock } from './blocks/github-stars'
import { HomepageProjectsBlock } from './blocks/homepage-projects'
import { HorizontalLineBlock } from './blocks/horizontal-line'
import { GithubBlock } from './blocks/github'
import { WakaBlock } from './blocks/waka'
import { JavascriptPlaygroundBlock } from './blocks/javascript-playground'
import { EnhancedIntroductionBlock } from './blocks/enhancedIntroduction'
import { HomepagePostsBlock } from './blocks/homepage-posts-block'


type Props = {
	data: SerializedEditorState
	enableGutter?: boolean
	enableProse?: boolean
  } & React.HTMLAttributes<HTMLDivElement>
  

  type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<MyCodeBlock | MyProjectsBlock | MyHorizontalLineBlock | MyWakaContributionsBlock |MyGithubContributionsBlock | MyJavascriptPlaygroundBlock | MyHomepageProjectsBlock | MyHomepageIntroductionBlock | MyGithubStarsBlock | MyHomepagePostsBlock | MyPostsBlock> 


const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
	const { value, relationTo } = linkNode.fields.doc!
	if (typeof value !== 'object') {
		throw new Error('Expected value to be an object')
	}
	const slug = value.slug
	return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}
const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
	...defaultConverters,
	...LinkJSXConverter({ internalDocToHref }),
	blocks: {
		code: ({ node }) => <Mdx {...node.fields} />,
		projectsBlock: ({ node }) => <ProjectsBlock {...node.fields} />,
		githubStarsBlock: ({ node }) => <GithubStarsBlock  />,
		homepageProjectsBlock: ({ node }) => <HomepageProjectsBlock {...node.fields} />,
		horizontalLineBlock: ({ node }) => <HorizontalLineBlock {...node.fields} />,
		githubContributionsBlock: ({ node }) => <GithubBlock  />,
		wakaContributionsBlock: ({ node }) => <WakaBlock  />,
		javascriptPlaygroundBlock: ({ node }) => <JavascriptPlaygroundBlock  />,
		homepageIntroductionBlock: ({ node }) => <EnhancedIntroductionBlock {...node.fields} />,
		homepagePostsBlock: ({ node }) => <HomepagePostsBlock {...node.fields} />,
  },
})
  
export const RichText = (props: Props) => {
	const { className, enableProse = true, enableGutter = true, ...rest } = props
	return (
	  <RichTextWithoutBlocks
		converters={jsxConverters}
		// className={cn(
		//   {
		// 	'container ': enableGutter,
		// 	'max-w-none': !enableGutter,
		// 	'mx-auto prose md:prose-md dark:prose-invert ': enableProse,
		//   },
		//   className,
		// )}
		{...rest}
	  />
	)
  }