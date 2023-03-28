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

export default function Dashboard() {

		const { user, isLoading } = useUser()
		const { bookings, isLoading: isLoadingBookings } = useTrips()

		const [selected, setSelected] = useState('')

		const Card = ({ title, text, buttonText, href, isComplete }) => {
			return(
				<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
						<div className="flex flex-row">
				    	<h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
							{isComplete && <div className="ml-auto">
								<Icon name="circle-checkmark" color="green" />
							</div>
							}
						</div>
				    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{text}</p>
				    
				    {isComplete ? <Link href={href} className="underline text-sm text-gray-500">Edit</Link>

				    : <Link href={href} className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
				        {buttonText}
				        <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
				    	</Link>
				  	}
				</div>
			)
		}

		const ImageWithName = ({ src, text, alt }) => (
			<div className="flex flex-col items-center">
				<div className="relative w-14 h-14">
					<Image src={src} alt={alt} className="object-cover rounded-full" layout="fill" />
				</div>
				<p className="text-sm">{text}</p>
			</div>
		)

		const EmptyPicture = () => (
			<div className="flex flex-col items-center justify-center">
				<div className="flex flex-row justify-center items-center w-14 h-14 rounded-full bg-gray-200">
					<Icon name="user" />
				</div>
				<p className="text-sm">Finding Captain</p>
			</div>
		)
		

		const isBasicProfileFilled = () => {
			if (user?.firstName && user?.lastName && user?.profilePicture) {
				return true
			}
			return false
		}

	 return(
	 	<ContentPageLayout>
	 		<div className="space-y-8">
		 		<div className="space-y-4">
		 			<Header text="Verify your account:"/ >
		 			<div className="flex flex-col md:flex-row gap-4">
			 			<Card 
			 				title="Basic profile information" 
			 				text="This information allows us to keep a safe and secure network, and is needed before you're allowed to book a rental."
			 				href="/user/profile?redirect=true"
			 				buttonText="Add information"
			 				isComplete={isBasicProfileFilled()}
			 			/>
			 			
			 			<Card 
			 				title="Driver's license photos" 
			 				text="This information allows us to keep a safe and secure network, and is needed before you're allowed to book a rental."
			 				href="/user/drivers-license"
			 				buttonText="Add license"
			 			/>
			 			<Card 
			 				title="Billing details" 
			 				text="This information allows us to keep a safe and secure network, and is needed before you're allowed to book a rental."
			 				href="/user/billing"
			 				buttonText="Add payment method"
			 			/>
		 			</div>
		 		</div>
		 		<div className="space-y-4">
		 			<Subheader text="Your reservations" />
		 			<div className="flex flex-row items-center">
		 				<ReservationsTypePicker selected={selected} setSelected={setSelected} />
		 				<div className="ml-auto">
		 					<p className="underline cursor-pointer">All reservations</p>
		 				</div>
		 			</div>
		 			<div className="flex flex-row flex-wrap gap-4">
			 			{bookings?.filter(booking => { 
			 				if (!selected) { return true } else {
			 					return booking.status === selected
			 				}
			 			}).map(booking => {
			 				console.log(booking)
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

			 						<div className="mb-2 flex flex-row gap-4 justify-around">
				 						<ImageWithName 
				 							alt={booking.belongsTo?.firstName} 
				 							src={booking.belongsTo?.profilePicture}
				 							text={`Hosted by ${booking.belongsTo?.firstName}`}
				 						/>
				 						{booking.captainId?.firstName 
				 							? <ImageWithName alt={booking.captainId?.firstName} src={booking.captainId?.profilePicture} text={`Captained by ${booking.captainId?.firstName}`} />
				 							: <EmptyPicture />
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
	 	</ContentPageLayout>
	 )
}