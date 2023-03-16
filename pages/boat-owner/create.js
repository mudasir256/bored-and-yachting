import SidePanelPageLayout from '@/components/layouts/SidePanelPageLayout'
import LinkWithIcon from '@/components/small/LinkWithIcon'
import { useState } from 'react'

export default function Create() {

	const BOAT_TABS = {
		INFO: 'INFO',
		LOCATION: 'LOCATION',
		DESCRIPTION: 'DESCRIPTION',
		MEDIA: 'PHOTOS_AND_VIDEOS',
		PRICING: 'PRICING_DETAILS'
	}

	const [tabSelected, setTabSelected] = useState(BOAT_TABS.INFO)

	return (<>
		<SidePanelPageLayout>
			<div className="flex flex-col m-4 w-64">
				<div className="space-y-4">
					<LinkWithIcon 
						iconName="left-arrow" 
						href="/boat-owner/dashboard"
						text="Back to dashboard" 
					/>
					<LinkWithIcon 
						iconName="info" 
						onClick={() => setTabSelected(BOAT_TABS.INFO)}
						text="Vessel Information" 
					/>
					<LinkWithIcon
						iconName="location"
						onClick={() => setTabSelected(BOAT_TABS.LOCATION)}
						text="Vessel Location"
					/>
					<LinkWithIcon
						iconName="boat"
						onClick={() => setTabSelected(BOAT_TABS.DESCRIPTION)}
						text="Extra Details"
					/>
					<LinkWithIcon
						iconName="photo"
						onClick={() => setTabSelected(BOAT_TABS.MEDIA)}
						text="Photos & Video"
					/>
					<LinkWithIcon
						iconName="pricing"
						onClick={() => setTabSelected(BOAT_TABS.PRICING)}
						text="Pricing Details"
					/>
				</div>
			</div>
			{tabSelected === BOAT_TABS.INFO &&
				<div className="p-4 shadow w-full">
					Boat info tab
				</div>
			}
		</SidePanelPageLayout>
	</>)
}