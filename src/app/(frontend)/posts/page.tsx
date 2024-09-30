import Page, { generateMetadata as baseGenerateMetadata } from '../[slug]/page'
import type { Metadata } from 'next'

export default function PostsPage() {
	return <Page params={{ slug: 'posts' }} />
}

export async function generateMetadata(): Promise<Metadata> {
	return baseGenerateMetadata({ params: { slug: 'posts' } })
}
