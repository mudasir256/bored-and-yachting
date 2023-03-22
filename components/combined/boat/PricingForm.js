import VesselAvailabilityTable from '@/components/combined/VesselAvailabilityTable'
import VesselPricingTable from '@/components/combined/VesselPricingTable'
export default function PricingForm({ boatId }) {

	return (<>
		<VesselAvailabilityTable boatId={boatId} />
		<br />
		<VesselPricingTable boatId={boatId} />
	</>)
}