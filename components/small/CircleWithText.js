export default function CircleWithText({ height = 'h-8', width = 'w-8', text }) {
	return(
		<div className={`font-bold text-white rounded-full bg-blue-500 flex items-center justify-center font-mono ${height} ${width}`}>{text}</div>
	)
}