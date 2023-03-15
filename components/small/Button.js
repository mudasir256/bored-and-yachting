export default function Button({ text, onClick, isFull = false }) {
	 return (
	 		<button 
	 			onClick={onClick} 
	 			className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isFull && 'w-full'}`}>
	 			{text}
	 		</button>
	 )
}