import type { MyHomepageIntroductionBlock } from '@/payload/payload-types'
import Mdx from '../../elements/mdx/Mdx'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { Link } from '../../elements/Link'

export const EnhancedIntroductionBlock: React.FC<MyHomepageIntroductionBlock> = ({
  heading,
  subheading,
  content,
}) => {
  return (
    <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-50 p-8 shadow-lg animate-gradient dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {/* Abstract tech pattern overlay */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="smallGrid"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 8 0 L 0 0 0 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
            <pattern
              id="grid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <rect width="80" height="80" fill="url(#smallGrid)" />
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Glowing accent */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-teal-500/20 blur-3xl filter animate-pulse-glow"></div>
      <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl filter animate-pulse-glow"></div>

      <div className="relative z-10">
        {/* Header section */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div>
            <div className="mb-2 inline-block rounded-full bg-teal-500/10 px-3 py-1 text-sm font-medium text-teal-600 dark:bg-teal-500/20 dark:text-teal-300">
              Lead Engineer
            </div>
            <div className="flex items-center gap-3">
              <h1 className="font-sora text-3xl font-bold text-neutral-900 dark:text-white md:text-4xl">
                {heading}
              </h1>
              <div className="animate-waving-hand text-2xl md:text-3xl">👋</div>
            </div>
            <p className="mt-2 text-lg font-medium text-neutral-700 dark:text-neutral-300">
              {subheading} <span className="ml-1">🇳🇱</span>
            </p>
          </div>
          
          {/* Social links */}
          <div className="mt-4 flex gap-3 md:mt-0">
            <Link
              href="https://github.com/Thijmen"
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 transition-colors hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              aria-label="GitHub Profile"
            >
              <FaGithub size={20} />
            </Link>
            <Link
              href="https://linkedin.com/in/thijmen"
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 transition-colors hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin size={20} />
            </Link>
            <Link
              href="https://twitter.com/thijmen"
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 transition-colors hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              aria-label="Twitter Profile"
            >
              <FaTwitter size={20} />
            </Link>
            <Link
              href="mailto:contact@thijmen.dev"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 transition-colors hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              aria-label="Email Contact"
            >
              <MdEmail size={20} />
            </Link>
          </div>
        </div>

        {/* Tech badges */}
        <div className="mb-6 flex flex-wrap gap-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {['TypeScript', 'React', 'Node.js', 'Next.js', 'GraphQL'].map((tech, index) => (
            <span
              key={tech}
              className="rounded-full bg-neutral-200/80 px-3 py-1 text-sm font-medium text-neutral-800 backdrop-blur-sm dark:bg-neutral-800/80 dark:text-neutral-200"
              style={{ animationDelay: `${0.2 + index * 0.05}s` }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bio content */}
        <div className="prose prose-neutral max-w-none animate-fade-in-up dark:prose-invert" style={{ animationDelay: '0.3s' }}>
          <Mdx code={content} />
        </div>

        {/* Call to action */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-center font-medium text-white shadow-md transition-all hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:bg-teal-500 dark:hover:bg-teal-600"
          >
            View My Projects
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <Link
            href="https://github.com/Thijmen/thijmen.dev"
            target="_blank"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-center font-medium text-neutral-700 shadow-sm transition-all hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            <FaGithub size={18} />
            View Source
          </Link>
        </div>
      </div>
    </section>
  )
}
