import path from 'path'
import { en } from 'payload/i18n/en'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { Media } from '@/payload/collections/Media'
import { Index } from '@/payload/collections/Stacks'
import { r2Adapter } from '@/payload/adapters/r2adapter'
import { buildConfig } from 'payload'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { Blog } from '@/payload/payload-types'
import { Blogs } from '@/payload/collections/Blogs'
import { Projects } from '@/payload/collections/Projects'
import { Pages } from '@/payload/collections/Pages'
import { Users } from '@/payload/collections/Users'
import { UserSeeder } from '@/payload/collections/Users/seed'
import { StackSeeder } from '@/payload/collections/Stacks/seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle: GenerateTitle<Blog> = ({ doc }) => {
  return doc?.title
    ? `${doc.title} | Payload Website Template`
    : 'Payload Website Template'
}

const generateURL: GenerateURL<Blog> = ({ doc }) => {
  return doc?.slug
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${doc.slug}`
    : process.env.NEXT_PUBLIC_SERVER_URL
}

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Users, Projects, Index, Blogs, Pages, Media],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URI || '',
    },
  }),
  plugins: [
    cloudStoragePlugin({
      collections: {
        'r2-media': {
          adapter: r2Adapter, // see docs for the adapter you want to use
        },
      },
    }),
    seoPlugin({
      generateTitle,
      generateURL,
    }),
  ],
  /**
   * Payload can now accept specific translations from 'payload/i18n/en'
   * This is completely optional and will default to English if not provided
   */
  i18n: {
    supportedLanguages: { en },
  },

  admin: {
    user: 'users',
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  async onInit(payload) {
    await UserSeeder(payload)
    await StackSeeder(payload)
  },
  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.

  // This is temporary - we may make an adapter pattern
  // for this before reaching 3.0 stable
  sharp,
})
