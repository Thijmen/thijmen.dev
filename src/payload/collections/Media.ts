import { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
	slug: "r2-media",
	labels: {
		singular: "Media R2",
		plural: "Media R2",
	},
	upload: {
		imageSizes: [
			{
				name: "projectCard",
				width: 326,
				height: 400,
				generateImageName: ({ height, sizeName, extension, width }) => {
					return `custom-${sizeName}-${height}-${width}.${extension}`;
				},
			},
		],
	},
	fields: [
		{
			name: "title",
			type: "text",
		},
	],
};
