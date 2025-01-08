import { MDXRemoteRSC } from '@/core/common/components/elements/mdx/MDXRemoteRSC'
import Pre from '@/core/common/components/elements/mdx/elements/Pre'
import type { MDXComponents } from '@/core/common/components/elements/mdx/types'
import {
	File,
	Files,
	Folder,
} from '@/core/common/components/elements/mdx/ui/file'
import Video from '@/core/common/components/elements/mdx/ui/video'
import { Link } from '../Link'

type MdxProps = {
	code: string
}

const components: MDXComponents = {
	pre: Pre,
	Video,
	File,
	Files,
	Folder,
	Link,
}

const Mdx = (props: MdxProps) => {
	const { code } = props

	return (
		<div className='prose w-full'>
			<MDXRemoteRSC source={code} components={components} />
		</div>
	)
}

export default Mdx
