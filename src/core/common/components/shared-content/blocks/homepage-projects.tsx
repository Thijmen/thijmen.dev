import { getProjects } from '@/core/common/services/projects.service'
import type { MyHomepageProjectsBlock } from '@/payload/payload-types'
import SectionHeading from '../../elements/SectionHeading'
import SectionSubHeading from '../../elements/SectionSubHeading'
import Link from 'next/link'
import { BsArrowRightShort as ViewAllIcon } from 'react-icons/bs'
import FeaturedProjectsCarousel from '@/core/modules/home/components/FeaturedProjectsCarousel'
export const HomepageProjectsBlock = async ({
	block,
}: { block: MyHomepageProjectsBlock }) => {
	const projects = await getProjects(block.onlyFeatured)

	return (
		<section className='space-y-6'>
			<div className='flex items-center justify-between'>
				<SectionHeading title={block.headingTitle} className='ml-1' />
				<SectionSubHeading>
					<Link href={block.linkHref}>
						<div className='mt-1 flex cursor-pointer gap-1 text-sm text-neutral-700 transition-all duration-300 hover:gap-3 hover:text-neutral-700 dark:text-neutral-400 hover:dark:text-neutral-300'>
							<div className='flex'>
								{/* biome-ignore lint/security/noDangerouslySetInnerHtml: is my own input, can be trusted */}
								<p dangerouslySetInnerHTML={{ __html: block.linkTitle }} />
							</div>
							<ViewAllIcon size={22} />
						</div>
					</Link>
				</SectionSubHeading>
			</div>
			<FeaturedProjectsCarousel projects={projects} />
		</section>
	)
}
