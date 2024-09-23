import { getGithubStars } from '@/core/services/github'
import type { MyGithubStarsBlock } from '@/payload/payload-types'
import { Star } from 'lucide-react'

const starredRepos = [
	{
		id: 1,
		name: 'react',
		owner: 'facebook',
		description:
			'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
		language: 'JavaScript',
		stars: 188000,
		forks: 38900,
	},
	{
		id: 2,
		name: 'vue',
		owner: 'vuejs',
		description:
			'Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.',
		language: 'JavaScript',
		stars: 197000,
		forks: 32100,
	},
	{
		id: 3,
		name: 'tensorflow',
		owner: 'tensorflow',
		description: 'An Open Source Machine Learning Framework for Everyone',
		language: 'Python',
		stars: 166000,
		forks: 87200,
	},
]

const LanguageColor = ({ color }) => {
	return (
		<span
			className='inline-block w-3 h-3 rounded-full mr-1'
			style={{ backgroundColor: color }}
		/>
	)
}
export const GithubStarsBlock = async ({
	block,
}: { block: MyGithubStarsBlock }) => {
	const stars = await getGithubStars('personal')
	return (
		<div className='max-w-3xl mx-auto p-4'>
			<h2 className='text-2xl font-semibold mb-4 dark:text-white'>
				Starred Repositories
			</h2>
			<ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				{stars.stars.map((repo) => (
					<li
						key={repo.id}
						className='border border-gray-200 dark:border-gray-700 rounded-md p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150 flex flex-col justify-between'
					>
						<div>
							<h3 className='text-xl font-semibold text-blue-600 dark:text-blue-400'>
								<a href={repo.url} className='hover:underline'>
									{repo.name}
								</a>
							</h3>
							<p className='text-gray-600 dark:text-gray-300 mt-1'>
								{repo.description}
							</p>
							<div className='flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400'>
								{repo.primaryLanguage && (
									<span className='flex items-center'>
										<LanguageColor color={repo.primaryLanguage.color} />
										{repo.primaryLanguage.name}
									</span>
								)}
								<span className='flex items-center'>
									<Star size={16} className='mr-1' />
									{repo.stargazerCount.toLocaleString()}
								</span>
							</div>
						</div>
						<div className='mt-4'>
							<button
								type='button'
								className='text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 transition-colors duration-150'
							>
								<Star size={16} className='inline mr-1' />
								Unstar
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
