"use client";
import Card from "@/core/common/components/elements/Card";
import Image from "@/core/common/components/elements/Image";
import Link from "next/link";
import slugify from "slugify";
import { Project, R2Media, Stack } from "../../../../payload/payload-types";

export const FeaturedProjectItem = ({ project }: { project: Project }) => {
	const defaultImage = "/images/placeholder.png";

	const stacks = (project.stacks || []) as Stack[];

	const projectImage =
		project.headerImage != null
			? (project.headerImage as R2Media).url || defaultImage
			: defaultImage;
	return (
		<Link href={`/projects/${project.slug}`}>
			<Card className="group relative flex h-[400px] w-full flex-col rounded-lg border shadow-sm dark:border-neutral-800">
				<div
					className="relative rounded-xl duration-500"
					style={{
						height: "400px",
						overflow: "hidden",
					}}
				>
					<Image
						src={projectImage}
						alt={project.title || ""}
						fill={true}
						sizes="100vw, 100vh"
						className="h-full w-full transform object-cover object-left transition-transform duration-300 group-hover:scale-105 group-hover:blur-sm"
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black opacity-80 transition-opacity duration-300"></div>
				</div>

				<div className="absolute flex h-full flex-col justify-between space-y-4 p-5">
					<div className="flex flex-wrap gap-2">
						{stacks.map((tag) => (
							<div
								key={tag.id}
								className="rounded-full bg-neutral-900/50 px-2.5 py-1 font-mono text-xs text-neutral-400"
							>
								<span className="mr-1 font-semibold">#</span>
								{slugify(tag.title || "").toLowerCase()}
							</div>
						))}
					</div>

					<div className="flex flex-col justify-end">
						<div className="flex flex-col space-y-3">
							<h3 className="font-sora text-lg font-medium text-neutral-100 group-hover:underline group-hover:underline-offset-4 ">
								{project.title}
							</h3>

							<p className="text-sm leading-relaxed text-neutral-400">
								{project.introduction}
							</p>
						</div>
					</div>
				</div>
			</Card>
		</Link>
	);
};
