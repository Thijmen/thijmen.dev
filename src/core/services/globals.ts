import type { Config } from "@/payload/payload-types";

import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { cache } from "react";

type Global = keyof Config["globals"];

async function getGlobal(slug: Global, depth = 0) {
	const payload = await getPayloadHMR({ config: configPromise });

	const global = await payload.findGlobal({
		slug,
		depth,
	});

	return global;
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
// export const getCachedGlobal = (slug: Global, depth = 0) =>
//   unstable_cache(async () => getGlobal(slug, depth), [slug], {
//     tags: [`global_${slug}`],
//   });

export const getCachedGlobal = cache(async (slug: Global, depth = 0) => {
	return await getGlobal(slug, depth);
});
