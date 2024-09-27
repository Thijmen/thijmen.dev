export const GITHUB_ACCOUNTS = [
	{
		username: 'Thijmen',
		token: process.env.GITHUB_READ_USER_TOKEN_PERSONAL,
		endpoint: '/api/github?type=personal&section=info',
		type: 'personal',
		is_active: true,
	},
]
