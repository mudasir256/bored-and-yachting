import { useState, useEffect } from 'react'
import Input from '@/components/Input'
import { updateBoat, updateBoatFiles } from '@/endpoints/post'
import { useBoat } from '@/endpoints/get'
import Icon from '@/components/Icon'

export default function DeclarationsForm({ boatId }) {

	const { boat, isLoading } = useBoat(boatId)

	const [cashValue, setCashValue] = useState('')
	const [hullId, setHullId] = useState('')
	const [insuranceFile, setInsuranceFile] = useState('')
	const [fileFound, setFileFound] = useState('')

	const [saved, setSaved] = useState(false)

	useEffect(() => {
		console.log(boat)
		if (boat) {
			setHullId(boat?.hullId)
			setCashValue(boat?.cashValue)
			setFileFound(boat?.proofOfInsurance)
		}
	}, [boat])

	useEffect(() => {
		setSaved(false)
	}, [hullId, insuranceFile, cashValue])

	const handleBoatDeclarations = async (e) => {
		e.preventDefault()

		if (insuranceFile) {
			const result = await updateBoatFiles(boatId, insuranceFile, 'proofOfInsurance')
			console.log(result)
		}

		const result2 = await updateBoat(boatId, {
			cashValue,
			hullId
		})
		console.log(result2)

		if(result2.success) {
			setSaved(true)
		}
	}

	return (<>
		<form className="space-y-4" onSubmit={handleBoatDeclarations}>
			{fileFound 
				? <p className="text-green-700">
						<Icon name="circle-checkmark" color="green" />&nbsp;
						<span>Your proof of insurance is on file.</span>&nbsp;
						<button onClick={() => setFileFound(false)} className="text-sm underline text-black">Re-upload?</button>
					</p>
				: <Input 
						type="file" 
						label="Proof of Insurance"
						id="insuranceFile"
					 	onChange={(e) => setInsuranceFile(e.target?.files)}
					 	value={insuranceFile?.name}
					 	isRequired={true} 
					 	multiple={false}
					 	accept="all"
					/>
			}
			<div className="grid grid-cols-2 gap-2">
				<Input 
					type="number" 
					min={0}
					label="Cash Value (in dollars)"
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
		 	  	 	value={saved ? '✓' : "Save"} 
		 	  	 />
			 	</div>
		</form>
	</>)
}