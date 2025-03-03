'use client'

import cn from '@/core/common/libs/cn'
import { AnimatePresence, motion } from 'framer-motion'
import * as React from 'react'
import { createPortal } from 'react-dom'

export interface ToastProps {
	message: string
	duration?: number
	position?:
		| 'top-right'
		| 'top-left'
		| 'bottom-right'
		| 'bottom-left'
		| 'top-center'
		| 'bottom-center'
	variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
	onClose?: () => void
}

const positionClasses = {
	'top-right': 'top-4 right-4',
	'top-left': 'top-4 left-4',
	'bottom-right': 'bottom-4 right-4',
	'bottom-left': 'bottom-4 left-4',
	'top-center': 'top-4 left-1/2 -translate-x-1/2',
	'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
}

const variantClasses = {
	default: 'bg-secondary text-secondary-foreground',
	success: 'bg-green-500/90 text-white',
	error: 'bg-red-500/90 text-white',
	warning: 'bg-amber-500/90 text-white',
	info: 'bg-blue-500/90 text-white',
}

export const Toast = ({
	message,
	duration = 3000,
	position = 'bottom-center',
	variant = 'success',
	onClose,
}: ToastProps) => {
	React.useEffect(() => {
		const timer = setTimeout(() => {
			onClose?.()
		}, duration)

		return () => clearTimeout(timer)
	}, [duration, onClose])

	// Only render on client
	const [isMounted, setIsMounted] = React.useState(false)
	React.useEffect(() => {
		setIsMounted(true)
		return () => setIsMounted(false)
	}, [])

	if (!isMounted) return null

	return createPortal(
		<div className={cn('fixed z-50', positionClasses[position])}>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				className={cn(
					'rounded-md px-4 py-2 shadow-lg',
					'flex items-center space-x-2',
					variantClasses[variant],
				)}
			>
				<span>{message}</span>
			</motion.div>
		</div>,
		document.body,
	)
}

export const useToast = () => {
	const [toasts, setToasts] = React.useState<
		Array<{
			id: string
			message: string
			position?: ToastProps['position']
			variant?: ToastProps['variant']
		}>
	>([])

	const show = React.useCallback(
		(
			message: string,
			options?: {
				position?: ToastProps['position']
				variant?: ToastProps['variant']
			},
		) => {
			const id = Math.random().toString(36).substring(2, 9)
			setToasts((prev) => [...prev, { id, message, ...options }])
			return id
		},
		[],
	)

	const close = React.useCallback((id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id))
	}, [])

	const ToastContainer = React.useCallback(
		() => (
			<AnimatePresence>
				{toasts.map((toast) => (
					<Toast
						key={toast.id}
						message={toast.message}
						position={toast.position}
						variant={toast.variant}
						onClose={() => close(toast.id)}
					/>
				))}
			</AnimatePresence>
		),
		[toasts, close],
	)

	return { show, close, ToastContainer }
}
