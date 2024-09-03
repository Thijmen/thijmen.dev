import Container from "@/core/common/components/elements/Container";
import PageHeading from "@/core/common/components/elements/PageHeading";
import Projects from "@/core/modules/projects";
import { Page, Project } from "../../../payload/payload-types";

const ProjectsClientsComponent = ({
	projects,
	page,
}: {
	projects: Project[];
	page: Page;
}) => {
	return (
		<>
			<Container data-aos="fade-up">
				<PageHeading title={"Projects"} md={page.title} />
				<Projects projects={projects} />
			</Container>
		</>
	);
};

export default ProjectsClientsComponent;
