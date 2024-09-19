import type { Metadata } from "next";

import { PayloadRedirects } from "@/core/common/components/PayloadRedirects";
import { SharedContent } from "@/core/common/components/shared-content";
import { generateMeta } from "@/payload/utilities/generateMeta";
import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { draftMode } from "next/headers";
import { cache } from "react";
import type { Page } from "../../../payload/payload-types";

export async function generateStaticParams() {
	const payload = await getPayloadHMR({ config: configPromise });
	const pages = await payload.find({
		collection: "pages",
		draft: false,
		limit: 1000,
		overrideAccess: false,
	});

	return pages.docs
		?.filter((doc) => {
			return doc.slug !== "home";
		})
		.map(({ slug }) => slug);
}

export default async function Page({ params: { slug = "home" } }) {
	const url = "/" + slug;

	const page: Page | null = await queryPageBySlug({
		slug,
	});

	if (!page) {
		return <PayloadRedirects url={url} />;
	}

	const test = page.dynamiccontent;
	return (
		<article className="pt-16 pb-24">
			{/* Allows redirects for valid pages too */}
			<SharedContent content={test} />
		</article>
	);
}

export async function generateMetadata({
	params: { slug = "home" },
}): Promise<Metadata> {
	const page = await queryPageBySlug({
		slug,
	});

	return generateMeta({ doc: page });
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
	const { isEnabled: draft } = draftMode();

	const payload = await getPayloadHMR({ config: configPromise });

	const result = await payload.find({
		collection: "pages",
		draft,
		limit: 1,
		overrideAccess: true,
		where: {
			slug: {
				equals: slug,
			},
		},
	});

	return result.docs?.[0] || null;
});
