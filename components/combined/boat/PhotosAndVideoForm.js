import { useState, useEffect } from 'react'
import Input from '@/components/Input'
import { baseUrl, updateBoat, updateBoatFiles } from '@/endpoints/post'
import { useBoat } from '@/endpoints/get'
import { ReactSortable } from "react-sortablejs";
import Image from 'next/image'
import Subheader from '@/components/small/Subheader'
import Icon from '@/components/Icon'
import { useSWRConfig } from 'swr'
export default function PhotosAndVideoForm({ boatId }) {

	const { boat, isLoading } = useBoat(boatId)
	const { mutate } = useSWRConfig()

	const [currentPhotos, setCurrentPhotos] = useState([])
	const [newPhotos, setNewPhotos] = useState([])
	const [videoLink, setVideoLink] = useState('')
	const [saved, setSaved] = useState(false)
	const [draggedIndex, setDraggedIndex] = useState('')

	useEffect(() => {
		if (boat) {
			setVideoLink(boat?.videoLink)
			console.log(boat)
			const format = boat?.photos.map((photo, i) => {
				return {
					id: i,
					src: photo
				}
			})
			console.log(format)
			setCurrentPhotos(format)
		}
	}, [boat])


	const handleNewFiles = async (files) => {
		setNewPhotos(files)
		try {
			console.log(boatId)
			const result = await updateBoatFiles(boatId, files, 'photos')
			console.log(result)
			console.log('boat file')
			if (result.success) {
				setNewPhotos([])
				mutate(baseUrl(`/boats/${boatId}`))
			}	
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		setSaved(false)
	}, [currentPhotos, newPhotos, videoLink])



	const handleBoatPhotosAndVideos = async (e) => {
		e.preventDefault()
		try {
			const photoUrls = currentPhotos.map(photo => photo.src)
			const result = await updateBoat(boatId, {
				photos: photoUrls,
				videoLink
			})
			console.log(result)
			if (result.success) {
				setSaved(true)
			}
		} catch (err) {
			console.log(err)
		}
	}

	const handleCaptureIndex = (e) => {
		setDraggedIndex(e.oldIndex || e.newIndex)
	}

	const handleDelete = (e) => {
		e.preventDefault()
		const newArray = [...currentPhotos]
		newArray.splice(draggedIndex, 1)
		setCurrentPhotos([...newArray])
	}

	return (<>
		<div className="space-y-4">
			<div>
				<Subheader text="All Photos" />
				<p className="text-sm text-gray-500">Drag and drop to reorder your photos. Make sure to save your changes!</p>
			</div>

			<ReactSortable 
				className="flex flex-row flex-wrap gap-4" 
				swap 
				list={currentPhotos} 
				setList={(newState) => setCurrentPhotos(newState)}
				onStart={handleCaptureIndex}
				onChange={handleCaptureIndex}
			>
			  {currentPhotos.map((item, index) => (
			    <div className="relative w-60 h-48" key={item?.id}>
			     	<Image src={item?.src} layout="fill" objectFit="cover"  alt={item?.src} />
			    </div>
			   ))}
			</ReactSortable>
			<div 
				onDragOver={(e) => {
					e.stopPropagation()
					e.preventDefault()
				}} 
				onDrop={handleDelete} 
				className="delete-box w-full h-28 border-dashed border rounded flex justify-center items-center"
			>
				<Icon name="delete" size="xl" color="gray" />
			</div>
		</div>

		<form className="space-y-4" onSubmit={handleBoatPhotosAndVideos}>
			<Input 
				type="file" 
				label="Upload New Photos"
				id="photos"
			 	onChange={(e) => handleNewFiles(e.target?.files)}
			 	value={newPhotos?.name}
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
			 	 	value={saved ? '✓' : "Save"} 
			 	 />
			 </div>
		</form>
	</>)
}