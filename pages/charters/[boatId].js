import Head from 'next/head'
import { useBoat } from '@/endpoints/get'
import { useRouter } from 'next/router'
import Loading from '@/components/small/Loading'
import Header from '@/components/small/Header'
import Subheader from '@/components/small/Subheader'
import Image from 'next/image'
import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Input from '@/components/Input'
import { useState } from 'react'
import { formatMoney, formattedTime, RATE_LENGTHS, RATE_IN_HOURS, formatAddressLine } from '@/helpers/index'
import { getFinalRate, getRateWithoutFees } from '@/helpers/money'
import useComponentVisible from '@/hooks/useComponentVisible'
import Button from '@/components/small/Button'
import Link from 'next/link'
import ViewPhotosButton from '@/components/combined/ViewPhotosButton'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import { DateTime } from 'luxon'
import { createBooking } from '@/endpoints/post'
import PriceBreakdownButton from '@/components/combined/PriceBreakdownButton'
import BookingConfirmationModal from '@/components/modals/BookingConfirmationModal'
import AmenitiesList from '@/components/combined/AmenitiesList'
import FeaturesList from '@/components/combined/FeaturesList'
import GoogleMaps from '@/components/combined/GoogleMaps'

export default function BoatAndYachtRentals() {

	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
	const { height, width } = useWindowDimensions();

	const router = useRouter()
	const { boatId } = router.query

	const { boat, isLoading } = useBoat(boatId)

	const [dateSelected, setDateSelected] = useState('')
	const [durationSelected, setDurationSelected] = useState('')
	const [startTime, setStartTime] = useState('')

	const [bookingData, setBookingData] = useState({})

	if (isLoading) {
		return <div className="flex justify-center mt-12"><Loading /></div>
	}

	const handleRequestReservation = async () => {
		if (!dateSelected || !durationSelected || !startTime) {
			return
		}

 		try {
 			const startTimeDate = DateTime.fromISO(dateSelected).plus({ seconds: startTime })
 			const hoursToAdd = RATE_IN_HOURS[durationSelected]
 			const endTimeDate = startTimeDate.plus({ hours: hoursToAdd })
 			const totalPrice = getFinalRate(boat, durationSelected)
 			const subtotalPrice = getRateWithoutFees(boat, durationSelected)
 			
 			setBookingData({
 				startTimeDate,
 				endTimeDate,
 				totalPrice,
 				subtotalPrice,
 				duration: durationSelected,
 				belongsTo: boat?.belongsTo._id
 			})

 			setIsComponentVisible(true)
 
 		} catch (err) {
 			console.log(err)
 		}
	}

	const confirmBooking = async (paymentMethodId) => {
		try {
			console.log('confirming')
			//send payment method to endpoint
 			const result = await createBooking(
				bookingData.startTimeDate.toJSDate(), 
				bookingData.endTimeDate.toJSDate(), 
				{ 
					...bookingData, 
					boatId: boatId, 
					customerStripePaymentMethod: paymentMethodId 
				}
 			)
 			console.log(result)
 			if (result.success) {
 				router.push('/reservation-confirmed')
 			}
		} catch (err) {
			console.log(err)
			//TODO: must provide errors
		}
	}

	const YoutubeEmbed = ({ url }) => {
		if (url) {
			const parsedId = url.split('=').slice(-1)
			return(
				<div className="video-responsive">
				  <iframe
				    width="880"
				    height="480"
				    src={`https://www.youtube-nocookie.com/embed/${parsedId}`}
				    frameBorder="0"
				    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				    allowFullScreen
				    title="showcase video"
				  />
				</div>
			)
		}
		return null
	}

	return(<>
		<Head>
		  <title>Bored and Yachting | {boat?.name}</title>
		  <meta name="description" content="" />
		</Head>
		<ContentPageLayout>
			<div className="space-y-6">
				<div>
					<Header text={boat?.name} />
					<p>{formatAddressLine(boat?.parkingLocation.address)}</p>
				</div>

				{/* Photos Section */}
				{width > 1281 ?
				<div className="grid grid-cols-2 gap-2 relative">
					<div className="relative w-full h-full">
						<Image className="rounded-l-md object-cover" src={boat?.photos.find(Boolean)} alt={boat?.photos.find(Boolean)} layout="fill"  />
					</div>
					<div className="grid grid-cols-2 gap-2 flex-wrap">
						{boat?.photos.slice(1, 5).map((photo, index) => (<div key={photo} className="relative w-full h-52">
							<Image src={photo} alt={photo} layout="fill" className={`object-cover ${index === 1 && 'rounded-tr-md'} ${index === 3 && 'rounded-br-md'}`}/>
						</div>))}
					</div>
					<div className="absolute bottom-3 right-3">
						<ViewPhotosButton text="See all photos" photoUrls={boat?.photos || []} />
					</div>
				</div>
					: <div className="relative w-full h-96">
							<Image className="rounded-t-md" src={boat?.photos.find(Boolean)} alt={boat?.photos.find(Boolean)} layout="fill" objectFit="cover" />
							<div className="absolute bottom-2 right-3">
								<ViewPhotosButton text="See all photos" photoUrls={boat?.photos || []} />
							</div>
						</div>
				}

				{/* Information Section */}
				<div className="flex flex-row gap-4 flex-wrap">
					<div className="space-y-6">
						<div>
							<Subheader text={`Hosted by ${boat?.belongsTo.firstName}`} />
							<div className="flex flex-row gap-2">
								<p>{boat?.indoorFeatures?.maxNumberOfPassengers} passengers max •</p>
								<p>{boat?.indoorFeatures?.cabins} cabins •</p>
								<p>{boat?.indoorFeatures?.bathrooms} bathrooms •</p>
								<p>{boat?.vesselLengthInFeet}&apos; length vessel</p>
							</div>
						</div>

						<div className="space-y-8">
							<YoutubeEmbed url={boat?.videoLink} />

							<p className="max-w-4xl">{boat?.description}</p>
							
							<div>
								<Subheader text="What this vessel offers" />
								<div className="flex flex-row gap-12">
									<AmenitiesList amenities={boat?.amenitiesList} />
									<FeaturesList features={boat?.featuresList} />
								</div>
							</div>

							{/* location of boat */}
							<Subheader text="Where you'll be" />
							<GoogleMaps width={width * 2/3} lat={boat?.parkingLocation?.lat} lng={boat?.parkingLocation?.lng} />
						</div>
					</div>


					{/* Side panel form */}
					<div className={`ml-auto mt-8 space-y-3 shadow rounded border w-full md:w-72 p-4 h-fit`}> {/* style={{ marginTop: calculatedMargin }}>*/}
						<Input 
							type="date" 
							id="date"
							label="Select a date"
							min={DateTime.now().toFormat('yyyy-MM-dd')}
							onChange={(e) => setDateSelected(e.target?.value)} 
							value={dateSelected} 
						/>
						<Input
							type="select"
							id="duration"
							label="Duration"
							placeholder="Select a duration"
							onChange={(e) => setDurationSelected(e.target?.value)}
							value={durationSelected}
							options={[
								{
									value: RATE_LENGTHS.HALF_DAY,
									label: 'Half Day (4 hours)'
								},
								{
									value: RATE_LENGTHS.FULL_DAY,
									label: 'Full Day (8 hours)'
								}
							]}
						/>
						<Link href={`/contact-us?charter=${boatId}`} className="underline text-blue-400 hover:text-blue-500 text-xs">Contact us for multi-day and weekly rates</Link>
				   	<Input 
					    type="select" 
					    label="Start Time"
					    id="start-time"
					    placeholder="Select a start time"
					    onChange={(e) => setStartTime(e.target?.value)}
					    value={startTime} 
					    options={formattedTime}//.filter(time => time.value < field.endValue)}
				    />
						<div className="flex flex-row justify-between p-1">
							<div>
								<h3 className="font-bold">Half Day Rate</h3>
								<p>{formatMoney(getFinalRate(boat, RATE_LENGTHS.HALF_DAY))}</p>
							</div>
							<div>
								<h3 className="font-bold">Full Day Rate</h3>
								<p>{formatMoney(getFinalRate(boat, RATE_LENGTHS.FULL_DAY))}</p>
							</div>
						</div>
						
						<PriceBreakdownButton boatId={boatId} />
						<div className="flex flex-row gap-2">
							<Input type="text" placeholder="promo code" />
							<Button text="apply" />
						</div>

						<Button onClick={() => handleRequestReservation()} text="Request reservation" isFull />
						<div className="text-center text-xs space-y-2">
							<p>You won&apos;t be charged yet.</p>
							<p>Your reservation will be only be confirmed after a captain accepts this charter.</p>
						</div>
					</div>
				</div>
				
				<div ref={ref}>
					{isComponentVisible && <BookingConfirmationModal boat={boat} bookingData={bookingData} confirmBooking={confirmBooking} />}
				</div>
			</div>
		</ContentPageLayout>
	</>)
}