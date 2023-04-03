//GET endpoints with SWR
//https://swr.vercel.app/docs/with-nextjs
import useSWR from 'swr'

const GET_FETCH_OPTIONS = () => {
	return {
		method: 'get',
		headers: { 
			'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			'Content-Type': 'application/json',
		},
		mode: 'cors',
	}
}

export const baseUrl = (slug) => {
	return `${process.env.NEXT_PUBLIC_API_URL}${slug}`
}

const fetcher = ( url, query = '' ) => fetch(
	`${url}${query}`, 
	GET_FETCH_OPTIONS()
).then(res => { 
	if (res.status === 401) {
		window.location.href = '/?sessionExpired=true'
	}
	return res.json()
}) 

//Google Maps API
export const getAutocompleteAddresses = (searchText, callback) => {
	fetch(`${baseUrl('/locations/autocomplete')}?searchText=${searchText}`, GET_FETCH_OPTIONS())
		.then(res => res.json())
		.then(data => {
			callback(data)
		})
		.catch(err => {
			callback(err)
		}) 
}

export const getStripeAccountLink = async (userId, isBoatOwner) => {
	const result = await 	fetch(`${baseUrl(`/users/onboard-stripe/${userId}`)}?isBoatOwner=${isBoatOwner}`, GET_FETCH_OPTIONS())
	const data = await result.json()
	return data
}

export const getStripeAccountLogin = async () => {
	const result = await 	fetch(`${baseUrl(`/users/stripe-express-login`)}`, GET_FETCH_OPTIONS())
	const data = await result.json()
	return data
}

export const getStripeAccountStatus = async () => {
	const result = await 	fetch(baseUrl(`/users/stripe-account-status`), GET_FETCH_OPTIONS())
	const data = await result.json()
	return data
}

export const getStripeSetupIntent = async () => {
	const result = await 	fetch(baseUrl(`/users/stripe-setup-intent`), GET_FETCH_OPTIONS())
	const data = await result.json()
	return data
}

export const useStripePaymentMethods = () => {
	const { data, error } = useSWR(baseUrl(`/users/stripe-payment-methods`), fetcher)

	return {
		paymentMethods: data?.paymentMethods,
		isLoading: !error && !data,
		isError: error
	}
}

/*      Boats      */
export const useUserBoats = () => {
	if (typeof window === 'undefined') {
	  return {
	  	boats: [],
	  	isLoading: true,
	  	isError: false
	  }
	}
	const { data, error } = useSWR(baseUrl(`/boats/user/${localStorage.getItem('userId')}`), fetcher)

	return {
		boats: data?.boats,
		isLoading: !error && !data,
		isError: error
	}
}

export const useBoats = () => {
	const { data, error } = useSWR(baseUrl(`/boats/`), fetcher)
	console.log(data)
	return {
		boats: data?.boats,
		isLoading: !error && !data,
		isError: error
	}
}

export const useBoat = (id) => {
	const { data, error, mutate } = useSWR(baseUrl(`/boats/${id}`), fetcher)

	return {
		boat: data?.boat,
		isLoading: !error && !data,
		isError: error,
		mutate
	}
}

export const useCharters = () => {
	let userId = ''
	if (typeof window !== 'undefined') {
		userId = localStorage?.getItem('userId')
	}
	const { data, error, mutate } = useSWR(baseUrl(`/bookings/charters/${userId}`), fetcher)

	return {
		bookings: data?.bookings,
		isLoading: !error && !data,
		isError: error,
		mutate: mutate
	}
}

export const useReservations = () => {
	let userId = ''
	if (typeof window !== 'undefined') {
		userId = localStorage?.getItem('userId')
	}
	const { data, error, mutate } = useSWR(baseUrl(`/bookings/reservations/${userId}`), fetcher)

	return {
		bookings: data?.bookings,
		isLoading: !error && !data,
		isError: error,
		mutate: mutate
	}
}

export const useTrips = () => {
	let userId = ''
	if (typeof window !== 'undefined') {
		userId = localStorage?.getItem('userId')
	}
	const { data, error } = useSWR(baseUrl(`/bookings/trips/${userId}`), fetcher)

	return {
		bookings: data?.bookings,
		isLoading: !error && !data,
		isError: error
	}
}

/*    User Endpoints    */
export const useUser = () => {
	let userId = ''
	if (typeof window !== 'undefined') {
		userId = localStorage?.getItem('userId')
	}
	const { data, error } = useSWR(baseUrl(`/users/${userId}`), fetcher)

	return {
		user: data?.user,
		isLoading: !error && !data,
		isError: error
	}
}

export const useCaptains = () => {
	const { data, error } = useSWR(baseUrl(`/users/captains`), fetcher)

	return {
		captains: data?.captains,
		isLoading: !error && !data,
		isError: error
	}
}



//Examples
// export const useOrders(page = 1, limit = 10, status = '', from = '', to = '', name = '') {

// 	let query = `?page=${page || 1}&limit=${limit}`
// 	if (status) {
// 		query = query + `&status=${status}`
// 	}
// 	if (from && to) {
// 		query = query + `&from=${from}&to=${to}`
// 	}
// 	if (name) {
// 		query = query + `&name=${name}`
// 	}

// 	const { data, error } = useSWR([
// 		API_URL.ORDERS, 
// 		query
// 		], fetcher)

// 	return {
// 		orders: data,
// 		isLoading: !error && !data,
// 		isError: error
// 	}
// }
