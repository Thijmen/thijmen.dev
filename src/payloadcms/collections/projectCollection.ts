import { CollectionConfig } from 'payload/types'

export const ProjectCollection: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Project info',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
            },
            {
              name: 'isFeatured',
              type: 'checkbox',
              label: 'Is Featured Project',
              admin: {},
            },
            {
              name: 'stacks',
              type: 'relationship',
              relationTo: 'stacks',
              hasMany: true,
            },
            {
              name: 'introduction',
              type: 'text',
            },
          ],
        },
        {
          label: 'Assets',
          fields: [
            {
              name: 'headerImage',
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
          label: 'Detail',
          fields: [
            {
              name: 'githubLink',
              type: 'text',
              label: 'Github Link',
            },
            {
              name: 'liveLink',
              type: 'text',
              label: 'Live Link',
            },
            {
              name: 'description',
              type: 'code',
              admin: {
                language: 'markdown',
              },
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
