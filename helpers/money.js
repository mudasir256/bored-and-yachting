import { 
	TAX_RATES_BY_REGION, 
	GRATUITY, 
	CAPTAIN_RATES, 
	CLEANING_FEE,
	RATE_LENGTHS 
} from '@/helpers/index'

export const getLowestRateWithoutGratuity = (boat, type) => {
	if (boat) {

		switch (type) {
			case RATE_LENGTHS.HALF_DAY:
				return (
					boat?.boatRentalPrice?.halfDayRate 
						+ (boat?.boatRentalPrice?.halfDayRate * TAX_RATES_BY_REGION.FLORIDA) 
						+ boat?.crewRatePrice?.halfDayRate
						+ CAPTAIN_RATES.HALF_DAY
						+ boat?.prepaidFuelPrice?.halfDayRate
						+ CLEANING_FEE
				)
			case RATE_LENGTHS.FULL_DAY:
				return (
					boat?.boatRentalPrice?.fullDayRate 
						+ (boat?.boatRentalPrice?.fullDayRate * TAX_RATES_BY_REGION.FLORIDA) 
						+ boat?.crewRatePrice?.fullDayRate
						+ CAPTAIN_RATES.FULL_DAY
						+ boat?.prepaidFuelPrice?.fullDayRate
						+ CLEANING_FEE
				)
			case RATE_LENGTHS.HOURLY:
				return (
					boat?.boatRentalPrice?.hourlyRate 
						+ (boat?.boatRentalPrice?.hourlyRate * TAX_RATES_BY_REGION.FLORIDA) 
						+ boat?.crewRatePrice?.hourlyRate
						+ CAPTAIN_RATES.HOURLY
						+ boat?.prepaidFuelPrice?.hourlyRate
						+ CLEANING_FEE
				)
		}
	}
	return 0 
}