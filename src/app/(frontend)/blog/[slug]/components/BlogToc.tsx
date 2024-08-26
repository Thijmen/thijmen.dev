'use client'

import { TOC } from '@/core/common/components/elements/mdx/types'
import { useScrollspy } from '@/core/common/hooks/useControlSpy'
import cn from '@/core/common/libs/cn'

type TableOfContentsProps = {
  toc: TOC[]
}

const TableOfContents = (props: TableOfContentsProps) => {
  const { toc } = props
  const activeId = useScrollspy(
    toc.map((item) => item.url),
    { rootMargin: '0% 0% -80% 0%' },
  )

  return (
    <div className='hidden lg:block'>
      <div className='mb-4 pl-4'>On this page</div>
      <div>
        {toc.map((item) => {
          const { title, url, depth } = item

          return (
            <a
              key={url}
              href={`#${url}`}
              className={cn(
                'block py-2.5 pr-2.5 text-sm leading-[1.2] text-muted-foreground transition-all hover:text-foreground',
                url === activeId && 'text-foreground',
              )}
              style={{
                paddingLeft: (depth - 1) * 16,
              }}
            >
              {title}
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default TableOfContents
