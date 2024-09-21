import { BsLaptop, BsPhone } from 'react-icons/bs'

import type { DeviceInfoProps } from '../types/spotify'

const iconSize = 24
const iconClassName = 'w-auto text-neutral-700 dark:text-neutral-300'

export const PAIR_DEVICES: Record<string, DeviceInfoProps> = {
	Computer: {
		icon: <BsLaptop className={iconClassName} size={iconSize} />,
		model: 'MacBook Pro M1',
		id: 'thijmen-macbook',
	},
	Smartphone: {
		icon: <BsPhone className={iconClassName} size={iconSize} />,
		model: 'Samsung S23 Ultra',
		id: 'thijmen-phone',
	},
}
