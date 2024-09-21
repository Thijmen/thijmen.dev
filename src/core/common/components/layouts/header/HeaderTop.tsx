// import clsx from 'clsx'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { useContext, useState } from 'react'
// import { BiCommand as CommandIcon } from 'react-icons/bi'
// import { FiMenu as MenuIcon } from 'react-icons/fi'
// import { MdClose as CloseIcon } from 'react-icons/md'
//
// import { MENU_ITEMS } from '@/core/common/constant/menu'
// import { CommandPaletteContext } from '@/core/common/context/CommandPaletteContext'
//
// import Image from '../../elements/Image'
// import ThemeToggleButton from '../../elements/ThemeToggleButton'
// import Profile from '../../sidebar/Profile'
//
// const HeaderTop = () => {
// 	const { setIsOpen } = useContext(CommandPaletteContext)
// 	const [showMenu, setShowMenu] = useState(false)
//
// 	const pathname = usePathname()
//
// 	const menus = MENU_ITEMS.filter(
// 		(item) => item.isShow && item.title !== 'Home',
// 	)
//
// 	return (
// 		<header>
// 			<div className='fixed inset-x-0 top-4 z-40 mx-auto flex h-[60px] max-w-5xl items-center justify-between rounded-2xl bg-background/30 px-8 shadow-sm saturate-100 backdrop-blur-[10px] transition-colors'>
// 				<div className='flex items-center gap-5'>
// 					<Image
// 						src='/images/thijmen.png'
// 						alt='Thijmen Stavenuiter'
// 						width={40}
// 						height={40}
// 						rounded='rounded-full'
// 						className='rotate-3 border-2 border-neutral-400 dark:border-neutral-600 lg:hover:scale-105'
// 					/>
// 					{!showMenu && (
// 						<div className='flex items-center gap-3'>
// 							<Link href='/public' passHref>
// 								<h2 className='flex-grow font-sora text-lg font-medium lg:text-xl'>
// 									Thijmen Stavenuiter
// 								</h2>
// 							</Link>
// 						</div>
// 					)}
// 				</div>
//
// 				<div className='flex items-center justify-between gap-5'>
// 					{showMenu && (
// 						<div className='flex items-center gap-6' data-aos='flip-up'>
// 							{menus.map((menu, index) => (
// 								<Link
// 									key={menu.href}
// 									href={menu.href}
// 									passHref
// 									className={clsx(
// 										'text-neutral-700 hover:text-neutral-800 dark:text-neutral-400 hover:dark:text-neutral-100',
// 										pathname === menu?.href &&
// 											'!text-neutral-800 dark:!text-neutral-100',
// 									)}
// 								>
// 									<div>{menu.title}</div>
// 								</Link>
// 							))}
// 						</div>
// 					)}
//
// 					{!showMenu && (
// 						<>
// 							<ThemeToggleButton />
// 							<CommandIcon
// 								onClick={() => setIsOpen(true)}
// 								className='cursor-pointer'
// 								size={20}
// 							/>
// 						</>
// 					)}
//
// 					<button
// 						type='button'
// 						className='flex items-center gap-2 rounded-md border p-2 backdrop-blur dark:border-neutral-700 dark:bg-neutral-900'
// 						onClick={() => setShowMenu(!showMenu)}
// 					>
// 						{showMenu ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
// 					</button>
// 				</div>
// 			</div>
// 			<div className='block lg:hidden'>
// 				<Profile />
// 			</div>
// 		</header>
// 	)
// }
//
// export default HeaderTop
