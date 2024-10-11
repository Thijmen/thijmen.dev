import { getGithubStars } from '@/core/services/github'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
	const result = await getGithubStars('personal')
	const response = {
		data: result.stars,
		status: 200,
	}

	return Response.json(response.data, {
		headers: {
			'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
		},
		status: response.status,
	})
}

export const dynamic = 'force-dynamic'
