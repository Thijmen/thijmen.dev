import Mdx from '@/core/common/components/elements/mdx/Mdx'

interface PageHeadingProps {
	title: string
	description?: string | null
	md?: string | null
}

const PageHeading = ({ title, description, md }: PageHeadingProps) => {
	return (
		<>
			<h1 className='font-sora text-2xl font-medium'>{title}</h1>
			{description && (
				<p className='mb-6 border-b border-dashed border-neutral-600 pb-6 pt-2 text-neutral-600 dark:text-neutral-400'>
					{description}
				</p>
			)}
			{md && (
				<div className='mb-6 border-b border-dashed border-neutral-600 pb-6 pt-2 text-neutral-600 dark:text-neutral-400'>
					<Mdx content={md} />
				</div>
			)}
		</>
	)
}

export default PageHeading
