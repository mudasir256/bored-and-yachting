import { useState } from 'react'
import Input from '@/components/Input'

export default function BasicInformationForm() {

	const [vesselName, setVesselName] = useState('')
	const [yearBuilt, setYearBuilt] = useState('')
	const [make, setMake] = useState('')
	const [model, setModel] = useState('')

	const handleBoatInfo = () => {

	}

	return (
		<form onSubmit={handleBoatInfo}>
			<div className="grid grid-cols-2 gap-2">
				<Input 
					type="text" 
					label="Vessel Name"
					id="vesselName"
				 	placeholder="Vessel Name" 
				 	onChange={(e) => setVesselName(e.target?.value)}
				 	value={vesselName}
				 	isRequired={true} 
				 />
				<Input 
					type="number" 
					label="Year Built"
					id="yearBuilt"
				 	placeholder="Year Built" 
				 	onChange={(e) => setYearBuilt(e.target?.value)}
				 	value={yearBuilt}
				 	isRequired={true} 
				 />
				 <Input 
				 	type="text" 
				 	label="Make"
				 	id="make"
			  	placeholder="Make" 
			  	onChange={(e) => setMake(e.target?.value)}
			  	value={make}
			  	isRequired={true} 
				 />
				 <Input 
			  	type="text" 
			  	label="Model"
			  	id="model"
			   	placeholder="Model"
			   	onChange={(e) => setModel(e.target?.value)}
			   	value={model} 
			   	isRequired={true} 
			   />
			 		<div className="col-span-2">
			   	 <Input 
			   	 	type="submit"
			   	 	value="Save"
			   	 />
			   	</div>
			</div>
		</form>
	)
}