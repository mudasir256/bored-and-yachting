import EditVesselAvailabilityModal from '@/components/modals/EditVesselAvailabilityModal'
import useComponentVisible from '@/hooks/useComponentVisible'
import { useBoat } from '@/endpoints/get'
import { formatAMPM } from '@/helpers/index'

export default function VesselAvailabilityTable({ boatId }) {

	const { boat, isLoading } = useBoat(boatId)
	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

	const formatDiscount = (discount) => {
		if (discount) {
			return `${discount}%`
		}
		return '✕'
	}
	return(<>
		<div className="relative overflow-x-auto sm:rounded-lg">
		    <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
						  <span>Vessel Availability</span>
						  <div className="flex flex-row gap-2">
						  	<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Set when your vessel is available for booking on Bored and Yachting and apply discounts on specific days if desired.</p>
								<button onClick={() => setIsComponentVisible(true)}  className="text-sm underline ml-auto underline">Edit</button>
							</div>
						</caption>	       	
		        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
		            <tr>
		                <th scope="col" className="px-6 py-3">
		                    Day
		                </th>
		                <th scope="col" className="px-6 py-3">
		                    First charter start time
		                </th>
		                <th scope="col" className="px-6 py-3">
		                   	Last charter start time
		                </th>
		                <th scope="col" className="px-6 py-3" align="center">
		                    Discount?
		                </th>
		            </tr>
		        </thead>
		        <tbody>
		            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		                  	Monday
		                </th>
		                <td className="px-6 py-4">
		                  {formatAMPM(boat.monday?.startTime)}
		                </td>
		                <td className="px-6 py-4">
		                  {formatAMPM(boat.monday?.endTime)}
		                </td>
		                <td className="px-6 py-4" align="center">
		                  {formatDiscount(boat.monday?.discount)}
		                </td>
		            </tr>
		            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		                    Tuesday
		                </th>
		                <td className="px-6 py-4">
		                  {formatAMPM(boat.tuesday?.startTime)}
		                </td>
		                <td className="px-6 py-4">
		                  {formatAMPM(boat.tuesday?.endTime)}
		                </td>
		                <td className="px-6 py-4" align="center">
		                  {formatDiscount(boat.tuesday?.discount)}
		                </td>
		
		            </tr>
		            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		                  	Wednesday
		                </th>
		               	<td className="px-6 py-4">
		               	  {formatAMPM(boat.wednesday?.startTime)}
		               	</td>
		               	<td className="px-6 py-4">
		               	  {formatAMPM(boat.wednesday?.endTime)}
		               	</td>
		               	<td className="px-6 py-4" align="center">
		               	  {formatDiscount(boat.wednesday?.discount)}
		               	</td>
		          
		            </tr>
		            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		                    Thursday
		                </th>
		                <td className="px-6 py-4">
		                  {formatAMPM(boat.thursday?.startTime)}
		                </td>
		                <td className="px-6 py-4">
		                  {formatAMPM(boat.thursday?.endTime)}
		                </td>
		                <td className="px-6 py-4" align="center">
		                  {formatDiscount(boat.thursday?.discount)}
		                </td>
		         
		            </tr>
		            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		                  	Friday
		                </th>
		                <td className="px-6 py-4">
		                  {formatAMPM(boat.friday?.startTime)}
		                </td>
		                <td className="px-6 py-4">
		                  {formatAMPM(boat.friday?.endTime)}
		                </td>
		                <td className="px-6 py-4" align="center">
		                  {formatDiscount(boat.friday?.discount)}
		                </td>
		            </tr>
		            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		                    Saturday
		                </th>
		                <td className="px-6 py-4">
		                  {formatAMPM(boat.saturday?.startTime)}
		                </td>
		                <td className="px-6 py-4">
		                  {formatAMPM(boat.saturday?.endTime)}
		                </td>
		                <td className="px-6 py-4" align="center">
		                  {formatDiscount(boat.saturday?.discount)}
		                </td>
		            </tr>
		            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		                  	Sunday
		                </th>
		                <td className="px-6 py-4">
		                  {formatAMPM(boat.sunday?.startTime)}
		                </td>
		                <td className="px-6 py-4">
		                  {formatAMPM(boat.sunday?.endTime)}
		                </td>
		                <td className="px-6 py-4" align="center">
		                  {formatDiscount(boat.sunday?.discount)}
		                </td>
		            </tr>
		       	</tbody>
		    </table>
		 </div>
		 <div ref={ref}>
		 	{isComponentVisible && <EditVesselAvailabilityModal boat={boat} boatId={boatId} setIsComponentVisible={setIsComponentVisible} />}
		 </div>
	</>)
}