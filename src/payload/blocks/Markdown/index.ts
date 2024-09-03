import { Block } from "payload";

export const Markdown: Block = {
	slug: "markdown",
	admin: {},
	fields: [
		{
			name: "header",
			type: "text",
		},
		{
			name: "content",
			type: "code",
			admin: {
				language: "markdown",
			},
		},
	],
};
