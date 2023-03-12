import { 
	faUser,
	faBars,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Icon({ name, color = 'black', size = 'lg' }) {

	const icons = [
		{ name: 'user', component: faUser },
		{ name: 'menu', component: faBars },
	]

	const icon = icons.find(icon => icon.name === name) || { component: faUser }

	return (
		<FontAwesomeIcon icon={icon.component} color={color} size={size} />
	)
}