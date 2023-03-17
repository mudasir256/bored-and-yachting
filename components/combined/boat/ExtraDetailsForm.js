import { useState } from 'react'
import Input from '@/components/Input'

export default function ExtraDetailsForm() {

	//TODO: load from existing data for not new boat
	const [about, setAbout] = useState('')
	const [selectedAmenities, setSelectedAmenities] = useState([])
	const [selectedFeatures, setSelectedFeatures] = useState([])

	const FEATURES_LIST = {
		SPEAKER_SYSTEM: 'Speaker system',
		TELEVISION: 'Television',
		BATHROOM: 'Bathroom',
		REFRIGERATOR: 'Refrigerator',
		MICROWAVE: 'Microwave',
		STOVE_TOP: 'Stove-top',
		BEDROOMS: 'Bedrooms',
		SWIM_PLATFORM: 'Swim platform',
		LADDER: 'Ladder'
	}

	const AMENITIES_LIST = {
		COOLER: 'Cooler',
		LILY_PAD: 'Lily pad',
		NOODLES: 'Noodles',
		FLOATIES: 'Floaties',
		GOGGLES: 'Goggles',
		FLIPPERS: 'Flippers'
	}

	const handleBoatExtraDetails = () => {

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
				<textarea className="border rounded-md w-full h-40" id="about" name="about" value={about} onChange={(e) => setAbout(e.target?.value)} />
		    <div className="flex flex-row gap-16">
		    	<div>
		    		<p className="text-sm underline mb-2">Features:</p>
						{Object.keys(FEATURES_LIST).map(key => (
							<div key={key} className="my-0.5 flex flex-row items-center gap-1">
								<input checked={selectedFeatures.includes(key)} onChange={() => handleFeaturesSelect(key)} id={FEATURES_LIST[key]} type="checkbox" value={key} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
								<label for={FEATURES_LIST[key]} class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{FEATURES_LIST[key]}</label>
							</div>
						))}
					</div>

					<div>
						<p className="text-sm underline mb-2">Amenities:</p>
						{Object.keys(AMENITIES_LIST).map(key => (
							<div key={key} className="my-0.5 flex flex-row  items-center gap-1">
								<input checked={selectedAmenities.includes(key)} onChange={() => handleAmenitiesSelect(key)} id={AMENITIES_LIST[key]} type="checkbox" value={key} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
								<label for={AMENITIES_LIST[key]} class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{AMENITIES_LIST[key]}</label>
							</div>
						))}
					</div>
				</div>
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