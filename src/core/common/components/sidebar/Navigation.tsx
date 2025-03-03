import { useContext } from 'react'
import { BiCommand as CommandIcon } from 'react-icons/bi'
import { useWindowSize } from 'usehooks-ts'

import { MENU_ITEMS } from '@/core/common/constant/menu'
import { CommandPaletteContext } from '@/core/common/context/CommandPaletteContext'

import type { Nav } from '@/payload/payload-types'
import Breakline from '../elements/Breakline'
import Menu from './Menu'
import MenuItem from './MenuItem'

interface Props {
	navGlobal: Nav
}
const Navigation = (props: Props) => {
	const { setIsOpen } = useContext(CommandPaletteContext)
	const { width } = useWindowSize()
	const isMobile = width < 480

	const filterdMenu = MENU_ITEMS?.filter((item) => item?.isShow)

	const handleOpenCommandPalette = () => {
		setIsOpen(true)
	}

	return (
		<div className='relative'>
			{/* Simple navigation header */}
			<div className='mb-4'>
				<div className='text-xs font-mono text-neutral-500 dark:text-neutral-400 ml-2 tracking-wider'>
					NAVIGATION
				</div>
			</div>

			<Menu navGlobal={props.navGlobal} list={filterdMenu} />

			<Breakline className='my-3' />

			<MenuItem
				title={isMobile ? 'Command' : 'cmd + k'}
				href='#'
				icon={<CommandIcon size={20} />}
				isExternal={false}
				onClick={() => handleOpenCommandPalette()}
			>
				<div className='inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'>
					<span>TERMINAL</span>
				</div>
			</MenuItem>
		</div>
	)
}

export default Navigation
