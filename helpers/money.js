import { 
	TAX_RATES_BY_REGION, 
	GRATUITY, 
	SERVICE_FEE,
	CAPTAIN_RATES, 
	RATE_LENGTHS 
} from '@/helpers/index'

export const getRateWithoutFees = (boat, type) => {
	if (boat) {
		switch (type) {
			case RATE_LENGTHS.HALF_DAY:
				return (
					boat?.boatRentalPrice?.halfDayRate 
						+ (boat?.boatRentalPrice?.halfDayRate * GRATUITY.RATE) 
						+ (boat?.boatRentalPrice?.halfDayRate * TAX_RATES_BY_REGION.FLORIDA) 
						+ boat?.crewRatePrice?.halfDayRate
						+ CAPTAIN_RATES.HALF_DAY
						+ boat?.prepaidFuelPrice?.halfDayRate
						+ boat?.cleaningFee
				)
			case RATE_LENGTHS.FULL_DAY:
				return (
					boat?.boatRentalPrice?.fullDayRate 
						+ (boat?.boatRentalPrice?.fullDayRate * GRATUITY.RATE) 
						+ (boat?.boatRentalPrice?.fullDayRate * TAX_RATES_BY_REGION.FLORIDA) 
						+ boat?.crewRatePrice?.fullDayRate
						+ CAPTAIN_RATES.FULL_DAY
						+ boat?.prepaidFuelPrice?.fullDayRate
						+ boat?.cleaningFee
				)
			case RATE_LENGTHS.HOURLY:
				return (
					boat?.boatRentalPrice?.hourlyRate 
						+ (boat?.boatRentalPrice?.hourlyRate * GRATUITY.RATE) 
						+ (boat?.boatRentalPrice?.hourlyRate * TAX_RATES_BY_REGION.FLORIDA) 
						+ boat?.crewRatePrice?.hourlyRate
						+ CAPTAIN_RATES.HOURLY
						+ boat?.prepaidFuelPrice?.hourlyRate
				)
		}
	}
	return 0 
}

export const getFinalRate = (boat, type) => {
	if (boat) {
		const price = getRateWithoutFees(boat, type)
		const serviceFee = price * SERVICE_FEE.RATE
		const finalPrice = price + serviceFee
		return finalPrice
	}
	return 0
}