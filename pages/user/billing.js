import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Header from '@/components/small/Header'
import Icon from '@/components/Icon'
import { useRouter } from 'next/router'
import Button from '@/components/small/Button'
import { getStripeAccountLink } from '@/endpoints/get'

export default function Billing() {

	const router = useRouter()
	const { redirect, key } = router.query

	const connectWithStripe = async () => {
		const isBoatOwner = key === 'boat-owner'
		const result = await getStripeAccountLink(localStorage.getItem('userId'), isBoatOwner)
		console.log(result)
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
			<Button text="Connect with Stripe for payments" onClick={() => connectWithStripe()} />
		</ContentPageLayout>
	</>)
}