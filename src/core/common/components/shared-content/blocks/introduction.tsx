import type { MyHomepageIntroductionBlock } from '@/payload/payload-types'
import Mdx from '../../elements/mdx/Mdx'

export const IntroductionBlock = ({
	block,
}: { block: MyHomepageIntroductionBlock }) => {
	return (
		<section className='bg-cover bg-no-repeat '>
			<div className='space-y-3'>
				<div className='flex gap-2 font-sora text-2xl font-medium lg:text-3xl'>
					<h1>{block.heading}</h1>{' '}
					<div className='ml-1 animate-waving-hand'>👋</div>
				</div>
				<div className='space-y-4'>
					<ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-700 dark:text-neutral-400 lg:flex-row lg:gap-10'>
						<li>
							{block.subheading} <span className='ml-1'>🇳🇱</span>
						</li>
					</ul>
				</div>
			</div>

			<div className='mt-6 leading-[1.8] text-neutral-800 dark:text-neutral-300 md:leading-loose'>
				<Mdx content={block.content} />
			</div>
		</section>
	)
}
