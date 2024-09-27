import { getGithubStars, getGithubUser } from '@/core/services/github'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams

	let section = ''
	let type = ''
	if (typeof searchParams.get('type') === 'string') {
		type = searchParams.get('type') as string
	}

	if (typeof searchParams.get('section') === 'string') {
		section = searchParams.get('section') as string
	}

	let response = {
		data: {},
		status: 200,
	}

	if (section === 'info') {
		const result = await getGithubUser(type)
		response = {
			data: result.data,
			status: result.status,
		}
	}

	if (section === 'stars') {
		const result = await getGithubStars('personal')

		response = {
			data: result.stars,
			status: 200,
		}
	}

	return Response.json(response.data, {
		headers: {
			'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
		},
		status: response.status,
	})
}
