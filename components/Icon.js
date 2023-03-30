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
	faStar,
	faCreditCard,
	faCalendarCheck,
	//Amenities
	faBox,
	faSpa,
	faLifeRing,
	faOtter,
	faFish,
	faPersonDrowning,
	//Features
	faWater,
	faFire,
	faHeadphones,
	faTv,
	faRestroom,
	faFireBurner,
	faBed,
	faRefrigerator,
	faWaterLadder
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AMENITIES_LIST, FEATURES_LIST } from '@/helpers/index'

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
		{ name: 'star', component: faStar },
		{ name: 'credit-card', component: faCreditCard },
		{ name: 'confirm-calendar', component: faCalendarCheck },

		//AMENITIES
		{ name: 'COOLER', component: faBox },
		{ name: 'LILY_PAD', component: faSpa },
		{ name: 'FLOATIES', component: faLifeRing },
		{ name: 'FLIPPERS', component: faOtter },
		{ name: 'GOGGLES', component: faFish },
		{ name: 'NOODLES', component: faPersonDrowning },

		//FEATURES
		{ name: 'SWIM_PLATFORM', component: faWater },
		{ name: 'MICROWAVE', component: faFire },
		{ name: 'SPEAKER_SYSTEM', component: faHeadphones },
		{ name: 'TELEVISION', component: faTv },
		{ name: 'BATHROOM', component: faRestroom },
		{ name: 'STOVE_TOP', component: faFireBurner },
		{ name: 'BEDROOMS', component: faBed },
		{ name: 'REFRIGERATOR', component: faRefrigerator },
		{ name: 'LADDER', component: faWaterLadder },

	]

	const icon = icons.find(icon => icon.name === name) || { component: faUser }

	return (
		<FontAwesomeIcon icon={icon.component} color={color} size={size} />
	)
}