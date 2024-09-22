import type { MyHorizontalLineBlock } from '@/payload/payload-types'
import Breakline from '../../elements/Breakline'

export const HorizontalLineBlock = ({
	block,
}: { block: MyHorizontalLineBlock }) => {
	switch (block.variant) {
		case 'dashed':
		case null:
			return (
				<div className='mb-6 border-b border-dashed border-neutral-600 pb-6 pt-2 text-neutral-600 dark:text-neutral-400' />
			)
		case 'solid':
			return <Breakline className='mb-7 mt-8' />
	}
}
