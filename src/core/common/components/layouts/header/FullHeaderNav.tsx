import { MENU_ITEMS } from '@/core/common/constant/menu'
import { Link } from '@/core/common/components/elements/Link'
import { forwardRef, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'

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
            className='nav ml-4 block font-sora text-black dark:text-gray-50'
          >
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const FullHeaderNav = ({ title }: { title: string }) => {
  const titleRef = useRef<HTMLParagraphElement>(null)
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
          <Link href='/public' aria-label='Hello'>
            <Image
              src={'/images/thijmen.png'}
              width={24}
              height={24}
              alt={''}
            />
          </Link>
          <HeaderName
            ref={titleRef}
            siteTitle={'Thijmen.dev'}
            siteDescription={'Description'}
            postTitle={title}
            onClick={() => console.log('clicked!')}
          />
        </div>
        <NavBar />
      </div>
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
          <span className='post-title col-start-1 row-start-1 font-sora'>
            {postTitle}
          </span>
        )}
        <span className='col-start-1 row-start-1'>
          <span className='site-title font-sora'>{siteTitle}</span>
        </span>
      </p>
    )
  },
)
