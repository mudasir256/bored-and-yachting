import Icon from '@/components/Icon'
import { FEATURES_LIST } from '@/helpers/index'

export default function FeaturesList({ features = [] }) {
	return(<div>
		{features.map(feature => (
			<p key={feature} className="grid grid-cols-2 items-end space-y-4">
				<Icon name={feature}  />
				<span className="text-sm">{FEATURES_LIST[feature]}</span>
			</p>
		))}
	</div>)
}