export default function CheckboxWithText({ 
	isChecked, 
	handleSelect, 
	id,
	value,
	htmlFor,
	label,
	isInModal = false
}) {

	return (
		<div className="my-0.5 flex flex-row items-center gap-1">
			<input data-action={isInModal ? 'click' : ''} checked={isChecked} onChange={() => handleSelect(value)} id={id} type="checkbox" value={value} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
			<label htmlFor={htmlFor} class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
		</div>
	)
}