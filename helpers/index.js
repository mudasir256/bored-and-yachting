export const USER_TYPES = {
	ADMIN: 'ADMIN',
	BOAT_OWNER: 'BOAT_OWNER',
	CUSTOMER: 'CUSTOMER',
	CAPTAIN: 'CAPTAIN',
}

export const RESERVATION_STATUS = {
	TODAY: 'TODAY',
	UPCOMING: 'UPCOMING',
	PENDING_REVIEW: 'PENDING_REVIEW',
	CANCELED: 'CANCELED',
	COMPLETED: 'COMPLETED'
}

export const RESERVATION_STATUS_TEXT = {
	TODAY: 'Today',
	UPCOMING: 'Upcoming',
	PENDING_REVIEW: 'Pending Review',
	CANCELED: 'Canceled',
	COMPLETED: 'Completed'
}

export const FEATURES_LIST = {
	SPEAKER_SYSTEM: 'Speaker system',
	TELEVISION: 'Television',
	BATHROOM: 'Bathroom',
	REFRIGERATOR: 'Refrigerator',
	MICROWAVE: 'Microwave',
	STOVE_TOP: 'Stove-top',
	BEDROOMS: 'Bedrooms',
	SWIM_PLATFORM: 'Swim platform',
	LADDER: 'Ladder'
}

export const AMENITIES_LIST = {
	COOLER: 'Cooler',
	LILY_PAD: 'Lily pad',
	NOODLES: 'Noodles',
	FLOATIES: 'Floaties',
	GOGGLES: 'Goggles',
	FLIPPERS: 'Flippers'
}

export const saveLoginCredentials = ({ _id, token, firstName, roles }) => {
	if (_id) {
		localStorage.setItem('userId', _id)
	}
	if (token) {
		localStorage.setItem('accessToken', token)
	}
	if (firstName) {
		localStorage.setItem('firstName', firstName)
	}
	if (roles) {
		localStorage.setItem('roles', roles)
	}
	//TODO: add profile picture
	localStorage.setItem('isLoggedIn', true)
	window.dispatchEvent(new Event("storage"));

}

export const removeLoginCredentials = () => {
	localStorage.removeItem('userId');
	localStorage.removeItem('accessToken');
	localStorage.removeItem('firstName');
	localStorage.removeItem('roles')
	localStorage.removeItem('isLoggedIn')
	window.dispatchEvent(new Event("storage"));
}