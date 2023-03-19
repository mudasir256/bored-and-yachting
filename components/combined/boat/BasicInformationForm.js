import { useState } from 'react'
import Input from '@/components/Input'

export default function BasicInformationForm() {

	const [vesselName, setVesselName] = useState('')
	const [yearBuilt, setYearBuilt] = useState('')
	const [make, setMake] = useState('')
	const [model, setModel] = useState('')
	const [maxNumberOfPassengers, setMaxNumberOfPassengers] = useState('')
	const [numberOfCabins, setNumberOfCabins] = useState('')
	const [numberOfBathrooms, setNumberOfBathrooms] = useState('')
	const [vesselLength, setVesselLength] = useState('')


	const handleBoatInfo = () => {

	}

	return (
		<form onSubmit={handleBoatInfo}>
			<div className="grid grid-cols-3 gap-2 items-end space-y-2">
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
		   	 <Input 
			     	type="text" 
			     	label="Max # of Passengers"
			     	id="model"
			      placeholder="Model"
			      onChange={(e) => setModel(e.target?.value)}
			      value={model} 
			      isRequired={true} 
		      />
         	<Input 
      	    type="text" 
      	    label="Number of Cabins"
      	    id="numberOfCabins"
      	    placeholder="# of Cabins"
      	    onChange={(e) => setNumberOfCabins(e.target?.value)}
      	    value={numberOfCabins} 
      	    isRequired={true} 
           />
	       	 <Input 
    	     		type="text" 
    	     		label="Number of Bathrooms"
    	     		id="numberOfBathrooms"
    	      	placeholder="Number of Bathrooms"
    	      	onChange={(e) => setNumberOfBathrooms(e.target?.value)}
    	      	value={numberOfBathrooms} 
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
			   	 	value="Save"
			   	 />
			   	</div>
			</div>
		</form>
	)
}