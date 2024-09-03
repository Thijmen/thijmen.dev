import type { FieldHook } from "payload";

export const formatSlug = (val: string | undefined): string =>
	(val || "")
		.replace(/ /g, "-")
		.replace(/[^\w-]+/g, "")
		.toLowerCase();

export const formatSlugHook =
	(fallback: string): FieldHook =>
	({ data, operation, originalDoc, value }) => {
		console.log({ data, operation, originalDoc, value });
		const typevalue = typeof value;
		console.log("typevalue", typevalue);
		if (typeof value === "string") {
			return formatSlug(value);
		}

		if (operation === "create" || !data?.slug) {
			const fallbackData = data?.[fallback] || data?.[fallback];

			if (fallbackData && typeof fallbackData === "string") {
				return formatSlug(fallbackData);
			}
		}

		return value;
	};
