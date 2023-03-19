import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Header from '@/components/small/Header'
import Subheader from '@/components/small/Subheader'
import Button from '@/components/small/Button'
import Link from 'next/link'
import Image from 'next/image'

import BoatOwnerReservationsTypePicker from '@/components/combined/BoatOwnerReservationsTypePicker'
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

	return (<>
		<ContentPageLayout>
			<div className="space-y-12">
				<Header text={`Welcome back ${firstName},`} />

				<div className="space-y-2">
					<Subheader text="Your reservations" />
					<div className="flex flex-row items-center">
						<BoatOwnerReservationsTypePicker />
						<div className="ml-auto">
							<p className="underline cursor-pointer">All reservations</p>
						</div>
					</div>
					{/* Load reservations here */}
					<p className="pt-6 text-center">No reservations found.</p>
				</div>

				<div>
					<div className="flex flex-row items-center">
						<Subheader text="Your vessels" />	
						<button onClick={() => handleCreateNewBoat()} className="ml-auto underline">Add a vessel</button>
					</div>
					<div className="mt-2 flex flex-row gap-2 justify-between flex-wrap">
					{boats?.map(boat => (
						<Link href={`/boat-owner/${boat._id}`} key={boat._id} className="shadow rounded">
							<Image width="240" height="160" /> {/* boat.photos */}
							<h2 className="ml-2">{boat.name}</h2>
						</Link>
					))}
					</div>
				</div>
			</div>	
		</ContentPageLayout>
	</>)
}