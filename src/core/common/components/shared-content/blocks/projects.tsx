import { getProjects } from "@/core/common/services/projects.service";
import Projects from "@/core/modules/projects";

export const ProjectsBlock = async ({
	filterFeatured,
}: {
	filterFeatured: boolean;
}) => {
	const projects = await getProjects(filterFeatured);
	return (
		<>
			<Projects projects={projects} />
		</>
	);
};
