import { useState, useEffect } from 'react'
import Input from '@/components/Input'
import { useBoat } from '@/endpoints/get'
import { baseUrl, updateBoat } from '@/endpoints/post'

export default function BasicInformationForm({ boatId }) {

	const { boat, isLoading } = useBoat(boatId)

	const [name, setName] = useState('')
	const [yearBuilt, setYearBuilt] = useState('')
	const [make, setMake] = useState('')
	const [model, setModel] = useState('')
	const [maxNumberOfPassengers, setMaxNumberOfPassengers] = useState('')
	const [cabins, setCabins] = useState('')
	const [bathrooms, setBathrooms] = useState('')
	const [vesselLength, setVesselLength] = useState('')

	const [saved, setSaved] = useState(false)

	const handleBoatInfo = async (e) => {
		e.preventDefault()
		const result = await updateBoat(boatId, 
			{ 
				name, 
				yearBuilt, 
				make, 
				model, 
				indoorFeatures: {
					maxNumberOfPassengers,
					cabins,
					bathrooms
				},
				vesselLengthInFeet: vesselLength
			}
		)
		if (result.success) {
			setSaved(true)
		}
	}

	useEffect(() => {
		if (boat) {
			setName(boat.name || '')
			setYearBuilt(boat.yearBuilt || '')
			setMake(boat.make || '')
			setModel(boat.model || '')
			setMaxNumberOfPassengers(boat.indoorFeatures?.maxNumberOfPassengers || '')
			setCabins(boat.indoorFeatures?.cabins || '')
			setBathrooms(boat.indoorFeatures?.bathrooms || '')
			setVesselLength(boat.vesselLengthInFeet || '')
		}
	}, [boat])

	useEffect(() => {
		setSaved(false)
	}, [name, yearBuilt, make, model, maxNumberOfPassengers, cabins, bathrooms, vesselLength])

	return (
		<form onSubmit={handleBoatInfo}>
			<div className="grid grid-cols-3 gap-2 items-end space-y-2">
				<Input 
					type="text" 
					label="Vessel Name"
					id="name"
				 	placeholder="Vessel Name" 
				 	onChange={(e) => setName(e.target?.value)}
				 	value={name}
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
		   	 <Input 
			     	type="text" 
			     	label="Max # of Passengers"
			     	id="maxNumberOfPassengers"
			      placeholder="Max # of Passengers"
			      onChange={(e) => setMaxNumberOfPassengers(e.target?.value)}
			      value={maxNumberOfPassengers} 
			      isRequired={true} 
		      />
         	<Input 
      	    type="number" 
      	    label="Number of Cabins"
      	    id="cabins"
      	    placeholder="# of Cabins"
      	    onChange={(e) => setCabins(e.target?.value)}
      	    value={cabins} 
      	    isRequired={true} 
           />
	       	 <Input 
    	     		type="number" 
    	     		label="Number of Bathrooms"
    	     		id="bathrooms"
    	      	placeholder="Number of Bathrooms"
    	      	onChange={(e) => setBathrooms(e.target?.value)}
    	      	value={bathrooms} 
    	      	isRequired={true} 
          	/>
       	 <Input 
  	     		type="text" 
  	     		label="Vessel Length (feet)"
  	     		id="vesselLength"
  	      	placeholder="Vessel Length in feet"
  	      	onChange={(e) => setVesselLength(e.target?.value)}
  	      	value={vesselLength} 
  	      	isRequired={true} 
        	/>
			 		<div className="col-span-3">
			   	 <Input 
			   	 	type="submit"
			   	 	value={saved ? '✓' : "Save"} 
			   	 />
			   	</div>
			</div>
		</form>
	)
}