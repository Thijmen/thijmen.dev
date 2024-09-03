import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

/**
 * Set the default language for code blocks if not specified.
 */
export const remarkCode: Plugin = () => {
	return (tree) => {
		// biome-ignore lint/suspicious/noExplicitAny: TODO: fix me
		visit(tree, "code", (node: any) => {
			if (node.type !== "code") return;
			if (!node.lang) node.lang = "plaintext";
		});
	};
};
