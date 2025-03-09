import type { Nav } from '@/payload/payload-types'
import type { ReactNode } from 'react'
import Sidebar from '../partials/Sidebar'

interface Props {
	navGlobal: Nav
	sidebarContent?: ReactNode
}
const HeaderSidebar = (props: Props) => {
	return (
		<header className='lg:w-1/5'>
			<Sidebar
				navGlobal={props.navGlobal}
				sidebarContent={props.sidebarContent}
			/>
		</header>
	)
}

export default HeaderSidebar
