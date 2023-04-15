import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Header from '@/components/small/Header'
import Subheader from '@/components/small/Subheader'
import ReservationsTypePicker from '@/components/combined/ReservationsTypePicker'
import Link from 'next/link'
import { useUser } from '@/endpoints/get'
import Icon from '@/components/Icon'
import { useTrips } from '@/endpoints/get'
import { useState } from 'react'
import { RESERVATION_STATUS, RATE_LENGTHS, formatDay, differenceBetweenDates, formatMoney, mapDuration } from '@/helpers/index'
import Image from 'next/image'
import ActionItemCard from '@/components/combined/dashboard/ActionItemCard'
import CreateNewAccountType from '@/components/combined/utility/CreateNewAccountType'
import { USER_TYPES } from '@/helpers/index'
import Loading from '@/components/small/Loading'

export default function Dashboard() {

		const { user, isLoading } = useUser()
		const { bookings, isLoading: isLoadingBookings } = useTrips()

		const [selected, setSelected] = useState('')

		const [profileFilled, setProfileFilled] = useState(false)
		const [licenseFilled, setLicenseFilled] = useState(false)
		const [billingFilled, setBillingFilled] = useState(false)

		const ImageWithName = ({ src, text, alt }) => (
			<div className="flex flex-col items-center">
				<div className="relative w-14 h-14">
					<Image src={src} alt={alt} className="object-cover rounded-full" layout="fill" />
				</div>
				<p className="text-sm">{text}</p>
			</div>
		)

		const EmptyPicture = ({ text }) => (
			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-row justify-center items-center w-14 h-14 rounded-full bg-gray-200">
					<Icon name="user" />
				</div>
				<p className="text-sm">{text}</p>
			</div>
		)

		if (isLoading) return <div className="flex justify-center mt-8"><Loading /></div>
		
	 return(
	 	<ContentPageLayout>
	 		<div className="space-y-8 mb-12">
		 		{(!profileFilled || !licenseFilled || !billingFilled) &&
		 		<div className="space-y-4">
		 			<Header text="Finish your account setup:"/ >
		 
		 			<div className="flex flex-col md:flex-row gap-4">
			 			<ActionItemCard 
			 				title="Basic profile information" 
			 				text="This information allows us to keep a safe and secure network, and is needed before you're allowed to book a rental."
			 				href="/user/profile?redirect=true"
			 				buttonText="Add information"
			 				checkCompleted="BASIC_PROFILE"
			 				setParentCompleted={setProfileFilled}
			 			/>
			 			
			 			<ActionItemCard 
			 				title="Driver's license photos" 
			 				text="This information allows us to keep a safe and secure network, and is needed before you're allowed to book a rental."
			 				href="/user/drivers-license"
			 				buttonText="Add license"
			 				checkCompleted="DRIVERS_LICENSE"
			 				setParentCompleted={setLicenseFilled}
			 			/>
			 			<ActionItemCard 
			 				title="Billing details" 
			 				text="This information allows us to keep a safe and secure network, and is needed before you're allowed to book a rental."
			 				href="/user/billing"
			 				buttonText="Add payment method"
			 				checkCompleted="BILLING_INFORMATION"
			 				setParentCompleted={setBillingFilled}
			 			/>
		 			</div>
		 		</div>
		 		}
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
			 					<div key={booking._id} className="max-w-[360px] min-w-[360px] shadow rounded">
			 						<div className="flex flex-row">
			 							<div className="mt-2 ml-2 space-y-2 p-2">
			 								<div className="relative w-32 h-24">
			 									<Image alt={booking.boatId?.name} src={booking.boatId?.photos[0]} className="object-cover rounded" layout="fill" />
			 								</div>
			 							</div>
			 							<div className="ml-auto mr-4 flex flex-col justify-center gap-1.5">
			 								<p className="text-sm">{formatDay(booking.startDate, booking.boatId.timezone)}</p>
			 								<p className="text-sm">{mapDuration(booking.duration)}</p>
			 								<p className="text-sm">on {booking.boatId?.name}</p>

			 							</div>
			 						</div>

			 						<div className="mb-2 flex flex-row gap-4 justify-around">
				 						{booking.status !== RESERVATION_STATUS.PENDING_REVIEW ?
				 							<ImageWithName 
					 							alt={booking.belongsTo?.firstName} 
					 							src={booking.belongsTo?.profilePicture}
					 							text={`Hosted by ${booking.belongsTo?.firstName}`}
				 							/>
				 							: <EmptyPicture text="Awaiting Confirmation" />
				 						}
				 						{booking.captainId?.firstName 
				 							? <ImageWithName alt={booking.captainId?.firstName} src={booking.captainId?.profilePicture} text={`Captained by ${booking.captainId?.firstName}`} />
				 							: <EmptyPicture text="Finding Captain" />
				 						}
			 						</div>
			 						<hr />
			 						<p className="my-2 text-sm px-4">{booking.boatId?.parkingLocation?.address.slice(0, -5)}</p>

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
	 		</div>

	 		<div>
	 			<h2 className="text-lg mb-2">Other Features</h2>
	 			<div className="flex flex-row gap-2">
	 				<Link href="/user/profile?redirect=true" className="cursor-pointer underline text-sm">Update profile</Link>
	 				<Link href="/user/billing" className="cursor-pointer underline text-sm">Update billing</Link>
	 				<CreateNewAccountType type={USER_TYPES.BOAT_OWNER} />
	 				<CreateNewAccountType type={USER_TYPES.CAPTAIN} />
	 			</div>
	 		</div>

	 	</ContentPageLayout>
	 )
}