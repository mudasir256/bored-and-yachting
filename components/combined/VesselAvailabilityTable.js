import EditVesselAvailabilityModal from '@/components/modals/EditVesselAvailabilityModal'
import useComponentVisible from '@/hooks/useComponentVisible'

export default function VesselAvailabilityTable() {

	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

	const handleEditAvailability = () => {

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
		                <th scope="col" className="px-6 py-3">
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
		                   
		                </td>
		                <td className="px-6 py-4">
		                    
		                </td>
		                <td className="px-6 py-4">
		                    
		                </td>
		            </tr>
		            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		                    Tuesday
		                </th>
		                <td className="px-6 py-4">
		                   
		                </td>
		                <td className="px-6 py-4">
		                    
		                </td>
		                <td className="px-6 py-4">
		                    
		                </td>
		   
		            </tr>
		            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		                  	Wednesday
		                </th>
		                <td className="px-6 py-4">
		                   
		                </td>
		                <td className="px-6 py-4">
		                    
		                </td>
		                <td className="px-6 py-4">
		                    
		                </td>
		          
		            </tr>
		            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		                    Thursday
		                </th>
		                <td className="px-6 py-4">
		                   
		                </td>
		                <td className="px-6 py-4">
		                    
		                </td>
		                <td className="px-6 py-4">
		                    
		                </td>
		         
		            </tr>
		            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		                  	Friday
		                </th>
		                <td className="px-6 py-4">
		                   
		                </td>
		                <td className="px-6 py-4">
		                    
		                </td>
		                <td className="px-6 py-4">
		                    
		                </td>
		          
		            </tr>
		       	</tbody>
		    </table>
		 </div>
		 <div ref={ref}>
		 	{isComponentVisible && <EditVesselAvailabilityModal />}
		 </div>
	</>)
}