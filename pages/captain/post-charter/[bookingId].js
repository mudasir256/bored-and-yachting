import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import CharterChecklistHeader from '@/components/mobile/CharterChecklistHeader'
import Input from '@/components/Input'
import Header from '@/components/small/Header'
import Button from '@/components/small/Button'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { updateChecklist, updateChecklistImages } from '@/endpoints/post'
import { useCharterChecklist } from '@/endpoints/get'
import Loading from '@/components/small/Loading'

const ButtonPosition = ({ children }) => (
	<div className="absolute bottom-14 left-[0.25px] w-full">
		{children}
	</div>
)

const StepFour = ({ notes, setNotes, handleNotesSubmit }) => (
	<div className="space-y-8">
		<div>
			<Header text="Notes about the charterer" />
			<p>Tell us about the charterer and include any notes about damages here.</p>
		</div>
		<textarea className="border rounded-md w-full h-40" id="notes" name="notes" value={notes} onChange={(e) => setNotes(e.target?.value)} />
		<ButtonPosition>
			<Button text="Next" onClick={() => handleNotesSubmit()} isFull />
		</ButtonPosition>
	</div>
)

export default function PostCharter() {

	const router = useRouter()
	const { bookingId } = router.query

	const { charterChecklist, isLoading}  = useCharterChecklist(bookingId)

	const [step, setStep] = useState(1)

	const [fuelGaugePhotos, setFuelGaugePhotos] = useState([])
	const [actualCharterDuration, setActualCharterDuration] = useState(0)
	const [customerBoatDamage, setCustomerBoatDamage] = useState(false)
	const [notes, setNotes] = useState('')
	const [boatReadyOnArrival, setBoatReadyOnArrival] = useState(true)
	const [refueledBoat, setRefueledBoat] = useState(false)
	const [pumpedOutWaste, setPumpedOutWaste] = useState(false)

	if (isLoading) return <div className="flex flex-row justify-center mt-4"><Loading /></div>
	if (charterChecklist?.feedbackComplete) {
		return (<ContentPageLayout>
			<div className="space-y-2">
				<p>This charter has already been completed and feedback given.</p>
				<p>If you need to add additional information or update information please contact us.</p>
			</div>
		</ContentPageLayout>)
	}
	console.log(charterChecklist)
	const handleNewFiles = async (files, type) => {
		const array = Array.from(files)
		setFuelGaugePhotos([...fuelGaugePhotos, ...array])
	}

	const handleFuelGaugeSubmit = async () => {
		await updateChecklistImages(bookingId, fuelGaugePhotos, 'fuelGaugePhotos')
		setStep(2)
	}

	const handleActualCharterDurationSubmit = async () => {
		await updateChecklist(bookingId, { actualCharterDuration })
		setStep(3)
	}

	const handleCustomerBoatDamageSubmit = async () => {
		await updateChecklist(bookingId, { customerBoatDamage })
		setStep(4)
	}

	const handleNotesSubmit = async () => {
		await updateChecklist(bookingId, { notes })
		setStep(5)
	}
	const handleBoatReadyOnArrivalSubmit = async () => {
		await updateChecklist(bookingId, { boatReadyOnArrival })
		setStep(6)
	}

	const handleRefueledBoatSubmit = async () => {
		await updateChecklist(bookingId, { refueledBoat })
		setStep(7)
	}

	const handlePumpedOutWasteSubmit = async () => {
		await updateChecklist(bookingId, { pumpedOutWaste })
		setStep(8)
		await updateChecklist(bookingId, { feedbackComplete: true })
	}

	const handleBackClick = () => {
		setStep(step - 1)
	}

	const StepOne = () => (
		<div className="space-y-8">
			<div>
				<Header text="End fuel gauge photos" />
				<p>Please add photos of the fuel gauge at the end of the charter.</p>
			</div>

			<Input 
				type="file" 
				label="Upload batch or take photos one at a time"
				id="photos"
			 	onChange={(e) => handleNewFiles(e.target?.files)}
			 	value={fuelGaugePhotos?.name}
			 	multiple={true}
			 	accept="image/*"
			 />

			{/* Image Grid */}
			{fuelGaugePhotos.map(photo => {
				return(<div key={photo.name} className="relative w-full h-32">
					<Image src={URL.createObjectURL(photo)} className="object-contain" layout="fill" alt="fuel-gauge" />
				</div>)
			})}
			
			<ButtonPosition>
				<Button text="Next" onClick={() => handleFuelGaugeSubmit()} isFull />
			</ButtonPosition>
		</div>
	)

	const StepTwo = () => (
		<div className="space-y-8">
			<div>
				<Header text="Additional or lost hours" />
				<p>Did the customer...</p>
			</div>
			<div className="mt-4 space-y-2">
				<div className="flex flex-col gap-4">
					<label>
					 	<input 
					 		onChange={() => setActualCharterDuration(1)} 
					 		type="radio" 
					 		value={1} 
					 		checked={actualCharterDuration > 0}
					 		name="actualCharterDuration" 
					 	/> 
					 	&nbsp;<span>Add hours to the charter</span>
				 	</label>

			 		<label>
			 		 	<input 
			 		 		onChange={() => setActualCharterDuration(-1)} 
			 		 		type="radio" 
			 		 		value={-1} 
			 		 		checked={actualCharterDuration < 0}
			 		 		name="actualCharterDuration"
			 		 	/> 
			 		 	&nbsp;<span>Lose hours from the charter</span>
			 	 	</label>

		 	 		<label>
		 	 		 	<input 
		 	 		 		onChange={() => setActualCharterDuration(0)} 
		 	 		 		type="radio" 
		 	 		 		value={0} 
		 	 		 		checked={actualCharterDuration === 0}
		 	 		 		name="actualCharterDuration"
		 	 		 	/> 
		 	 		 	&nbsp;<span>Hours were not lost or added to the charter</span>
		 	 	 	</label>
		 	 	</div>
		 	</div>
		 	<ButtonPosition>
				<Button text="Next" onClick={() => handleActualCharterDurationSubmit()} isFull />
			</ButtonPosition>
		</div>
	)

	const StepThree = () => (
		<div className="space-y-8">
			<div>
				<Header text="Boat damage" />
				<p>Did the customer damage the boat in any way?</p>
			</div>
			<div className="flex flex-col gap-2">
				<label>
				 	<input 
				 		onChange={() => setCustomerBoatDamage(true)} 
				 		type="radio" 
				 		value={true} 
				 		checked={customerBoatDamage}
				 		name="customerBoatDamage" 
				 	/> 
				 	&nbsp;<span>Yes</span>
			 	</label>

		 		<label>
		 		 	<input 
		 		 		onChange={() => setCustomerBoatDamage(false)} 
		 		 		type="radio" 
		 		 		value={false} 
		 		 		checked={!customerBoatDamage}
		 		 		name="customerBoatDamage"
		 		 	/> 
		 		 	&nbsp;<span>No</span>
		 	 	</label>
			</div>

			<ButtonPosition>
				<Button text="Next" onClick={() => handleCustomerBoatDamageSubmit()} isFull />
			</ButtonPosition>

		</div>
	)



	const StepFive = () => (
		<div className="space-y-8">
			<div>
				<Header text="Boat condition" />
				<p>Was the boat charter ready when you arrived?</p>
			</div>
			<div className="space-x-4">
				<label>
				 	<input 
				 		onChange={() => setBoatReadyOnArrival(true)} 
				 		type="radio" 
				 		value={true} 
				 		checked={boatReadyOnArrival}
				 		name="boatReadyOnArrival" 
				 	/> 
				 	&nbsp;<span>Yes</span>
			 	</label>

		 		<label>
		 		 	<input 
		 		 		onChange={() => setBoatReadyOnArrival(false)} 
		 		 		type="radio" 
		 		 		value={false} 
		 		 		checked={!boatReadyOnArrival}
		 		 		name="boatReadyOnArrival"
		 		 	/> 
		 		 	&nbsp;<span>No</span>
		 	 	</label>
			</div>
			<ButtonPosition>
				<Button text="Next" onClick={() => handleBoatReadyOnArrivalSubmit()} isFull />
			</ButtonPosition>

		</div>
	)

	const StepSix = () => (
		<div className="space-y-8">
			<div>
				<Header text="Refueling the boat" />
				<p>Did you refuel the boat before or after the charter?</p>
			</div>
			<div className="space-x-4">
				<label>
				 	<input 
				 		onChange={() => setRefueledBoat(true)} 
				 		type="radio" 
				 		value={true} 
				 		checked={refueledBoat}
				 		name="refueledBoat" 
				 	/> 
				 	&nbsp;<span>Yes</span>
			 	</label>

		 		<label>
		 		 	<input 
		 		 		onChange={() => setRefueledBoat(false)} 
		 		 		type="radio" 
		 		 		value={false} 
		 		 		checked={!refueledBoat}
		 		 		name="refueledBoat"
		 		 	/> 
		 		 	&nbsp;<span>No</span>
		 	 	</label>
			</div>
			<ButtonPosition>
				<Button text="Next" onClick={() => handleRefueledBoatSubmit()} isFull />
			</ButtonPosition>
		</div>
	)

	const StepSeven = () => (
		<div className="space-y-8">
			<div>
				<Header text="Pump out waste" />
				<p>Did you pump out waste prior to departure?</p>
			</div>
			<div className="space-x-4">
				<label>
				 	<input 
				 		onChange={() => setPumpedOutWaste(true)} 
				 		type="radio" 
				 		value={true} 
				 		checked={pumpedOutWaste}
				 		name="pumpedOutWaste" 
				 	/> 
				 	&nbsp;<span>Yes</span>
			 	</label>

		 		<label>
		 		 	<input 
		 		 		onChange={() => setPumpedOutWaste(false)} 
		 		 		type="radio" 
		 		 		value={false} 
		 		 		checked={!pumpedOutWaste}
		 		 		name="pumpedOutWaste"
		 		 	/> 
		 		 	&nbsp;<span>No</span>
		 	 	</label>
			</div>

			<ButtonPosition>
				<Button text="Complete" onClick={() => handlePumpedOutWasteSubmit()} isFull />
			</ButtonPosition>
		</div>
	)

	const Done = () => (
		<div className="space-y-8">
			Thanks for completing this charter and being a part of the Bored and Yachting community.
		</div>
	)

	return (<>
		<CharterChecklistHeader 
			header="Post-Charter Checklist" 
			stepNumber={step}
			totalSteps="7" 
			showBack={step > 1 && step <= 7}
			onBackClick={() => handleBackClick()}
		/>
		<ContentPageLayout>
			{step === 1 ? <StepOne />
				: step === 2 ? <StepTwo />
				: step === 3 ? <StepThree />
				: step === 4 ? <StepFour notes={notes} setNotes={setNotes} handleNotesSubmit={handleNotesSubmit} />
				: step === 5 ? <StepFive />
				: step === 6 ? <StepSix />
				: step === 7 ? <StepSeven />

				: <Done />
			}
		</ContentPageLayout>
	</>)
}