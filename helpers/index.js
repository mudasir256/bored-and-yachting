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

export const AVAILABLE_TIME_SLOTS = { //hours to seconds conversion
	T_8AM: 28800,
	T_830AM: 30600,
	T_9AM: 32400,
	T_930AM: 34200,
	T_10AM: 36000,
	T_1030AM: 37800,
	T_11AM: 39600,
	T_1130AM: 41400,
	T_12PM: 43200,
	T_1230PM: 45000,
	T_1PM: 46800,
	T_130PM: 48600,
	T_2PM: 50400,
	T_230PM: 52200,
	T_3PM: 54000,
	T_330PM: 55800,
	T_4PM: 57600,
	T_430PM: 59400,
	T_5PM: 61200,
	T_530PM: 63000,
	T_6PM: 64800,
	T_630PM: 66600,
	T_7PM: 68400,
	T_730PM: 70200,
	T_8PM: 72000
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