import { useCaptains, useBoat } from '@/endpoints/get'
import Image from 'next/image'
import Button from '@/components/small/Button'
import Subheader from '@/components/small/Subheader'
import { updateBoat } from '@/endpoints/post'

export default function CaptainsForm({ boatId }) {

	const { boat, isLoading: isLoadingBoat, mutate } = useBoat(boatId)
	const { captains, isLoading } = useCaptains()

	const handleCaptainSubmit = (e) => {
		e.preventDefault()
	}


	const removeFromRoster = async (captain) => {
		const ids = boat?.preferredCaptains.map(item => item._id)
		const indexOf = ids.indexOf(captain._id)
		const newDisplayArray = [...boat.preferredCaptains]
		newDisplayArray.splice(indexOf, 1)
		const newIds = newDisplayArray.map(item => item._id)
		const result = await updateBoat(boatId, { preferredCaptains: newIds })
		console.log(result)
		mutate(newDisplayArray)
	}

	const addToRoster = async (captain) => {
		const newDisplayArray = [...boat.preferredCaptains, captain]
		const ids = newDisplayArray.map(item => item._id)
		const result = await updateBoat(boatId, { preferredCaptains: ids })
		console.log(result)
		mutate(newDisplayArray)
	}

	const CaptainRow = ({ _id, profilePicture, firstName, email, children }) => (
		<div className="grid grid-cols-5 gap-2 items-center">
			<div className="flex flex-row items-center gap-2">
				<div className="relative w-12 h-12">
					<Image src={profilePicture} alt={firstName} className="object-cover rounded-full" layout="fill" />
				</div>
				<p className="text-sm">{firstName}</p>
			</div>
			<p className="text-sm">{email}</p>
			<div className="col-span-2">
				<p></p>
			</div>
			{children}
		</div>
	)

	const captainExistsInArray = (array, captain) => {
		return array?.find(item => item._id === captain._id)
	}

	return(
		<div className="space-y-12">

			<div className="space-y-4 min-h-[120px]">
				<Subheader text="Current Roster" />
				{boat?.preferredCaptains?.length === 0 &&
					<p className="text-gray-500 text-center text-sm">Add your first captain.</p>
				}
				{boat?.preferredCaptains?.length > 0 && boat?.preferredCaptains?.map(captain => (
					<div key={captain._id}>
						<CaptainRow 
							profilePicture={captain?.profilePicture} 
							firstName={captain?.firstName} 
							email={captain?.email} 
						>
							<Button text="Remove" onClick={() => removeFromRoster(captain)} /> 
						</CaptainRow>
					</div>
				))}
			</div>

			<div className="space-y-1">
				<Subheader text="Find a Captain" />
				<p className="text-sm">Select a minimum of 5 captains for your vessel. These captains will be notified whenever you approve of a charter.</p>
			</div>
			<div>
				<div className="grid grid-cols-5 gap-2 font-bold">
					<p>Name</p>
					<p>Email</p>
					<p>Notes</p>
					<p></p>
					<p></p>
				</div>
				<div className="my-4">
					<hr />
				</div>
				{captains?.map(captain => (
					<div key={captain._id}>
						<CaptainRow 
							profilePicture={captain?.profilePicture} 
							firstName={captain?.firstName} 
							email={captain?.email} 
						>
							{captainExistsInArray(boat?.preferredCaptains, captain) 
								? <p className="italic text-right mr-4">Added to roster</p>
								: <Button text="Add to roster" onClick={() => addToRoster(captain)} /> 
							}
						</CaptainRow>
					</div>
				))}
			</div>
		</div>
	)
}