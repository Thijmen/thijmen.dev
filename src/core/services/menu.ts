import { getCachedGlobal } from './globals'

export const getMenuItems = async () => {
	const nav = await getCachedGlobal('nav', 3)

	return nav
}
