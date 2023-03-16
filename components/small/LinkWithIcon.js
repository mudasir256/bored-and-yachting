import Icon from '@/components/Icon'
import Link from 'next/link'

export default function LinkWithIcon({ iconName = '', href, onClick, text }) {
	 
	 if (onClick) {
	 	return(
	 		<div onClick={onClick} className="cursor-pointer flex flex-row items-center justify-between hover:bg-gray-200 rounded-md px-2 py-1">
	 			<Icon name={iconName} size="md" />
	 			<p className="text-sm">{text}</p>
	 		</div>
	 	)
	 }

	 return(
	 	<div className="flex flex-row items-center justify-between hover:bg-gray-200 rounded-md  px-2 py-1">
	 		<Icon name={iconName} size="md" />
	 		<Link className="text-sm" href={href}>{text}</Link>
	 	</div>
	)
}