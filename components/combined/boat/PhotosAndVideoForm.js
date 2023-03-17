import { useState } from 'react'
import Input from '@/components/Input'

export default function PhotosAndVideoForm() {

	const [photos, setPhotos] = useState([])
	const [videoLink, setVideoLink] = useState('')

	const handleBoatPhotosAndVideos = () => {

	}

	return (
		<form className="space-y-4" onSubmit={handleBoatPhotosAndVideos}>
			<Input 
				type="file" 
				label="Photos"
				id="photos"
			 	onChange={(e) => setPhotos(e.target?.value)}
			 	value={photos}
			 	isRequired={true} 
			 	multiple={true}
			 	accept="image/*"
			 />
			 <Input 
			 	type="text" 
			 	label="Youtube Video Link"
			 	id="videoLink"
		  	placeholder="Youtube Video Link"
		  	onChange={(e) => setVideoLink(e.target?.value)}
		  	value={videoLink}
			 />
			 <div className="col-span-2">
			 	 <Input 
			 	 	type="submit"
			 	 	value="Save"
			 	 />
			 </div>
		</form>
	)
}