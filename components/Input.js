import { useState } from 'react'
import dynamic from 'next/dynamic'
//https://tintef.github.io/react-google-places-autocomplete/docs/get-lat-lng
const GooglePlacesAutocomplete = dynamic(() => 	import('react-google-places-autocomplete'), { ssr: false })
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'

export default function Input({ 
	id, 
	placeholder, 
	label, 
	type, 
	onChange, 
	isRequired = false, 
	value, 
	multiple = false, 
	accept = 'image/*',
	isInModal = false,
	options = [],
	max = '',
	min = '',
}) {
	
	let classStyles = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
	if (type === 'submit') {
		classStyles = 'cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded'
	}

	const AddressInput = () => {

		const handlePlaceSelected = async (e) => {
			try {
				if (e.label) {
					const address = await geocodeByAddress(e.label)
					const location = await address[0]
					onChange({ 
						label: e.label,
						lat: location.geometry.location.lat(),
						lng: location.geometry.location.lng(),
						location: {
							type: "Point",
							coordinates: [location.geometry.location.lng(), location.geometry.location.lat()]
						},
						address: address[0].formatted_address,
						place_id: address[0].place_id,
						value: {} //prevents place_id reference crash
					})
				} 

			} catch (err) {
				console.log(err)
			}
		}

		return (<div data-action={isInModal ? 'click' : ''}>
			{label && <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
			<GooglePlacesAutocomplete 
				apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY} 
				selectProps={{
					 value,
	         onChange: handlePlaceSelected,
	         placeholder: placeholder,
	         className: 'text-sm',
	       }}
			/>
			
		</div>)
	}

	if (type === 'select') {
		if (value === "") {
			classStyles += ' text-gray-400'
		}
		return(
			<div>
	      {label && <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
	      <select id={id} required={isRequired} className={classStyles} value={value} onChange={onChange} data-action={isInModal ? 'click' : ''}>
	      	<option value="" disabled>{placeholder}</option>
	      	{options.map(option => (
	      		<option key={option.value} value={option.value}>{option.label}</option>
	      	))}
	      </select>
	  	</div>
		)
	}

	if (type === 'address') {
		return <AddressInput />
	}

	if (type === 'file') {
		return(
			<div>
	      {label && <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
	      <input 
	      	type={type} 
	      	id={id} 
	      	className={classStyles}
	      	placeholder={placeholder} 
	      	required={isRequired}
	      	onChange={onChange}
	      	value={value}
	      	multiple={multiple}
	      	accept={accept}
	      	data-action={isInModal ? 'click' : ''}
	      />
	  	</div>
		)
	}

	if (type === 'number') {
		return (
			<div>
	      {label && <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
	      <input 
	      	type={type} 
	      	id={id} 
	      	className={classStyles}
	      	placeholder={placeholder} 
	      	required={isRequired}
	      	onChange={onChange}
	      	value={value}
	      	data-action={isInModal ? 'click' : ''}
	      	max={max}
	      	min={min}
	      />
	  	</div>
		)
	}

	return(
		<div>
      {label && <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
      <input 
      	type={type} 
      	id={id} 
      	className={classStyles}
      	placeholder={placeholder} 
      	required={isRequired}
      	onChange={onChange}
      	value={value}
      	min={min}
      	data-action={isInModal ? 'click' : ''}
      />
  	</div>
	)
}