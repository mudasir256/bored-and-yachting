import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Header from '@/components/small/Header'
import Icon from '@/components/Icon'
import { useRouter } from 'next/router'
import Button from '@/components/small/Button'
import { getStripeAccountLink, getStripeAccountStatus, getStripeAccountLogin } from '@/endpoints/get'
import { useEffect, useState } from 'react'
import Loading from '@/components/small/Loading'

export default function BillingConnect() {

	const router = useRouter()
	const { redirect, key } = router.query

	const [isConnected, setIsConnected] = useState(false)
	const [showExplainer, setShowExplainer] = useState(false)
	
	const [checkingStatus, setCheckingStatus] = useState(true)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const checkConnectStatus = async () => {
			const result = await getStripeAccountStatus()
			if (result.success && result.account?.charges_enabled) {
				setIsConnected(true)
			} else if (result.success & result.account?.requirements?.length > 0) {
				setShowExplainer(true)
			}
			setCheckingStatus(false)
		}
		checkConnectStatus()
	}, [])

	const connectWithStripe = async () => {
		setLoading(true)
		const isBoatOwner = key === 'boat-owner'
		const result = await getStripeAccountLink(localStorage.getItem('userId'), isBoatOwner)
		window.open(result.link.url)
		setLoading(false)
	}

	const loginWithStripe = async () => {
		setLoading(true)
		const result = await getStripeAccountLogin()
		console.log(result)
		window.open(result.link.url)
		setLoading(false)
	}

	return(<>
		{redirect == 'true' &&
			<div className='absolute ml-4 mt-4 cursor-pointer' onClick={() => router.back()} > 
				<Icon name="left-arrow" />
			</div>
		}
		<ContentPageLayout>
			<Header text="Billing Information" />
			{checkingStatus ? <Loading />
				:<div>
					{isConnected 
						? <Button text="View payment details through Stripe" onClick={() => loginWithStripe()} isLoading={loading} />
						: <Button text="Connect with Stripe for payments" onClick={() => connectWithStripe()} isLoading={loading} />
					} 
				</div>
			}
			{showExplainer && <p className="text-sm max-w-lg mt-4">Your account information needs updating. Please complete your billing registration process by clicking the button above.</p>}
		</ContentPageLayout>
	</>)
}