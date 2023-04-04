import { useReservations } from '@/endpoints/get'
import { approveCharter, declineCharter } from '@/endpoints/post'

import ReservationsTypePicker from '@/components/combined/ReservationsTypePicker'
import Subheader from '@/components/small/Subheader'
import { useState } from 'react'
import { RESERVATION_STATUS, formatDay, differenceBetweenDates, formatMoney, mapDuration } from '@/helpers/index'
import Image from 'next/image'

export default function BoatOwnerReservations({ boatsOwned = [] }) {

	const { bookings, isLoading, mutate } = useReservations()

	const [selected, setSelected] = useState('')

	const matchBoat= (boatId) => {
		const boat = boatsOwned.find(boat => boat._id == boatId)
		return boat
	}

	const handleApproveCharter = async (booking) => {
		try {
			const status =  RESERVATION_STATUS.UPCOMING
			const newBookings = [...bookings]
			const change = newBookings.find(booking => booking === booking)
			change.status = status
			const result = await approveCharter(booking._id)
		
			if (result.success) {
				mutate([...newBookings])
			}
		} catch (err) {
			console.log(err)
		}
	}

	const handleDeclineCharter = () => {
		//TODO: notify user
		try {

		} catch (err) {
			console.log(err)
		}
	}

	console.log(bookings)

	return (
		<div className="space-y-4">
			<Subheader text="Your reservations" />
			<div className="flex flex-row items-center">
				<ReservationsTypePicker selected={selected} setSelected={setSelected} />
				<div className="ml-auto">
					<p onClick={() => setSelected('')} className={`underline cursor-pointer ${selected === '' && 'text-blue-500'}`}>All reservations</p>
				</div>
			</div>
			<div className="flex flex-row flex-wrap gap-4">
				{bookings?.filter(booking => { 
					if (!selected) { return true } else {
						return booking.status === selected
					}
				}).map(booking => {
					return (
						<div key={booking._id} className="min-w-[360px] shadow rounded">
							<div className="flex flex-row">
								<div className="mt-2 ml-2 space-y-2 p-2">
									<div className="">
										{[RESERVATION_STATUS.PENDING_REVIEW, RESERVATION_STATUS.UPCOMING, RESERVATION_STATUS.FINDING_CAPTAIN].find(one => one === booking.status) && <p className="font-bold">charter in {differenceBetweenDates(new Date().toISOString(), booking.startDate)}</p>}
									</div>
									<p className="text-sm">{formatDay(booking.startDate)}</p>
									<p className="text-sm">{mapDuration(booking.duration)}</p>
									<p className="text-sm">on {matchBoat(booking.boatId)?.name}</p>
								</div>
								<div className="ml-auto mr-4 mt-2 flex flex-col justify-center items-center">
									<div className="relative w-14 h-14">
										<Image alt={booking.bookedBy?.firstName} src={booking.bookedBy?.profilePicture} className="object-cover rounded-full" layout="fill" />
									</div>
									<p className="text-sm">Booked by {booking.bookedBy?.firstName}</p>
								</div>
							</div>

							<p className="mb-4 font-bold text-right mr-2">Total: {formatMoney(booking.totalPrice)}</p>
							{booking.status === RESERVATION_STATUS.PENDING_REVIEW && 
							<div className="flex flex-row">
								<button onClick={() => handleApproveCharter(booking)} className="w-full border py-1 hover:bg-gray-200">Approve</button>
								<button onClick={() => handleDeclineCharter()} className="w-full border py-1 hover:bg-gray-200">Decline</button>
							</div>
							}
						</div>
					)
				})}
			</div>
 			{bookings?.filter(booking => { 
	 				if (!selected) { return true } else {
	 					return booking.status === selected
	 				}
	 		}).length === 0 && <p className="pt-6 text-center">No reservations found.</p>}
		</div>
	)
}