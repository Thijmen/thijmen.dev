import { motion } from 'framer-motion'
import type { FC } from 'react'

import Breakline from '../elements/Breakline'
import Navigation from './Navigation'

const MobileMenu: FC = () => {
	return (
		<motion.div
			className='my-3 flex h-screen flex-col'
			initial={{ y: -100 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div>
				<Breakline className='mt-2' />
				<Navigation />
			</div>
		</motion.div>
	)
}

export default MobileMenu
