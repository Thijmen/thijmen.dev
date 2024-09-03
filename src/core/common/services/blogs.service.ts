import { Post } from "@/payload/payload-types";
import configPromise from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import { draftMode } from "next/headers";

export const getPosts = async (limit: number): Promise<Post[]> => {
	const payload = await getPayloadHMR({ config: configPromise });

	const data = await payload.find({
		collection: "posts",
		limit,
	});

	return data.docs;
};

export const getNewBlog = async (slug: string): Promise<Post | null> => {
	const { isEnabled: draft } = draftMode();

	const payload = await getPayloadHMR({ config: configPromise });

	const data = await payload.find({
		collection: "posts",
		draft,
		overrideAccess: true,
		where: {
			slug: {
				equals: slug,
			},
		},
		limit: 1,
	});

	return data.docs?.[0] || null;
};
