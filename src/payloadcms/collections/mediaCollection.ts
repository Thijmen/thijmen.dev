import { CollectionConfig } from 'payload'

export const MediaCollection: CollectionConfig = {
  slug: 'r2-media',
  labels: {
    singular: 'Media R2',
    plural: 'Media R2',
  },
  upload: true,
  fields: [
    {
      name: 'title',
      type: 'text',
    },
  ],
}
