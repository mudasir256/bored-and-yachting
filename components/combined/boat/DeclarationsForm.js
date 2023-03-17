import { useState } from 'react'
import Input from '@/components/Input'

export default function DeclarationsForm() {

	const [cashValue, setCashValue] = useState('')
	const [hullId, setHullId] = useState('')
	const [insuranceFile, setInsuranceFile] = useState('')

	const handleBoatDeclarations = () => {

	}

	return (<>
		<form className="space-y-4" onSubmit={handleBoatDeclarations}>
			<Input 
				type="file" 
				label="Proof of Insurance"
				id="insuranceFile"
			 	onChange={(e) => setInsuranceFile(e.target?.value)}
			 	value={insuranceFile}
			 	isRequired={true} 
			 	multiple={false}
			 	accept="all"
			/>
			<div className="grid grid-cols-2 gap-2">
				<Input 
					type="text" 
					label="Cash Value"
					id="cashValue"
				 	placeholder="Cash Value" 
				 	onChange={(e) => setCashValue(e.target?.value)}
				 	value={cashValue}
				 	isRequired={true} 
				 />
				 <Input 
					 	type="text" 
					 	label="Hull Id"
					 	id="hullId"
				  	placeholder="Hull ID" 
				  	onChange={(e) => setHullId(e.target?.value)}
				  	value={hullId}
				  	isRequired={true} 
				 	/>
			 	</div>
			 	<div className="col-span-2">
		 	  	 <Input 
		 	  	 	type="submit"
		 	  	 	value="Save"
		 	  	 />
			 	</div>
		</form>
	</>)
}