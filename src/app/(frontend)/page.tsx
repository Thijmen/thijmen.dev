import Container from "@/core/common/components/elements/Container";
import Layout from "@/core/common/components/layouts";
import { generateSiteTitle } from "@/core/metadata";
import Home from "@/core/modules/home";
import { getCachedGlobal } from "@/core/services/globals";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: generateSiteTitle({ title: "Home" }),
	description:
		"Welcome to my personal website. I write about web development, programming, and technology.",
};
const Homepage = async () => {
	const nav = await getCachedGlobal("nav");
	return (
		<Layout navGlobal={nav}>
			<Container data-aos="fade-up">
				<Home />
			</Container>
		</Layout>
	);
};

export default Homepage;
export const revalidate = 60;
