import { Block, CollectionConfig } from 'payload/types'

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
  admin: {
    useAsTitle: 'title',
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
      ],
    },
  ],
}
