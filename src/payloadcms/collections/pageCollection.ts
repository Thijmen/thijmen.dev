import { CollectionConfig } from 'payload/types'

export const PageCollection: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
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
      name: 'content',
      type: 'code',
      admin: {
        language: 'markdown',
      },
      required: true,
    },
  ],
}
