export default function Button({ text, onClick, isFull = false, isOutlined = false, color = 'bg-blue-500', hoverColor = 'hover:bg-blue-700' }) {
		
		if (isOutlined) {
			return (
				<button 
					data-action="click"
					onClick={onClick}
					type="button" 
					className={`text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${isFull && 'w-full'}`}>
					{text}
				</button>

			)
		} 
	 return (
	 		<button 
	 			data-action="click"
	 			onClick={onClick} 
	 			className={`${color} ${hoverColor} text-white font-bold px-4 py-2 text-sm rounded-lg rounded ${isFull && 'w-full'}`}>
	 			{text}
	 		</button>
	 )
}