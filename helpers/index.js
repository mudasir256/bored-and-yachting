import { DateTime } from "luxon";

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

export const LOCATION_TYPE = {
	IS_HARBOR: 'IS_HARBOR', 
	IS_CHARTER: 'IS_CHARTER', 
	IS_PARKING_LOT: 'IS_PARKING_LOT',
	IS_HOME: 'IS_HOME'
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

export const RATE_IN_HOURS = {
	HALF_DAY: 4,
	FULL_DAY: 8
}

export const RATE_LENGTHS = {
	HALF_DAY: 'HALF_DAY',
	FULL_DAY: 'FULL_DAY',
	HOURLY: 'HOURLY'
}

export const CAPTAIN_RATES = {
	HALF_DAY: 275,
	FULL_DAY: 400,
	HOURLY: 45
}

export const CLEANING_FEE = 150
export const GRATUITY = {
	LABEL: 25,
	RATE: 0.25
}

export const TAX_RATES_BY_REGION = {
	FLORIDA: .07
}

export const formatAddressLine = (address) => {
	if (address) {
		return address.slice(0, address.length - 5)
	} 
	return ''
}

export const formatAMPM = (hoursInSeconds) => {
	if (hoursInSeconds === -1) {
		return 'N/A'
	}
	if (hoursInSeconds) {
		return DateTime.fromSeconds(hoursInSeconds, { zone: 'UTC' }).toLocaleString(DateTime.TIME_SIMPLE)
	}
	return ''
}

export const formattedTime = Object.values(AVAILABLE_TIME_SLOTS).map(hoursInSeconds => {
	return {
		value: hoursInSeconds,
		label: formatAMPM(hoursInSeconds)
	}
})

export const formatDay = (isoTimestamp) => {
	console.log(isoTimestamp)
	if (isoTimestamp) {
		return DateTime.fromISO(isoTimestamp).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY) //DATETIME_FULL debug timezone
	}
	return ''
}

export const differenceBetweenDates = (startDate, endDate) => {
	const date1 = DateTime.fromISO(startDate)
	const date2 = DateTime.fromISO(endDate)


	const diff = date1.diff(date2, ["years", "months", "days", "hours"])
	console.log(diff)
	
	const object = diff.toObject()

	if (object.days) {
		return `${Math.abs(object.days).toFixed(0)} days`
	} else if (object.hours) {
		return `${Math.abs(object.hours).toFixed(0)} hours`
	} else {
		return `${Math.abs(object.minutes).toFixed(0)} minutes`
	}
}

export const boatHasAllValidInformation = (boat) => {
	if (boat.parkingLocation && boat.photos.length > 2) { //TODO: add more qualifiers
		return true
	}
	return false
}

const wholeNumberFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  // These options are needed to round to whole numbers if that's what you want.
  minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
const decimalNumberFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  // These options are needed to round to whole numbers if that's what you want.
  // minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const formatMoney = (dollarAmount) => {
	if (dollarAmount) {
		if (dollarAmount % 1 == 0) {
			return wholeNumberFormat.format(dollarAmount)	
		}
		return decimalNumberFormat.format(dollarAmount)
	}
	return ''
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