import { 
	faUser,
	faBars,
	faArrowLeft,
	faSailboat,
	//faLocationDot,
	faCircleInfo,
	faImage,
	faLocationCrosshairs,
	faDollarSign,
	faCircleExclamation,
	faTrashCan,
	faCircleCheck,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Icon({ name, color = 'black', size = 'lg' }) {

	const icons = [
		{ name: 'user', component: faUser },
		{ name: 'menu', component: faBars },
		{ name: 'left-arrow', component: faArrowLeft },
		{ name: 'boat', component: faSailboat },
		{ name: 'location', component: faLocationCrosshairs },
		{ name: 'info', component: faCircleInfo },
		{ name: 'photo', component: faImage },
		{ name: 'pricing', component: faDollarSign },
		{ name: 'declaration', component: faCircleExclamation },
		{ name: 'delete', component: faTrashCan },
		{ name: 'circle-checkmark', component: faCircleCheck },
	]

	const icon = icons.find(icon => icon.name === name) || { component: faUser }

	return (
		<FontAwesomeIcon icon={icon.component} color={color} size={size} />
	)
}