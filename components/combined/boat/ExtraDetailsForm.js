import { useState, useEffect } from 'react'
import Input from '@/components/Input'
import { updateBoat } from '@/endpoints/post'
import { useBoat } from '@/endpoints/get'
import { FEATURES_LIST, AMENITIES_LIST } from '@/helpers/index'
import CheckboxWithText from '@/components/small/CheckboxWithText'

export default function ExtraDetailsForm({ boatId }) {

	const { boat, isLoading } = useBoat(boatId)

	const [description, setDescription] = useState('')
	const [selectedAmenities, setSelectedAmenities] = useState([])
	const [selectedFeatures, setSelectedFeatures] = useState([])

	const [saved, setSaved] = useState(false)

	useEffect(() => {
		if (boat) {
			setDescription(boat.description || '')
			setSelectedAmenities(boat.amenitiesList || [])
			setSelectedFeatures(boat.featuresList || [])
		}
	}, [boat])

	useEffect(() => {
		setSaved(false)
	}, [description, selectedAmenities, selectedFeatures])

	const handleBoatExtraDetails = async (e) => {
		e.preventDefault()
		const result = await updateBoat(boatId, { description, amenitiesList: selectedAmenities, featuresList: selectedFeatures })
		if (result.success) {
			setSaved(true)
		}
	}

	const handleFeaturesSelect = (key) => {
		const indexOf = selectedFeatures.indexOf(key)
		const clone = selectedFeatures
		if (indexOf > -1) {
			clone.splice(indexOf, 1)
			setSelectedFeatures([...clone])
			return
		}
		clone.push(key)
		setSelectedFeatures([...clone])
	}

	const handleAmenitiesSelect = (key) => {
		const indexOf = selectedAmenities.indexOf(key)
		const clone = selectedAmenities
		if (indexOf > -1) {
			clone.splice(indexOf, 1)
			setSelectedAmenities([...clone])
			return
		}
		clone.push(key)
		setSelectedAmenities([...clone])
	}

	return (
		<form onSubmit={handleBoatExtraDetails}>
			<div className="space-y-2 gap-2">
				<label className="text-sm">About the vessel:</label>
				<textarea className="border rounded-md w-full h-40" id="about" name="about" value={description} onChange={(e) => setDescription(e.target?.value)} />
		    <div className="flex flex-row gap-16">
		    	<div>
		    		<p className="text-sm underline mb-2">Features:</p>
						{Object.keys(FEATURES_LIST).map(key => (
							<CheckboxWithText 
								key={key} 
								isChecked={selectedFeatures.includes(key)}
								handleSelect={handleFeaturesSelect}
								id={FEATURES_LIST[key]}
								value={key}
								htmlFor={FEATURES_LIST[key]}
								label={FEATURES_LIST[key]}
							/>		
						))}
					</div>

					<div>
						<p className="text-sm underline mb-2">Amenities:</p>
						{Object.keys(AMENITIES_LIST).map(key => (
							<CheckboxWithText 
								key={key} 
								isChecked={selectedAmenities.includes(key)}
								handleSelect={handleAmenitiesSelect}
								id={AMENITIES_LIST[key]}
								value={key}
								htmlFor={AMENITIES_LIST[key]}
								label={AMENITIES_LIST[key]}
							/>	
						))}
					</div>
				</div>
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