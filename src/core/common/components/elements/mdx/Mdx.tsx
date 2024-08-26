import * as React from 'react'
import { MDXComponents } from '@/core/common/components/elements/mdx/types'
import { MDXRemoteRSC } from '@/core/common/components/elements/mdx/MDXRemoteRSC'
import Pre from '@/core/common/components/elements/mdx/elements/Pre'
import Video from '@/core/common/components/elements/mdx/ui/video'
import {
  File,
  Files,
  Folder,
} from '@/core/common/components/elements/mdx/ui/file'

type MdxProps = {
  content: string
}

const components: MDXComponents = {
  pre: Pre,
  Video,
  File,
  Files,
  Folder,
}

const Mdx = (props: MdxProps) => {
  const { content } = props

  return (
    <div className='prose w-full'>
      <MDXRemoteRSC source={content} components={components} />
    </div>
  )
}

export default Mdx
