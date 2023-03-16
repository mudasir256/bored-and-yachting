import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Header from '@/components/small/Header'
import Subheader from '@/components/small/Subheader'

import BoatOwnerReservationsTypePicker from '@/components/combined/BoatOwnerReservationsTypePicker'

import { useEffect, useState } from 'react' 
import { useRouter } from 'next/router'

export default function Dashboard() {

	const router = useRouter()

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

	return (<>
		<ContentPageLayout>
			<div className="space-y-8">
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
					<Subheader text="Your vessels" />
				</div>
			</div>	
		</ContentPageLayout>
	</>)
}