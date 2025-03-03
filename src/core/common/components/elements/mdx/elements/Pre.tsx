'use client'

import {
	SiJavascript,
	SiReact,
	SiTypescript,
} from '@icons-pack/react-simple-icons'

import {
	Button,
	type ButtonProps,
} from '@/core/common/components/elements/mdx/ui/button'
import {
	ScrollArea,
	ScrollBar,
} from '@/core/common/components/elements/mdx/ui/scroll-area'
import { useToast } from '@/core/common/components/elements/mdx/ui/toast'
import cn from '@/core/common/libs/cn'
import { CheckIcon, CopyIcon, FileIcon, TerminalIcon } from 'lucide-react'
import * as React from 'react'

type PreProps = {
	'data-lang'?: string
	copy?: boolean
} & React.ComponentPropsWithoutRef<'pre'>
type CopyButtonProps = {
	text: string
	onCopy?: () => void
} & ButtonProps

const getLanguageIcon = (lang: string): React.ReactNode => {
	switch (lang) {
		case 'js': {
			// @ts-ignore
			return <SiJavascript className='size-3.5' />
		}

		case 'ts': {
			// @ts-ignore
			return <SiTypescript className='size-3.5' />
		}

		case 'jsx':
		case 'tsx': {
			// @ts-ignore
			return <SiReact className='size-3.5' />
		}

		case 'bash':
		case 'sh':
		case 'shell':
		case 'zsh': {
			return <TerminalIcon className='size-3.5' />
		}

		default: {
			return <FileIcon className='size-3.5' />
		}
	}
}

const Pre = (props: PreProps) => {
	const { children, copy, className, title, 'data-lang': lang, ...rest } = props

	const textInput = React.useRef<HTMLPreElement>(null)
	const [text, setText] = React.useState<string>('')
	const { show, ToastContainer } = useToast()

	React.useEffect(() => {
		if (textInput.current) {
			setText(textInput.current.textContent ?? '')
		}
	}, [])

	return (
		<figure className='not-prose group relative my-6 overflow-hidden rounded-lg border bg-secondary/50 text-sm'>
			{title ? (
				<div className='flex flex-row items-center gap-2 border-b bg-muted px-4 py-1.5'>
					{lang && (
						<div className='text-muted-foreground'>{getLanguageIcon(lang)}</div>
					)}
					<figcaption className='flex-1 truncate text-muted-foreground'>
						{title}
					</figcaption>
					{copy && (
						<CopyButton
							text={text}
							onCopy={() => show('Copied to clipboard', { variant: 'success' })}
						/>
					)}
				</div>
			) : (
				copy && (
					<CopyButton
						className='absolute right-4 top-3 z-10'
						text={text}
						onCopy={() => show('Copied to clipboard', { variant: 'success' })}
					/>
				)
			)}

			<ScrollArea className='max-w-full'>
				<pre
					ref={textInput}
					className={cn('py-4 overflow-x-auto whitespace-pre', className)}
					{...rest}
				>
					{children}
				</pre>
				<ScrollBar orientation='horizontal' />
			</ScrollArea>
			<ToastContainer />
		</figure>
	)
}

const CopyButton = (props: CopyButtonProps) => {
	const { text, className, onCopy, ...rest } = props
	const [isCopied, setIsCopied] = React.useState(false)

	const copyToClipboard = React.useCallback(async () => {
		try {
			await navigator.clipboard.writeText(text)
			setIsCopied(true)
			onCopy?.()
			setTimeout(() => setIsCopied(false), 2000)
		} catch (err) {
			console.error('Failed to copy text: ', err)
		}
	}, [text, onCopy])

	return (
		<Button
			className={cn(
				'size-8 p-0 opacity-0 transition-opacity group-hover:opacity-100',
				className,
			)}
			variant='outline'
			onClick={copyToClipboard}
			type='button'
			aria-label='Copy code to clipboard'
			{...rest}
		>
			{isCopied ? (
				<CheckIcon className='size-4' />
			) : (
				<CopyIcon className='size-4' />
			)}
		</Button>
	)
}

export default Pre
