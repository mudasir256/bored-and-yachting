import { useCaptains, useBoat } from '@/endpoints/get'
import Image from 'next/image'
import Button from '@/components/small/Button'
import Subheader from '@/components/small/Subheader'

export default function CaptainsForm({ boatId }) {

	const { boat, isLoading: isLoadinBoat } = useBoat(boatId)
	const { captains, isLoading } = useCaptains()

	const handleCaptainSubmit = (e) => {
		e.preventDefault()
	}


	const removeFromRoster = (id) => {

	}

	const addToRoster = (id) => {

	}

	const CaptainRow = ({ _id, profilePicture, firstName, email, children }) => (
		<div className="grid grid-cols-5 gap-2 items-center">
			<div className="flex flex-row items-center gap-2">
				<div className="relative w-12 h-12">
					<Image src={profilePicture} alt={firstName} className="object-cover rounded-full" layout="fill" />
				</div>
				<p>{firstName}</p>
			</div>
			<p>{email}</p>
			<div className="col-span-2">
				<p></p>
			</div>
			{children}
		</div>
	)

	return(
		<div className="space-y-12">

			<div>
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
							<Button text="Remove from roster" onClick={() => removeFromRoster(captain?._id)} /> 
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
							<Button text="Add to roster" onClick={() => addToRoster(captain?._id)} /> 
						</CaptainRow>
					</div>
				))}
			</div>
		</div>
	)
}