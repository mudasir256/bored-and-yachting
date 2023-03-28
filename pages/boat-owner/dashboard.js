import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Header from '@/components/small/Header'
import Subheader from '@/components/small/Subheader'
import Button from '@/components/small/Button'
import Link from 'next/link'
import Image from 'next/image'
import { USER_TYPES } from '@/helpers/index'
import BoatOwnerReservations from '@/components/combined/dashboard/BoatOwnerReservations'
import { createBoat } from '@/endpoints/post'
import { useUserBoats } from '@/endpoints/get'

import { useEffect, useState } from 'react' 
import { useRouter } from 'next/router'

export default function Dashboard() {

	const { boats, isLoading } = useUserBoats()
	const router = useRouter()
	console.log(boats)
	const [isFirstTimeBoatOwnerLogin, setIsFirstTimeBoatOwnerLogin] = useState(false)
	const [firstName, setFirstName] = useState('')

	useEffect(() => {
		if (localStorage.getItem('firstName')) {
			setIsFirstTimeBoatOwnerLogin(false)
			setFirstName(localStorage.getItem('firstName'))
			return
		}
		setIsFirstTimeBoatOwnerLogin(true)
	}, [])


	if (isFirstTimeBoatOwnerLogin) {
		router.push('/boat-owner/setup')
	}

	const handleCreateNewBoat = async () => {
		const result = await createBoat(localStorage.getItem('userId'))
		//TODO: error handle
		console.log(result)
		router.push(`/boat-owner/${result.boat._id}`)
	}

	const handleAddRole = (role) => {

	}

	return (<>
		<ContentPageLayout>
			<div className="space-y-12">
				<Header text={`Welcome back ${firstName},`} />

				<BoatOwnerReservations boatsOwned={boats} />

				<div>
					<div className="flex flex-row items-center">
						<Subheader text="Your vessels" />	
						<button onClick={() => handleCreateNewBoat()} className="ml-auto underline">Add a vessel</button>
					</div>
					<div className="mt-2 flex flex-row gap-4 justify-start flex-wrap">
					{boats?.map(boat => (
						<Link href={`/boat-owner/${boat._id}`} key={boat._id} className="shadow rounded">
							<Image src={boat.photos?.find(Boolean)} alt="boat" width="240" height="160" /> 
							<h2 className="ml-2">{boat.name}</h2>
						</Link>
					))}
					</div>
				</div>

				<hr />
				<div>
					<h2 className="text-lg mb-2">Other Features</h2>
					<div className="flex flex-row gap-2">
						<Link href="/user/profile?redirect=true" className="cursor-pointer underline text-sm">Update profile</Link>
						<Link href="/user/billing?redirect=true&key=boat-owner" className="cursor-pointer underline text-sm">Update billing</Link>
						<p className="cursor-pointer underline text-sm" onClick={() => handleAddRole(USER_TYPES.CAPTAIN)}>Become a captain</p>
						<p className="cursor-pointer underline text-sm" onClick={() => handleAddRole(USER_TYPES.CUSTOMER)}>Create a customer account</p>
					</div>
				</div>
			</div>	
		</ContentPageLayout>
	</>)
}