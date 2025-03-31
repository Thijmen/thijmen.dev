'use client'

import type { MyImageBlock, R2Media } from '@/payload/payload-types'

export const ImageBlock: React.FC<MyImageBlock> = ({
	image,
	caption,
	altText,
}) => {
	if (!image) {
		return null
	}

	const imageUrl = (image as R2Media).url || ''

	return (
		<figure className='my-10 mx-auto max-w-4xl'>
			<div className='overflow-hidden'>
				<img
					src={imageUrl}
					alt={altText}
					className='w-full h-auto object-cover rounded-md'
					loading='lazy'
				/>
			</div>

			{caption && (
				<figcaption className='mt-1 text-center text-sm text-gray-500 dark:text-gray-400 italic px-4'>
					{caption}
				</figcaption>
			)}
		</figure>
	)
}
