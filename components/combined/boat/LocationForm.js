import { useState } from 'react'
import Input from '@/components/Input'

export default function LocationForm({ boatId }) {

	const [boatAddress, setBoatAddress] = useState('')
	const [charterAddress, setCharterAddress] = useState('')
	const [dockNumber, setDockNumber] = useState('')
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

					<div className="grid grid-cols-1 md:grid-cols-4  gap-2">
						<div className="col-span-3">
							<Input 
						 		type="text" 
						 		label="Address where boat is chartered"
						 		id="charterAddress"
						  	placeholder="Charter Address" 
						  	onChange={(e) => setCharterAddress(e.target?.value)}
						  	value={charterAddress}
						  	isRequired={true} 
							/>
						</div>
						<div className="col-span-1">
							<Input 
						 		type="number" 
						 		label="Slip / Dock #"
						 		id="dockNumber"
						  	placeholder="Slip / Dock #" 
						  	onChange={(e) => setDockNumber(e.target?.value)}
						  	value={dockNumber}
						  	isRequired={true} 
							/>
						</div>
					</div>

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