import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import VesselPricingTable from '@/components/combined/VesselPricingTable'
import Subheader from '@/components/small/Subheader'

export default function VesselPricingTableModal({ boatId, isEditable }) {
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => {
	  setIsBrowser(true);
	}, []);

	const modalContent = (
		<div className="fixed w-screen h-screen top-0 left-0 flex justify-center items-center bg-black bg-opacity-50">
			<div className="bg-white rounded p-4">
				<div className="ml-1 mb-2">
					<Subheader text="Pricing Breakdown" />
					<p className="text-sm text-gray-500 max-w-xl">Some prices are set by the boat owner while other fees are automatically calculated based on region and current platform fees.</p>
				</div>
				<VesselPricingTable isEditable={false} boatId={boatId} />
			</div>
		</div>
	)

	if (isBrowser) {
	  return createPortal(
	    modalContent, 
	    document.getElementById("modal-root")
	  );
	} 
	return null;
}