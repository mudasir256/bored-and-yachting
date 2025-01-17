import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import { useRouter } from 'next/router'
import Header from '@/components/small/Header'
import Subheader from '@/components/small/Subheader'
import Button from '@/components/small/Button'
import Input from '@/components/Input'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useBooking } from '@/endpoints/get'
import { updateChecklist, updateChecklistImages } from '@/endpoints/post'
import CharterChecklistHeader from '@/components/mobile/CharterChecklistHeader'
import { formatDay } from '@/helpers/index'

export default function PostCharter() {

	const router = useRouter()
	const { bookingId } = router.query

	const { booking, isLoading } = useBooking(bookingId)

	const [step, setStep] = useState(0)
	const [exteriorPhotos, setExteriorPhotos] = useState([])
	const [interiorPhotos, setInteriorPhotos] = useState([])
	const [existingBoatDamage, setExistingBoatDamage] = useState(false)

	const handleNewFiles = async (files, type) => {
		console.log(files)
		const array = Array.from(files)
		if (type === 'EXTERIOR') {
			setExteriorPhotos([...exteriorPhotos, ...array])
		} else {
			setInteriorPhotos([...interiorPhotos, ...array])
		}
		
	}

	const handleExteriorSubmit = async () => {
		await updateChecklistImages(bookingId, exteriorPhotos, 'exteriorBoatPhotos')
		setStep(2)
	}

	const handleInteriorSubmit = async () => {
		await updateChecklistImages(bookingId, interiorPhotos, 'interiorBoatPhotos')
		setStep(3)
	}

	const handleExistingBoatDamageSubmit = async () => {
		await updateChecklist(bookingId, { existingBoatDamage })
		setStep(4)
	}


	const Intro = () => (
		<div className="space-y-8">
			<div>
				<Header text={`Hey there, ${booking?.captainId.firstName}`} />
				<p>We&apos;re excited to have you charter for our guest {booking?.bookedBy.firstName} and their {booking?.numberOfGuests} guests.</p>
				<p>You&apos;ll be captaining {booking?.boatId.name} on {formatDay(booking?.startDate)} till {formatDay(booking?.endDate)}.</p>
			</div>
			<div className="relative w-full h-96">
				<Image src={booking?.boatId.photos[0]} alt={booking?.boatId.name} layout="fill" className="object-cover rounded" />
			</div>
			<p>Before you being your charter, please complete this pre-charter checklist to ensure a smooth experience.</p>
			<Button text="Next" onClick={() => setStep(1)} isFull />

		</div>
	)

	const StepOne = () => (
		<div className="space-y-8">
			<div>
				<Header text="Exterior of the Boat" />
				<p>Add up to 20 photos of the boat&apos;s exterior.</p>
			</div>

			<Input 
				type="file" 
				label="Upload batch or take photos one at a time"
				id="photos"
			 	onChange={(e) => handleNewFiles(e.target?.files, 'EXTERIOR')}
			 	value={exteriorPhotos?.name}
			 	multiple={true}
			 	accept="image/*"
			 />

			{/* Image Grid */}
			{exteriorPhotos.map(photo => {
				return(<div key={photo.name} className="relative w-full h-32">
					<Image src={URL.createObjectURL(photo)} className="object-contain" layout="fill" alt="exterior-boat" />
				</div>)
			})}
		
			<Button text="Next" onClick={() => handleExteriorSubmit()} isFull />
		</div>
	)

	const StepTwo = () => (
		<div className="space-y-8">
			<div>
				<Header text="Interior of the Boat" />
				<p>Add up to 20 photos of the boat&apos;s interior.</p>
			</div>
			<Input 
				type="file" 
				label="Upload batch or take photos one at a time"
				id="photos"
			 	onChange={(e) => handleNewFiles(e.target?.files, 'INTERIOR')}
			 	value={interiorPhotos?.name}
			 	multiple={true}
			 	accept="image/*"
			 />

			 {interiorPhotos.map(photo => {
			 	return(<div key={photo.name} className="relative w-full h-32">
			 		<Image src={URL.createObjectURL(photo)} className="object-contain" layout="fill" alt="interior-boat" />
			 	</div>)
			 })}
			 <Button text="Next" onClick={() => handleInteriorSubmit()} isFull />

		</div>
	)

	const StepThree = () => (
		<div className="space-y-8">
			<div>
				<Header text="Existing boat damage" />
				<p>Is there any noticeable damage to this vessel?</p>
			</div>
			
			<div className="space-y-2">
				<div className="space-x-4">
					<label>
					 	<input 
					 		onChange={() => setExistingBoatDamage(true)} 
					 		type="radio" 
					 		value={true} 
					 		checked={existingBoatDamage}
					 		name="existingBoatDamage" 
					 	/> 
					 	&nbsp;<span>Yes</span>
				 	</label>

			 		<label>
			 		 	<input 
			 		 		onChange={() => setExistingBoatDamage(false)} 
			 		 		type="radio" 
			 		 		value={false} 
			 		 		checked={!existingBoatDamage}
			 		 		name="existingBoatDamage"
			 		 	/> 
			 		 	&nbsp;<span>No</span>
			 	 	</label>
		 	 	</div>
	 	 	</div>
			<Button text="Complete" onClick={() => handleExistingBoatDamageSubmit()} isFull />
		</div>
	)

	const Done = () => (
		<div className="space-y-8">
			<div>
				<Header text="Congrats!" />
				<p>Enjoy your charter and report back here to do a post charter review.</p>
			</div>
		</div>
	)

	const handleBackClick = () => {
		setStep(step - 1)
	}

	return (<>
		<CharterChecklistHeader 
			header="Pre-Charter Checklist" 
			stepNumber={step}
			totalSteps="3" 
			showBack={step > 1 && step <= 3}
			onBackClick={() => handleBackClick()}
		/>
		<ContentPageLayout>
			{step === 0 ? <Intro />
			  : step === 1 ? <StepOne />
				: step === 2 ? <StepTwo />
				: step === 3 ? <StepThree />
				: <Done />
			}
		</ContentPageLayout>
	</>)
}