import { CollectionConfig } from 'payload/types'

export const StackCollection: CollectionConfig = {
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
