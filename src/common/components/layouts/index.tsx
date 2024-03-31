import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { ReactNode } from 'react'
import { useWindowSize } from 'usehooks-ts'

import useHasMounted from '@/common/hooks/useHasMounted'
import ChatButton from '@/modules/chat/components/ChatButton'

import HeaderSidebar from './header/HeaderSidebar'
import HeaderTop from './header/HeaderTop'
import NowPlayingBar from '../elements/NowPlayingBar'
import NowPlayingCard from '../elements/NowPlayingCard'

// import TopBar from '../elements/TopBar';

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { resolvedTheme } = useTheme()
  const hasMounted = useHasMounted()
  const pathname = usePathname()
  const { width } = useWindowSize()
  const isMobile = width < 480

  const isDarkTheme =
    hasMounted && (resolvedTheme === 'dark' || resolvedTheme === 'system')

  const pageName = pathname.split('/')[1]

  const isFullPageHeader =
    pageName === 'playground' ||
    pageName === 'blog' ||
    pathname.startsWith('/blog/') ||
    pathname.startsWith('/learn/')

  const isShowChatButton = pageName !== 'guestbook'

  return (
    <>
      {/* <TopBar /> */}
      <div
        className={clsx(
          'mx-auto max-w-6xl lg:px-8',
          isDarkTheme ? 'dark:text-darkText' : '',
        )}
      >
        {isFullPageHeader ? (
          <div className='flex flex-col xl:pb-8'>
            <HeaderTop />
            <main className='transition-all duration-300'>{children}</main>
          </div>
        ) : (
          <div className='flex flex-col lg:flex-row lg:gap-5 lg:py-4 xl:pb-8'>
            <HeaderSidebar />
            <main className='max-w-[854px] transition-all duration-300 lg:w-4/5'>
              {children}
            </main>
          </div>
        )}
      </div>
      {isShowChatButton && <ChatButton />}
      {isMobile ? <NowPlayingCard /> : <NowPlayingBar />}
    </>
  )
}

export default Layout
