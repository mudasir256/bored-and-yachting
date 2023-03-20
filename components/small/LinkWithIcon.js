import Icon from '@/components/Icon'
import Link from 'next/link'

export default function LinkWithIcon({ iconName = '', href, onClick, text, selected }) {
	 
	let style = "cursor-pointer flex flex-row items-center justify-between hover:bg-gray-200 rounded-md px-2 py-1"
	let color = 'black'

	if (selected) {
		style = "cursor-pointer flex flex-row items-center justify-between bg-gray-200 hover:bg-gray-200 rounded-md px-2 py-1"
	}
	if (iconName === 'delete') {
		style = 'cursor-pointer flex flex-row items-center justify-between hover:bg-red-200 rounded-md px-2 py-1'
		color = 'red'
	}

	 if (onClick) {
	 	return(
	 		<div onClick={onClick} className={style}>
	 			<Icon name={iconName} color={color} size="sm" />
	 			<p className="text-sm" >{text}</p>
	 		</div>
	 	)
	 }

	 return(
	 	<div className={style}>
	 		<Icon name={iconName} color={color} size="sm" />
	 		<Link className="text-sm"  href={href}>{text}</Link>
	 	</div>
	)
}