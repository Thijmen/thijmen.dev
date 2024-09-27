import axios from 'axios'

import { GITHUB_ACCOUNTS } from '@/core/common/constant/github'

const GITHUB_USER_ENDPOINT = 'https://api.github.com/graphql'

const GITHUB_USER_QUERY = `query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        colors
        totalContributions
        months {
          firstDay
          name
          totalWeeks
        }
        weeks {
          contributionDays {
            color
            contributionCount
            date
          }
          firstDay
        }
      }
    }
  }
}`

const GITHUB_STARS_QUERY = `
 query ($cursor: String, $orderBy: StarOrder) {
  viewer {
    login
    name
    starredRepositories(first: 100, after: $cursor, orderBy: $orderBy) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        starredAt
        node {
          id
          name: nameWithOwner
          description
          openGraphImageUrl
          url
          stargazerCount
          primaryLanguage {
            id
            name
            color
          }
        }
      }
    }
  }
}
`

export const fetchGithubData = async (
	username: string,
	token: string | undefined,
) => {
	const response = await axios.post(
		GITHUB_USER_ENDPOINT,
		{
			query: GITHUB_USER_QUERY,
			variables: {
				username: username,
			},
		},
		{
			headers: {
				Authorization: `bearer ${token}`,
			},
		},
	)

	const status: number = response.status
	const responseJson = response.data

	const hasError = responseJson.errors && responseJson.errors.length > 0

	if (hasError) {
		const upstreamError = responseJson.errors[0]
		return {
			status: 500,
			error: upstreamError.message,
		}
	}
	if (status > 400) {
		return { status, data: {} }
	}

	return { status, data: responseJson.data.user }
}
export interface GithubStarsResponse {
	stars: IGithubStar[]
}
export const fetchGithubStars = async (
	token: string | undefined,
): Promise<GithubStarsResponse> => {
	const allStars = []
	let hasNextPage = true
	let after = null
	try {
		while (hasNextPage) {
			const response = await axios.post(
				GITHUB_USER_ENDPOINT,
				{
					query: GITHUB_STARS_QUERY,
					variables: {
						cursor: after,
						orderBy: {
							field: 'STARRED_AT',
							direction: 'DESC',
						},
					},
				},
				{
					headers: {
						Authorization: `bearer ${token}`,
					},
				},
			)

			console.log('page ', after)
			const data = response.data.data.viewer.starredRepositories.edges.map(
				(edge) => {
					return {
						...edge.node,
						starredAt: edge.starredAt,
					}
				},
			)
			allStars.push(...data)
			hasNextPage =
				response.data.data.viewer.starredRepositories.pageInfo.hasNextPage
			after = response.data.data.viewer.starredRepositories.pageInfo.endCursor
		}
	} catch (error) {
		console.log('error', error)
	}
	return {
		stars: allStars,
	}
}

export const getGithubUser = async (type: string) => {
	const account = GITHUB_ACCOUNTS.find(
		(account) => account?.type === type && account?.is_active,
	)

	if (!account) {
		throw new Error('Invalid user type')
	}

	const { username, token } = account
	return await fetchGithubData(username, token)
}

export const getGithubStars = async (type: string) => {
	const account = GITHUB_ACCOUNTS.find(
		(account) => account?.type === type && account?.is_active,
	)

	if (!account) {
		throw new Error('Invalid user type')
	}

	const { token } = account
	return await fetchGithubStars(token)
}

export type IGithubStar = {
	id: string
	name: string
	description: string
	openGraphImageUrl: string
	url: string
	stargazerCount: number
	starredAt: string
	primaryLanguage?: {
		id: string
		name: string
		color: string
	}
}
