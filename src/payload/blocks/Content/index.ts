import type { Block, Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical' // Rich Text Editor configuration

// Rich Text Editor configuration
const richTextEditor = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures,
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
})

// Define individual block types
const textBlock: Field = {
  type: 'group',
  name: 'textGroup',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
    },
    {
      name: 'content',
      type: 'richText',
      editor: richTextEditor,
    },
  ],
}

const codeBlock: Field = {
  name: 'code',
  type: 'code',
  admin: {
    language: 'javascript',
  },
}

const imageBlock: Field = {
  name: 'image',
  type: 'upload',
  relationTo: 'r2-media',
}

const customComponentBlock: Field = {
  name: 'customComponent',
  type: 'select',
  options: [
    { label: 'Component A', value: 'componentA' },
    { label: 'Component B', value: 'componentB' },
    // Add more custom components as needed
  ],
}

// Content block with flexible layout
export const Content: Block = {
  slug: 'content',
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        {
          slug: 'text',
          fields: [textBlock],
        },
        {
          slug: 'code',
          fields: [codeBlock],
        },
        {
          slug: 'image',
          fields: [imageBlock],
        },
        {
          slug: 'customComponent',
          fields: [customComponentBlock],
        },
      ],
    },
  ],
}
