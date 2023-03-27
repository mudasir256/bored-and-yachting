
//POST endpoints with FETCH
const POST_FETCH_OPTIONS = (data, useAuth = false, isFormData = false) => {

	let headers = useAuth ? {
		'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
		'Content-Type': 'application/json',
	} : {
		'Content-Type': 'application/json',	
	}
	isFormData && delete headers['Content-Type']

	return {
		method: 'POST',
		headers,
		mode: 'cors',
		body: !isFormData ? JSON.stringify(data) : data
	}
}

export const baseUrl = (slug) => {
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

/*    User Endpoints    */
export const updateUser = async (json) => {
	//uses auth token to get userId
	const result = await fetch(baseUrl(`/users/update/`), POST_FETCH_OPTIONS(json, true))
	const data = await result.json()
	return data
}

/*     Boat Endpoints     */
export const createBoat = async (belongsTo) => {
	const result = await fetch(baseUrl('/boats/create'), POST_FETCH_OPTIONS({ belongsTo }, true))
	const data = await result.json()
	return data
}

export const updateBoat = async (boatId, json) => {
	const result = await fetch(baseUrl(`/boats/update/${boatId}`), POST_FETCH_OPTIONS(json, true))
	const data = await result.json()
	return data
}

export const updateBoatLocation = async (boatId, location, type, key) => {
	const result = await fetch(baseUrl(`/boats/change-location/${boatId}`), POST_FETCH_OPTIONS({ location, type, key }, true))
	const data = await result.json()
	return data
}

export const updateBoatFiles = async (boatId, files, key) => {
	const array = Array.from(files)

	const formData = new FormData();
	formData.append('key', key)
	formData.append('isSingleFile', array.length == 1)
	formData.append('fileCount', array.length)
	array.forEach((file, i) => {
		//TODO: replace file name with uuid?
		//TODO: check multi file same name problems
		formData.append(`file-${i}`, file, file.name);
	})

	const result = await fetch(baseUrl(`/boats/files/${boatId}`), POST_FETCH_OPTIONS(formData, true, true))
	const data = await result.json()
	return data
}

/*   Booking Endpoints   */
export const createBooking = async (startDate, endDate, { boatId, totalPrice, duration }) => {
	//TODO: force startDate / endDate time zone to match the boat's location instead of the user's timezone
	const result = await fetch(baseUrl(`/bookings/create/`), POST_FETCH_OPTIONS({ boatId, totalPrice, startDate, endDate, duration }, true))
	const data = await result.json()
	return data

}