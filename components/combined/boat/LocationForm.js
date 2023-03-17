import { useState } from 'react'
import Input from '@/components/Input'

export default function LocationForm() {

	const [boatAddress, setBoatAddress] = useState('')
	const [parkingAddress, setParkingAddress] = useState('')

	const handleBoatLocation = () => {

	}

	return (
		<form onSubmit={handleBoatLocation}>
			<div className="space-y-4 gap-2">
					<Input 
						type="text" 
						label="Address where boat is docked"
						id="boatAddress"
					 	placeholder="Boat Address" 
					 	onChange={(e) => setBoatAddress(e.target?.value)}
					 	value={boatAddress}
					 	isRequired={true} 
					 />

					 <Input 
				  	type="text" 
				  	label="Address where customers should park"
				  	id="parkingAddress"
				   	placeholder="Parking Address"
				   	onChange={(e) => setParkingAddress(e.target?.value)}
				   	value={parkingAddress} 
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