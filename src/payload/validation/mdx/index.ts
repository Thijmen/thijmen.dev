export const validateMDX = async (source: string) => {
	// create a fetch call to /api/test with the source as body
	const response = await fetch('http://localhost:3000/api/test', {
		method: 'POST',
		body: source,
	})

	const status = response.status

	if (status !== 200) {
		throw new Error('Error validating MDX')
	}
}
