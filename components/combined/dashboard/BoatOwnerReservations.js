import { useReservations } from '@/endpoints/get'
import ReservationsTypePicker from '@/components/combined/ReservationsTypePicker'
import Subheader from '@/components/small/Subheader'
import { useState } from 'react'
import { RATE_LENGTHS, formatDay, differenceBetweenDates, formatMoney } from '@/helpers/index'

export default function BoatOwnerReservations() {

	const { bookings, isLoading } = useReservations()

	const [selected, setSelected] = useState('')

	console.log(bookings)

	const mapDuration = (reservationDuration) => {
		switch (reservationDuration) {
			case RATE_LENGTHS.HALF_DAY:
				return 'Half Day (4 hours)'
			case RATE_LENGTHS.FULL_DAY:
				return 'Full Day (8 hours'
			default: 
				return reservationDuration
		}
	}

	const approveCharter = () => {

	}

	const declineCharter = () => {

	}

	return (
		<div className="space-y-2">
			<Subheader text="Your reservations" />
			<div className="flex flex-row items-center">
				<ReservationsTypePicker selected={selected} setSelected={setSelected} />
				<div className="ml-auto">
					<p onClick={() => setSelected('')} className={`underline cursor-pointer ${selected === '' && 'text-blue-500'}`}>All reservations</p>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-2">
				{bookings?.map(booking => (
					<div key={booking._id} className="max-w-sm shadow rounded">
						<div className="mt-2 ml-2 space-y-2">
							<div className="">
								<p className="font-bold">charter in {differenceBetweenDates(new Date().toISOString(), booking.startDate)}</p>
							</div>
							<p className="text-sm">{formatDay(booking.startDate)}</p>
							<p className="text-sm">{mapDuration(booking.duration)}</p>
							<p className="text-sm">Booked by: {booking.bookedBy.firstName}</p>
							<p className="font-bold text-right mr-2">Total: {formatMoney(booking.totalPrice)}</p>
						</div>
						<div className="mt-4 flex flex-row">
							<button onClick={() => approveCharter()} className="w-full border py-1">Approve</button>
							<button onClick={() => declineCharter()} className="w-full border py-1">Decline</button>
						</div>
					</div>
				))}
			</div>
			<p className="pt-6 text-center">No reservations found.</p>
		</div>
	)
}