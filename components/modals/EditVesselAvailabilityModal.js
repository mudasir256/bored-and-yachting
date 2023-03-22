import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Subheader from '@/components/small/Subheader'
import Input from '@/components/Input'
import { AVAILABLE_TIME_SLOTS } from '@/helpers/index'
import CheckboxWithText from '@/components/small/CheckboxWithText'
import { baseUrl, updateBoat } from '@/endpoints/post'
import { formatAMPM } from '@/helpers/index'
import { useSWRConfig } from 'swr'

export default function EditVesselAvailability({ boat, boatId, setIsComponentVisible }) {
	const [isBrowser, setIsBrowser] = useState(false);
	const { mutate } = useSWRConfig()

	useEffect(() => {
	  setIsBrowser(true);
	}, []);

	useEffect(() => {
		if (boat) {
			setMondayStartTime(boat.monday?.startTime || '')
			setMondayEndTime(boat.monday?.endTime || '')
			setMondayDiscount(boat.monday?.discount || '')
			setTuesdayStartTime(boat.tuesday?.startTime || '')
			setTuesdayEndTime(boat.tuesday?.endTime || '')
			setTuesdayDiscount(boat.tuesday?.discount || '')
			setWednesdayStartTime(boat.wednesday?.startTime || '')
			setWednesdayEndTime(boat.wednesday?.endTime || '')
			setWednesdayDiscount(boat.wednesday?.discount || '')
			setThursdayStartTime(boat.thursday?.startTime || '')
			setThursdayEndTime(boat.thursday?.endTime || '')
			setThursdayDiscount(boat.thursday?.discount || '')
			setFridayStartTime(boat.friday?.startTime || '')
			setFridayEndTime(boat.friday?.endTime || '')
			setFridayDiscount(boat.friday?.discount || '')
			setSaturdayStartTime(boat.saturday?.startTime || '')
			setSaturdayEndTime(boat.saturday?.endTime || '')
			setSaturdayDiscount(boat.saturday?.discount || '')
			setSundayStartTime(boat.sunday?.startTime || '')
			setSundayEndTime(boat.sunday?.endTime || '')
			setSundayDiscount(boat.sunday?.discount || '')
		}
	}, [boat])

	const [mondayStartTime, setMondayStartTime] = useState('')
	const [mondayEndTime, setMondayEndTime] = useState('')
	const [mondayDiscount, setMondayDiscount] = useState('')
	const [tuesdayStartTime, setTuesdayStartTime] = useState('')
	const [tuesdayEndTime, setTuesdayEndTime] = useState('')
	const [tuesdayDiscount, setTuesdayDiscount] = useState('')
	const [wednesdayStartTime, setWednesdayStartTime] = useState('')
	const [wednesdayEndTime, setWednesdayEndTime] = useState('')
	const [wednesdayDiscount, setWednesdayDiscount] = useState('')
	const [thursdayStartTime, setThursdayStartTime] = useState('')
	const [thursdayEndTime, setThursdayEndTime] = useState('')
	const [thursdayDiscount, setThursdayDiscount] = useState('')
	const [fridayStartTime, setFridayStartTime] = useState('')
	const [fridayEndTime, setFridayEndTime] = useState('')
	const [fridayDiscount, setFridayDiscount] = useState('')
	const [saturdayStartTime, setSaturdayStartTime] = useState('')
	const [saturdayEndTime, setSaturdayEndTime] = useState('')
	const [saturdayDiscount, setSaturdayDiscount] = useState('')
	const [sundayStartTime, setSundayStartTime] = useState('')
	const [sundayEndTime, setSundayEndTime] = useState('')
	const [sundayDiscount, setSundayDiscount] = useState('')

	const fields = [
		{ 
			label: 'Monday', 
			startValue: mondayStartTime, 
			onStartChange: setMondayStartTime,
			endValue: mondayEndTime,
			onEndChange: setMondayEndTime,
			discountValue: mondayDiscount,
			onDiscountChange: setMondayDiscount
		},
		{ 
			label: 'Tuesday', 
			startValue: tuesdayStartTime, 
			onStartChange: setTuesdayStartTime,
			endValue: tuesdayEndTime,
			onEndChange: setTuesdayEndTime,
			discountValue: tuesdayDiscount,
			onDiscountChange: setTuesdayDiscount
		},
		{
			label: 'Wednesday', 
			startValue: wednesdayStartTime, 
			onStartChange: setWednesdayStartTime,
			endValue: wednesdayEndTime,
			onEndChange: setWednesdayEndTime,
			discountValue: wednesdayDiscount,
			onDiscountChange: setWednesdayDiscount
		},
		{
			label: 'Thursday', 
			startValue: thursdayStartTime, 
			onStartChange: setThursdayStartTime,
			endValue: thursdayEndTime,
			onEndChange: setThursdayEndTime,
			discountValue: thursdayDiscount,
			onDiscountChange: setThursdayDiscount
		},
		{
			label: 'Friday', 
			startValue: fridayStartTime, 
			onStartChange: setFridayStartTime,
			endValue: fridayEndTime,
			onEndChange: setFridayEndTime,
			discountValue: fridayDiscount,
			onDiscountChange: setFridayDiscount
		},
		{
			label: 'Saturday', 
			startValue: saturdayStartTime, 
			onStartChange: setSaturdayStartTime,
			endValue: saturdayEndTime,
			onEndChange: setSaturdayEndTime,
			discountValue: saturdayDiscount,
			onDiscountChange: setSaturdayDiscount
		},
		{
			label: 'Sunday', 
			startValue: sundayStartTime, 
			onStartChange: setSundayStartTime,
			endValue: sundayEndTime,
			onEndChange: setSundayEndTime,
			discountValue: sundayDiscount,
			onDiscountChange: setSundayDiscount
		}
	]

	const handleVesselAvailabilitySubmit = async (e) => {
		e.preventDefault()
		const result = await updateBoat(boatId, {
			monday: {
				startTime: mondayStartTime,
				endTime: mondayEndTime,
				discount: mondayDiscount
			},
			tuesday: {
				startTime: tuesdayStartTime,
				endTime: tuesdayEndTime,
				discount: tuesdayDiscount
			},
			wednesday: {
				startTime: wednesdayStartTime,
				endTime: wednesdayEndTime,
				discount: wednesdayDiscount
			},
			thursday: {
				startTime: thursdayStartTime,
				endTime: thursdayEndTime,
				discount: thursdayDiscount
			},
			friday: {
				startTime: fridayStartTime,
				endTime: fridayEndTime,
				discount: fridayDiscount
			},
			saturday: {
				startTime: saturdayStartTime,
				endTime: saturdayEndTime,
				discount: saturdayDiscount
			},
			sunday: {
				startTime: sundayStartTime,
				endTime: sundayEndTime,
				discount: sundayDiscount
			}
		})
		if (result.success) {
			mutate(baseUrl(`/boats/${boatId}`))
			setIsComponentVisible(false)
		}
	}

	const handleCheckbox = (day) => {
		const field = fields.find(field => field.label === day)
		if (field.startValue === -1) {
			field.onStartChange('')
			field.onEndChange('')
			return
		}
		field.onStartChange(-1)
		field.onEndChange(-1)
	}

	const formattedTime = Object.values(AVAILABLE_TIME_SLOTS).map(hoursInSeconds => {
		return {
			value: hoursInSeconds,
			label: formatAMPM(hoursInSeconds)
		}
	})


	const modalContent = (
		<div className="fixed w-screen h-screen top-0 left-0 flex justify-center items-center bg-black bg-opacity-50">
			<div className="bg-white rounded p-4">
				<Subheader text="Vessel Availability" />
				<hr/>
				<form className="mt-4 space-y-6" onSubmit={(e) => handleVesselAvailabilitySubmit(e)}>
					{fields.map(field => (<div key={field.label} className="grid grid-cols-4 gap-2">
						<div className="space-y-2">
							<p className="text-sm font-bold">{field.label}</p>
							<CheckboxWithText 
								isChecked={field.startValue === -1}
								handleSelect={handleCheckbox}
								id={field.label}
								value={field.label}
								htmlFor={field.label}
								label="Not available"
								isInModal={true}
							/>	
						</div>
				   	<Input 
					    type="select" 
					    label="First Charter Start Time"
					    id={field.label + 'StartTime'}
					    placeholder={field.startValue === -1 ? 'N/A' : "Select a start time"}
					    onChange={(e) => field.onStartChange(e.target?.value)}
					    value={field.startValue === -1 ? '' : field.startValue} 
					    isInModal={true}
					    options={formattedTime}//.filter(time => time.value < field.endValue)}
				     />
		       	<Input 
		    	    type="select" 
		    	    label="Last Charter Start Time"
		    	    id={field.label + 'EndTime'}
		    	    placeholder={field.endValue === -1 ? 'N/A' : "Select an end time"}
		    	    onChange={(e) => field.onEndChange(e.target?.value)}
		    	    value={field.endValue === -1 ? '' : field.endValue} 
		    	    isInModal={true}
		    	    options={formattedTime.filter(time => time.value > field.startValue)} 
		         />
		       	<Input 
		    	    type="number" 
		    	    label="Discount (%)"
		    	    max="100"
		    	    min="0"
		    	    id={field.label + 'Discount'}
		    	    placeholder="Discount"
		    	    onChange={(e) => field.onDiscountChange(e.target?.value)}
		    	    value={field.discountValue} 
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
