import { Block, CollectionConfig } from 'payload'
import { generatePreviewPath } from '@/payloadcms/utilities/generatePreviewPath'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { authenticated } from '@/payloadcms/access/authenticated'
import { authenticatedOrPublished } from '@/payloadcms/access/authenticatedOrPublished'
import { revalidateBlog } from '@/payloadcms/collections/blogs/hooks/revalidateBlog'

const blockMarkdown: Block = {
  slug: 'block-markdown',
  admin: {},
  fields: [
    {
      name: 'header',
      type: 'text',
    },
    {
      name: 'content',
      type: 'code',
      admin: {
        language: 'markdown',
      },
    },
  ],
}

export const BlogCollection: CollectionConfig = {
  slug: 'blogs',
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'isFeatured'],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          path: `/blog/${typeof data?.slug === 'string' ? data.slug : ''}`,
        })
        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
      },
    },
    preview: (doc) =>
      generatePreviewPath({
        path: `/blog/${typeof doc?.slug === 'string' ? doc.slug : ''}`,
      }),
  },
  hooks: {
    afterChange: [revalidateBlog],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Blog Info',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              unique: true,
              required: true,
            },
            {
              name: 'isFeatured',
              type: 'checkbox',
              label: 'Is Featured Blog',
              admin: {},
            },
            {
              name: 'description',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          label: 'Assets',
          fields: [
            {
              name: 'image',
              type: 'upload',
              label: 'Header Image',
              relationTo: 'r2-media',
              filterOptions: {
                mimeType: { contains: 'image' },
              },
            },
          ],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [blockMarkdown],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'r2-media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
  ],
}
