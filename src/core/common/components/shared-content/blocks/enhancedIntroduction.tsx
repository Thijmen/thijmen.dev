'use client'
import type { MyHomepageIntroductionBlock } from '@/payload/payload-types'
import Mdx from '../../elements/mdx/Mdx'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { Link } from '../../elements/Link'
import { useEffect, useState } from 'react'

export const EnhancedIntroductionBlock: React.FC<MyHomepageIntroductionBlock> = ({
  heading,
  subheading,
  content,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative overflow-hidden rounded-xl p-8 border border-neutral-800/10 dark:border-white/10">
      {/* Futuristic background with mesh gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-teal-500/5 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-teal-500/20 animate-gradient"></div>

      {/* Glassmorphism card effect */}
      <div className="absolute inset-0 backdrop-blur-[2px] bg-white/40 dark:bg-black/40"></div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="url(#smallGrid)" />
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Interactive glow that follows cursor */}
      <div
        className="absolute h-64 w-64 rounded-full bg-teal-400/20 blur-3xl filter mix-blend-multiply dark:mix-blend-lighten animate-pulse-glow pointer-events-none"
        style={{
          left: `calc(${mousePosition.x}px - 32rem)`,
          top: `calc(${mousePosition.y}px - 32rem)`,
          transition:
            'left 0.5s cubic-bezier(0.22, 1, 0.36, 1), top 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      ></div>

      {/* Accent elements */}
      <div className="absolute -right-20 top-40 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl filter"></div>
      <div className="absolute left-40 -bottom-20 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl filter"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 h-20 w-20 overflow-hidden">
        <div className="absolute -right-10 -top-10 h-20 w-20 rotate-45 border-b-2 border-r-2 border-teal-500/30"></div>
      </div>
      <div className="absolute bottom-0 left-0 h-20 w-20 overflow-hidden">
        <div className="absolute -left-10 -bottom-10 h-20 w-20 rotate-45 border-t-2 border-l-2 border-indigo-500/30"></div>
      </div>

      <div className="relative z-10">
        {/* Futuristic badge */}
        <div className="mb-6 flex justify-between items-center">
          <div className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 px-4 py-1.5 text-sm font-medium text-white">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
            </span>
            <span>Lead Engineer • 2025</span>
          </div>

          {/* Social links in a modern pill */}
          <div className="hidden md:flex items-center gap-1 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-full p-1 border border-white/10 dark:border-white/5">
            <Link
              href="https://github.com/Thijmen"
              target="_blank"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-neutral-700 transition-colors hover:bg-white/20 dark:text-neutral-300 dark:hover:text-white"
              aria-label="GitHub Profile"
            >
              <FaGithub size={16} />
            </Link>
            <Link
              href="https://linkedin.com/in/thijmen"
              target="_blank"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-neutral-700 transition-colors hover:bg-white/20 dark:text-neutral-300 dark:hover:text-white"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin size={16} />
            </Link>
            <Link
              href="https://twitter.com/thijmen"
              target="_blank"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-neutral-700 transition-colors hover:bg-white/20 dark:text-neutral-300 dark:hover:text-white"
              aria-label="Twitter Profile"
            >
              <FaTwitter size={16} />
            </Link>
            <Link
              href="mailto:contact@thijmen.dev"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-neutral-700 transition-colors hover:bg-white/20 dark:text-neutral-300 dark:hover:text-white"
              aria-label="Email Contact"
            >
              <MdEmail size={16} />
            </Link>
          </div>
        </div>

        {/* Main heading with animated gradient text */}
        <div className="mb-4">
          <h1 className="font-sora text-4xl font-bold md:text-5xl lg:text-6xl">
            <span className="inline-block animate-text-gradient bg-gradient-to-r from-teal-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent bg-[length:200%_auto]">
              {heading}
            </span>
            <span className="ml-2 animate-waving-hand text-3xl md:text-4xl">👋</span>
          </h1>
          <p className="mt-3 text-lg font-medium text-neutral-700 dark:text-neutral-300">
            {subheading} <span className="ml-1">🇳🇱</span>
          </p>
        </div>

        {/* Tech stack with animated hover effects */}
        <div className="mb-8 flex flex-wrap gap-2">
          {['TypeScript', 'React', 'Node.js', 'Next.js', 'GraphQL'].map((tech, index) => (
            <span
              key={tech}
              className="group relative overflow-hidden rounded-md border border-neutral-200 bg-white/50 px-3 py-1.5 text-sm font-medium text-neutral-800 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-teal-500 hover:shadow-md dark:border-neutral-800 dark:bg-black/50 dark:text-neutral-200 dark:hover:border-teal-400"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="relative z-10">{tech}</span>
              <span className="absolute inset-0 -z-10 translate-y-full bg-gradient-to-r from-teal-500/10 to-indigo-500/10 transition-transform duration-300 group-hover:translate-y-0 dark:from-teal-500/20 dark:to-indigo-500/20"></span>
            </span>
          ))}
        </div>

        {/* Bio content with modern styling */}
        <div className="relative mb-8 rounded-lg border border-neutral-200/50 bg-white/30 p-6 backdrop-blur-sm dark:border-neutral-800/50 dark:bg-black/30">
          <div className="absolute -right-1 -top-1 h-3 w-3 border-r-2 border-t-2 border-teal-500"></div>
          <div className="absolute -left-1 -bottom-1 h-3 w-3 border-l-2 border-b-2 border-indigo-500"></div>
          <div className="prose prose-neutral max-w-none dark:prose-invert">
            <Mdx code={content} />
          </div>
        </div>

        {/* Mobile social links */}
        <div className="mb-6 flex md:hidden gap-2">
          <Link
            href="https://github.com/Thijmen"
            target="_blank"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-neutral-700 transition-colors hover:bg-white/20 backdrop-blur-sm border border-white/10 dark:text-neutral-300 dark:hover:text-white"
            aria-label="GitHub Profile"
          >
            <FaGithub size={18} />
          </Link>
          <Link
            href="https://linkedin.com/in/thijmen"
            target="_blank"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-neutral-700 transition-colors hover:bg-white/20 backdrop-blur-sm border border-white/10 dark:text-neutral-300 dark:hover:text-white"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin size={18} />
          </Link>
          <Link
            href="https://twitter.com/thijmen"
            target="_blank"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-neutral-700 transition-colors hover:bg-white/20 backdrop-blur-sm border border-white/10 dark:text-neutral-300 dark:hover:text-white"
            aria-label="Twitter Profile"
          >
            <FaTwitter size={18} />
          </Link>
          <Link
            href="mailto:contact@thijmen.dev"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-neutral-700 transition-colors hover:bg-white/20 backdrop-blur-sm border border-white/10 dark:text-neutral-300 dark:hover:text-white"
            aria-label="Email Contact"
          >
            <MdEmail size={18} />
          </Link>
        </div>

        {/* Modern CTA buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/projects"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-teal-500 to-indigo-500 p-0.5 text-sm font-medium text-white transition-all hover:shadow-lg"
          >
            <span className="relative flex w-full items-center justify-center gap-2 rounded-[0.25rem] bg-white px-5 py-2.5 text-neutral-900 transition-all duration-300 ease-out group-hover:bg-opacity-0 group-hover:text-white dark:bg-neutral-900 dark:text-white">
              <span>View My Projects</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Link>
          <Link
            href="https://github.com/Thijmen/thijmen.dev"
            target="_blank"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-white p-0.5 text-sm font-medium transition-all hover:border-neutral-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
          >
            <span className="relative flex w-full items-center justify-center gap-2 px-5 py-2.5 text-neutral-800 dark:text-neutral-200">
              <FaGithub
                size={16}
                className="transition-transform duration-300 group-hover:rotate-12"
              />
              <span>View Source</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
