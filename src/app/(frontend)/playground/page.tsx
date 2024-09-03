import Container from "@/core/common/components/elements/Container";
import Layout from "@/core/common/components/layouts";
import Playground from "@/core/modules/playground";

const PlaygroundPage = () => {
	return (
		<Layout>
			<Container className="!mt-0 pt-20 md:pt-0" data-aos="fade-up">
				<Playground id="playground" isHeading />
			</Container>
		</Layout>
	);
};

export default PlaygroundPage;
