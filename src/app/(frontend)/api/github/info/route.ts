import { getGithubUser } from '@/core/services/github'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
	const result = await getGithubUser('personal')
	const response = {
		data: result.data,
		status: result.status,
	}

	return Response.json(response.data, {
		// headers: {
		// 	'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
		// },
		status: response.status,
	})
}

export const revalidate = 120
