'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { VscBook as BookIcon } from 'react-icons/vsc'
import { VscCode as CodeIcon } from 'react-icons/vsc'
import cn from '../../libs/cn'

type CardVariant = 'project' | 'post'

interface CardRootProps {
	variant: CardVariant
	href: string
	children: ReactNode
	className?: string
}

interface CardHeaderProps {
	variant: CardVariant
	children?: ReactNode
	className?: string
}

interface CardTitleProps {
	variant: CardVariant
	children: ReactNode
	className?: string
}

interface CardDescriptionProps {
	children: ReactNode
	className?: string
}

interface CardLabelProps {
	variant: CardVariant
	children: ReactNode
	className?: string
}

interface CardTagsProps {
	variant: CardVariant
	tags: string[]
	label?: string
	className?: string
}

interface CardContentProps {
	children: ReactNode
	className?: string
}

interface CardFooterProps {
	children: ReactNode
	className?: string
}

const variantStyles = {
	project: {
		card: 'hover:shadow-teal-500/20',
		tag: 'border-teal-500',
		hover: 'group-hover:text-teal-600 dark:group-hover:text-teal-400',
		badge: 'bg-teal-500',
		gradient: 'from-teal-600 to-blue-700',
		icon: CodeIcon,
		glow: {
			first: 'from-teal-400 to-blue-500',
			second: 'from-purple-400 to-teal-500',
		},
		header: {
			height: '200px',
			bg: 'bg-gradient-to-br from-teal-600 to-blue-700',
		},
		label: {
			bg: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
		},
	},
	post: {
		card: 'hover:shadow-indigo-500/20',
		tag: 'border-indigo-500',
		hover: 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
		badge: 'bg-indigo-500',
		gradient: 'from-indigo-600 to-purple-700',
		icon: BookIcon,
		glow: {
			first: 'from-indigo-400 to-blue-500',
			second: 'from-purple-400 to-indigo-500',
		},
		header: {
			height: '60px',
			bg: 'bg-gradient-to-br from-indigo-600 to-purple-700',
		},
		label: {
			bg: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
		},
	},
}

export function Card({ variant, href, children, className }: CardRootProps) {
	return (
		<Link href={href}>
			<article
				className={cn(
					'group relative flex h-[380px] w-full flex-col rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden',
					variantStyles[variant].card,
					className,
				)}
			>
				{children}
				{/* Decorative glowing elements */}
				<div
					className={cn(
						'absolute -left-6 top-20 h-12 w-12 rounded-full bg-gradient-to-r opacity-40 blur-xl',
						variantStyles[variant].glow.first,
					)}
				/>
				<div
					className={cn(
						'absolute -right-6 bottom-20 h-12 w-12 rounded-full bg-gradient-to-r opacity-40 blur-xl',
						variantStyles[variant].glow.second,
					)}
				/>
			</article>
		</Link>
	)
}

Card.Header = function CardHeader({
	variant,
	children,
	className,
}: CardHeaderProps) {
	const Icon = variantStyles[variant].icon

	return (
		<header
			style={{ height: variantStyles[variant].header.height }}
			className={cn(
				'relative overflow-hidden',
				className,
			)}
		>
			{/* Gradient Background */}
			<div
				className={cn(
					'absolute inset-0 opacity-90 transition-opacity duration-300',
					variantStyles[variant].header.bg,
				)}
			/>
			{/* Decorative Pattern */}
			<div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.svg')] bg-repeat bg-center" />
			{/* Icon */}
			<div className="absolute top-3 right-3">
				<div
					className={cn(
						'flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800/80 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110',
						variant === 'project' ? 'text-teal-400' : 'text-indigo-400',
					)}
				>
					<Icon size={18} />
				</div>
			</div>
			{children}
		</header>
	)
}

Card.Content = function CardContent({ children, className }: CardContentProps) {
	return (
		<div
			className={cn(
				'flex flex-col justify-between flex-grow p-5 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950',
				className,
			)}
		>
			{children}
		</div>
	)
}

Card.Title = function CardTitle({
	variant,
	children,
	className,
}: CardTitleProps) {
	return (
		<h3
			className={cn(
				'font-sora text-xl font-semibold text-neutral-800 dark:text-neutral-100 transition-colors duration-300 line-clamp-2 h-[56px]',
				variantStyles[variant].hover,
				className,
			)}
		>
			{children}
		</h3>
	)
}

Card.Description = function CardDescription({
	children,
	className,
}: CardDescriptionProps) {
	return (
		<p
			className={cn(
				'mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 line-clamp-3 h-[72px]',
				className,
			)}
		>
			{children}
		</p>
	)
}

Card.Label = function CardLabel({
	variant,
	children,
	className,
}: CardLabelProps) {
	return (
		<div
			className={cn(
				'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-3',
				variantStyles[variant].label.bg,
				className,
			)}
		>
			{children}
		</div>
	)
}

Card.Tags = function CardTags({
	variant,
	tags,
	label,
	className,
}: CardTagsProps) {
	return (
		<div className={cn('flex flex-wrap gap-2 mt-3 mb-4', className)}>
			{label && (
				<div className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2 font-mono">
					{label}
				</div>
			)}
			<div className="flex flex-wrap gap-2">
				{tags.map((tag) => (
					<span
						key={tag}
						className={cn(
							'inline-flex items-center px-2 py-1 rounded-md text-xs font-mono bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-l-2',
							variantStyles[variant].tag,
						)}
					>
						{tag}
					</span>
				))}
			</div>
		</div>
	)
}

Card.Footer = function CardFooter({
	children,
	className,
}: CardFooterProps) {
	return (
		<div
			className={cn(
				'flex items-center justify-between pt-3 border-t border-neutral-200 dark:border-neutral-800',
				className,
			)}
		>
			{children}
		</div>
	)
}
