import SidePanelPageLayout from '@/components/layouts/SidePanelPageLayout'
import LinkWithIcon from '@/components/small/LinkWithIcon'
import { useState } from 'react'
import Input from '@/components/Input'
import BasicInformationForm from '@/components/combined/boat/BasicInformationForm'
import ExtraDetailsForm from '@/components/combined/boat/ExtraDetailsForm'
import LocationForm from '@/components/combined/boat/LocationForm'
import PhotosAndVideoForm from '@/components/combined/boat/PhotosAndVideoForm'
import PricingForm from '@/components/combined/boat/PricingForm'
import DeclarationsForm from '@/components/combined/boat/DeclarationsForm'
import { useRouter } from 'next/router'
import WarningDeleteModal from '@/components/modals/WarningDeleteModal'
import useComponentVisible from '@/hooks/useComponentVisible'

export default function Create() {

	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

	const router = useRouter()
	const { boatId } = router.query

	const BOAT_TABS = {
		INFO: 'INFO',
		LOCATION: 'LOCATION',
		DESCRIPTION: 'DESCRIPTION',
		MEDIA: 'PHOTOS_AND_VIDEOS',
		PRICING: 'PRICING_DETAILS',
		DECLARATIONS: 'DECLARATIONS',
	}

	const [tabSelected, setTabSelected] = useState(BOAT_TABS.INFO)

	const deleteBoat = async () => {
		
	}

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
						selected={tabSelected === BOAT_TABS.INFO}
					/>
					<LinkWithIcon
						iconName="location"
						onClick={() => setTabSelected(BOAT_TABS.LOCATION)}
						text="Vessel Location"
						selected={tabSelected === BOAT_TABS.LOCATION}
					/>
					<LinkWithIcon
						iconName="boat"
						onClick={() => setTabSelected(BOAT_TABS.DESCRIPTION)}
						text="Extra Details"
						selected={tabSelected === BOAT_TABS.DESCRIPTION}
					/>
					<LinkWithIcon
						iconName="photo"
						onClick={() => setTabSelected(BOAT_TABS.MEDIA)}
						text="Photos & Video"
						selected={tabSelected === BOAT_TABS.MEDIA}
					/>
					<LinkWithIcon
						iconName="pricing"
						onClick={() => setTabSelected(BOAT_TABS.PRICING)}
						text="Pricing Details"
						selected={tabSelected === BOAT_TABS.PRICING}
					/>
					<LinkWithIcon
						iconName="declaration"
						onClick={() => setTabSelected(BOAT_TABS.DECLARATIONS)}
						text="Declarations"
						selected={tabSelected === BOAT_TABS.DECLARATIONS}
					/>
					<LinkWithIcon
						iconName="delete"
						onClick={() => setIsComponentVisible(true)}
						text="Delete Vessel"
					/>
				</div>
			</div>
			{tabSelected === BOAT_TABS.INFO &&
				<div className="p-4 shadow w-full">
					<BasicInformationForm />
				</div>
			}
			{tabSelected === BOAT_TABS.LOCATION &&
				<div className="p-4 shadow w-full">
					<LocationForm />
				</div>
			}
			{tabSelected === BOAT_TABS.DESCRIPTION &&
				<div className="p-4 shadow w-full">
					<ExtraDetailsForm />
				</div>
			}
			{tabSelected === BOAT_TABS.MEDIA &&
				<div className="p-4 shadow w-full">
					<PhotosAndVideoForm />
				</div>
			}
			{tabSelected === BOAT_TABS.PRICING &&
				<div className="p-4 shadow w-full">
					<PricingForm />
				</div>
			}
			{tabSelected === BOAT_TABS.DECLARATIONS &&
				<div className="p-4 shadow w-full">
					<DeclarationsForm />
				</div>
			}
			<div ref={ref}>
				{isComponentVisible && <WarningDeleteModal 
					header="Delete Vessel?" 
					description="Are you sure you want to delete this vessel? This action cannot be undone." 
					onDelete={deleteBoat}
				/>
			}
			</div>
		</SidePanelPageLayout>
	</>)
}