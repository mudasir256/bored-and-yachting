
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
	return `${process.env.NEXT_PUBLIC_API_URL}${slug}`
}

export const createAccount = async ({ email, phoneNumber, password, roles }) => {
	const result = await fetch(baseUrl('/auth/create-user'), POST_FETCH_OPTIONS({ email, phoneNumber, password, roles }))
	const data = await result.json()
	return data
}

export const login = async ({ email, password }) => {
	const result = await fetch(baseUrl('/auth/login'), POST_FETCH_OPTIONS({ email, password }))
	const data = await result.json()
	return data
}
