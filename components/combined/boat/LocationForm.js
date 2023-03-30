import { useState, useEffect } from 'react'
import Input from '@/components/Input'
import { LOCATION_TYPE } from '@/helpers/index'
import { updateBoatLocation, updateBoat } from '@/endpoints/post'
import { useBoat } from '@/endpoints/get'

export default function LocationForm({ boatId }) {

	const { boat, isLoading } = useBoat(boatId)

	const [boatAddress, setBoatAddress] = useState('')
	const [charterAddress, setCharterAddress] = useState('')
	const [dockNumber, setDockNumber] = useState('')
	const [charterDockNumber, setCharterDockNumber] = useState('')
	const [parkingAddress, setParkingAddress] = useState('')

	const [saved, setSaved] = useState(false)

	const handleBoatLocation = async (e) => {
		e.preventDefault()
		if (dockNumber || charterDockNumber) {
			updateBoat(boatId, { charterDockNumber, dockNumber })
		}
		if (boatAddress && !boatAddress.isOld) {
			const state = boatAddress.address.split(', ')[2].split(' ')[0]
			const result = await updateBoatLocation(boatId, { state, ...boatAddress }, LOCATION_TYPE.IS_HARBOR, 'dockLocation')
			console.log(result)
		}
		if (charterAddress && !charterAddress.isOld) {
			const state = charterAddress.address.split(', ')[2].split(' ')[0]
			const result = await updateBoatLocation(boatId, { state, ...charterAddress }, LOCATION_TYPE.IS_CHARTER, 'charterLocation')
			console.log(result)
		}
		if (parkingAddress && !parkingAddress.isOld) {
			const state = parkingAddress.address.split(', ')[2].split(' ')[0]
			const result = await updateBoatLocation(boatId, { state, ...parkingAddress }, LOCATION_TYPE.IS_PARKING_LOT, 'parkingLocation')
			console.log(result)
		}
		setSaved(true)
	}

	useEffect(() => {
		//add value: {} for crash prevention
		console.log(boat)
		if (boat) {
			setBoatAddress({ ...boat.dockLocation, value: {}, isOld: true })
			setCharterAddress({ ...boat.charterLocation, value: {}, isOld: true })
			setParkingAddress({ ...boat.parkingLocation, value: {}, isOld: true })			
			setDockNumber(boat.dockNumber || '')
			setCharterDockNumber(boat.charterDockNumber || '')
		}
	}, [boat])



	return (
		<form onSubmit={handleBoatLocation}>
			<div className="space-y-4 gap-2">

					<div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2">
						<div className="col-span-3">
							<Input 
								type="address" 
								label="Address where boat is docked"
								id="boatAddress"
							 	placeholder="Boat Address" 
							 	onChange={(data) => setBoatAddress(data)}
							 	value={boatAddress}
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

					<div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2">
						<div className="col-span-3">
							<Input 
						 		type="address" 
						 		label="Address where boat is chartered"
						 		id="charterAddress"
						  	placeholder="Charter Address" 
						  	onChange={(data) => setCharterAddress(data)}
						  	value={charterAddress}
						  	isRequired={true} 
							/>
						</div>
						<div className="col-span-1">
							<Input 
						 		type="number" 
						 		label="Charter Dock # (optional)"
						 		id="charterDockNumber"
						  	placeholder="Dock #" 
						  	onChange={(e) => setCharterDockNumber(e.target?.value)}
						  	value={charterDockNumber}
							/>
						</div>
					</div>

					 <Input 
				  	type="address" 
				  	label="Address where customers should park"
				  	id="parkingAddress"
				   	placeholder="Parking Address"
				   	onChange={(data) => setParkingAddress(data)}
				   	value={parkingAddress} 
				   	isRequired={true} 
				   />
				    <div className="col-span-2">
				   	 <Input 
				   	 	type="submit"
				   	 	value={saved ? '✓' : "Save"} 
				   	 />
				    </div>
			</div>
		</form>
	)
}