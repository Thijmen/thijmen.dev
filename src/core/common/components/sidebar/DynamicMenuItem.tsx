import type { Nav, Page, Project } from '@/payload/payload-types'
import {
	FiPieChart as AnalyticsIcon,
	FiRss as BlogIcon,
	FiCpu as DashboardIcon,
	FiPocket as HomeIcon,
	FiUser as ProfileIcon,
	FiCoffee as ProjectIcon,
} from 'react-icons/fi'
import MenuItem from './MenuItem'

interface Props {
	item: NonNullable<Nav['links']>[number]
}

// Define a type for the icon options
type IconOption = NonNullable<Nav['links']>[number]['icon']

// Use the IconOption type to define the iconMap
const iconMap: Record<IconOption, React.ElementType> = {
	analytics: AnalyticsIcon,
	blog: BlogIcon,
	dashboard: DashboardIcon,
	home: HomeIcon,
	profile: ProfileIcon,
	project: ProjectIcon,
}

export const DynamicMenuItem = ({ item }: Props) => {
	const getHref = () => {
		if (item.page?.relationTo === 'pages') {
			const page = item.page.value as Page
			return `/${page.slug}`
		}

		if (item.page?.relationTo === 'projects') {
			const project = item.page.value as Project
			return `/projects/${project.slug}`
		}

		return item.url || ''
	}

	const getIcon = () => {
		const IconComponent = iconMap[item.icon]
		return <IconComponent size={20} />
	}
	const href = getHref()
	const icon = getIcon()

	const isExternal = href.startsWith('http')

	return (
		<MenuItem
			isExternal={isExternal}
			href={href}
			icon={icon}
			title={item.label}
		/>
	)
}
