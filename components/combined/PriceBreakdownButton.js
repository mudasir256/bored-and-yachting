import useComponentVisible from '@/hooks/useComponentVisible'
import VesselPricingTableModal from '@/components/modals/VesselPricingTableModal'
import Icon from '@/components/Icon'

export default function PriceBreakdownButton({ boatId }) {

	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

	return(<>
		<div onClick={() => setIsComponentVisible(true)} className="border-dotted border p-2 flex flex-row items-center justify-center gap-2 cursor-pointer">
			<Icon name="info" color="gray" size="xs" />
			<p className="text-gray-500 text-xs italic">full price breakdown</p>
		</div>
		<div ref={ref}>
			{isComponentVisible && <VesselPricingTableModal isEditable={false} boatId={boatId} />}
		</div>
	</>)
}