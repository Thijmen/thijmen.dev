import { authenticated } from "@/payload/access/authenticated";
import { authenticatedOrPublished } from "@/payload/access/authenticatedOrPublished";
import { revalidateProject } from "@/payload/collections/Projects/hooks/revalidateProject";
import {
	defaultMetaTab,
	defaultVersions,
} from "@/payload/collections/defaults";
import { slugField } from "@/payload/fields/slug";
import { generatePreviewPath } from "@/payload/utilities/generatePreviewPath";
import { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
	slug: "projects",
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title"],
		livePreview: {
			url: ({ data }) => {
				const path = generatePreviewPath({
					path: `/projects/${typeof data?.slug === "string" ? data.slug : ""}`,
				});
				return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`;
			},
		},
		preview: (doc) =>
			generatePreviewPath({
				path: `/projects/${typeof doc?.slug === "string" ? doc.slug : ""}`,
			}),
	},
	versions: defaultVersions,
	hooks: {
		afterChange: [revalidateProject],
	},
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticatedOrPublished,
		update: authenticated,
	},
	fields: [
		{
			type: "tabs",
			tabs: [
				{
					label: "Project info",
					fields: [
						{
							name: "title",
							type: "text",
							required: true,
						},
						...slugField(),
						{
							name: "isFeatured",
							type: "checkbox",
							label: "Is Featured Project",
							admin: {},
						},
						{
							name: "stacks",
							type: "relationship",
							relationTo: "stacks",
							hasMany: true,
						},
						{
							name: "introduction",
							type: "text",
						},
					],
				},
				{
					label: "Assets",
					fields: [
						{
							name: "headerImage",
							type: "upload",
							label: "Header Image",
							relationTo: "r2-media",
							filterOptions: {
								mimeType: { contains: "image" },
							},
						},
					],
				},
				{
					label: "Detail",
					fields: [
						{
							name: "githubLink",
							type: "text",
							label: "Github Link",
						},
						{
							name: "liveLink",
							type: "text",
							label: "Live Link",
						},
						{
							name: "description",
							type: "code",
							admin: {
								language: "markdown",
							},
							required: true,
						},
					],
				},
				defaultMetaTab,
			],
		},
	],
};
