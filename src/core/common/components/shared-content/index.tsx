import { serializeLexical } from '@/core/common/components/shared-content/serializeLexical'

interface DynamicContentProps {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	content: Record<string, any>
}

export const SharedContent = async ({ content }: DynamicContentProps) => {
	return <>{serializeLexical({ nodes: content?.root?.children })}</>
}
