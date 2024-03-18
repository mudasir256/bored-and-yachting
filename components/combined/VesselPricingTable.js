import EditVesselPricingModal from '@/components/modals/EditVesselPricingModal'
import useComponentVisible from '@/hooks/useComponentVisible'
import { useBoat } from '@/endpoints/get'
import { formatMoney, RATE_LENGTHS,TAX_RATES_BY_REGION, GRATUITY, SERVICE_FEE, CAPTAIN_RATES, CLEANING_FEE } from '@/helpers/index'
import { getFinalRate, getRateWithoutFees } from '@/helpers/money'

export default function VesselPricingTable({ isEditable = false, boatId }) {

	const { boat, isLoading } = useBoat(boatId)
	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

	const totalHalfDayPriceWithoutFees = getRateWithoutFees(boat, RATE_LENGTHS.HALF_DAY)
	const totalFullDayPriceWithoutFees = getRateWithoutFees(boat, RATE_LENGTHS.FULL_DAY)
	const totalHourlyPriceWithoutFees = getRateWithoutFees(boat, RATE_LENGTHS.HOURLY)

	return(<>
		<div className="relative overflow-x-auto sm:rounded-lg">
		    <table className="w-full text-sm text-left text-gray-500">
		        {isEditable &&
			        <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
			          <span>Vessel Pricing</span>
			          <div className="flex flex-row gap-2">
			          	<p class="mt-1 text-sm font-normal text-gray-500">Set your vessel&apos;s pricing. The total price is the final price the customer will see which includes our 25% platform fee.</p>
			        		<button onClick={() => setIsComponentVisible(true)} className="text-sm underline ml-auto underline">Edit</button>
			        	</div>
			        </caption>	  
		        } 
		        <thead className="text-xs text-gray-900 uppercase bg-gray-50 ">
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
		                    Extra Charter Time / HR
		                </th>
		          
		            </tr>
		        </thead>
		        <tbody className="text-gray-600">
		            <tr className="bg-white border-b ">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
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
		            <tr className="border-b bg-gray-50 ">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
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
		            <tr className="bg-white border-b">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
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
		            <tr className="border-b bg-gray-50">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
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
		    				    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
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
		            <tr className="border-b bg-gray-50 ">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
		                  	Cleaning Fee
		                </th>
		                <td className="px-6 py-4">
		                    {formatMoney(boat?.cleaningFee)}
		                </td>
		                <td className="px-6 py-4">
		                    {formatMoney(boat?.cleaningFee)}
		                </td>
		                <td className="px-6 py-4">
		                    N/A
		                </td>
		             
		            </tr>
		 						<tr>
		 							<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
		 							  	Auto Gratuity ({GRATUITY.LABEL}%)
		 							</th>
		 							<td className="px-6 py-4">
		 							  {formatMoney(boat?.boatRentalPrice?.halfDayRate * GRATUITY.RATE)}
		 							</td>
		 							<td className="px-6 py-4">
		 							  {formatMoney(boat?.boatRentalPrice?.fullDayRate * GRATUITY.RATE)}
		 							</td>
		 							<td className="px-6 py-4">
		 							   {formatMoney(boat?.boatRentalPrice?.hourlyRate * GRATUITY.RATE)}
		 							</td>
		 						</tr>
		            <tr>
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
		                  	Service fee ({SERVICE_FEE.LABEL}%)
		                </th>
		                <td className="px-6 py-4">
		                  {formatMoney(totalHalfDayPriceWithoutFees * SERVICE_FEE.RATE)}
		                </td>
		                <td className="px-6 py-4">
		                  {formatMoney(totalFullDayPriceWithoutFees * SERVICE_FEE.RATE)}
		                </td>
		                <td className="px-6 py-4">
		                   {formatMoney(totalHourlyPriceWithoutFees * SERVICE_FEE.RATE)}
		                </td>
		              
		            </tr>
		            <tr className="border-b bg-gray-50 ">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
		                    Total Price
		                </th>
		                <td className="px-6 py-4">
		                    {formatMoney(getFinalRate(boat, RATE_LENGTHS.HALF_DAY))}
		                </td>
		                <td className="px-6 py-4">
		                    {formatMoney(getFinalRate(boat, RATE_LENGTHS.FULL_DAY))}
		                </td>
		                <td className="px-6 py-4">
		                    {formatMoney(getFinalRate(boat, RATE_LENGTHS.HOURLY))}
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