'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import type { MyImageSlideshowBlock, R2Media } from '@/payload/payload-types'
import cn from '../../../libs/cn'
import useIsMobile from '@/core/common/hooks/useIsMobile'
import '@/core/common/styles/grid-pattern.css'
import { createPortal } from 'react-dom'

export const ImageSlideshowBlock: React.FC<MyImageSlideshowBlock> = ({
  description,
  slides,
  settings,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const slideshowRef = useRef<HTMLDivElement>(null)
  const fullscreenRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const totalSlides = slides?.length || 0
  const showDots = settings?.showDots !== false
  const showArrows = settings?.showArrows !== false
  const autoplay = settings?.autoplay === true
  const autoplaySpeed = settings?.autoplaySpeed || 5000

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }, [totalSlides])

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
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
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false)
      }
    },
    [handleNext, handlePrev, isFullscreen],
  )

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Set up autoplay
  useEffect(() => {
    if (autoplay && !isHovering) {
      const interval = setInterval(handleNext, autoplaySpeed)
      return () => clearInterval(interval)
    }
  }, [autoplay, autoplaySpeed, handleNext, isHovering])

  // Set up keyboard navigation
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  // Handle fullscreen mode focus
  useEffect(() => {
    if (isFullscreen && fullscreenRef.current) {
      fullscreenRef.current.focus()
    }
  }, [isFullscreen])

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
              <div className="relative aspect-video w-full">
                <img
                  src={(slide.image as R2Media).url || ''}
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

                {/* Fullscreen button */}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="absolute top-3 right-3 p-2 rounded-lg bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110"
                  aria-label="Open lightbox"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tech-inspired overlay pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        {showArrows && (
          <>
            <button
              type="button"
              onClick={handlePrev}
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
              type="button"
              onClick={handleNext}
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

      {/* Lightbox modal */}
      {isFullscreen &&
        createPortal(
          <div
            ref={fullscreenRef}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center backdrop-blur-lg"
            tabIndex={0}
            onClick={() => setIsFullscreen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setIsFullscreen(false)}
          >
            <div
              className="relative w-screen h-screen flex flex-col items-center justify-center p-4 md:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-black/60 hover:bg-black/80 text-white transition-all duration-200 hover:scale-110"
                aria-label="Close fullscreen"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Lightbox image container */}
              <div className="w-full h-full max-h-[85vh] relative flex items-center justify-center">
                <img
                  src={(slides[currentSlide].image as R2Media).url || ''}
                  alt={slides[currentSlide].caption || 'Fullscreen image'}
                  className="max-h-full max-w-full object-contain shadow-2xl rounded-lg"
                />

                {/* Tech-inspired overlay pattern */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
              </div>

              {/* Caption in lightbox */}
              <div className="absolute bottom-4 left-4 right-4 max-w-4xl mx-auto bg-gradient-to-r from-gray-900/90 via-black/95 to-gray-900/90 rounded-xl p-4 backdrop-blur-md border border-indigo-500/20 shadow-xl">
                <div className="flex items-start">
                  <div className="mr-3 mt-1 h-16 w-1.5 bg-gradient-to-b from-teal-400 to-indigo-600 rounded-full shadow-md" />
                  <div className="flex-1">
                    <h4 className="font-sora text-xl font-medium text-white bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text">
                      {slides[currentSlide].caption}
                    </h4>
                    {slides[currentSlide].description && (
                      <p className="mt-2 font-mono text-sm text-white/90 leading-relaxed">
                        {slides[currentSlide].description}
                      </p>
                    )}

                    {/* Image counter */}
                    <div className="mt-3 flex items-center">
                      <div className="flex items-center space-x-1 text-xs font-mono text-gray-400">
                        <span className="inline-block h-2 w-2 rounded-full bg-teal-500/70 animate-pulse" />
                        <span>{`${currentSlide + 1}/${totalSlides}`}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation arrows */}
              {showArrows && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white shadow-md transition-all hover:bg-black/80 hover:scale-110"
                    aria-label="Previous slide"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white shadow-md transition-all hover:bg-black/80 hover:scale-110"
                    aria-label="Next slide"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}
