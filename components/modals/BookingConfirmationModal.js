import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Subheader from '@/components/small/Subheader'
import { mapDuration, formatDay, formatMoney } from '@/helpers/index'
import Icon from '@/components/Icon'
import Button from '@/components/small/Button'
import PaymentSelector from '@/components/combined/PaymentSelector'
import CaptainSelector from '@/components/combined/CaptainSelector'
import VesselPricingTable from '@/components/combined/VesselPricingTable'
import Input from '@/components/Input'

export default function BookingConfirmationModal({ boat, bookingData, confirmBooking }) {
	const [isBrowser, setIsBrowser] = useState(false);

	const [paymentSelected, setPaymentSelected] = useState('')
	const [captainSelected, setCaptainSelected] = useState('')
	const [numberOfGuests, setNumberOfGuests] = useState('')

	useEffect(() => {
	  setIsBrowser(true);
	}, []);

	const handleConfirmBooking = async () => {
		if (paymentSelected) {
			confirmBooking(paymentSelected, numberOfGuests)
			return
		} 
		//TODO: please select a payment method
	}

	const modalContent = (
		<div data-action="close-modal" className="fixed w-screen h-screen top-0 left-0 flex justify-center items-center bg-black bg-opacity-50">
			<div className="bg-white rounded p-4 overflow-y-scroll h-[90vh]">
				<div className="space-y-4">
					<Subheader text="Confirm Your Reservation" />
					<div className="grid grid-cols-2 gap-4">
						<div>
							<p className="font-bold">Your Charter</p>
							<p className="text-sm text-gray-500">{formatDay(bookingData.startTimeDate)}</p>
							<p className="text-sm text-gray-500 ">{mapDuration(bookingData.duration)}</p>
						</div>
						<div>
							<p className="font-bold">Pay With</p>
							<PaymentSelector paymentSelected={paymentSelected} setPaymentSelected={setPaymentSelected} isFull />
						</div>
						<div>
							<p className="font-bold">Captains List</p>
							<CaptainSelector captainSelected={captainSelected} setCaptainSelected={setCaptainSelected} captains={boat?.preferredCaptains} isFull />
						</div>
						<div>
							<p className="font-bold">Number of Guests</p>
					   	<Input 
						    type="number" 
						    id="numberOfGuests"
						    placeholder="# of guests"
						    min={1}
						    onChange={(e) => setNumberOfGuests(e.target?.value)}
						    value={numberOfGuests}
					     />
						</div>
						<div className="col-span-2">
							<VesselPricingTable isEditable={false} boatId={boat?._id} />
						</div>
					</div>
					<div className="space-y-2">
						<hr />
						<div className="py-2 ml-4 flex flex-row gap-6">
							<div className="mt-3">
								<Icon name="confirm-calendar" size="xl" />
							</div>
							<div className="space-y-1">
								<p className="text-sm font-bold max-w-sm">Your reservation won’t be confirmed until the Host accepts your request (within 24 hours).</p>
								<p className="text-sm">You won’t be charged until then.</p>
							</div>
						</div>
						<hr />
					</div>

					<div className="flex flex-row justify-between items-end">
						<p className="text-right text-lg"><span className="text-gray-500">Total due:</span> {formatMoney(bookingData.totalPrice)}</p>
						<Button text="Confirm" onClick={() => handleConfirmBooking()} />
					</div>
				</div>
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