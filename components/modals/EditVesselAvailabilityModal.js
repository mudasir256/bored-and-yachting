import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Subheader from '@/components/small/Subheader'
import Input from '@/components/Input'
import { AVAILABLE_TIME_SLOTS } from '@/helpers/index'
import { DateTime } from "luxon";
import CheckboxWithText from '@/components/small/CheckboxWithText'

export default function EditVesselAvailability() {
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => {
	  setIsBrowser(true);
	}, []);

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

	const handleVesselAvailabilitySubmit = (e) => {
		e.preventDefault()
		console.log(mondayStartTime)
	}

	const handleCheckbox = (day) => {
		console.log(day)
		const field = fields.find(field => field.label === day)
		if (field.startValue === 'N/A') {
			field.onStartChange('')
			field.onEndChange('')
			return
		}
		field.onStartChange('N/A')
		field.onEndChange('N/A')
	}

	const formattedTime = Object.values(AVAILABLE_TIME_SLOTS).map(hoursInSeconds => {
		return {
			value: hoursInSeconds,
			label: DateTime.fromSeconds(hoursInSeconds, { zone: 'UTC' }).toLocaleString(DateTime.TIME_SIMPLE)
		}
	})


	const modalContent = (
		<div className="absolute w-screen h-screen top-0 left-0 flex justify-center items-center bg-black bg-opacity-50">
			<div className="bg-white rounded p-4">
				<Subheader text="Vessel Availability" />
				<hr/>
				<form className="mt-4 space-y-6" onSubmit={(e) => handleVesselAvailabilitySubmit(e)}>
					{fields.map(field => (<div key={field.label} className="grid grid-cols-4 gap-2">
						<div className="space-y-2">
							<p className="text-sm font-bold">{field.label}</p>
							<CheckboxWithText 
								isChecked={field.startValue === 'N/A'}
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
					    placeholder={field.startValue === 'N/A' ? 'N/A' : "Select a start time"}
					    onChange={(e) => field.onStartChange(e.target?.value)}
					    value={field.startValue === 'N/A' ? '' : field.startValue} 
					    isRequired={true}
					    isInModal={true}
					    options={formattedTime}//.filter(time => time.value < field.endValue)}
				     />
		       	<Input 
		    	    type="select" 
		    	    label="Last Charter Start Time"
		    	    id={field.label + 'EndTime'}
		    	    placeholder={field.endValue === 'N/A' ? 'N/A' : "Select an end time"}
		    	    onChange={(e) => field.onEndChange(e.target?.value)}
		    	    value={field.endValue === 'N/A' ? '' : field.endValue} 
		    	    isRequired={true}
		    	    isInModal={true}
		    	    options={formattedTime.filter(time => time.value > field.startValue)} 
		         />
		       	<Input 
		    	    type="number" 
		    	    label="Discount (%)"
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
