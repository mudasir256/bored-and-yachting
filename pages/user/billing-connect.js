import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Header from '@/components/small/Header'
import Icon from '@/components/Icon'
import { useRouter } from 'next/router'
import Button from '@/components/small/Button'
import { getStripeAccountLink, getStripeAccountStatus } from '@/endpoints/get'
import { useEffect, useState } from 'react'

export default function BillingConnect() {

	const router = useRouter()
	const { redirect, key } = router.query

	const [isConnected, setIsConnected] = useState(false)

	useEffect(() => {
		const checkConnectStatus = async () => {
			const result = await getStripeAccountStatus()
			if (result.success && result.account?.charges_enabled) {
				setIsConnected(true)
			}
		}
		checkConnectStatus()
	}, [])

	const connectWithStripe = async () => {
		const isBoatOwner = key === 'boat-owner'
		const result = await getStripeAccountLink(localStorage.getItem('userId'), isBoatOwner)
		window.location.href = result.link.url
	}

	return(<>
		{redirect == 'true' &&
			<div className='absolute ml-4 mt-4 cursor-pointer' onClick={() => router.back()} > 
				<Icon name="left-arrow" />
			</div>
		}
		<ContentPageLayout>
			<Header text="Billing Information" />
			{isConnected 
				? <Button text="Edit payment details with Stripe" onClick={() => connectWithStripe()} />
				: <Button text="Connect with Stripe for payments" onClick={() => connectWithStripe()} />
			} 
		</ContentPageLayout>
	</>)
}