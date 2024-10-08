import {
	BsEnvelopeAtFill as EmailIcon,
	BsGithub as GithubIcon,
	BsLinkedin as LinkedinIcon,
	BsTwitter as TwitterIcon,
} from 'react-icons/bs'
import {
	FiPieChart as AnalyticsIcon,
	FiRss as BlogIcon,
	FiCpu as DashboardIcon,
	FiPocket as HomeIcon,
	FiUser as ProfileIcon,
	FiCoffee as ProjectIcon,
} from 'react-icons/fi'

import { SiJavascript } from 'react-icons/si'
import type { MenuItemProps } from '../types/menu'

const iconSize = 20

export const MENU_ITEMS: MenuItemProps[] = [
	{
		title: 'Home',
		href: '/',
		icon: <HomeIcon size={iconSize} />,
		isShow: true,
		isExternal: false,
		eventName: 'Pages: Home',
		type: 'Pages',
	},
	{
		title: 'Dashboard',
		href: '/dashboard',
		icon: <DashboardIcon size={iconSize} />,
		isShow: true,
		isExternal: false,
		eventName: 'Pages: Dashboard',
		type: 'Pages',
	},
	{
		title: 'Projects',
		href: '/projects',
		icon: <ProjectIcon size={iconSize} />,
		isShow: true,
		isExternal: false,
		eventName: 'Pages: Projects',
		type: 'Pages',
	},
	{
		title: 'Blog',
		href: '/blog',
		icon: <BlogIcon size={iconSize} />,
		isShow: true,
		isExternal: false,
		eventName: 'Pages: Blog',
		type: 'Pages',
	},
	// {
	//   title: 'Learn',
	//   href: '/learn',
	//   icon: <LearnIcon size={iconSize} />,
	//   isShow: true,
	//   isExternal: false,
	//   eventName: 'Pages: Learn',
	//   type: 'Pages',
	// },
	{
		title: 'About',
		href: '/about',
		icon: <ProfileIcon size={iconSize} />,
		isShow: true,
		isExternal: false,
		eventName: 'Pages: About',
		type: 'Pages',
	},
	// {
	//   title: 'Contact',
	//   href: '/contact',
	//   icon: <ContactIcon size={iconSize} />,
	//   isShow: true,
	//   isExternal: false,
	//   eventName: 'Pages: Contact',
	//   type: 'Pages',
	// },
	// {
	//   title: 'Guestbook',
	//   href: '/guestbook',
	//   icon: <ChatIcon size={iconSize} />,
	//   isShow: true,
	//   isExternal: false,
	//   eventName: 'Pages: Chat',
	//   type: 'Pages',
	// },
	{
		title: 'Playground',
		href: '/playground',
		icon: <SiJavascript size={iconSize} />,
		isShow: true,
		isExternal: false,
		eventName: 'Pages: Playground',
		type: 'Pages',
	},
]

export const SOCIAL_MEDIA: MenuItemProps[] = [
	{
		title: 'Email',
		href: 'mailto:thijmenstavenuiter@gmail.com',
		icon: <EmailIcon size={iconSize} />,
		isShow: true,
		isExternal: true,
		eventName: 'Contact: Email',
		className: '!bg-green-600 border border dark:border-neutral-700',
		type: 'Link',
	},

	{
		title: 'Linkedin',
		href: 'https://www.linkedin.com/in/thijmenstavenuiter/',
		icon: <LinkedinIcon size={iconSize} />,
		isShow: true,
		isExternal: true,
		eventName: 'Social: Linkedin',
		className: '!bg-blue-500 border border dark:border-neutral-700',
		type: 'Link',
	},
	{
		title: 'Twitter',
		href: 'https://twitter.com/Thijmen1992',
		icon: <TwitterIcon size={iconSize} />,
		isShow: true,
		isExternal: true,
		eventName: 'Social: Twitter',
		className: '!bg-sky-500 border border dark:border-neutral-700',
		type: 'Link',
	},
	{
		title: 'Github',
		href: 'https://github.com/Thijmen',
		icon: <GithubIcon size={iconSize} />,
		isShow: true,
		isExternal: true,
		eventName: 'Social: Github',
		className: '!bg-black border border dark:border-neutral-700',
		type: 'Link',
	},
]

export const EXTERNAL_LINKS: MenuItemProps[] = [
	{
		title: 'Analytics',
		href: 'https://analytics.aulianza.com/share/LK5kiRuosw9pORLa/aulianza.id',
		icon: <AnalyticsIcon size={iconSize} />,
		isShow: true,
		isExternal: true,
		eventName: 'External Link: Analytics',
		type: 'Link',
	},
]
