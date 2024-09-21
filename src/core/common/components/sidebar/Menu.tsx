import type { MenuItemProps } from '@/core/common/types/menu'
import type { Nav } from '@/payload/payload-types'
import { DynamicMenuItem } from './DynamicMenuItem'

type MenuProps = {
	title?: string
	list: MenuItemProps[]
	navGlobal: Nav
}

const Menu = ({ title, list, navGlobal }: MenuProps) => {
	return (
		<div className='flex flex-col space-y-1'>
			{title && (
				<div className='mb-2 ml-2 mt-1 hidden font-sora text-sm text-neutral-600 dark:text-neutral-500 lg:block'>
					{title}
				</div>
			)}
			{navGlobal.links?.map((item) => (
				<DynamicMenuItem key={item.label} item={item} />
			))}
		</div>
	)
}

export default Menu
