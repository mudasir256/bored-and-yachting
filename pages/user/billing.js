import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Header from '@/components/small/Header'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import StripeSetupIntentForm from '@/components/combined/StripeSetupIntentForm'
import { useState, useEffect } from 'react'
import { getStripeSetupIntent } from '@/endpoints/get'
import Loading from '@/components/small/Loading'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Billing() {

	const [isLoading, setIsLoading] = useState(true)
	const [clientSecret, setClientSecret] = useState('')

	useEffect(() => {
		const initializeStripe = async () => {
			const setupIntent = await getStripeSetupIntent()
			setIsLoading(false)
			setClientSecret(setupIntent?.setupIntent?.client_secret)
		}
		initializeStripe()
	}, [])

	if (isLoading) {
		return(
			<ContentPageLayout>
				<div className="flex justify-center items-center"><Loading /></div>
			</ContentPageLayout>
		)
	}

	const options =  {
		clientSecret: clientSecret,
		appearance: {}
	}

	return(<Elements stripe={stripePromise} options={options}>
		<ContentPageLayout>
			<div className="pb-4">
				<Header text="Manage Payment Methods" />
				TODO: load payment methods / preferred method
			</div>
			<Header text="Add a payment method" />
			<StripeSetupIntentForm />
		</ContentPageLayout>
	</Elements>)
}