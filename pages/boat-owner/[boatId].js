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
import CaptainsForm from '@/components/combined/boat/CaptainsForm'

import { useRouter } from 'next/router'
import WarningDeleteModal from '@/components/modals/WarningDeleteModal'
import useComponentVisible from '@/hooks/useComponentVisible'
import { baseUrl, updateBoat } from '@/endpoints/post'
import { useSWRConfig } from 'swr'

export default function Create() {

	const { mutate } = useSWRConfig()
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
		CREW: 'CREW'
	}

	const [tabSelected, setTabSelected] = useState(BOAT_TABS.INFO)

	const deleteBoat = async () => {
		const result = await updateBoat(boatId, { isActive: false })
		console.log(result)
		if (result.success) {
			mutate(baseUrl(`/boats/user/${localStorage.getItem('userId')}`))
			setIsComponentVisible(false)
			router.push('/boat-owner/dashboard')
		}
		//TODO: show error or alert
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
						text="Pricing & Availability"
						selected={tabSelected === BOAT_TABS.PRICING}
					/>
					<LinkWithIcon
						iconName="declaration"
						onClick={() => setTabSelected(BOAT_TABS.DECLARATIONS)}
						text="Declarations"
						selected={tabSelected === BOAT_TABS.DECLARATIONS}
					/>
					<LinkWithIcon
						iconName="crew"
						onClick={() => setTabSelected(BOAT_TABS.CREW)}
						text="Crew Preferences"
						selected={tabSelected === BOAT_TABS.CREW}
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
					<BasicInformationForm boatId={boatId} />
				</div>
			}
			{tabSelected === BOAT_TABS.LOCATION &&
				<div className="p-4 shadow w-full">
					<LocationForm boatId={boatId} />
				</div>
			}
			{tabSelected === BOAT_TABS.DESCRIPTION &&
				<div className="p-4 shadow w-full">
					<ExtraDetailsForm boatId={boatId} />
				</div>
			}
			{tabSelected === BOAT_TABS.MEDIA &&
				<div className="p-4 shadow w-full">
					<PhotosAndVideoForm boatId={boatId} />
				</div>
			}
			{tabSelected === BOAT_TABS.PRICING &&
				<div className="p-4 shadow w-full">
					<PricingForm boatId={boatId} />
				</div>
			}
			{tabSelected === BOAT_TABS.DECLARATIONS &&
				<div className="p-4 shadow w-full">
					<DeclarationsForm boatId={boatId} />
				</div>
			}
			{tabSelected === BOAT_TABS.CREW &&
				<div className="p-4 shadow w-full">
					<CaptainsForm boatId={boatId} />
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