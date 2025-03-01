import type { Block } from 'payload'

export const MyImageSlideshow: Block = {
	slug: 'imageSlideshow',
	labels: {
		plural: 'Image Slideshows',
		singular: 'Image Slideshow',
	},
	fields: [
		{
			name: 'description',
			type: 'text',
			label: 'Block Description',
			required: true,
		},
		{
			name: 'slides',
			type: 'array',
			label: 'Slideshow Images',
			minRows: 1,
			required: true,
			fields: [
				{
					name: 'image',
					type: 'upload',
					relationTo: 'r2-media',
					required: true,
				},
				{
					name: 'caption',
					type: 'text',
					label: 'Image Caption',
					required: true,
				},
				{
					name: 'description',
					type: 'textarea',
					label: 'Image Description',
					required: false,
				},
			],
		},
		{
			name: 'settings',
			type: 'group',
			label: 'Slideshow Settings',
			fields: [
				{
					name: 'autoplay',
					type: 'checkbox',
					label: 'Enable Autoplay',
					defaultValue: false,
				},
				{
					name: 'autoplaySpeed',
					type: 'number',
					label: 'Autoplay Speed (ms)',
					defaultValue: 5000,
					admin: {
						condition: (data, siblingData) => {
							return siblingData?.autoplay === true
						},
					},
				},
				{
					name: 'showDots',
					type: 'checkbox',
					label: 'Show Navigation Dots',
					defaultValue: true,
				},
				{
					name: 'showArrows',
					type: 'checkbox',
					label: 'Show Navigation Arrows',
					defaultValue: true,
				},
			],
		},
	],
	interfaceName: 'MyImageSlideshowBlock',
}
