import { notFound } from "next/navigation";

interface Props {
	disableNotFound?: boolean;
	url: string;
}

/* This component helps us with SSR based dynamic redirects */
export const PayloadRedirects: React.FC<Props> = async ({
	disableNotFound,
	url,
}) => {
	const slug = url.startsWith("/") ? url : `${url}`;

	return notFound();
};
