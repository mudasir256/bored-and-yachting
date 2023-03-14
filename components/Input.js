export default function Input({ id, placeholder, label, type, onChange, isRequired = false, value }) {
	
	let classStyles = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
	if (type === 'submit') {
		classStyles = 'cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded'
	}

	return(
		<div>
      {label && <label for={id} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
      <input 
      	type={type} 
      	id={id} 
      	class={classStyles}
      	placeholder={placeholder} 
      	required={isRequired}
      	onChange={onChange}
      	value={value}
      />
  	</div>
	)
}