export const USER_TYPES = {
	ADMIN: 'ADMIN',
	BOAT_OWNER: 'BOAT_OWNER',
	CUSTOMER: 'CUSTOMER',
	CAPTAIN: 'CAPTAIN',
}

export const saveLoginCredentials = ({ _id, token, roles }) => {
	localStorage.setItem('userId', _id)
	localStorage.setItem('accessToken', token)
	localStorage.setItem('roles', roles)
	//TODO: add profile picture
}