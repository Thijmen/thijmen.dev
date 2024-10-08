import { useEffect, useRef } from 'react'

import Image from '@/core/common/components/elements/Image'
import { formatDate } from '@/core/common/helpers'
import type { CommentItemProps } from '@/core/common/types/blog'

const CommentItem = ({ body_html, created_at, user }: CommentItemProps) => {
	const contentRef = useRef<HTMLDivElement>(null)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (contentRef.current) {
			const codeElements = contentRef.current.getElementsByTagName('code')
			for (let i = 0; i < codeElements.length; i++) {
				const codeElement = codeElements[i]
				codeElement.classList.add('break-words')
				codeElement.classList.add('text-xs')
				codeElement.classList.add('whitespace-pre-wrap')
			}
		}
	}, [body_html])

	return (
		<div className='flex gap-5 break-all dark:text-neutral-400'>
			<div className='flex-shrink-0'>
				<Image
					src={user?.profile_image_90}
					alt={user?.name}
					width={40}
					height={40}
					rounded='rounded-full'
					className='border border-neutral-200 dark:border-neutral-800'
				/>
			</div>
			<div className='flex w-full flex-col gap-2 rounded-md border border-neutral-300 px-5 py-4 dark:border-neutral-700'>
				<div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
					<div className='font-medium dark:text-neutral-300'>{user?.name}</div>
					<div className='hidden dark:text-neutral-700 sm:block'>•</div>
					<div className='text-xs dark:text-neutral-500'>
						{formatDate(created_at, 'MMM dd, yyyy, HH:mm')}
					</div>
				</div>
				<div
					ref={contentRef}
					className='max-w-[600px] leading-[1.8]'
					// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
					dangerouslySetInnerHTML={{ __html: body_html }}
				/>
			</div>
		</div>
	)
}

export default CommentItem
