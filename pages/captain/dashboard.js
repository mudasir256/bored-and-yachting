import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Link from 'next/link'
import Subheader from '@/components/small/Subheader'
import ActionItemCard from '@/components/combined/dashboard/ActionItemCard'
import ReservationsTypePicker from '@/components/combined/ReservationsTypePicker'
import { baseUrl, useCharters } from '@/endpoints/get'
import { acceptCharter } from '@/endpoints/post'
import { useState } from 'react'
import Image from 'next/image'
import { mapDuration, formatDay, USER_TYPES} from '@/helpers/index'
import { useSWRConfig } from 'swr'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {

	const { mutate } = useSWRConfig()
	const { bookings, isLoading } = useCharters()
	const [selected, setSelected] = useState('')

	const ImageWithName = ({ src, text, alt }) => (
		<div className="flex flex-col items-center">
			<div className="relative w-14 h-14">
				<Image src={src} alt={alt} className="object-cover rounded-full" layout="fill" />
			</div>
			<p className="text-sm">{text}</p>
		</div>
	)

	const handleAcceptCharter = async (booking) => {
		try {
			const result = await acceptCharter(booking._id)
			if (result.success) {
				mutate(baseUrl('/bookings/charters/' + localStorage.getItem('userId')))
				return
			}
			toast.error(result.message || 'Something went wrong. Please try again.')
		} catch (err) {
			console.log(err)
			toast.error(err?.message || err)
		}

	}

	return (<>
		<ContentPageLayout>
			<ToastContainer />
			<div className="space-y-8">
				<div className="flex flex-col md:flex-row gap-4">
					<ActionItemCard 
						title="Basic profile information" 
						text="This information allows us to keep a safe and secure network, and is needed before you're allowed to book a rental."
						href="/user/profile?redirect=true"
						buttonText="Add information"
						checkCompleted="BASIC_PROFILE"
					/>
					<ActionItemCard 
						title="USCG License information" 
						text="This information allows us to keep a safe and secure network, and is needed before you're allowed to book a rental."
						href="/captain/license?redirect=true"
						buttonText="Add license"
						checkCompleted="CAPTAIN_LICENSE"
					/>
					<ActionItemCard 
						title="Billing information" 
						text="This information allows us to keep a safe and secure network, and is needed before you're allowed to book a rental."
						href="/user/billing-connect?redirect=true&key=captain"
						buttonText="Add information"
						checkCompleted="CONNECT_FINISHED"
					/>
				</div>

		 		<div className="space-y-4">
		 			<Subheader text="Your charters" />
		 			<div className="flex flex-row items-center">
		 				<ReservationsTypePicker selected={selected} setSelected={setSelected} role={USER_TYPES.CAPTAIN} />
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
			 					<div key={booking._id} className="max-w-[360px] min-w-[360px] shadow rounded">
			 						<div className="flex flex-row">
			 							<div className="mt-2 ml-2 space-y-2 p-2">
			 								<div className="relative w-32 h-24">
			 									<Image alt={booking.boatId?.name} src={booking.boatId?.photos[0]} className="object-cover rounded" layout="fill" />
			 								</div>
			 							</div>
			 							<div className="ml-auto mr-4 flex flex-col justify-center gap-1.5">
			 								<p className="text-sm">{formatDay(booking.startDate)}</p>
			 								<p className="text-sm">{mapDuration(booking.duration)}</p>
			 								<p className="text-sm">on {booking.boatId?.name}</p>

			 							</div>
			 						</div>

		 							<ImageWithName 
			 							alt={booking.bookedBy?.firstName} 
			 							src={booking.bookedBy?.profilePicture}
			 							text={`Booked by ${booking.bookedBy?.firstName}`}
		 							/>
				 						

			 						{booking?.captainId === localStorage.getItem('userId')
			 							?	<div className="mt-2">
			 									<hr/>
			 									<p className="mt-2 mb-1 italic text-center text-sm text-green-500">You&apos;ve accepted this charter!</p>
			 								</div>
			 						 	: <button onClick={() => handleAcceptCharter(booking)} className="mt-2 w-full border py-1 hover:bg-gray-200">Accept Charter</button>
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

				<div>
					<h2 className="text-lg mb-2">Other Features</h2>
					<div className="flex flex-row gap-2">
						<Link href="/user/profile?redirect=true" className="cursor-pointer underline text-sm">Update profile</Link>
						<Link href="/user/billing-connect?redirect=true&key=boat-owner" className="cursor-pointer underline text-sm">Update billing</Link>
						<p className="cursor-pointer underline text-sm" onClick={() => handleAddRole(USER_TYPES.BOAT_OWNER)}>List a vessel</p>
						<p className="cursor-pointer underline text-sm" onClick={() => handleAddRole(USER_TYPES.CUSTOMER)}>Create a customer account</p>
					</div>
				</div>
			</div>
		</ContentPageLayout>
	</>)
}