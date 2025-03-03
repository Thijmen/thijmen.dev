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
	},
}

export function Card({ variant, href, children, className }: CardRootProps) {
	return (
		<Link href={href}>
			<div
				className={cn(
					'group relative flex h-[400px] w-full flex-col rounded-lg border transition-all duration-300 shadow-md hover:shadow-xl dark:border-neutral-800 overflow-hidden',
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
			</div>
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
		<div
			className={cn(
				'relative rounded-t-lg duration-500 h-[200px] overflow-hidden',
				className,
			)}
		>
			<div
				className={cn(
					'absolute inset-0 bg-gradient-to-br opacity-90 transition-opacity duration-300',
					variantStyles[variant].gradient,
				)}
			/>
			<div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.svg')] bg-repeat bg-center" />
			<div className='absolute top-3 right-3 flex items-center gap-2'>
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
		</div>
	)
}

Card.Content = function CardContent({ children, className }: CardContentProps) {
	return (
		<div
			className={cn(
				'flex flex-col justify-between p-5 flex-grow bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950',
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
				'font-sora text-xl font-semibold text-neutral-800 dark:text-neutral-100 transition-colors duration-300',
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
				'mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 line-clamp-3',
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
				'mb-2 inline-block rounded-sm px-2 py-0.5 text-[10px] font-medium text-white',
				variantStyles[variant].badge,
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
	label = 'TOPICS',
	className,
}: CardTagsProps) {
	if (!tags?.length) return null

	return (
		<div className={cn('mt-auto', className)}>
			<div className='mb-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 font-mono'>
				// {label}
			</div>
			<div className='flex flex-wrap gap-2 mb-3'>
				{tags.map((tag) => (
					<div
						key={tag}
						className={cn(
							'rounded-md bg-neutral-200 dark:bg-neutral-800 px-2.5 py-1 font-mono text-xs text-neutral-700 dark:text-neutral-300 border-l-2 transition-transform duration-200 hover:scale-105',
							variantStyles[variant].tag,
						)}
					>
						{tag.toLowerCase()}
					</div>
				))}
			</div>
		</div>
	)
}

Card.Footer = function CardFooter({ children, className }: CardFooterProps) {
	return (
		<div
			className={cn(
				'flex justify-between items-center pt-3 border-t border-neutral-200 dark:border-neutral-800',
				className,
			)}
		>
			{children}
		</div>
	)
}
