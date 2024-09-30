import type { Metadata } from 'next'
import Page, { generateMetadata as baseGenerateMetadata } from '../[slug]/page'

export default function PostsPage() {
	return <Page params={{ slug: 'posts' }} />
}

export async function generateMetadata(): Promise<Metadata> {
	return baseGenerateMetadata({ params: { slug: 'posts' } })
}
