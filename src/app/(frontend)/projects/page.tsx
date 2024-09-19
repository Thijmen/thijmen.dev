import { Metadata } from "next";
import { redirect } from "next/navigation";

import ProjectsClientsComponent from "@/app/(frontend)/projects/client-component";
import Layout from "@/core/common/components/layouts";
import { queryPageBySlug } from "@/core/common/services/pages.service";
import { getNewProjects } from "@/core/common/services/projects.service";
import { generateSiteTitle } from "@/core/metadata";

const ProjectsPage = async () => {
  const page = await queryPageBySlug("projects");

  if (!page) {
    redirect("/404");
  }

  const projects = await getNewProjects();

  return (
    <Layout>
      <pre>{JSON.stringify({ page }, null, 2)}</pre>
      <ProjectsClientsComponent page={page} projects={projects} />
    </Layout>
  );
};

export async function generateMetadata(): Promise<Metadata> {
	const page = await queryPageBySlug("projects");

	return {
		title: generateSiteTitle({
			title: page?.title ?? "unknown",
		}),
	};
}

export default ProjectsPage;
export const revalidate = 60;
