import { useEffect, useState } from 'react' 
import { useRouter } from 'next/router'
import Subheader from '@/components/small/Subheader'
import CircleWithText from '@/components/small/CircleWithText'
import Button from '@/components/small/Button'
import { saveLoginCredentials } from '@/helpers/index'
import MainPageLayout from '@/components/layouts/MainPageLayout'
import Header from '@/components/small/Header'
import Input from '@/components/Input'

export default function FirstTimeBoatOwnerForm() {
	const router = useRouter()
	const [step, setStep] = useState(1)

	//Basic Information
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')

	//Boat Details
	const [vesselName, setVesselName] = useState('')
	const [yearBuilt, setYearBuilt] = useState('')
	const [make, setMake] = useState('')
	const [model, setModel] = useState('')
	const [maxNumberOfPassengers, setMaxNumberOfPassengers] = useState('')

	const [numberOfCabins, setNumberOfCabins] = useState('')
	const [sleepOccupancy, setSleepOccupany] = useState('')
	const [bathrooms, setBathrooms] = useState('')
	const [showers, setShowers] = useState('')

	const handleUserInformation = async (e) => {
		e.preventDefault()
		//TODO: save
		setStep(2)
	}

	const handlePaymentInformation = async (e) => {
		e.preventDefault()
		setStep(3)
	}

	const handleBoatDetails = async (e) => {
		e.preventDefault()
		setStep(4)
	}

	const handleFinishSetup = async (e) => {
		console.log('finish setup')
		e.preventDefault()
		saveLoginCredentials({ firstName })
		router.push('/boat-owner/dashboard')
	}
	//Completed
	if (step === 4) {
		return (<MainPageLayout>
			<Header text="Congrats! You're one step closer to making <amount>/hr explainer." />
			<div className="text-center">
				<Button text="Proceed to dashboard" onClick={handleFinishSetup} isFull />
			</div>
		</MainPageLayout>)
	}

	return (<>
		<MainPageLayout>
			<Header text="Hey there," />
			<p>Please complete these three steps to be listed on our platform.</p>
	
			{/* Step 1 Basic Information */}
			<div className="mt-2 flex flex-row items-center gap-2">
				<CircleWithText width="w-8" height="h-8" text="1" />
				<Subheader text="Basic Information" />
			</div>
			{step === 1 && 
			<form className="mt-2 space-y-2" onSubmit={handleUserInformation}>
				<div className="grid grid-cols-2 gap-2">
					<Input 
						type="text" 
						id="firstName"
						onChange={(e) => setFirstName(e.target?.value)}
						value={firstName}
					 	placeholder="First Name" 
					 	isRequired={true} 
					 />
					<Input 
						type="text" 
						id="lastName"
						onChange={(e) => setLastName(e.target?.value)}
						value={lastName}
					 	placeholder="Last Name" 
					 	isRequired={true} 
					 />
					 <div className="col-span-2">
						 <Input 
						 	type="submit"
						 	value="Complete"
						 />
					 </div>
				</div>
			</form>
			}

		{/* Step 2 Credit Card Information */}
		<div className="mt-8 flex flex-row items-center gap-2">
			<CircleWithText width="w-8" height="h-8" text="2" />
			<Subheader text="Payment Information" />
		</div>
		{step === 2 &&
		<form className="mt-2 space-y-2" onSubmit={handlePaymentInformation}>
			<div className="grid grid-cols-2 gap-2">
				<Input 
					type="text" 
					id="TODO"
				 	placeholder="TODO" 
				 	isRequired={true} 
				 />
				<Input 
					type="text" 
					id="TODO"
				 	placeholder="TODO" 
				 	isRequired={true} 
				 />
				 <div className="col-span-2">
				 	 <Input 
				 	 	type="submit"
				 	 	value="Complete"
				 	 />
				 </div>
			</div>
		</form>
		}

	{/* Step 3 Add a Boat */}
	<div className="mt-8 flex flex-row items-center gap-2">
		<CircleWithText width="w-8" height="h-8" text="3" />
		<Subheader text="Boat / Yacht Details" />
	</div>
	{step === 3 &&
	<form className="mt-2 space-y-2" onSubmit={handleBoatDetails}>
		<div className="grid grid-cols-2 gap-2">
			<Input 
				type="text" 
				id="vesselName"
			 	placeholder="Vessel Name" 
			 	onChange={(e) => setVesselName(e.target?.value)}
			 	value={vesselName}
			 	isRequired={true} 
			 />
			<Input 
				type="number" 
				id="yearBuilt"
			 	placeholder="Year Built" 
			 	onChange={(e) => setYearBuilt(e.target?.value)}
			 	value={yearBuilt}
			 	isRequired={true} 
			 />
			 <Input 
			 	type="text" 
			 	id="make"
		  	placeholder="Make" 
		  	onChange={(e) => setMake(e.target?.value)}
		  	value={make}
		  	isRequired={true} 
			 />
			 <Input 
		  	type="text" 
		  	id="model"
		   	placeholder="Model"
		   	onChange={(e) => setModel(e.target?.value)}
		   	value={model} 
		   	isRequired={true} 
		   />
		    <div className="col-span-2">
		   	 <Input 
		   	 	type="submit"
		   	 	value="Finish"
		   	 />
		    </div>
		</div>
	</form>
	}
		</MainPageLayout>
	</>)
}