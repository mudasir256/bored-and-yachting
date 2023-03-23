export default function Button({ text, onClick, isFull = false, isOutlined = false }) {
		
		if (isOutlined) {
			return (
				<button 
					onClick={onClick}
					type="button" 
					className={`text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${isFull && 'w-full'}`}>
					{text}
				</button>

			)
		} 
	 return (
	 		<button 
	 			onClick={onClick} 
	 			className={`bg-blue-500 hover:bg-blue-700 text-white font-bold px-5 py-2 text-sm rounded-lg rounded ${isFull && 'w-full'}`}>
	 			{text}
	 		</button>
	 )
}