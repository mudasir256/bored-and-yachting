import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Header from '@/components/small/Header'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import StripeSetupIntentForm from '@/components/combined/StripeSetupIntentForm'
import { useState, useEffect } from 'react'
import { getStripeSetupIntent, useStripePaymentMethods } from '@/endpoints/get'
import Loading from '@/components/small/Loading'
import Button from '@/components/small/Button'
import Icon from '@/components/Icon'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Billing() {

	const { paymentMethods, isLoading } = useStripePaymentMethods()

	const [isLoadingStripe, setIsLoadingStripe] = useState(true)
	const [clientSecret, setClientSecret] = useState('')


	useEffect(() => {
		const initializeStripe = async () => {
			const setupIntent = await getStripeSetupIntent()
			setIsLoadingStripe(false)
			setClientSecret(setupIntent?.setupIntent?.client_secret)
		}
		initializeStripe()
	}, [])

	if (isLoadingStripe) {
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

	const Card = ({ card }) => (
		<div className="max-w-xs shadow-md rounded-lg p-4">
			<div className="flex flex-row justify-between mb-2">
				<Icon name="star" size="sm" color="blue" />
				<p>{card.brand.toUpperCase()}</p>
			</div>
			<p>•••• •••• •••• {card.last4}</p>
			<p className="mb-4">{card.exp_month} / {card.exp_year}</p>
			<Button onClick={() => handleCardDelete(card)} text="Delete" isFull isOutlined />
		</div>
	)
	
	const handleCardDelete = async (card) => {
		console.log(card)
		if (paymentMethods?.data?.length < 2) {
			//don't allow delete if only 1 payment metho
			return
		} 
		//TODO: delete card
	}


	return(<Elements stripe={stripePromise} options={options}>
		<ContentPageLayout>
			<div className="pb-4">
				<Header text="Manage Payment Methods" />
				{paymentMethods?.data?.map(item => (
					<Card key={item.id} card={item.card} />
				))}
			</div>
			<Header text="Add a payment method" />
			<StripeSetupIntentForm />
		</ContentPageLayout>
	</Elements>)
}