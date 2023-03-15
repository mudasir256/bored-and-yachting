//GET endpoints with SWR
//https://swr.vercel.app/docs/with-nextjs
const GET_FETCH_OPTIONS = () => {
	return {
		method: 'get',
		headers: { 
			'Authorization': `Bearer ${localStorage.getItem('token')}`,
			'Content-Type': 'application/json',
		},
		mode: 'cors',
	}
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



//Examples
export function useOrders(page = 1, limit = 10, status = '', from = '', to = '', name = '') {

	let query = `?page=${page || 1}&limit=${limit}`
	if (status) {
		query = query + `&status=${status}`
	}
	if (from && to) {
		query = query + `&from=${from}&to=${to}`
	}
	if (name) {
		query = query + `&name=${name}`
	}

	const { data, error } = useSWR([
		API_URL.ORDERS, 
		query
		], fetcher)

	return {
		orders: data,
		isLoading: !error && !data,
		isError: error
	}
}

export function useOrder(id) {
	const { data, error } = useSWR(API_URL.ORDERS+`/${id}`, fetcher)

	return {
		order: data,
		isLoading: !error && !data,
		isError: error
	}
}