//POST endpoints with FETCH

const POST_FETCH_OPTIONS = (data) => {
	return {
		method: 'POST',
		headers: { 
			//'Authorization': `Bearer ${localStorage.getItem('token')}`,
			'Content-Type': 'application/json',
		},
		mode: 'cors',
		body: JSON.stringify(data)
	}
}

const baseUrl = (slug) => {
	return `${process.env.API_URL}${slug}`
}

export const createAccount = async ({ email, phoneNumber, password }) => {
	const result = await fetch(baseUrl('/create-account'), POST_FETCH_OPTIONS({ email, phoneNumber, password }))
	const data = await result.json()
	return data
}

