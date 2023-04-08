import { DateTime, Duration } from 'luxon'
import { AVAILABLE_TIME_SLOTS } from '@/helpers/index'

export const getDayTextFromIso = (calendarDate) => {
	const dayOfTheWeek = DateTime.fromISO(calendarDate).toFormat('EEEE')
	const key = dayOfTheWeek.toLowerCase()
	return key
}

//TODO: add preferences logic
//TODO: block off 4 hours before charter since that's minimum length
//TODO: block off x hours after charter
export const getAvailableTimeslotsForDay = (boatAvailability, blockedTimes, calendarDateSelected) => {
	if (!calendarDateSelected) {
		return []
	}
	const dayOfTheWeek = getDayTextFromIso(calendarDateSelected)
	const availability = boatAvailability[dayOfTheWeek]

	console.log(availability)

	const calendarDate = DateTime.fromISO(calendarDateSelected)
	const blockedOnSameDay = blockedTimes.filter(time => 
		DateTime.fromISO(time.startDate).hasSame(calendarDate, 'day')
	)

	const availableTimes = Object.values(AVAILABLE_TIME_SLOTS)
	let boatAvailableTimes = availableTimes.filter(time => 
		time >= availability.startTime && 
		time <= availability.endTime
	)

	blockedOnSameDay.forEach(time => {
		//TODO: remove availableTimes
		const startDate = new Date(time.startDate)
		const secondsStart = (startDate.getHours() * 3600) + (startDate.getMinutes() * 60)
		
		const endDate = new Date(time.endDate)
		const secondsEnd = (endDate.getHours() * 3600) + (endDate.getMinutes() * 60)

		boatAvailableTimes = boatAvailableTimes.filter(time => 
			time < secondsStart || time > secondsEnd
		)
	})

	return boatAvailableTimes
}

export const getDiscountForBoatDay = (boatAvailability, calendarDateSelected) => {
	if (!calendarDateSelected) {
		return 0
	}
	const dayOfTheWeek = getDayTextFromIso(calendarDateSelected)
	const availability = boatAvailability[dayOfTheWeek]
	return availability.discount
}
