'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import type { MyImageSlideshowBlock } from '@/payload/payload-types'
import cn from '../../../libs/cn'
import useIsMobile from '@/core/common/hooks/useIsMobile'
import '@/core/common/styles/grid-pattern.css'

export const ImageSlideshowBlock: React.FC<MyImageSlideshowBlock> = ({
  description,
  slides,
  settings,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const slideshowRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const totalSlides = slides?.length || 0
  const showDots = settings?.showDots !== false
  const showArrows = settings?.showArrows !== false
  const autoplay = settings?.autoplay === true
  const autoplaySpeed = settings?.autoplaySpeed || 5000

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const handleDotClick = (index: number) => {
    setCurrentSlide(index)
  }

  // Touch event handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      handleNext()
    } else if (isRightSwipe) {
      handlePrev()
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isHovering) {
        if (e.key === 'ArrowLeft') {
          handlePrev()
        } else if (e.key === 'ArrowRight') {
          handleNext()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isHovering, handlePrev, handleNext])

  // Autoplay
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (autoplay && !isHovering) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides)
      }, autoplaySpeed)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoplay, autoplaySpeed, totalSlides, isHovering])

  if (!slides || slides.length === 0) {
    return null
  }

  return (
    <div
      ref={slideshowRef}
      className="relative my-8 overflow-hidden rounded-xl bg-gradient-to-br from-indigo-50/90 via-white/95 to-teal-50/90 p-6 backdrop-blur-sm dark:from-indigo-950/40 dark:via-gray-900/40 dark:to-teal-950/40 border border-indigo-100/30 dark:border-indigo-800/30 shadow-xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label={description || 'Image slideshow'}
    >
      {/* Tech-inspired decorative elements */}
      <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-teal-500/10 blur-2xl" />
      <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl" />
      <div className="absolute right-12 top-0 h-1 w-16 bg-gradient-to-r from-teal-500/0 via-teal-500/50 to-teal-500/0" />
      <div className="absolute left-12 bottom-0 h-1 w-16 bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-indigo-500/0" />

      {description && (
        <div className="mb-6 text-center relative">
          <h3 className="text-xl font-sora font-medium bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">
            {description}
          </h3>
        </div>
      )}

      <div
        className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg border border-indigo-100/30 dark:border-indigo-800/30"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 z-10 h-1.5 w-full bg-gray-200/30 dark:bg-gray-800/30">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-indigo-600 transition-all duration-300 shadow-sm"
            style={{
              width: `${((currentSlide + 1) / totalSlides) * 100}%`,
              transition: 'width 0.3s ease-in-out',
            }}
          />
        </div>

        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative min-w-full"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${totalSlides}: ${slide.caption}`}
              aria-hidden={currentSlide !== index}
            >
              {slide.image && (
                <div className="relative aspect-video w-full">
                  <img
                    src={slide.image.url || ''}
                    alt={slide.caption || 'Slideshow image'}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-10 pb-4 px-5">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1 h-12 w-1.5 bg-gradient-to-b from-teal-400 to-indigo-600 rounded-full shadow-md" />
                      <div>
                        <h4 className="font-sora text-xl font-medium text-white drop-shadow-md">
                          {slide.caption}
                        </h4>
                        {slide.description && (
                          <p className="mt-2 font-mono text-sm text-white opacity-90 drop-shadow-sm leading-relaxed">
                            {slide.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tech-inspired overlay pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        {showArrows && (
          <>
            <button
              onClick={handlePrev}
              type="button"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-lg bg-black/50 p-2 text-white backdrop-blur-md transition-all hover:bg-indigo-600/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-lg"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-black/50 p-2 text-white backdrop-blur-md transition-all hover:bg-indigo-600/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-lg"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}
      </div>

      {showDots && totalSlides > 1 && (
        <div className="mt-5 flex justify-center space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              type="button"
              onClick={() => handleDotClick(index)}
              className={cn(
                'h-2 rounded-full transition-all shadow-sm',
                currentSlide === index
                  ? 'bg-gradient-to-r from-teal-500 to-indigo-600 w-8'
                  : 'bg-gray-300 w-3 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500',
              )}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentSlide === index ? 'true' : 'false'}
            />
          ))}
        </div>
      )}

      {/* Keyboard navigation hint - only show on desktop */}
      {isHovering && !isMobile && (
        <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] font-mono text-gray-600 dark:text-gray-300 opacity-80 bg-white/10 dark:bg-black/10 backdrop-blur-sm px-2 py-1 rounded">
          <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700">
            ←
          </kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700">
            →
          </kbd>
          <span>to navigate</span>
        </div>
      )}

      {/* Mobile swipe hint - only show on mobile */}
      {isMobile && (
        <div className="mt-3 text-center text-[10px] font-mono text-gray-600 dark:text-gray-300 opacity-80">
          <span>/* swipe to navigate */</span>
        </div>
      )}
    </div>
  )
}
