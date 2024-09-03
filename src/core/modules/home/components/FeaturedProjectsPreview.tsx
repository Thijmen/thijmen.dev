import Link from "next/link";
import { BsArrowRightShort as ViewAllIcon } from "react-icons/bs";

import SectionHeading from "@/core/common/components/elements/SectionHeading";
import SectionSubHeading from "@/core/common/components/elements/SectionSubHeading";

import { Project } from "../../../../payload/payload-types";
import FeaturedProjectsCarousel from "./FeaturedProjectsCarousel";

interface Props {
	projects: Project[];
}

const FeaturedProjectsPreview = (props: Props) => {
	return (
		<section className="space-y-6">
			<div className="flex items-center justify-between">
				<SectionHeading title="Featured projects" className="ml-1" />
				<SectionSubHeading>
					<Link href="/projects">
						<div className="mt-1 flex cursor-pointer gap-1 text-sm text-neutral-700 transition-all duration-300 hover:gap-3 hover:text-neutral-700 dark:text-neutral-400 hover:dark:text-neutral-300">
							<div className="flex">
								View all <span className="ml-1 hidden sm:block">projects</span>
							</div>
							<ViewAllIcon size={22} />
						</div>
					</Link>
				</SectionSubHeading>
			</div>
			<FeaturedProjectsCarousel {...props} />
		</section>
	);
};

export default FeaturedProjectsPreview;
