import { serialize } from '@/core/common/components/elements/mdx/serialize'

export async function POST(request: Request) {
	try {
		// Parse the request body to get the Markdown content

		// fetch headers
		const headers = request.headers

		const secureTokenHeader = headers.get('X-Secure-Token')

		if (secureTokenHeader !== process.env.SECURE_VALIDATION_TOKEN) {
			return Response.json({ message: 'Invalid token' }, { status: 401 })
		}

		const md = await request.text()

		if (!md || typeof md !== 'string') {
			return Response.json(
				{ message: 'Invalid input: md must be a non-empty string' },
				{ status: 400 },
			)
		}

		const value = await serialize(md, {
			rsc: false,
		})

		return Response.json(value, {
			headers: {
				'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
			},
			status: 200,
		})
	} catch (error) {
		console.error('Error processing request:', error)
		return Response.json({ message: 'Internal Server Error' }, { status: 500 })
	}
}

export const dynamic = 'force-dynamic'
