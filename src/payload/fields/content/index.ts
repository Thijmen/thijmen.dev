import { MyGithubContributions } from '@/payload/fields/content/github-contributions'
import { MyHomepageIntroduction } from '@/payload/fields/content/homepage-introduction'
import { MyHorizontalLine } from '@/payload/fields/content/horizontal-line'
import { MyCode } from '@/payload/fields/content/my-code'
import { MyProjects } from '@/payload/fields/content/projects-overview-field'
import { MyWakaContributions } from '@/payload/fields/content/waka-statistics'
import {
	BlocksFeature,
	FixedToolbarFeature,
	HeadingFeature,
	HorizontalRuleFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Field } from 'payload'
import { MyJavascriptPlayground } from './js-playground'
import { MyHomepageProjects } from './homepage-projects'

export const ThijmenContent: Field = {
	name: 'dynamiccontent',
	type: 'richText',
	editor: lexicalEditor({
		features: ({ rootFeatures }) => {
			return [
				...rootFeatures,
				HeadingFeature({
					enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'],
				}),
				BlocksFeature({
					blocks: [
						MyCode,
						MyProjects,
						MyHorizontalLine,
						MyGithubContributions,
						MyWakaContributions,
						MyJavascriptPlayground,
						MyHomepageIntroduction,
						MyHomepageProjects,
					],
				}),
				FixedToolbarFeature(),
				InlineToolbarFeature(),
				HorizontalRuleFeature(),
			]
		},
	}),
	label: false,
}
