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
import { formatMoney, formattedTime, RATE_LENGTHS } from '@/helpers/index'
import { getFinalRateWithGratuity } from '@/helpers/money'
import VesselPricingTableModal from '@/components/modals/VesselPricingTableModal'
import Icon from '@/components/Icon'
import useComponentVisible from '@/hooks/useComponentVisible'
import Button from '@/components/small/Button'

export default function BoatAndYachtRentals() {

	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

	const router = useRouter()
	const { boatId } = router.query

	const { boat, isLoading } = useBoat(boatId)

	const [dateSelected, setDateSelected] = useState('')
	const [durationSelected, setDurationSelected] = useState('')
	const [startTime, setStartTime] = useState('')

	if (isLoading) {
		return <div className="flex justify-center mt-12"><Loading /></div>
	}

	const handleEnter = () => {
		console.log('entering')
		setIsComponentVisible(true)
	}

	//TODO: block off time slots based on bookings 

	return(<>
		<Head>
		  <title>Bored and Yachting | {boat?.name}</title>
		  <meta name="description" content="" />
		</Head>
		<ContentPageLayout>
			<div className="space-y-2">
				<Header text={boat?.name} />
				<p>address snippet</p>
				<div className="flex flex-row flex-wrap gap-2">
					{boat?.photos.map(photo => (<div key={photo} className="relative w-72 h-52">
						<Image src={photo} alt={photo} layout="fill" objectFit="cover" />
					</div>))}
				</div>

				<div className="flex flex-row">
					<div className="space-y-6">
						<div>
							<Subheader text={`Hosted by ${boat?.belongsTo}`} />
							<div className="flex flex-row gap-2">
								<p>{boat?.indoorFeatures?.maxNumberOfPassengers} passengers max •</p>
								<p>{boat?.indoorFeatures?.cabins} cabins •</p>
								<p>{boat?.indoorFeatures?.bathrooms} bathrooms •</p>
								<p>{boat?.vesselLengthInFeet}&apos; length vessel</p>
							</div>
						</div>

						<div>
							<p>{boat?.videoLink}</p>
							<p>{boat?.description}</p>
							<p>{boat?.amenitiesList}</p>
							<p>{boat?.featuresList}</p>

							{/* location of boat */}
						</div>
					</div>

					<div className="space-y-3 ml-auto shadow rounded border w-72 p-4">
						<Input 
							type="date" 
							id="date"
							label="Select a date"
							onChange={setDateSelected} 
							value={dateSelected} 
						/>
						<Input
							type="select"
							id="duration"
							label="Duration"
							placeholder="Select a duration"
							onChange={setDurationSelected}
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
				   	<Input 
					    type="select" 
					    label="Start Time"
					    id="start-time"
					    placeholder="Select a start time"
					    onChange={setStartTime}
					    value={startTime} 
					    options={formattedTime}//.filter(time => time.value < field.endValue)}
				    />
						<div className="flex flex-row justify-between p-1">
							<div>
								<h3 className="font-bold">Half Day Rate</h3>
								<p>{formatMoney(getFinalRateWithGratuity(boat, RATE_LENGTHS.HALF_DAY))}</p>
							</div>
							<div>
								<h3 className="font-bold">Full Day Rate</h3>
								<p>{formatMoney(getFinalRateWithGratuity(boat, RATE_LENGTHS.FULL_DAY))}</p>
							</div>
						</div>
						<div onClick={() => setIsComponentVisible(true)} className="border-dotted border p-2 flex flex-row items-center justify-center gap-2 cursor-pointer">
							<Icon name="info" color="gray" size="xs" />
							<p className="text-gray-500 text-xs italic">full price breakdown</p>
						</div>

						<div className="flex flex-row gap-2">
							<Input type="text" placeholder="promo code" />
							<Button text="apply" />
						</div>

						<Button text="Request reservation" isFull />
						<div className="text-center text-xs space-y-2">
							<p>You won&apos;t be charged yet.</p>
							<p>Your reservation will be only be confirmed after a captain accepts this charter.</p>
						</div>
					</div>
				</div>
				
				<div ref={ref}>
					{isComponentVisible && <VesselPricingTableModal isEditable={false} boatId={boatId} />}
				</div>
			</div>
		</ContentPageLayout>
	</>)
}