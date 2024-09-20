import { GlobalConfig } from "payload";

export const Nav: GlobalConfig = {
	slug: "nav",
	label: "Navigation",
	fields: [
		{
			name: "links",
			label: "Links",
			type: "array",
			minRows: 1,
			fields: [
				{
					name: "label",
					label: "Label",
					type: "text",
				},
				{
					name: "icon",
					label: "Icon",
					type: "text",
				},
				{
					name: "page",
					type: "relationship",
					relationTo: ["pages", "projects"], // "pages" is the slug of an existing collection
					required: false,
				},
				{
					name: "url",
					type: "text",
					label: "URL",
					required: false,
				},
			],
		},
	],
};
