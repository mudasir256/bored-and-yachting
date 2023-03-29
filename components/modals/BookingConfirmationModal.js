import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Subheader from '@/components/small/Subheader'
import { mapDuration, formatDay, formatMoney } from '@/helpers/index'
import Icon from '@/components/Icon'
import Button from '@/components/small/Button'

export default function BookingConfirmationModal({ boat, bookingData, confirmBooking }) {
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => {
	  setIsBrowser(true);
	}, []);

	const handleConfirmBooking = async () => {
		confirmBooking() //include CC selected
	}

	const modalContent = (
		<div className="fixed w-screen h-screen top-0 left-0 flex justify-center items-center bg-black bg-opacity-50">
			<div className="bg-white rounded p-4">
				<div className="max-w-xl space-y-4">
					<Subheader text="Confirm Your Reservation" />
					<div className="grid grid-cols-2 gap-4">
						<div>
							<p className="font-bold">Your Charter</p>
							<p className="text-sm text-gray-500">{formatDay(bookingData.startTimeDate)}</p>
							<p className="text-sm text-gray-500 ">{mapDuration(bookingData.duration)}</p>
						</div>
						<div>
							<p className="font-bold">Pay With</p>
							<p className="text-sm text-gray-500">TODO CC selector / payment selector</p>
						</div>
						<div>
							<p className="font-bold">Ground Rules</p>
							<p>TODO: ground rules pulled from where?</p>
						</div>
						<div>
							<p className="font-bold">Charter Insurance</p>
							<p>TODO:insurance section</p>
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