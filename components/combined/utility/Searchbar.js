import Input from '@/components/Input'
import { DateTime } from 'luxon'
import { useState, useEffect } from 'react'
import Icon from '@/components/Icon'
import { saveSearchBarFields } from '@/helpers/index'

export default function Searchbar({ onSearch }) {

	const [address, setAddress] = useState('')
	const [date, setDate] = useState('')
	const [numberOfGuests, setNumberOfGuests] = useState('')

	useEffect(() => {
		const storedAddress = localStorage.getItem('address')
		const storedDate = localStorage.getItem('date')
		const storedNumberOfGuests = localStorage.getItem('numberOfGuests')
		if (storedAddress) {
			setAddress(JSON.parse(storedAddress))
		}
		if (storedDate) {
			setDate(storedDate)
		}
		if (storedNumberOfGuests) {
			setNumberOfGuests(storedNumberOfGuests)
		}
	}, [])

	const handleClick = (e) => {
		e.preventDefault()
		//TODO: toast fill out entire form.
		saveSearchBarFields({ address, date, numberOfGuests })
		onSearch({ address, date, numberOfGuests })
	}

	return(<div className="rounded-lg border p-4 shadow-lg bg-white grid grid-cols-5 max-w-2xl gap-4 items-end">
			<div className="col-span-2">
				<Input 
			 		type="address" 
			 		id="address"
			  	placeholder="Address" 
			  	label="Where to" 
			  	onChange={(data) => setAddress(data)}
			  	value={address}
			  	isRequired={true} 
				/>
			</div>
			<div className="col-span-2">
				<Input 
					type="date" 
					id="date"
					label="When"
					min={DateTime.now().toFormat('yyyy-MM-dd')}
					onChange={(e) => setDate(e.target?.value)} 
					value={date} 
				/>
			</div>
			<Input 
				type="number" 
				id="numberOfGuests"
				label="Add guests"
				placeholder="# of guests"
				min={1}
				onChange={(e) => setNumberOfGuests(e.target?.value)} 
				value={numberOfGuests} 
			/>
			<div onClick={(e) => handleClick(e)} className="flex justify-center items-center gap-2 text-sm py-1 col-span-5 rounded-full bg-blue-500 text-white">
				<div className="">
					<Icon name="search" size="lg" color="white" />
				</div>
				<span>Search</span>
			</div>
	</div>)
}