import { Link } from '@/core/common/components/elements/Link'

const Introduction = () => {
	return (
		<section className='bg-cover bg-no-repeat '>
			<div className='space-y-3'>
				<div className='flex gap-2 font-sora text-2xl font-medium lg:text-3xl'>
					<h1>Hi, I&apos;m Thijmen</h1>{' '}
					<div className='ml-1 animate-waving-hand'>👋</div>
				</div>
				<div className='space-y-4'>
					<ul className='ml-5 flex list-disc flex-col gap-1 text-neutral-700 dark:text-neutral-400 lg:flex-row lg:gap-10'>
						<li>
							Based in Enschede, The Netherlands{' '}
							<span className='ml-1'>🇳🇱</span>
						</li>
					</ul>
				</div>
			</div>

			<p className='mt-6 leading-[1.8] text-neutral-800 dark:text-neutral-300 md:leading-loose'>
				Welcome to my website, where I try to share my knowledge and experiences
				from my day to day life. I am a software engineer with a passion for
				tech; backend, frontend and mobile! The sourcecode of this website is
				completely open source, so feel free to check it out on{' '}
				<Link
					href={'https://www.github.com/Thijmen/thijmen.dev'}
					target={'_blank'}
					variant={'article'}
				>
					Github
				</Link>
				!
			</p>
		</section>
	)
}

export default Introduction
