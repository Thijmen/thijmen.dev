import { getGithubStars } from '@/core/services/github'
import type { MyGithubStarsBlock } from '@/payload/payload-types'

export const GithubStarsBlock = async ({
	block,
}: { block: MyGithubStarsBlock }) => {
	const githubToken = await getGithubStars('personal')
	return <pre>{JSON.stringify(githubToken, null, 2)}</pre>
}
