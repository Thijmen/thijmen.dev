import { CollectionConfig } from 'payload'

export const Index: CollectionConfig = {
  slug: 'stacks',
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
      name: 'stackHandle',
      type: 'text',
      required: true,
    },
  ],
}
