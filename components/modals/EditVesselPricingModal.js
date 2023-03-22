import Input from '@/components/Input'
import { useState, useEffect } from 'react'
import { useSWRConfig } from 'swr'
import { createPortal } from 'react-dom'
import Subheader from '@/components/small/Subheader'
import { baseUrl, updateBoat } from '@/endpoints/post'

export default function EditVesselPricingModal({ boat, boatId, setIsComponentVisible }) {
	
	const [isBrowser, setIsBrowser] = useState(false);
	const { mutate } = useSWRConfig()

	useEffect(() => {
	  setIsBrowser(true);
	}, []);

	useEffect(() => {
		if (boat) {
			setBoatRentalPrice(boat.boatRentalPrice)
			setCrewRatePrice(boat.crewRatePrice)
			setPrepaidFuelPrice(boat.prepaidFuelPrice)
		}
	}, [boat])

	const [boatRentalPrice, setBoatRentalPrice] = useState({})
	const [crewRatePrice, setCrewRatePrice] = useState({})
	const [prepaidFuelPrice, setPrepaidFuelPrice] = useState({})

	const handleVesselPricingSubmit = async (e) => {
		e.preventDefault()
		const result = await updateBoat(boatId, {
			boatRentalPrice,
			crewRatePrice,
			prepaidFuelPrice
		})

		if (result.success) {
			mutate(baseUrl(`/boats/${boatId}`))
			setIsComponentVisible(false)
		}
	}

	const fields = [
		{
			label: 'Boat Rental Price',
			onChange: setBoatRentalPrice,
			value: boatRentalPrice
		},
		{
			label: 'Crew Rate',
			onChange: setCrewRatePrice,
			value: crewRatePrice
		},
		{
			label: 'Prepaid Fuel',
			onChange: setPrepaidFuelPrice,
			value: prepaidFuelPrice
		},
	]
	const modalContent = (
		<div className="fixed w-screen h-screen top-0 left-0 flex justify-center items-center bg-black bg-opacity-50">
			<div className="bg-white rounded p-4">
				<Subheader text="Vessel Pricing" />
				<hr/>
				<form className="mt-4 space-y-6" onSubmit={(e) => handleVesselPricingSubmit(e)}>
					{fields.map(field => (<div key={field.label} className="grid grid-cols-4 gap-2">
						<p className="text-sm font-bold">{field.label}</p>
				   	<Input 
					    type="number" 
					    label="Half Day Rate (4 hrs)"
					    id={field.label + 'HalfDay'}
					    placeholder="Dollar amount"
					    min={1}
					    onChange={(e) => field.onChange({ ...field.value, halfDayRate: parseInt(e.target?.value) })}
					    value={field.value?.halfDayRate || ''}
					    isInModal={true}
				     />
		       	<Input 
		    	    type="number" 
		    	    label="Full Day Rate (8 hrs)"
		    	    id={field.label + 'FullDay'}
		    	    placeholder="Dollar amount"
		    	    min={1}
		    	    onChange={(e) => field.onChange({ ...field.value, fullDayRate: parseInt(e.target?.value) })}
		    	    value={field.value?.fullDayRate || ''}
		    	    isInModal={true}
		         />
           	<Input 
        	    type="number" 
        	    label="Hourly Rate"
        	    id={field.label + 'Hourly'}
        	    placeholder="Dollar amount"
        	    min={1}
        	    onChange={(e) => field.onChange({ ...field.value, hourlyRate: parseInt(e.target?.value) })}
        	    value={field.value?.hourlyRate || ''}
        	    isInModal={true}
             />
					</div>))}
					<Input 
						type="submit"
						value={"Save"} 
						isInModal={true}
					/>
				</form>
			</div>	
		</div>
	)


	if (isBrowser) {
	  return createPortal(
	    modalContent, 
	    document.getElementById("modal-root")
	  );
	} 
	return null;
}