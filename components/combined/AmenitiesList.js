import Icon from '@/components/Icon'
import { AMENITIES_LIST } from '@/helpers/index'

export default function AmenitiesList({ amenities = [] }) {
	return(<div>
		{amenities.map(amenity => (
			<p key={amenity} className="grid grid-cols-2 items-end space-y-4">
				<Icon name={amenity}  />
				<span className="text-sm">{AMENITIES_LIST[amenity]}</span>
			</p>
		))}
	</div>)
}