import VesselAvailabilityTable from '@/components/combined/VesselAvailabilityTable'
import VesselPricingTable from '@/components/combined/VesselPricingTable'
export default function PricingForm({ boatId }) {

	return (<>
		{/*    Add options  (allow same day, hours between charters)   */}
		<VesselAvailabilityTable boatId={boatId} />
		<br />
		<VesselPricingTable isEditable={true} boatId={boatId} />
	</>)
}