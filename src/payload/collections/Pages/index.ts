import { Block, CollectionConfig } from "payload";

import { authenticated } from "@/payload/access/authenticated";
import { authenticatedOrPublished } from "@/payload/access/authenticatedOrPublished";
import {
	defaultMetaTab,
	defaultVersions,
} from "@/payload/collections/defaults";
import { ThijmenContent } from "@/payload/fields/content";
import { slugField } from "@/payload/fields/slug";
import { generatePreviewPath } from "@/payload/utilities/generatePreviewPath";

export const Banner: Block = {
	slug: "banner",
	fields: [
		{
			name: "code",
			type: "code",
			admin: {
				language: "markdown",
			},
			label: false,
			required: true,
		},
	],
	interfaceName: "BannerBlock",
};

export const Pages: CollectionConfig = {
	slug: "pages",
	admin: {
		defaultColumns: ["title", "slug", "updatedAt"],
		livePreview: {
			url: ({ data }) => {
				const path = generatePreviewPath({
					path: `/${typeof data?.slug === "string" ? data.slug : ""}`,
				});
				return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`;
			},
		},
		preview: (doc) =>
			generatePreviewPath({
				path: `/${typeof doc?.slug === "string" ? doc.slug : ""}`,
			}),
		useAsTitle: "title",
	},
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticatedOrPublished,
		update: authenticated,
	},
	versions: defaultVersions,
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
		...slugField(),
		{
			type: "tabs",

			tabs: [
				{
					label: "Content",
					fields: [ThijmenContent],
				},
				defaultMetaTab,
			],
		},
	],
};
