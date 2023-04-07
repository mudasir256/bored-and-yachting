import VesselAvailabilityTable from '@/components/combined/VesselAvailabilityTable'
import VesselPricingTable from '@/components/combined/VesselPricingTable'
import Input from '@/components/Input'

import { useState, useEffect } from 'react'
import { useBoat } from '@/endpoints/get'
import { updateBoat } from '@/endpoints/post'

export default function PricingForm({ boatId }) {

	const { boat, isLoading } = useBoat(boatId)

	const [allowMultipleBookingsSameDay, setAllowMultipleBookingsSameDay] = useState(false)
	const [timeNoticeBeforeCharter, setTimeNoticeBeforeCharter] = useState('')
	const [saved, setSaved] = useState(false)

	const handleOptions = (e) => {
		e.preventDefault()
	}

	useEffect(() => {
		if (boat) {
			setAllowMultipleBookingsSameDay(boat?.allowMultipleBookingsSameDay)
			setTimeNoticeBeforeCharter(boat?.timeNoticeBeforeCharter)
		}
	}, [])

	useEffect(() => {
		setSaved(false)
	}, [timeNoticeBeforeCharter, allowMultipleBookingsSameDay])

	const saveChanges = async () => {
		await updateBoat(boatId, { allowMultipleBookingsSameDay, timeNoticeBeforeCharter })
		setSaved(true)
	}

	return (<>

		<form className="mt-2" onSubmit={handleOptions}>
			<div className="flex flex-col gap-4 p-4">
		 	 	<div className="flex flex-row">
		 	 		<div>
				 	 	<p className="font-bold text-lg">How much notice do you need before a charter?</p>
						<div className="max-w-md">
							<Input 
								type="select"
								value={timeNoticeBeforeCharter}
								onChange={(e) => setTimeNoticeBeforeCharter(e.target?.value)}
								placeholder="Select a time amount"
								options={[
									{
										value: 1,
										label: '1 hour'
									},
									{
										value: 3,
										label: '3 hours'
									},
									{
										value: 6,
										label: '6 hours'
									},
									{
										value: 12,
										label: '12 hours'
									},
									{
										value: 24,
										label: '1 day'
									},
									{
										value: 72,
										label: '3 days'
									},
									{
										value: 168,
										label: '7 days'
									},
								]}
							/>		
						</div>
					</div>
					<button onClick={saveChanges} className="ml-auto font-bold text-sm underline hover:text-blue-500 ">{saved ? '✓' : 'Save changes'}</button>
				</div>

				<div className="space-y-2">
					<p className="font-bold text-lg">Allow multiple bookings in a single day?</p>
					<div className="space-x-4">
						<label>
						 	<input 
						 		onChange={() => setAllowMultipleBookingsSameDay(true)} 
						 		type="radio" 
						 		value={true} 
						 		checked={allowMultipleBookingsSameDay}
						 		name="allowMultipleBookingsSameDay" 
						 	/> 
						 	&nbsp;<span>Yes</span>
					 	</label>

				 		<label>
				 		 	<input 
				 		 		onChange={() => setAllowMultipleBookingsSameDay(false)} 
				 		 		type="radio" 
				 		 		value={false} 
				 		 		checked={!allowMultipleBookingsSameDay}
				 		 		name="allowMultipleBookingsSameDay"
				 		 	/> 
				 		 	&nbsp;<span>No, only allow 1 max per day</span>
				 	 	</label>
			 	 	</div>
		 	 	</div>

			</div>
	 	</form>

		<VesselAvailabilityTable boatId={boatId} />
		<br />
		<VesselPricingTable isEditable={true} boatId={boatId} />
	</>)
}