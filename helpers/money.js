import { 
	TAX_RATES_BY_REGION, 
	GRATUITY, 
	SERVICE_FEE,
	CAPTAIN_RATES, 
	RATE_LENGTHS 
} from '@/helpers/index'

export const getRateWithoutFees = (boat, type, withDiscount = 0) => {
	if (boat) {
		let rate = 0
		switch (type) {
			case RATE_LENGTHS.HALF_DAY:
				rate += 
					boat?.boatRentalPrice?.halfDayRate 
						+ (boat?.boatRentalPrice?.halfDayRate * GRATUITY.RATE) 
						+ (boat?.boatRentalPrice?.halfDayRate * TAX_RATES_BY_REGION.FLORIDA) 
						+ boat?.crewRatePrice?.halfDayRate
						+ CAPTAIN_RATES.HALF_DAY
						+ boat?.prepaidFuelPrice?.halfDayRate
						+ boat?.cleaningFee
				break;
				
			case RATE_LENGTHS.FULL_DAY:
				rate +=
					boat?.boatRentalPrice?.fullDayRate 
						+ (boat?.boatRentalPrice?.fullDayRate * GRATUITY.RATE) 
						+ (boat?.boatRentalPrice?.fullDayRate * TAX_RATES_BY_REGION.FLORIDA) 
						+ boat?.crewRatePrice?.fullDayRate
						+ CAPTAIN_RATES.FULL_DAY
						+ boat?.prepaidFuelPrice?.fullDayRate
						+ boat?.cleaningFee
				break;
			case RATE_LENGTHS.HOURLY:
				rate +=
					boat?.boatRentalPrice?.hourlyRate 
						+ (boat?.boatRentalPrice?.hourlyRate * GRATUITY.RATE) 
						+ (boat?.boatRentalPrice?.hourlyRate * TAX_RATES_BY_REGION.FLORIDA) 
						+ boat?.crewRatePrice?.hourlyRate
						+ CAPTAIN_RATES.HOURLY
						+ boat?.prepaidFuelPrice?.hourlyRate
				break;
		}

		if (withDiscount) {
			rate = rate * ((100 - withDiscount) / 100)
		}
		return rate
	}
	return 0 
}

export const getFinalRate = (boat, type, withDiscount = 0) => {
	if (boat) {
		const price = getRateWithoutFees(boat, type, withDiscount)
		const serviceFee = price * SERVICE_FEE.RATE
		const finalPrice = price + serviceFee
		return finalPrice
	}
	return 0
}