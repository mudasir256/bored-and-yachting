import VesselAvailabilityTable from '@/components/combined/VesselAvailabilityTable'

export default function PricingForm({ boatId }) {

	const handleEditPricing = () => {

	}


	return (<>
	
		<VesselAvailabilityTable boatId={boatId} />

		<br />

		<div className="relative overflow-x-auto sm:rounded-lg">
		    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
		        <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
		          <span>Vessel Pricing</span>
		          <div className="flex flex-row gap-2">
		          	<p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Set your vessel&apos;s pricing. The total price is the final price the customer will see which includes our 25% platform fee.</p>
		        		<button onClick={() => handleEditPricing()} className="text-sm underline ml-auto underline">Edit</button>
		        	</div>
		        </caption>	   
		        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
		            <tr>
		                <th scope="col" className="px-6 py-3">
		                    Name
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
		        <tbody>
		            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		                    Boat Rental Price
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
		                    Boat Rental Tax (7%)
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
		                    Crew Rate
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
		                   	Captain Rate
		                </th>
		                <td className="px-6 py-4">
		                    $275
		                </td>
		                <td className="px-6 py-4">
		                    $400
		                </td>
		                <td className="px-6 py-4">
		                    $45
		                </td>
		            </tr>
		    				<tr>
		    				    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		    				        Prepaid Fuel
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
		                  	Cleaning Fee
		                </th>
		                <td className="px-6 py-4">
		                    $150
		                </td>
		                <td className="px-6 py-4">
		                    $150
		                </td>
		                <td className="px-6 py-4">
		                    N/A
		                </td>
		             
		            </tr>
		 
		            <tr>
		                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		                  	Gratuity
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
		                    Total Price
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

		<form className="space-y-4">
			
		</form>
	</>)
}