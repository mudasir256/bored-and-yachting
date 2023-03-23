import EditVesselPricingModal from '@/components/modals/EditVesselPricingModal'
import useComponentVisible from '@/hooks/useComponentVisible'
import { useBoat } from '@/endpoints/get'
import { formatMoney, TAX_RATES_BY_REGION, GRATUITY, CAPTAIN_RATES, CLEANING_FEE } from '@/helpers/index'

export default function VesselPricingTable({ isEditable = false, boatId }) {

	const { boat, isLoading } = useBoat(boatId)
	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

	const totalHalfDayPriceWithoutGratuity = 
		boat?.boatRentalPrice?.halfDayRate 
			+ (boat?.boatRentalPrice?.halfDayRate * TAX_RATES_BY_REGION.FLORIDA) 
			+ boat?.crewRatePrice?.halfDayRate
			+ CAPTAIN_RATES.HALF_DAY
			+ boat?.prepaidFuelPrice?.halfDayRate
			+ CLEANING_FEE;

	const totalFullDayPriceWithoutGratuity = 
		boat?.boatRentalPrice?.fullDayRate 
			+ (boat?.boatRentalPrice?.fullDayRate * TAX_RATES_BY_REGION.FLORIDA) 
			+ boat?.crewRatePrice?.fullDayRate
			+ CAPTAIN_RATES.FULL_DAY
			+ boat?.prepaidFuelPrice?.fullDayRate
			+ CLEANING_FEE;

	const totalHourlyPriceWithoutGratuity = 
		boat?.boatRentalPrice?.hourlyRate 
			+ (boat?.boatRentalPrice?.hourlyRate * TAX_RATES_BY_REGION.FLORIDA) 
			+ boat?.crewRatePrice?.hourlyRate
			+ CAPTAIN_RATES.HOURLY
			+ boat?.prepaidFuelPrice?.hourlyRate
			+ CLEANING_FEE;

	return(<>
		<div className="relative overflow-x-auto sm:rounded-lg">
		    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
		        {isEditable &&
			        <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
			          <span>Vessel Pricing</span>
			          <div className="flex flex-row gap-2">
			          	<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Set your vessel&apos;s pricing. The total price is the final price the customer will see which includes our 25% platform fee.</p>
			        		<button onClick={() => setIsComponentVisible(true)} className="text-sm underline ml-auto underline">Edit</button>
			        	</div>
			        </caption>	  
		        } 
		        <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
		            <tr>
		                <th scope="col" className="px-6 py-3">
		                    Item
		                </th>
		                <th scope="col" className="px-6 py-3">
		                    Half Day Rate
		                </th>
		                <th scope="col" className="px-6 py-3">
		                    Full Day Rate
		                </th>
		                <th scope="col" className="px-6 py-3">
		                    Hourly Rate
		                </th>
		          
		            </tr>
		        </thead>
		        <tbody className="text-gray-600">
		            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		                    Boat Rental Price
		                </th>
		                <td className="px-6 py-4">
		                  {formatMoney(boat?.boatRentalPrice?.halfDayRate)}
		                </td>
		                <td className="px-6 py-4">
		                  {formatMoney(boat?.boatRentalPrice?.fullDayRate)}
		                </td>
		                <td className="px-6 py-4">
		                  {formatMoney(boat?.boatRentalPrice?.hourlyRate)}
		                </td>
		           
		            </tr>
		            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		                    Boat Rental Tax (7%)
		                </th>
		                <td className="px-6 py-4">
		                   {formatMoney(boat?.boatRentalPrice?.halfDayRate * TAX_RATES_BY_REGION.FLORIDA)}
		                </td>
		                <td className="px-6 py-4">
		                   {formatMoney(boat?.boatRentalPrice?.fullDayRate * TAX_RATES_BY_REGION.FLORIDA)}
		                </td>
		                <td className="px-6 py-4">
		                    {formatMoney(boat?.boatRentalPrice?.hourlyRate * TAX_RATES_BY_REGION.FLORIDA)}
		                </td>
		         
		            </tr>
		            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		                    Crew Rate
		                </th>
		                <td className="px-6 py-4">
		                   {formatMoney(boat?.crewRatePrice?.halfDayRate)}
		                </td>
		                <td className="px-6 py-4">
		                   {formatMoney(boat?.crewRatePrice?.fullDayRate)}
		                </td>
		                <td className="px-6 py-4">
		                   {formatMoney(boat?.crewRatePrice?.hourlyRate)}
		                </td>
		             
		            </tr>
		            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		                   	Captain Rate
		                </th>
		                <td className="px-6 py-4">
		                    ${CAPTAIN_RATES.HALF_DAY}
		                </td>
		                <td className="px-6 py-4">
		                    ${CAPTAIN_RATES.FULL_DAY}
		                </td>
		                <td className="px-6 py-4">
		                    ${CAPTAIN_RATES.HOURLY}
		                </td>
		            </tr>
		    				<tr>
		    				    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		    				        Prepaid Fuel
		    				    </th>
		    				    <td className="px-6 py-4">
		    				        {formatMoney(boat?.prepaidFuelPrice?.halfDayRate)}
		    				    </td>
		    				    <td className="px-6 py-4">
		    				        {formatMoney(boat?.prepaidFuelPrice?.fullDayRate)}
		    				    </td>
		    				    <td className="px-6 py-4">
		    				        {formatMoney(boat?.prepaidFuelPrice?.hourlyRate)}
		    				    </td>
		    				
		    				</tr>
		            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		                  	Cleaning Fee
		                </th>
		                <td className="px-6 py-4">
		                    ${CLEANING_FEE}
		                </td>
		                <td className="px-6 py-4">
		                    ${CLEANING_FEE}
		                </td>
		                <td className="px-6 py-4">
		                    N/A
		                </td>
		             
		            </tr>
		 
		            <tr>
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		                  	Service fee ({GRATUITY.LABEL}%)
		                </th>
		                <td className="px-6 py-4">
		                  {formatMoney(totalHalfDayPriceWithoutGratuity * GRATUITY.RATE)}
		                </td>
		                <td className="px-6 py-4">
		                  {formatMoney(totalFullDayPriceWithoutGratuity * GRATUITY.RATE)}
		                </td>
		                <td className="px-6 py-4">
		                   {formatMoney(totalHourlyPriceWithoutGratuity * GRATUITY.RATE)}
		                </td>
		              
		            </tr>
		            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		                    Total Price
		                </th>
		                <td className="px-6 py-4">
		                    {formatMoney((totalHalfDayPriceWithoutGratuity * GRATUITY.RATE) + totalHalfDayPriceWithoutGratuity)}
		                </td>
		                <td className="px-6 py-4">
		                    {formatMoney((totalFullDayPriceWithoutGratuity * GRATUITY.RATE) + totalFullDayPriceWithoutGratuity)}
		                </td>
		                <td className="px-6 py-4">
		                    {formatMoney((totalHourlyPriceWithoutGratuity * GRATUITY.RATE) + totalHourlyPriceWithoutGratuity)}
		                </td>
		             
		            </tr>
		        </tbody>
		    </table>
		</div>
		<div ref={ref}>
			{isComponentVisible && <EditVesselPricingModal boat={boat} boatId={boatId} setIsComponentVisible={setIsComponentVisible} />}
		</div>
	</>)
}