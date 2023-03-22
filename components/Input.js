import { useState } from 'react'

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
	isInModal = false
}) {
	
	let classStyles = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
	if (type === 'submit') {
		classStyles = 'cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded'
	}

	const AddressInput = () => {
		const [searchText, setSearchText] = useState('')
		const [timer, setTimer] = useState()
		const [predictions, setPredictions] = useState([])

		const queryPlaces = (e) => {
			if (timer) {
				clearTimeout(timer)
			}
			setSearchText(e.target.value)

			setTimer(setTimeout(() => {
				if (e.target.value.trim() === '') { setShowPredictions(false); return }

				getAutoCompletePlaces(e.target.value.trim(), function(data) {
					//TODO: add error check
					onChange(data)
				})
			}, 1000))
		}
		return (
			<div>
				{label && <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
				<input 
					placeholder={placeholder} 
					id={id} 
					className={className} 
					required={isRequired}
					onChange={(e) => queryPlaces(e)} 
					value={searchText}
					autoComplete="off" 
					type="text" 
					data-action={isInModal ? 'click' : ''}
				/>
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
      	data-action={isInModal ? 'click' : ''}
      />
  	</div>
	)
}