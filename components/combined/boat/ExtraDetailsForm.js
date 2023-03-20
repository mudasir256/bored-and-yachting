import { useState, useEffect } from 'react'
import Input from '@/components/Input'
import { updateBoat } from '@/endpoints/post'
import { useBoat } from '@/endpoints/get'
import { FEATURES_LIST, AMENITIES_LIST } from '@/helpers/index'

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
							<div key={key} className="my-0.5 flex flex-row items-center gap-1">
								<input checked={selectedFeatures.includes(key)} onChange={() => handleFeaturesSelect(key)} id={FEATURES_LIST[key]} type="checkbox" value={key} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
								<label htmlFor={FEATURES_LIST[key]} class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{FEATURES_LIST[key]}</label>
							</div>
						))}
					</div>

					<div>
						<p className="text-sm underline mb-2">Amenities:</p>
						{Object.keys(AMENITIES_LIST).map(key => (
							<div key={key} className="my-0.5 flex flex-row  items-center gap-1">
								<input checked={selectedAmenities.includes(key)} onChange={() => handleAmenitiesSelect(key)} id={AMENITIES_LIST[key]} type="checkbox" value={key} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
								<label htmlFor={AMENITIES_LIST[key]} class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{AMENITIES_LIST[key]}</label>
							</div>
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