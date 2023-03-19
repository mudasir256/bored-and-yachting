
//POST endpoints with FETCH

const POST_FETCH_OPTIONS = (data, useAuth = false) => {

	const headers = useAuth ? {
		'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
		'Content-Type': 'application/json',
	} : {
		'Content-Type': 'application/json',	
	}
	return {
		method: 'POST',
		headers,
		mode: 'cors',
		body: JSON.stringify(data)
	}
}



const baseUrl = (slug) => {
	return `${process.env.NEXT_PUBLIC_API_URL}${slug}`
}

/*    Auth Endpoints    */
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


/*     Boat Endpoints     */
export const createBoat = async (belongsTo) => {
	const result = await fetch(baseUrl('/boats/create'), POST_FETCH_OPTIONS({ belongsTo }, true))
	const data = await result.json()
	return data
}