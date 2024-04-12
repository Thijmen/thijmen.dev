'use client'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { ReactNode } from 'react'
import { useWindowSize } from 'usehooks-ts'
import useHasMounted from '@/common/hooks/useHasMounted'

import HeaderSidebar from './header/HeaderSidebar'
import NowPlayingBar from '../elements/NowPlayingBar'
import NowPlayingCard from '../elements/NowPlayingCard'
import { FullHeaderNav } from '@/common/components/layouts/header/FullHeaderNav'

interface LayoutProps {
  children: ReactNode
  isFullPageHeader?: boolean
}

const Layout = ({ children, isFullPageHeader }: LayoutProps) => {
  const { resolvedTheme } = useTheme()
  const hasMounted = useHasMounted()
  const { width } = useWindowSize()
  const isMobile = width < 480

  const isDarkTheme =
    hasMounted && (resolvedTheme === 'dark' || resolvedTheme === 'system')

  if (isFullPageHeader) {
    return (
      <>
        <FullHeaderNav />
        <div
          className={clsx(
            'mx-auto max-w-6xl lg:px-8',
            isDarkTheme ? 'dark:text-darkText' : '',
          )}
        >
          {children}
        </div>
      </>
    )
  }

  return (
    <>
      <div
        className={clsx(
          'mx-auto max-w-6xl lg:px-8',
          isDarkTheme ? 'dark:text-darkText' : '',
        )}
      >
        <div className='flex flex-col lg:flex-row lg:gap-5 lg:py-4 xl:pb-8'>
          <HeaderSidebar />
          <main className='max-w-[854px] transition-all duration-300 lg:w-4/5'>
            {children}
          </main>
        </div>
      </div>
      {isMobile ? <NowPlayingCard /> : <NowPlayingBar />}
    </>
  )
}

export default Layout
