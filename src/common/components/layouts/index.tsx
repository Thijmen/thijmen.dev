import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { forwardRef, ReactNode, useCallback, useEffect, useRef } from 'react'
import { useWindowSize } from 'usehooks-ts'
import Image from 'next/image'
import useHasMounted from '@/common/hooks/useHasMounted'

import HeaderSidebar from './header/HeaderSidebar'
import NowPlayingBar from '../elements/NowPlayingBar'
import NowPlayingCard from '../elements/NowPlayingCard'
import { MENU_ITEMS } from '@/common/constant/menu'
import { Link } from '@/common/components/elements/Link'

// import TopBar from '../elements/TopBar';

interface LayoutProps {
  children: ReactNode
}

const NavBar = () => {
  const menus = MENU_ITEMS.filter(
    (item) => item.isShow && item.title !== 'Home',
  )

  return (
    <div className='flex-shrink-0'>
      <ul className='flex flex-row'>
        {menus.map((link) => (
          <li
            key={link.title}
            className='nav ml-4 block text-black dark:text-gray-50'
          >
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
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
    // pageName === 'blog' ||
    pathname.startsWith('/blog/') ||
    pathname.startsWith('/learn/')

  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const navRef = useRef<HTMLDivElement | null>(null)
  const handler = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      const useSticky = true
      if (useSticky && navRef.current) {
        console.log('entry intersecting', entry.isIntersecting)
        navRef.current?.classList.toggle(
          'sticky-nav-full',
          !entry.isIntersecting,
        )
      } else {
        navRef.current?.classList.add('remove-sticky')
      }
    },
    [navRef],
  )

  const titleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const sentinelEl = sentinelRef.current

    if (!sentinelEl) return

    const observer = new window.IntersectionObserver(handler)
    observer.observe(sentinelEl)

    return () => {
      sentinelEl && observer.unobserve(sentinelEl)
    }
  }, [sentinelRef])

  const fullWidth = false

  return (
    <>
      {/* <TopBar /> */}
      <div className='observer-element h-4 md:h-12' ref={sentinelRef}></div>
      <div
        className={`sticky-nav group m-auto mb-2 flex h-6 w-full w-full flex-row items-center justify-between bg-opacity-60 py-8 md:mb-12 ${
          !fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
        }`}
        id='sticky-nav'
        ref={navRef}
        // onClick={handleClickHeader}
      >
        <svg
          viewBox='0 0 24 24'
          className='caret pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-6 w-6 opacity-30 transition duration-100 group-hover:opacity-100'
        >
          <path
            d='M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z'
            className='fill-black dark:fill-white'
          />
        </svg>
        <div className='flex items-center'>
          <Link href='/' aria-label='Hello'>
            <Image
              src={'/images/thijmen.png'}
              width={24}
              height={24}
              alt={''}
            />
          </Link>
          <HeaderName
            ref={titleRef}
            siteTitle={'Title'}
            siteDescription={'Description'}
            postTitle={'Post title'}
            onClick={() => console.log('clicked!')}
          />
        </div>
        <NavBar />
      </div>
      <div
        className={clsx(
          'mx-auto max-w-6xl lg:px-8',
          isDarkTheme ? 'dark:text-darkText' : '',
        )}
      >
        {isFullPageHeader ? (
          <>{children}</>
        ) : (
          <div className='flex flex-col lg:flex-row lg:gap-5 lg:py-4 xl:pb-8'>
            <HeaderSidebar />
            <main className='max-w-[854px] transition-all duration-300 lg:w-4/5'>
              {children}
            </main>
          </div>
        )}
      </div>
      {isMobile ? <NowPlayingCard /> : <NowPlayingBar />}
    </>
  )
}

interface HeaderNameProps {
  siteTitle: string
  siteDescription: string
  postTitle?: string
  onClick: (ev: MouseEvent) => void
}

const HeaderName = forwardRef<HTMLParagraphElement, HeaderNameProps>(
  function HeaderName({ siteTitle, siteDescription, postTitle, onClick }, ref) {
    return (
      <p
        ref={ref}
        className='header-name capture-pointer-events ml-2 grid-cols-1 grid-rows-1 items-center font-medium text-gray-600 dark:text-gray-300'
        // onClick={onClick}
      >
        {postTitle && (
          <span className='post-title col-start-1 row-start-1'>
            {postTitle}
          </span>
        )}
        <span className='col-start-1 row-start-1'>
          <span className='site-title'>{siteTitle}</span>
          <span className='site-description font-normal'>
            , {siteDescription}
          </span>
        </span>
      </p>
    )
  },
)

export default Layout
